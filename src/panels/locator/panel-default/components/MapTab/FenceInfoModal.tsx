import React, { useState, useEffect, useContext, useRef } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useHistory } from 'react-router-dom';
import { ConfirmBtnGroup } from '@components/Btn';
import { Slider } from '@components/Slider';
import { SectionList } from '@components/SectionList';
import { Modal } from '@components/Modal';
import { CheckBoxGroup } from '@components/CheckBox';
import { useAsyncFetch } from '@hooks/useAsyncFetch';
import { LocatorPanelContext } from '../../LocatorPanelContext';
import { getAddressByLatLng, createFence, modifyFence } from '../../models';
import { Circle } from './TMap';
import { AlertMethodTypeStr, AlertConditionTypeStr, DeviceFenceInfo } from '../../types';
import { GCJ02ToWGS84, WGS84ToGCJ02, generateCircleFenceArea, rgba } from '../../utils';

import './FenceInfoModal.less';

const RadiusLimit = {
  min: 10,
  max: 5000,
};

const AlertConditionOptions = Object.keys(AlertConditionTypeStr).map((key) => ({
  text: AlertConditionTypeStr[key],
  value: key,
}));

const AlertMethodOptions = Object.keys(AlertMethodTypeStr).map((key) => ({
  text: AlertMethodTypeStr[key],
  value: key,
}));

const FenceCircleFillColor = rgba(7, 93, 231, 0.1);

function CheckBoxGroupModal({
  visible,
  onSubmit,
  value,
  options,
  title,
  onClose,
}) {
  const [newValue, setNewValue] = useState(value);

  const onConfirm = () => {
    onSubmit(newValue);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      fixedBottom
      onClose={onClose}
      title={title}
    >
      <Modal.Body>
        <CheckBoxGroup
          options={options}
          type='radio'
          value={newValue}
          onChange={setNewValue}
        />
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterConfirmBtnGroup
          confirmText="确定"
          cancelText="取消"
          isInFixedBottomModal
          onConfirm={onConfirm}
          onCancel={onClose}
        />
      </Modal.Footer>
    </Modal>
  );
}

