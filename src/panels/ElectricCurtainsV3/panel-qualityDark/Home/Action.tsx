import React from 'react';
import { Cell } from '@custom/Cell';

export const Action = ({
  deviceData: { power_switch, mode },
  history: { PATH, push },
  doControlDeviceData,
  myRef,
}) => {

  const actions = [
    [
      '打开',
      '模式',
      () => {
        doControlDeviceData({ mode: 0 });
        myRef.current.close();
        setTimeout(() => { myRef.current.open() }, 500)
      },
      mode === 0,
    ],
    [
      // mode === 2 ? '暂停' : '开始',
      '暂停',
      '模式',
      () => {
        // 暂停再次点击则开启 开启状态则暂停
        doControlDeviceData({ mode: 2 });
        myRef.current.pause();
      },
      mode === 2
    ],
    [
      '关闭',
      '模式',
      () => {
        doControlDeviceData({ mode: 1 });
        myRef.current.close();
        setTimeout(() => { myRef.current.open() }, 500)
      },
      mode === 1,
    ],
    [
      '定时',
      '时间',
      () => {
        push(PATH.TIMER_LIST, { isModule: true })
      }
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
            {index !== actions.length - 1 ? <div className={`action-ele action-ele-${index}`}>
              {/* <Icon name={isChecked ? `${name}-checked` : name} /> */}
              <div>{name}</div>
              <div>{label}</div>
            </div> : <Cell className="count-down" title={label} isLink={true} onClick={() => onClick(0)}><div className="subTitle">{name}</div></Cell>}
          </div>
        ))}
      </div>
    </div>
  );
};
