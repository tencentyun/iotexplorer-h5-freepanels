import React, { useState } from 'react';
import { Icon } from '@custom/Icon';
import { Btn } from '@custom/Btn';

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

  const infoList = [[230, 'W', '实时功率'], [6, '度', '当日电量'], [34, '度', '当月电量']];

  return (
    <div className={`detail action action-${switchNum}`}>
      <div className="environment">
        <div className='info'>
          {infoList.map(([value, unit, desc], index) => (
            <div className="item" key={index}>
              <div className="detail">
                <div className="title">
                  <span className="value">{value}</span>
                  <span className="unit">{unit}</span>
                </div>
                <div className="desc">{desc}</div>
              </div>
            </div>))}
        </div>
        <Btn className="btn-config" onClick={() => push('/config', {})}>开关配置</Btn>
      </div>
    </div>
  );
};
