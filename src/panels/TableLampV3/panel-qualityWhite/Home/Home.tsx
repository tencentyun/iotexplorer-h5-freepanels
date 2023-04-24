import React, { useRef, useState } from 'react';
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




  const { brightness = 100, color_temp = 2700 } = deviceData;

  const [color_mode, setcolorMode] = useState(deviceData.color_mode || 1);

  const hozRef = useRef(null);
  const verRef = useRef(null);

  const [field, setField] = useState({ brightness, color_temp,attr:'color_temp' });
  const [showCountDown, setShowCountDown] = useState(false);
  const [countDown, setCountDown] = useState('00:00:00');


  const onTouchMove = (direction, attr, ref, e) => {
    const wrap = ref.current;
    const { clientX, clientY } = e.changedTouches[0];
    const { height, width } = wrap.getBoundingClientRect();
    const offsetX = (clientX >= width ? width : (clientX <= 0 ? 0 : clientX)) * (6500 / width);
    const offsetY = (clientY >= height ? height : (clientY <= 0 ? 0 : clientY)) * (100 / height);
    let value = parseInt(direction === 'x' ? offsetX : (100 - offsetY));
    // const offsetValue = (!deviceData[attr] ? 0 : parseInt(deviceData[attr])) + value;
    const min = direction === 'x' ? 2700 : 1;
    const max = direction === 'x' ? 6500 : 100;
    // 处理value固定值

    if (direction === 'x') {
      if (value > 2700 && value <= 3400) {
        value = 3400;
      } else if (value > 3400 && value <= 4000) {
        value = 4000;
      } else if (value > 4000 && value <= 4600) {
        value = 4600;
      } else if (value > 4600 && value <= 5200) {
        value = 5200;
      } else if (value > 5200 && value <= 5800) {
        value = 5800;
      }
      else if (value > 5800 && value <= 6500) {
        value = 6500;
      }
    }


    if (direction === 'x') {
      if (value >= 2700 && value <= 3400) {
        setcolorMode(1)
      } else if (value > 3400 && value <= 4500) {
        setcolorMode(2)
      } else if (value > 4500 && value <= 6000) {
        setcolorMode(3)
      } else if (value > 6000) {
        setcolorMode(4)
      }
    }

    
    setField({
      ...field,
      attr,
      [attr]: value >= max ? max : (value <= min ? min : value)
    })
  }

  const onTouchEnd = () => {
    doControlDeviceData({ [field.attr]: field[field.attr] });
  }


  return (
    <div className={`home ${!deviceData.power_switch ? 'is-off' : ''}`}>
      <div className="custom-mask"></div>
      <DeviceDetail></DeviceDetail>
      <div className='content-bottom'>
        <div className={classNames("change-panel")}>
          <div className={classNames('touch-panel', `mode-${color_mode}`)} style={{ opacity: parseInt(field.brightness, 10) / 100, zIndex: 1, position: 'relative' }}></div>
          <div className={classNames('touch-panel', `mode-${color_mode}`)} style={{ zIndex: 2, background: 'transparent', position: 'absolute', top: 0 }}>
            <div className="touch-item" onTouchMove={(e) => { onTouchMove('x', 'color_temp', hozRef, e) }} onTouchEnd={onTouchEnd} ref={hozRef}>
              <Icon name={`gesture-hoz-${parseInt(color_mode) === 1 || parseInt(color_mode) === 3 ? 'blank' : 'white'}`} />
              <div className="title">冷暖调节</div>
              <div className="title">色温：{field.color_temp}K</div>
            </div>
            <div className="split-line"></div>
            <div className="touch-item" onTouchMove={(e) => { onTouchMove('y', 'brightness', verRef, e) }} onTouchEnd={onTouchEnd} ref={verRef}>
              <Icon name={`gesture-ver-${parseInt(color_mode) === 1 || parseInt(color_mode) === 3 ? 'blank' : 'white'}`} />
              <div className="title">亮度调节</div>
              <div className="title">亮度：{field.brightness}%</div>
            </div>
            {showCountDown && <div className="count-down">
              <span>倒计时：</span>
              <span>{countDown}</span>
            </div>}
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
