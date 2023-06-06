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
  const infoList = [[deviceData?.today_ec?.ec || '-', '（度）', '今日用电', () => push('/powerchart')], [deviceData?.current_power || '-', '（W）', '当前功率', () => push('/ecchart')]];
  return (
    <div className={`detail action action-${switchNum}`}>
      <div className="environment">
        <div className='info'>
          {infoList.map(([value, unit, desc, click], index) => (
            <div className="item" key={index} onClick={click}>
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
          <Cell title="开关名称" prefixIcon={<Icon name="editor-other" />} onClick={() => push('/switch', {})} />
        </div>
      </div>
    </div>
  );
};
