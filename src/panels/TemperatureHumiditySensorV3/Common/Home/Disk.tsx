/*
 * @Description: 人体传感器-表盘
 */
import React, { useMemo } from 'react';
import {
  iconWaterDropBlue,
  iconWaterDropGreen,
  iconWaterDropYellow,
} from '@src/panels/TemperatureHumiditySensorV3/Common/Icon';

export interface DiskProps {
  deviceData: any;
  doControlDeviceData: any;
}

export function Disk({
  deviceData,
}: DiskProps) {
  const ststusInfo = useMemo(() => {
    const { current_humidity = 0, current_temp = 0 } = deviceData || {};
    let icon = iconWaterDropGreen;
    let text = '舒适';
    if (current_humidity >= 0 && current_humidity <= 32) {
      icon = iconWaterDropYellow;
      text = '干燥';
    }

    if (
      current_humidity >= 33
      && current_humidity <= 65
      && current_temp >= 21
      && current_temp <= 28
    ) {
      icon = iconWaterDropGreen;
      text = '舒适';
    }

    if (current_humidity >= 66 && current_humidity <= 99) {
      icon = iconWaterDropBlue;
      text = '潮湿';
    }

    console.log(text, 'icon=', icon);
    return { icon, text };
  }, [deviceData.current_humidity, deviceData.current_temp]);

  return (
    <div className='disk'>
      <div className='hoz'></div>
      <div className='ver'></div>
      <div className='center'>
        <div className='content'>
          <div className='item'>
            <div className='item-content'>
              <div className='number'>{deviceData?.current_temp || 0}</div>
              <div className='unit-1'>c</div>
            </div>
            <div className='title'>温度</div>
          </div>
          <div className='item'>
            <div className='item-content'>
              <div className='number'>{deviceData?.current_humidity || 0}</div>
              <div className='unit-2'>%</div>
            </div>
            <div className='title'>湿度</div>
          </div>
        </div>
        <div className='status-view'>
          <img className='status-view-icon' src={ststusInfo.icon} alt='' />
          <div className='status-view-text'>{ststusInfo.text}</div>
        </div>
      </div>
      {/* <div className="content-wrap">
        <div className="content">
          <Icon name="body"/>
        </div>
        <p className={classNames('status-desc', { 'status-active': deviceData.motionAlarm_state == 1 })}>
          {deviceData.motionAlarm_state == 1 ? '检测有人移动' : '检测正常'}
        </p>
      </div> */}
    </div>
  );
}
