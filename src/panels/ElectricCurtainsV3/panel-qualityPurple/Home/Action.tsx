import React, { useState } from 'react';
import { Icon } from '@custom/Icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions } from '@utils';
import { Cell } from '@custom/Cell';

export const Action = ({
  deviceData: { power_switch, mode },
  history: { PATH, push },
  doControlDeviceData,
  myRef,
}) => {

  const actions = [
    [
      '定时',
      'time',
      () => {
        push(PATH.TIMER_LIST, { isModule: true })
      }
    ],
    [
      '开启',
      'open',
      () => {
        doControlDeviceData({ mode: 0 });
        myRef.current.close();
        setTimeout(() => { myRef.current.open() }, 500)
      },
      mode === 0,
    ],
    // [
    //   control === 'open' ? '暂停' : '开始',
    //   control === 'open' ? 'stop' : 'begin',
    //   () => {
    //     // 暂停再次点击则开启 开启状态则暂停
    //     doControlDeviceData({ control: control === 'open' ? 'pause' : 'open' });
    //     sdk.deviceData.control = control === 'open' ? 'pause' : 'open';
    //     control === 'open' ? myRef.current.pause() : myRef.current.open();
    //   },
    // ],
    [
      '关闭',
      'close',
      () => {
        doControlDeviceData({ mode: 1 });
        myRef.current.close();
        setTimeout(() => { myRef.current.open() }, 500)
      },
      mode === 1,
    ],
  ];

  return (
    <div>
      <div className={'action'}>
        {actions.map(([label, name, onClick, isChecked], index) => (
          <div
            key={index}
            onClick={() => !isChecked && onClick(0)}
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

    </div>
  );
};
