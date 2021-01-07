import React, { useState, useContext } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useHistory } from 'react-router-dom';
import { RawBtn } from '@components/Btn/Btn';
import { useAsyncFetch } from '@src/hooks/useAsyncFetch';
import { StatusTip } from '@components/StatusTip';
import { ScrollView } from '@components/ScrollView';
import { Switch } from '@components/Switch';
import * as icons from '../../icons';
import * as models from '../../models';
import { LocatorPanelContext } from '../../LocatorPanelContext';
import { DeviceFenceInfo, AlertConditionType, AlertMethodType } from '../../types';

import './FenceTab.less';

function FenceItem({
  data,
  goEditFence,
  onStatusChange,
}: {
  data: DeviceFenceInfo;
  goEditFence: (data: DeviceFenceInfo) => void;
  onStatusChange: (enabled: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(data.FenceEnable);
  const [submitting, setSubmitting] = useState(false);
  const onFenceEnableChange = async (enabled: boolean) => {
    setSubmitting(true);
    sdk.tips.showLoading('围栏修改中');
    try {
      await models.modifyFenceStatus({
        ProductId: sdk.productId,
        DeviceName: sdk.deviceName,
        FenceId: data.FenceId,
        AlertCondition: data.AlertCondition,
        FenceEnable: enabled,
        Method: data.Method,
      });
      sdk.tips.showSuccess('围栏修改成功');
      setEnabled(enabled);
      onStatusChange(enabled);
    } catch (err) {
      sdk.tips.showError(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RawBtn
      className="locator-fence-list-item"
      onClick={() => {
        goEditFence(data);
      }}
    >
      <div className="fence-icon">
        {Boolean(sdk.userInfo && sdk.userInfo.Avatar) && (
          <img src={sdk.userInfo.Avatar} className="fence-icon-img" />
        )}
      </div>

      <div className="fence-info">
        <div className="fence-name">{data.FenceName}</div>
        <div className="fence-address">{data.FenceDesc}</div>
      </div>

      <div className="fence-switch" onClick={(evt) => { evt.stopPropagation(); }}>
        <Switch
          checked={enabled}
          onChange={(checked) => {
            if (!submitting) {
              onFenceEnableChange(checked);
            }
          }}
        />
      </div>
    </RawBtn>
  );
}

export function FenceTab() {
  const { fenceList, getFenceList, modifyFenceStatus } = useContext(LocatorPanelContext);

  const [listState, { statusTip }] = useAsyncFetch({
    initData: [],
    statusTipOpts: {
      emptyAddBtnText: '添加',
      emptyMessage: '暂无围栏',
      emptyType: 'empty-add',
    },
    fetch: async ({ reload = false } = {}) => {
      if (!reload && fenceList) {
        return fenceList;
      }

      return await getFenceList();
    },
  });

  const history = useHistory();
  const goAddFence = () => {
    history.push({
      pathname: '/map/fence',
      state: {
        data: {
          fence: {
            FenceId: 0,
            FenceName: '',
            FenceDesc: '',
            FenceArea: null,
            AlertCondition: AlertConditionType.In,
            FenceEnable: true,
            Method: AlertMethodType.Push,
            CreateTime: 0,
            UpdateTime: 0,
          },
        },
      },
    });
  };

  const goEditFence = (data) => {
    history.push({
      pathname: '/map/fence',
      state: {
        data: { fence: data },
      }
    });
  };

  const onStatusChange = (fenceId, enabled) => {
    modifyFenceStatus({
      fenceId,
      fenceEnable: enabled,
    });
  };

  return (
    <div className="locator-tab locator-fence-tab">
      {statusTip ? (
        <StatusTip
          {...statusTip}
          fillContainer={statusTip.status !== 'loading'}
          onAdd={goAddFence}
        />
      ) : (
          <ScrollView
            className="locator-fence-list-container"
          >
            <div className="locator-fence-list">
              <div className="locator-fence-list-header clearfix">
                <span className="locator-fence-list-title">围栏列表</span>
                <RawBtn className="locator-fence-list-add-btn" onClick={() => { goAddFence(); }}>
                  <img src={icons.iconAddBtn} className="locator-fence-list-add-btn-icon" />
                </RawBtn>
              </div>
              {listState.data.map((data) => (
                <FenceItem
                  data={data}
                  key={data.FenceId}
                  onStatusChange={(enabled) => {
                    onStatusChange(data.FenceId, enabled);
                  }}
                  goEditFence={goEditFence}
                />
              ))}
            </div>
          </ScrollView>
        )}
    </div>
  );
}
