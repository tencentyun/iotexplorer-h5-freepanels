import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Block } from '@components/layout';
import { Cell } from '@components/base';
import './setting.less';
import { useHistory } from 'react-router-dom';
import { onControlDevice, useDeviceData } from '@hooks/useDeviceData';
import { ListPicker } from '@components/business';

export function Setting() {
  const [state] = useDeviceData(sdk);
  const deviceData = state.deviceData || {};
  const history = useHistory();
  const [isShowElectrifyVisible, setIsShowElectrify] = useState(false);
  const onClick = (path: string) => {
    onControlDevice('activeKey', 'setting');
    history.push(path);
  };
  const electrify = (val: string) => {
    switch (val) {
      case 'off':
        return '断电';
      case 'on':
        return '通电';
      case 'memory':
        return '保持断电前状态';
      default:
        return '';
    }
  };
  return (
    <main className="setting-view">
      {/* 底部 */}
      <Block className="setting-footer">
        <Cell
          title="开关日志"
          valueStyle={'gray'}
          size="medium"
          onClick={() => onClick('/record')}
        />
        <Cell
          title="上电状态"
          value={sdk.deviceData.relay_status ? electrify(sdk.deviceData.relay_status) : ''}
          valueStyle={'gray'}
          size="medium"
          onClick={() => setIsShowElectrify(true)}
        >
          <ListPicker
            visible={isShowElectrifyVisible}
            title="上电状态"
            defaultValue={[deviceData.relay_status]}
            options={[
              {
                label: '断电',
                value: 'off',
              },
              {
                label: '通电',
                value: 'on',
              },
              {
                label: '保持断电前状态',
                value: 'memory',
              },
            ]}
            onCancel={() => setIsShowElectrify(false)}
            onConfirm={(value) => {
              onControlDevice('relay_status', value[0]);
              setIsShowElectrify(false);
            }}
          />
        </Cell>
      </Block>
    </main>
  );
}
