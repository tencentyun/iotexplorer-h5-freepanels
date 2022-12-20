import React from 'react';
import { Position } from '../../Common/Home/Position';
import LightBright from '../../Common/Home/LightBright';
import { ScenePage } from '../../Common/Home/Scene';
import Ticker from '../../Common/Home/Ticker';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';
import { Icon } from '@custom/Icon';
import { LightBright as ColorBright } from '@custom/LightBright';
import { getColorValue, getDegValue } from '@utils';

export function Home(props) {
  // tab模式
  const { deviceData, work_mode, doControlDeviceData } = props;
  const colorMode = props.deviceData.work_mode || 'white';
  const isSwitchOff = props.deviceData.switch_led !== 1;
  const onSwitchChange = () => {
    props.doControlDeviceData({ switch_led: props.deviceData.switch_led ? 0 : 1 });
  };
  return (
    <div className={`home ${colorMode}`}>
      <DeviceDetail></DeviceDetail>
      <Ticker {...props} />
      <div>
        {colorMode !== 'scene'
          ? <div className="change-panel">
            <div className={`switch-btn`} onClick={onSwitchChange}>
              <Icon name={isSwitchOff ? "switch" : "switch-checked"} />
            </div>
            <div className={`color-list ${colorMode} ${isSwitchOff ? 'color-list-off' : ''}`}>
              <ColorBright
                defaultValue={deviceData['white_data']}
                status={deviceData.switch_led === 1}
                minValue={0}
                maxValue={359}
                onChange={(value, endTouch) => {
                  const key = work_mode === 'colour' ? 'colour_data' : 'white_data';
                  endTouch && doControlDeviceData(key, getColorValue(work_mode, parseInt(value)));
                }}
              ></ColorBright>
            </div>

            {colorMode === 'white'
              ? <LightBright
                iconName="brightness"
                controlName="bright_value"
                {...props}
              ></LightBright>
              : null
            }
            {colorMode === 'colour'
              ? <>
                <LightBright
                  iconName="temperature"
                  controlName="temp_value"
                  {...props}
                ></LightBright>
                <LightBright
                  iconName="brightness"
                  controlName="bright_value"
                  {...props}
                ></LightBright>
              </>
              : null
            }
          </div>
          : <ScenePage {...props}></ScenePage>
        }
        <Action {...props}></Action>
      </div>
    </div>
  );
}
