import React, { useState } from 'react';
import { Icon } from '@custom/Icon';
import { Btn } from '@custom/Btn';
import { Cell } from '@custom/Cell';

export const Detail = ({
  deviceData,
  doControlDeviceData,
  context: { switchNum },
  currentSwitch,
  history: { PATH, push },
  timerHeight,
  isModal,
  isPopUp
}) => {

  // push.bind(null, PATH.TIMER_LIST, {}),

  console.log(push);

  const infoList = [[6, '（度）', '今日用电'], [34, '（度）', '当月电量'], [230, '（W）', '实时功率']];

  return (
    <div className={`detail action action-${switchNum}`}>
      <div className="environment">
        <div className="device-info">
          <Cell title="设备已离线" prefixIcon={<Icon name="error" />} />
        </div>
        <div className='info'>
          {infoList.map(([value, unit, desc], index) => (
            <div className="item" key={index}>
              <div className="detail">
                <div className="title">
                  <span className="value">{value}</span>
                  {/* <span className="unit">{unit}</span> */}
                </div>
                <div className="desc">{desc}{unit}</div>
              </div>
            </div>))}
        </div>
        <div className="device-info">
          <Cell title="开关配置" prefixIcon={<Icon name="error" />} onClick={() => push('/config', {})} />
        </div>
      </div>
    </div>
  );
};
