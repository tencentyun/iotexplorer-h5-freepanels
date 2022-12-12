import React, { useState } from 'react';
import { Icon } from '@custom/Icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions } from '@utils';
import { Cell } from '@custom/Cell';

export const Action = ({
  templateMap,
  deviceData: { auto_power, control, control_back = 'forward', mode = 'morning' },
  history: { PATH, push },
  doControlDeviceData,
  myRef,
}) => {
  // 抓拍模式
  const [controlBackVisiable, setControlBackVisiable] = useState(false);
  const [modeVisiable, setModeVisiable] = useState(false);

  const actions = [
    [
      '开启',
      'open',
      () => {
        sdk.deviceData.auto_power = '1';
        doControlDeviceData({ auto_power: '1' });
      },
      auto_power === '1',
    ],
    [
      control === 'open' ? '暂停' : '开始',
      control === 'open' ? 'stop' : 'begin',
      () => {
        // 暂停再次点击则开启 开启状态则暂停
        doControlDeviceData({ control: control === 'open' ? 'pause' : 'open' });
        sdk.deviceData.control = control === 'open' ? 'pause' : 'open';
        control === 'open' ? myRef.current.pause() : myRef.current.open();
      },
    ],
    [
      '关闭',
      'close',
      () => {
        doControlDeviceData({ auto_power: '0' });
        sdk.deviceData.auto_power = '0';
      },
      auto_power === '0',
    ],
  ];

  return (
    <div>
      <div className={'action'}>
        {actions.map(([label, name, onClick, isChecked], index) => (
          <div
            key={index}
            onClick={() => onClick(0)}
            className={`action-item  ${isChecked ? 'checked' : ''
              } action-item-${index + 1}`}
          >
           <div className={`action-ele action-ele-${index}`}>
              <Icon name={isChecked ? `${name}-checked` : name} />
              <div>{label}</div>
            </div> 
          </div>
        ))}
      </div>
      <OptionDialog
        visible={controlBackVisiable}
        title="电机反向"
        defaultValue={[control_back]}
        options={getOptions(templateMap, 'control_back')}
        onCancel={() => {
          setControlBackVisiable(false);
        }}
        onConfirm={(value) => {
          doControlDeviceData('control_back', value[0]);
        }}
      ></OptionDialog>
      <OptionDialog
        visible={modeVisiable}
        title="电机反向"
        defaultValue={[mode]}
        options={getOptions(templateMap, 'mode')}
        onCancel={() => {
          setModeVisiable(false);
        }}
        onConfirm={(value) => {
          doControlDeviceData('mode', value[0]);
        }}
      ></OptionDialog>
    </div>
  );
};
