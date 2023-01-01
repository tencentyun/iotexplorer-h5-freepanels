import React from 'react';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';
import { getOptions } from '@utils';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';

const colorList = ['#FEFFFF', '#FCF0D2', '#BDD0FA', '#F9D276'];

export function Home(props) {
  const {
    templateMap,
    deviceData,
    doControlDeviceData,
  } = props;
  let { color_mode = 1 } = deviceData;

  const onChange = (attr, operator) => {
    let value = !deviceData[attr] ? 0 : parseInt(deviceData[attr]);
    let { max, step } = templateMap[attr].define;
    max = !max ? 0 : parseInt(max);
    step = !step ? 0 : parseInt(step);
    if (operator === '+') {
      value = value + step;
    } else {
      value = value - step;
    }
    value = value <= 0 ? 0 : (value >= max ? max : value);
    doControlDeviceData(attr, value);
  }

  return (
    <div className={`home ${!deviceData.power_switch ? 'is-off' : ''}`}>
      <DeviceDetail></DeviceDetail>
      <div className='content-bottom'>
        <div className={classNames("change-panel")}>
          <div className={classNames('light-panel', `mode-${color_mode}`)}>
            <Icon name={`light-${color_mode}`} />
          </div>

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
        <Action {...props}></Action>
      </div>
    </div>
  );
}
