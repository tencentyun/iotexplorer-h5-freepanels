import React, { useState, useContext } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useHistory } from 'react-router-dom';
import { RawBtn } from '@components/Btn/Btn';
import { useInfiniteList } from '@hooks/useInfiniteList';
import { StatusTip } from '@components/StatusTip';
import { ScrollView } from '@components/ScrollView';
import { Switch } from '@components/Switch';
import * as icons from '../../icons';
import * as models from '../../models';
import { LocatorPanelContext } from '../../LocatorPanelContext';
import { DeviceFenceInfo, AlertConditionType, AlertMethodType } from '../../types';

import './FenceTab.less';
import { useAsyncFetch } from '@src/hooks/useAsyncFetch';

function FenceItem({
  data,
  goEditFence,
}: {
  data: DeviceFenceInfo;
  goEditFence: (data: DeviceFenceInfo) => void;
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
        <img src={sdk.userInfo.Avatar} className="fence-icon-img" />
      </div>

      <div className="fence-info">
        <div className="fence-name">{data.FenceName}</div>
        <div className="fence-address">{data.FenceDesc}</div>
      </div>

      <div className="fence-switch">
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
  const { setEditingFenceInfo, fenceList, getFenceList } = useContext(LocatorPanelContext);
  
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
    setEditingFenceInfo({
      FenceId: 0,
      FenceName: '',
      FenceDesc: '',
      FenceArea: null,
      AlertCondition: AlertConditionType.In,
      FenceEnable: true,
      Method: AlertMethodType.Push,
      CreateTime: 0,
      UpdateTime: 0,
    });
    history.push('/map/fence');
  };

  const goEditFence = (data) => {
    setEditingFenceInfo(data);
    history.push('/map/fence');
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
                <FenceItem data={data} key={data.FenceId} goEditFence={goEditFence} />
              ))}
            </div>
          </ScrollView>
        )}
    </div>
  );
}
