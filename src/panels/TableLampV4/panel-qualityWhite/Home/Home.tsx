import React, { useEffect, useState } from 'react';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';
import { getOptions } from '@utils';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
import { Move } from '@custom/Move';

const colorList = ['#F9D276', '#FCF0D2', '#FEFFFF', '#BDD0FA'];

export function Home(props) {
  const {
    templateMap,
    deviceData,
    doControlDeviceData,
  } = props;

  const { brightness = 100, color_temp = 4000 } = deviceData;
  const [color_mode, setcolorMode] = useState(deviceData.color_mode || 1);
  const [field, setField] = useState({ brightness, color_temp, attr: 'color_temp' });
  const showCountDown = !!deviceData?.count_down && deviceData?.count_down != '0';
  // const setCountDown = () => {};

  const showCountDownLabel = (_value) => {
    if (!_value) return null;
    const value = parseInt(_value || 0, 16);
    if (value) {
      const hour = Math.floor(value / 3600);
      const minute = Math.floor((value % 3600) / 60);
      const second = Math.floor((value % 3600) % 60);
      return `${hour >= 10 ? hour : `0${hour}`}:${minute >= 10 ? minute : `0${minute}`}:${second >= 10 ? second : `0${second}`}`;
    }
    // return null;
  };

  useEffect(() => {
    setcolorMode(deviceData.color_mode);
  }, [deviceData.color_mode]);

  useEffect(() => {
    setField({ ...field, brightness, color_temp });
  }, [brightness, color_temp]);


  const [colorMin, colorMax] = [1, 100]; // 亮度
  const [tempMin, tempMax] = [2700, 6500]; // 色温

  const calcValue = (position, val, [min, max]) => {
    const value = Math.round(val + position.OffsetYPercent);
    const result = value >= max ? max : (value <= min ? min : value);
    return result;
  };

  // 设置色温对应的模式
  const setModel = (value) => {
    if (value >= 2700 && value <= 3400) {
      setcolorMode(1);
    } else if (value > 3400 && value <= 4500) {
      setcolorMode(2);
    } else if (value > 4500 && value <= 6000) {
      setcolorMode(3);
    } else if (value > 6000) {
      setcolorMode(4);
    }
  };
  // 分步值
  const stepValue = (val) => {
    let value = val;
    if (value > 2700 && value <= 3100) {
      value = 3100;
    } else if (value > 3100 && value <= 3550) {
      value = 3550;
    } else if (value > 3550 && value <= 4000) {
      value = 4000;
    } else if (value > 4000 && value <= 4400) {
      value = 4400;
    } else if (value > 4400 && value <= 4850) {
      value = 4850;
    } else if (value > 4850 && value <= 5250) {
      value = 5250;
    } else if (value > 5250 && value <= 5650) {
      value = 5650;
    } else if (value > 5650 && value <= 6100) {
      value = 6100;
    } else if (value > 6100 && value <= 6500) {
      value = 6500;
    }
    return value;
  };

  // 色温
  const onTempMove = (position) => {
    const val = stepValue(calcValue(position, color_temp, [tempMin, tempMax]));
    setModel(val);
    setField({ ...field, attr: 'color_temp', color_temp: val });
  };

  const onTempEnd = (position) => {
    const value = stepValue(calcValue(position, color_temp, [tempMin, tempMax]));
    setModel(value);
    doControlDeviceData({ color_temp: value });
  };

  // 改变当前显示的值
  const onColorModeMove = (position) => {
    const val = calcValue(position, brightness, [colorMin, colorMax]);
    setField({ ...field, attr: 'brightness', brightness: val });
  };

  // 存储值
  const onColorModeEnd = (position) => {
    const value = calcValue(position, brightness, [colorMin, colorMax]);
    doControlDeviceData({ brightness: value });
  };


  return (<div className={`home ${!deviceData.power_switch ? 'is-off' : ''}`}>
      <div className='custom-mask'></div>
      <DeviceDetail></DeviceDetail>
      <div className='content-bottom'>
        <div className={classNames('change-panel')}>
          <div className={classNames('touch-panel', `mode-${color_mode}`)}
               style={{ opacity: parseInt(field.brightness, 10) / 100, zIndex: 1, position: 'relative' }}></div>
          <div className={classNames('touch-panel', `mode-${color_mode}`)}
               style={{ zIndex: 2, background: 'transparent', position: 'absolute', top: 0 }}>
            <Move className='touch-item' key='color_temp' onMove={onTempMove} onEnd={onTempEnd} beginValue={tempMin}
                  endValue={tempMax}>
              <>
                <Icon
                  name={`gesture-ver-${parseInt(color_mode) === 1 || parseInt(color_mode) === 3 ? 'blank' : 'blank'}`} />
                <div className='title'>冷暖调节</div>
                <div className='title'>色温：{Math.round(field.color_temp || 0)}K</div>
              </>
            </Move>

            <div className='split-line'></div>
            <Move className='touch-item' key='brightness' onMove={onColorModeMove} onEnd={onColorModeEnd}
                  beginValue={colorMin} endValue={colorMax}>
              <>
                <Icon
                  name={`gesture-ver-${parseInt(color_mode) === 1 || parseInt(color_mode) === 3 ? 'blank' : 'blank'}`} />
                <div className='title'>亮度调节</div>
                <div className='title'>亮度：{Math.round(field.brightness || 0)}%</div>
              </>
            </Move>
            {showCountDown && <div className='count-down'>
              <span>倒计时：</span>
              <span>{showCountDownLabel(deviceData?.count_down)}</span>
            </div>}
          </div>
          <div className='mode-list'>
            {getOptions(templateMap, 'color_mode').map(({ label, value }, index) => (
              <div
                key={index}
                className='mode-item'
                onClick={() => {
                  deviceData?.power_switch && doControlDeviceData('color_mode', parseInt(value as string));
                }}>
                <div className='item-color' style={{ background: `${colorList[index]}` }}></div>
                <div className='title'>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <Action {...props} setCountDown={(value) => {
          if (value) {
            // const hour = `${Math.floor(value / 3600)}`;
            // const minute = `${Math.floor((value % 3600) / 60)}`;
            // const second = `${Math.floor((value % 3600) % 60)}`;
            // eslint-disable-next-line max-len
            // setCountDown(`${hour >= 10 ? hour : `0${hour}`}:${minute >= 10 ? minute : `0${minute}`}:${second >= 10 ? second : `0${second}`}`);
          }
        }}></Action>
      </div>
    </div>
  );
}
