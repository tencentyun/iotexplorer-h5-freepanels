import React, { useState } from 'react';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';
import { getOptions } from '@utils';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';

const colorList = ['#F9D276', '#FCF0D2', '#FEFFFF', '#BDD0FA'];

export function Home(props) {
  const {
    templateMap,
    deviceData,
    doControlDeviceData,
  } = props;
  let { color_mode = 1, power_switch, color_temp = 2700, brightness = 50 } = deviceData;
  const [showCountDown, setShowCountDown] = useState(false);
  const [countDown, setCountDown] = useState('00:00:00');

  const onChange = (attr, operator) => {
    let value = !deviceData[attr] ? 0 : parseInt(deviceData[attr]);
    let { max, step, min } = templateMap[attr].define;
    min = !min ? 0 : parseInt(min);
    max = !max ? 100 : parseInt(max);
    step = !step ? 1 : parseInt(step);
    if (operator === '+') {
      value = value + step;
    } else {
      value = value - step;
    }
    value = value <= min ? min : (value >= max ? max : value);
    if (attr === 'color_temp') {
      if (value >= 2700 && value <= 3500) {
        doControlDeviceData({ color_mode: 1 })
      } else if (value > 3500 && value <= 4500) {
        doControlDeviceData({ color_mode: 2 })
      } else if (value > 4500 && value <= 6000) {
        doControlDeviceData({ color_mode: 3 })
      } else if (value > 6000) {
        doControlDeviceData({ color_mode: 4 })
      }
    }
    doControlDeviceData(attr, value);
  }

  return (
    <div className={`home ${!deviceData.power_switch ? 'is-off' : ''}`}>
      <div className='custom-mask'></div>
      <DeviceDetail></DeviceDetail>
      <div className='content-bottom'>
        <div className={classNames("change-panel")}>
          <div className={classNames('light-panel', `mode-${color_mode}`)}>
            <Icon name={`light-${color_mode}`} />
          </div>
          <div className="mode-title color-temp">
            <span>色温</span>
            <span>{color_temp}K</span>
          </div>
          <div className="mode-title brightness">
            <span>亮度</span>
            <span>{brightness}%</span>
          </div>
          <div className="btn-switch" onClick={() => { doControlDeviceData({ power_switch: power_switch ? 0 : 1 }); }}>
            <Icon name={`switch`} />
          </div>
          {showCountDown && <div className="count-down">
            <span>倒计时：</span>
            <span>{countDown}</span>
          </div>}
          <div className="mode-list">
            {getOptions(templateMap, 'color_mode').map(({ label, value }, index) => (
              <div
                key={index}
                className="mode-item"
                onClick={() => doControlDeviceData('color_mode', parseInt(value))}>
                <div className="item-color" style={{ background: `${colorList[index]}` }}></div>
                <div className="title">{label}</div>
              </div>
            ))}
          </div>
          <div className="operator-list">
            <div className="operator-item">
              <div className="title">冷暖调节</div>
              <div className="btn-list">
                <div className="operator-btn" onClick={() => onChange('color_temp', '+')}>
                  <Icon name="plus"></Icon>
                </div>
                <div className="operator-btn" onClick={() => onChange('color_temp', '-')}>
                  <Icon name="minus"></Icon>
                </div>
              </div>
            </div>
            <div className="operator-item">
              <div className="title">亮度调节</div>
              <div className="btn-list hoz">
                <div className="operator-btn" onClick={() => onChange('brightness', '-')}>
                  <Icon name="minus-hoz"></Icon>
                </div>
                <div className="operator-btn" onClick={() => onChange('brightness', '+')}>
                  <Icon name="plus-hoz"></Icon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Action {...props} setCountDown={(value) => {
          if (value) {
            const hour = `${Math.floor(value / 3600)}`;
            const minute = `${Math.floor((value % 3600) / 60)}`;
            const second = `${Math.floor((value % 3600) % 60)}`;
            setCountDown(`${hour >= 10 ? hour : '0' + hour}:${minute >= 10 ? minute : '0' + minute}:${second >= 10 ? second : '0' + second}`)
          }
          setShowCountDown(true);
        }}></Action>
      </div>
    </div>
  );
}
