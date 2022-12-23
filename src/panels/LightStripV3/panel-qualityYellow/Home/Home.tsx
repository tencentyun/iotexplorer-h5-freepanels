import React, { useState, useEffect }  from 'react';
import { Position } from '../../Common/Home/Position';
import LightBright from '../../Common/Home/LightBright';
import { ScenePage } from '../../Common/Home/Scene';
import Ticker from '../../Common/Home/Ticker';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';
import { Icon } from '@custom/Icon';
import { LightBright as ColorBright } from '@custom/LightBright';
import { getColorValue, getDegValue } from '@utils';
import { Switch } from '@custom/Switch'
import ColorPicker from '@custom/ColorPicker';

const classList = {
  0: 'colour',
  1: 'white',
  4: 'sence'
};

export function Home(props) {
  // tab模式
  const { deviceData , doControlDeviceData } = props;
  const colorMode = props.deviceData.colourMode === undefined ? 1 : props.deviceData.colourMode;    // 0 彩色  1 白光  4 场景
  const colour = deviceData?.colour;
  const isSwitchOff = props.deviceData.power_switch !== 1;
  const onSwitchChange = () => {
    props.doControlDeviceData({ power_switch: props.deviceData.power_switch ? 0 : 1 });
  };
  return (
    <div className={`home ${classList[colorMode]}`}>
      <DeviceDetail></DeviceDetail>
      <Ticker {...props} />
      <div className="colorMode">
        {colorMode !== 4
          ? <div className={`change-panel ${isSwitchOff ? 'change-panel-off' : ''}`}>
            <div className={`switch-list`}>
              <div className="left">
                <div className="switch">
                  <Switch
                    className="reverse custom-switch"
                    checked={!!deviceData.power_switch}
                    onChange={onSwitchChange}
                  />
                </div>
                <div className={`color-list ${isSwitchOff ? 'color-list-off' : ''}`}>
                  {colorMode === 1 ? <ColorBright
                    layout='ver'
                    isMask={false}
                    defaultValue={deviceData['whiteData']}
                    status={deviceData.power_switch === 1}
                    minValue={0}
                    maxValue={359}
                    valuePosition="absolute"
                    onChange={(value, endTouch) => {
                      endTouch && doControlDeviceData('whiteData', getColorValue('white', parseInt(value)));
                    }}
                  /> : <ColorPicker {...props} />}
                </div>
              </div>
              <div className="right">
                <div className="line"></div>
                <Icon name={isSwitchOff ? "switch" : "switch-checked"} />
              </div>
            </div>

            {colorMode === 1
              ? <div className="bright-list">
                <Icon name="brightness0" />
                <LightBright
                  iconName="brightness"
                  controlName="brightness"
                  {...props}
                ></LightBright>
                <Icon name="brightness1 " />
              </div>
              : null
            }
            {colorMode === 0
              ?
              <>
                <div className="bright-list">
                  <Icon name="brightness0" />
                  <LightBright
                    iconName="brightness"
                    controlName="brightness"
                    {...props}
                  ></LightBright>
                  <Icon name="brightness1 " />
                </div>
                <div className="bright-list">
                  <Icon name="temperature0" />
                  <LightBright
                    iconName="temperature"
                    controlName="color_temp"
                    {...props}
                    minValue={2700}
                    maxValue={6000}
                    defaultValue={2700}
                  ></LightBright>
                  <Icon name="temperature1 " />
                </div>
              </>
              : null
            }
          </div>
          : <>
            <div className="scene-switch">
              <Switch
                className="reverse custom-switch"
                checked={!!deviceData.power_switch}
                onChange={onSwitchChange}
              />
            </div>
            <ScenePage {...props}></ScenePage>
          </>
        }
        <Action {...props}></Action>
      </div>
    </div>
  );
}