export function FenceInfoModal({
  map,
  qqMaps,
}) {
  const history = useHistory();
  const { getUserLocation, fenceInfo: fenceInfoOrNull, setFenceInfo } = useContext(LocatorPanelContext);
  const fenceInfo = fenceInfoOrNull as DeviceFenceInfo;
  const firstRunRef = useRef(true);
  const [submitting, setSubmitting] = useState(false);
  const [alertConditionModalVisible, setAlertConditionModalVisible] = useState(false);
  const [alertMethodModalVisible, setAlertMethodModalVisible] = useState(false);

  const [radius, setRadius] = useState(() => {
    if (fenceInfo
      && fenceInfo.FenceArea
      && fenceInfo.FenceArea.features[0].properties
      && fenceInfo.FenceArea.features[0].properties.radius) {
      return fenceInfo.FenceArea.features[0].properties.radius;
    } else {
      return 500;
    }
  });
  
  const [center, setCenter] = useState(() => {
    if (fenceInfo
      && fenceInfo.FenceArea
      && Array.isArray(fenceInfo.FenceArea.features[0].geometry.coordinates)
      && fenceInfo.FenceArea.features[0].geometry.coordinates.length === 2) {
      const [lng, lat] = WGS84ToGCJ02([
        fenceInfo.FenceArea.features[0].geometry.coordinates[0],
        fenceInfo.FenceArea.features[0].geometry.coordinates[1],
      ]);

      map.setCenter(new qqMaps.LatLng(lat, lng));

      return { lat, lng };
    } else {
      // 手机定位
      getUserLocation().then((latLng) => {
        updateAsyncFetch({ location: latLng });
        setCenter(latLng);
        map.setCenter(new qqMaps.LatLng(latLng.lat, latLng.lng));
      }).catch((err) => {
        console.error('getUserLocation fail', err);
      });
      
      const center = map.getCenter();
      return {
        lat: center.lat,
        lng: center.lng,
      };
    }
  });

  // 拉取地址
  const [addressState, { updateAsyncFetch }] = useAsyncFetch({
    initData: '',
    fetch: async ({ location } = {}) => {
      if (!location) {
        location = center;
      }

      const data: any = await getAddressByLatLng({ lat: location.lat, lng: location.lng });
      return data.address;
    },
    ignoreEmpty: true,
  });

  const getAddressText = () => {
    if (addressState.loading) {
      return '地址加载中';
    } else if (addressState.hasError || !addressState.data) {
      return '地址加载失败';
    } else {
      return addressState.data;
    }
  };

  useEffect(() => {
    // 地图事件监听
    const listeners: any = [
      qqMaps.event.addListener(map, 'dragend', () => {
        const newCenter = map.getCenter();
        const newCenterLatLng = { lat: newCenter.lat, lng: newCenter.lng };
        updateAsyncFetch({ location: newCenterLatLng });
        setCenter(newCenterLatLng);
      }),
    ];

    return () => {
      listeners.forEach(qqMaps.event.removeListener);
    };
  }, []);

  const onSubmit = async () => {
    if (submitting) {
      return;
    }

    const centerWgs84 = GCJ02ToWGS84([center.lng, center.lat]);

    const newFenceInfo = {
      ...(fenceInfo as DeviceFenceInfo),
      FenceArea: generateCircleFenceArea({
        lng: centerWgs84[0],
        lat: centerWgs84[1]
      }, radius),
    };

    if (!newFenceInfo.FenceName) {
      sdk.tips.showError('请填写区域名称');
      return;
    }

    let address = !addressState.hasError && !addressState.loading
      ? addressState.data
      : '';
    
    if (address.length > 50) {
      address = `${address.substring(0, 49)}…`;
    }

    setSubmitting(true);
    try {
      if (newFenceInfo.FenceId) {
        await modifyFence({
          ProductId: sdk.productId,
          DeviceName: sdk.deviceName,
          FenceId: newFenceInfo.FenceId,
          FenceName: newFenceInfo.FenceName,
          FenceDesc: address,
          FenceArea: newFenceInfo.FenceArea,
          FenceEnable: newFenceInfo.FenceEnable,
          AlertCondition: newFenceInfo.AlertCondition,
          Method: newFenceInfo.Method,
        });
      } else {
        await createFence({
          ProductId: sdk.productId,
          DeviceName: sdk.deviceName,
          FenceName: newFenceInfo.FenceName,
          FenceDesc: address,
          FenceArea: newFenceInfo.FenceArea,
          FenceEnable: newFenceInfo.FenceEnable,
          AlertCondition: newFenceInfo.AlertCondition,
          Method: newFenceInfo.Method,
        });
      }
      await sdk.tips.showSuccess('保存成功');
      history.go(-1);
    } catch (err) {
      sdk.tips.showError(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="locator-fence-info-modal">
        <div className="locator-fence-info-form">
          <div className="text-weak">{getAddressText()}</div>
          <div className="text-weak fence-radius-hint">调节范围({radius})米</div>
          <div className="slider-container clearfix">
            <div className="slider-value-container">
              <div className="slider-value"
                style={{
                  left: `${radius * 100 / (RadiusLimit.max - RadiusLimit.min)}%`,
                }}
              >
                {radius}
              </div>
            </div>
            <div className="slider-bar-container">
              <Slider
                tooltip={false}
                min={RadiusLimit.min}
                max={RadiusLimit.max}
                step={1}
                value={radius}
                onChange={setRadius}
              />
            </div>
          </div>
          <SectionList className="locator-fence-info-form-section-list">
            <SectionList.Item
              label="区域名称"
              clickable={true}
            >
              <input
                type="text"
                value={fenceInfo.FenceName}
                className="fence-name-input"
                placeholder="点击输入"
                onChange={(event) => {
                  const value = event.target.value;
                  setFenceInfo((fenceInfo) => ({
                    ...fenceInfo as DeviceFenceInfo,
                    FenceName: value,
                  }));
                }}
              />
            </SectionList.Item>
            <SectionList.Item
              label="触发报警"
              onClick={() => {
                setAlertConditionModalVisible(true);
              }}
              clickable={true}
            >
              {AlertConditionTypeStr[fenceInfo.AlertCondition] || '点击选择'}
            </SectionList.Item>
            <SectionList.Item
              label="通知方式"
              onClick={() => {
                setAlertMethodModalVisible(true);
              }}
              clickable={true}
              hideBorderBottom={false}
            >
              {AlertMethodTypeStr[fenceInfo.Method] || '点击选择'}
            </SectionList.Item>
          </SectionList>
        </div>
        <div className="locator-fence-info-modal-btn-group">
          <ConfirmBtnGroup
            confirmText="保存"
            onConfirm={() => { onSubmit(); }}
            cancelText="取消"
            onCancel={() => { history.go(-1); }}
          />
        </div>
      </div>
      <Circle
        map={map}
        qqMaps={qqMaps}
        center={center}
        radius={radius}
        strokeWeight={0}
        fillColor={FenceCircleFillColor}
        onBoundsChange={(bounds) => {
          if (firstRunRef.current) {
            // 延迟，避免地图 resize 时宽高取值不正确导致 fitBounds 将地图缩放至最小
            firstRunRef.current = false;
            setTimeout(() => { map.fitBounds(bounds); }, 500);
          } else {
            map.fitBounds(bounds);
          }
        }}
      />
      {alertConditionModalVisible && (
        <CheckBoxGroupModal
          visible
          onClose={() => { setAlertConditionModalVisible(false); }}
          value={fenceInfo.AlertCondition}
          options={AlertConditionOptions}
          title="触发报警"
          onSubmit={(value) => {
            setFenceInfo({
              ...fenceInfo,
              AlertCondition: value,
            });
          }}
        />
      )}
      {alertMethodModalVisible && (
        <CheckBoxGroupModal
          visible
          onClose={() => { setAlertMethodModalVisible(false); }}
          value={fenceInfo.Method}
          options={AlertMethodOptions}
          title="通知方式"
          onSubmit={(value) => {
            setFenceInfo({
              ...fenceInfo,
              Method: value,
            });
          }}
        />
      )}
    </>
  );
}
