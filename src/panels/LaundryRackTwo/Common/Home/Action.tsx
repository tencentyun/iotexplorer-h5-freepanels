import React, { useState } from 'react';
import { Icon } from '@custom/Icon';
export const Action = ({
  deviceData: { control, power_switch },
  doControlDeviceData,
}) => {
  // const isStop =  control && (control === 'up'  || control === 'down');
  const actions = [
    [
      '上升',
      'up',
      () => doControlDeviceData({ control: control === 'up' ? 'stop' : 'up' }),
      control === 'up',
    ],
    [
      power_switch  ?  '暂停' : '开始',
      power_switch ? 'stop' : 'start',
      () => doControlDeviceData({ power_switch: power_switch === 1 ? 0 : 1 }),
      !!power_switch,
    ],
    [
      '下降',
      'down',
      () => doControlDeviceData({ control: control === 'down' ? 'stop' : 'down' }),
      control === 'down',
    ],
  ];

  return (
    <div>
      <div className={'action'}>
        {actions.map(([label, name, onClick, isChecked], index) => (
          <div
            key={index}
            onClick={onClick}
            className={`action-item  ${
              isChecked ? 'checked' : ''
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
