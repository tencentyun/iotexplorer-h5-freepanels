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
import { Circle } from './TMapV2';
import { AlertMethodTypeStr, AlertConditionTypeStr, DeviceFenceInfo } from '../../types';
import { convertGCJ02ToWGS84, convertWGS84ToGCJ02, generateCircleFenceArea, rgba } from '../../utils';

import './FenceInfoModal.less';

const radiusLimit = {
  min: 10,
  max: 5000,
};

const alertConditionOptions = Object.keys(AlertConditionTypeStr).map(key => ({
  text: AlertConditionTypeStr[key],
  value: key,
}));

const alertMethodOptions = Object.keys(AlertMethodTypeStr).map(key => ({
  text: AlertMethodTypeStr[key],
  value: key,
}));

const fenceCircleFillColor = rgba(7, 93, 231, 0.25);

const fitFencePadding = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

const getPercent = (value: number, min: number, max: number) => ((value - min) / (max - min)) * 100;

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

interface InputFieldModalProps {
  visible: boolean;
  title: string;
  defaultValue: string;
  placeholder?: string;
  message: React.ReactNode;
  onSubmit: (value: string) => void;
  onClose: () => void;
  onValidate: (value: string) => boolean;
}

function InputFieldModal({
  visible,
  title,
  defaultValue,
  placeholder,
  message,
  onSubmit,
  onClose,
  onValidate,
}: InputFieldModalProps) {
  const [value, setValue] = useState(defaultValue);

  const onConfirm = () => {
    if (!onValidate || onValidate(value)) {
      onSubmit(value);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      fixedBottom
      onClose={onClose}
      title={title}
      containerClassName="locator-panel-input-modal"
    >
      <Modal.Body>
        <input
          className="locator-panel-input-modal-field"
          value={value}
          placeholder={placeholder}
          type="text"
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <div
          className="locator-panel-input-modal-message"
        >{message}</div>
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
  editingFenceInfo,
}) {
  const history = useHistory();
  const { getUserLocation, resetFenceList } = useContext(LocatorPanelContext);
  const fenceInfo = editingFenceInfo as DeviceFenceInfo;
  const firstRunRef = useRef(true);
  const blockCenterChangeRef = useRef(false);
  const [submitting, setSubmitting] = useState(false);

  const [radius, setRadius] = useState(() => {
    if (fenceInfo
      && fenceInfo.FenceArea
      && fenceInfo.FenceArea.features[0].properties
      && fenceInfo.FenceArea.features[0].properties.radius) {
      return fenceInfo.FenceArea.features[0].properties.radius;
    }
    return 500;
  });

  // 围栏中心
  const [center, setCenter] = useState(() => {
    if (fenceInfo
      && fenceInfo.FenceArea
      && Array.isArray(fenceInfo.FenceArea.features[0].geometry.coordinates)
      && fenceInfo.FenceArea.features[0].geometry.coordinates.length === 2) {
      // 编辑围栏
      const [lng, lat] = convertWGS84ToGCJ02([
        fenceInfo.FenceArea.features[0].geometry.coordinates[0],
        fenceInfo.FenceArea.features[0].geometry.coordinates[1],
      ]);

      map.setCenter(new qqMaps.LatLng(lat, lng));
      return { lat, lng };
    }
    // 新建围栏，围栏中心默认为用户当前位置，需要异步拉取

    // 尝试定位用户位置
    getUserLocation().then((latLng) => {
      setCenter(latLng);
      map.setCenter(new qqMaps.LatLng(latLng.lat, latLng.lng));
    })
      .catch((err) => {
      // 定位失败 fallback
      // 使用地图当前位置作为围栏中心
        setCenter(center => center || map.getCenter());
        console.error('getUserLocation fail', err);
      });

    return null;
  });

  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [fenceName, setFenceName] = useState(fenceInfo.FenceName);

  const [alertConditionModalVisible, setAlertConditionModalVisible] = useState(false);
  const [fenceAlertCondition, setFenceAlertCondition] = useState(fenceInfo.AlertCondition);

  const [alertMethodModalVisible, setAlertMethodModalVisible] = useState(false);
  const [fenceAlertMethod, setFenceAlertMethod] = useState(fenceInfo.Method);

  // 拉取围栏中心对应的地址
  const [addressState] = useAsyncFetch({
    initData: '',
    fetch: async () => {
      const location = center || map.getCenter();
      const data = await getAddressByLatLng({ lat: location.lat, lng: location.lng });
      return data.address;
    },
    ignoreEmpty: true,
  }, [center]);

  const getAddressText = () => {
    if (addressState.loading) {
      return '获取地址中';
    }

    if (addressState.hasError || !addressState.data) {
      return '获取地址失败';
    }

    return addressState.data;
  };

  useEffect(() => {
    // 地图事件监听
    const listeners: Array<unknown> = [
      qqMaps.event.addListener(map, 'center_changed', () => {
        if (blockCenterChangeRef.current)  {
          // 避免 center_changed 死循环
          return;
        }

        const newCenter = map.getCenter();
        const newCenterLatLng = { lat: newCenter.lat, lng: newCenter.lng };
        setCenter(newCenterLatLng);
      }),
    ];

    return () => {
      listeners.forEach(qqMaps.event.removeListener);
    };
  }, []);

  const onSubmit = async () => {
    if (submitting || !center) {
      return;
    }

    const centerWgs84 = convertGCJ02ToWGS84([center.lng, center.lat]);

    const newFenceInfo = {
      ...(fenceInfo as DeviceFenceInfo),
      FenceArea: generateCircleFenceArea({
        lng: centerWgs84[0],
        lat: centerWgs84[1],
      }, radius),
      FenceName: fenceName,
      AlertCondition: fenceAlertCondition,
      Method: fenceAlertMethod,
    };

    if (!newFenceInfo.FenceName) {
      sdk.tips.showError('请填写区域名称');
      return;
    }

    if (sdk.isMock) {
      sdk.tips.showInfo('虚拟设备不支持创建或修改围栏');
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

      resetFenceList();
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
                  left: `${getPercent(radius, radiusLimit.min, radiusLimit.max)}%`,
                }}
              >
                {radius}
              </div>
            </div>
            <div className="slider-bar-container">
              <Slider
                tooltip={false}
                min={radiusLimit.min}
                max={radiusLimit.max}
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
              onClick={() => {
                setNameModalVisible(true);
              }}
            >
              {fenceName || '点击输入'}
            </SectionList.Item>
            <SectionList.Item
              label="触发报警"
              onClick={() => {
                setAlertConditionModalVisible(true);
              }}
              clickable={true}
            >
              {AlertConditionTypeStr[fenceAlertCondition] || '点击选择'}
            </SectionList.Item>
            <SectionList.Item
              label="通知方式"
              onClick={() => {
                setAlertMethodModalVisible(true);
              }}
              clickable={true}
              hideBorderBottom={false}
            >
              {AlertMethodTypeStr[fenceAlertMethod] || '点击选择'}
            </SectionList.Item>
          </SectionList>
        </div>
        <div className="locator-fence-info-modal-btn-group">
          <ConfirmBtnGroup
            confirmText="保存"
            onConfirm={() => {
              onSubmit();
            }}
            cancelText="取消"
            onCancel={() => {
              history.go(-1);
            }}
          />
        </div>
      </div>
      {center && (<Circle
        map={map}
        qqMaps={qqMaps}
        center={center}
        radius={radius}
        strokeWeight={0}
        fillColor={fenceCircleFillColor}
        onBoundsChange={(bounds) => {
          blockCenterChangeRef.current = true;
          if (firstRunRef.current) {
            // 延迟，避免地图 resize 时宽高取值不正确导致 fitBounds 将地图缩放至最小
            firstRunRef.current = false;
            setTimeout(() => {
              map.fitBounds(bounds, fitFencePadding);
            }, 100);
          } else {
            map.fitBounds(bounds, fitFencePadding);
          }
          blockCenterChangeRef.current = false;
        }}
      />)}
      {nameModalVisible && (
        <InputFieldModal
          visible
          onClose={() => {
            setNameModalVisible(false);
          }}
          defaultValue={fenceName}
          title="区域名称"
          placeholder="请输入区域名称"
          message="支持中文、英文、数字、下划线的组合，最多不超过10个字符"
          onValidate={(value) => {
            if (!value) {
              sdk.tips.showError('请输入区域名称');
            } else if (value.length > 10) {
              sdk.tips.showError('区域名称最多不超过10个字符');
            } else if (!/^[\u4E00-\u9FA5A-Za-z0-9_]{1,10}$/i.test(value)) {
              sdk.tips.showError('区域名称仅支持中文、英文、数字、下划线的组合');
            } else {
              return true;
            }
            return false;
          }}
          onSubmit={(value) => {
            setFenceName(value);
          }}
        />
      )}
      {alertConditionModalVisible && (
        <CheckBoxGroupModal
          visible
          onClose={() => {
            setAlertConditionModalVisible(false);
          }}
          value={fenceAlertCondition}
          options={alertConditionOptions}
          title="触发报警"
          onSubmit={(value) => {
            setFenceAlertCondition(value);
          }}
        />
      )}
      {alertMethodModalVisible && (
        <CheckBoxGroupModal
          visible
          onClose={() => {
            setAlertMethodModalVisible(false);
          }}
          value={fenceAlertMethod}
          options={alertMethodOptions}
          title="通知方式"
          onSubmit={(value) => {
            setFenceAlertMethod(value);
          }}
        />
      )}
    </>
  );
}
