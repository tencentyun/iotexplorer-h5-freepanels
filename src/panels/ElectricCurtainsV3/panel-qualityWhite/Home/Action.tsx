import React from 'react';
import { Icon } from '@custom/Icon';

export const Action = ({
  deviceData: {  power_switch, mode  },
  doControlDeviceData,
  myRef,
}) => {

  const actions = [
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
    [
      '暂停',
      'stop',
      () => {
        // 暂停再次点击则开启 开启状态则暂停
        doControlDeviceData({ mode: 2 });
        myRef.current.pause();
      },
    ],
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
