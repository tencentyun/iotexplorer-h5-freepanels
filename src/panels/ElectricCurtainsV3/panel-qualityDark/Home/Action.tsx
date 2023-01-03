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
      mode === 0 ? '暂停' : '打开',
      '模式',
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
      // mode === 2 ? '暂停' : '开始',
      !power_switch ? '开' : '关',
      '开关',
      () => {
        // 暂停再次点击则开启 开启状态则暂停
        doControlDeviceData({ power_switch: Number(!power_switch), mode: 2 });
        myRef.current.close();
      },
      ''
    ],
    [
      mode === 1 ? '暂停' : '关闭',
      '模式',
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
    [
      '定时',
      '时间',
      () => {
        if (!power_switch) {
          return;
        }
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
