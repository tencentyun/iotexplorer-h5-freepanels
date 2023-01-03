import React from 'react';
import { Icon } from '@custom/Icon';

export const Action = ({
  deviceData: { power_switch, mode },
  doControlDeviceData,
  myRef,
}) => {

  const actions = [
    [
      mode === 0 ? '暂停' : '开启',
      mode === 0 ? 'stop' : 'open',
      () => {
        if (!power_switch) {
          return;
        }
        doControlDeviceData({ mode: mode === 0 ? 2 : 0 });
        myRef.current.close();
        setTimeout(() => { myRef.current.open() }, 500)
      },
      '',
    ],
    [
      '开关',
      'begin',
      () => {
        // 暂停再次点击则开启 开启状态则暂停
        doControlDeviceData({ power_switch: Number(!power_switch), mode: 2 });
        myRef.current.close();
      },
    ],
    [
      mode === 1 ? '暂停' : '关闭',
      mode === 1 ? 'stop' : 'close',
      () => {
        if (!power_switch) {
          return;
        }
        doControlDeviceData({ mode: mode === 1 ? 2 : 1 });
        myRef.current.close();
        setTimeout(() => { myRef.current.open() }, 500)
      },
     '',
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
