import React, { useRef, useState } from 'react';
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
  const { color_mode = 1 } = deviceData;
  const hozRef = useRef(null);
  const verRef = useRef(null);

  const [field, setField] = useState({});

  const onTouchMove = (direction, attr, ref, e) => {
    const wrap = ref.current;
    const { clientX, clientY } = e.changedTouches[0];
    const { height, width } = wrap.getBoundingClientRect();
    const offsetX = (clientX >= width ? width : (clientX <= 0 ? 0 : clientX)) * (1000 / width);
    const offsetY = (clientY >= height ? height : (clientY <= 0 ? 0 : clientY)) * (100 / height);
    const value = parseInt(direction === 'x' ? offsetX : offsetY);
    // const offsetValue = (!deviceData[attr] ? 0 : parseInt(deviceData[attr])) + value;
    const max = direction === 'x' ? 1000 : 100;
    setField({
      [attr]: value >= max ? max : (value <= 0 ? 0 : value)
    })
  }

  const onTouchEnd = (e) => {

    doControlDeviceData({ ...field });
  }

  return (
    <div className={`home ${!deviceData.power_switch ? 'is-off' : ''}`}>
      <DeviceDetail></DeviceDetail>
      <div className='content-bottom'>
        <div className={classNames("change-panel")}>
          <div className={classNames('touch-panel', `mode-${color_mode}`)}>
            <div className="touch-item" onTouchMove={(e) => { onTouchMove('x', 'color_temp', hozRef, e) }} onTouchEnd={onTouchEnd} ref={hozRef}>
              <Icon name={`gesture-hoz-${parseInt(color_mode) < 3 ? 'blank' : 'white'}`} />
              <div className="title">冷暖调节</div>
            </div>
            <div className="split-line"></div>
            <div className="touch-item" onTouchMove={(e) => { onTouchMove('y', 'brightness', verRef, e) }} onTouchEnd={onTouchEnd} ref={verRef}>
              <Icon name={`gesture-ver-${parseInt(color_mode) < 3 ? 'blank' : 'white'}`} />
              <div className="title">亮度调节</div>
            </div>
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
        </div>
        <Action {...props}></Action>
      </div>
    </div>
  );
}
