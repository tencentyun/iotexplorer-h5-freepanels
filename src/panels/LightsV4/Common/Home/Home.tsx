import React from 'react';
import { Position } from './Position';
import LightBright from './LightBright';
import { ScenePage } from './Scene';
import Ticker from './Ticker';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';

export function Home(props) {
  // tab模式
  const colorMode = props.deviceData.color_mode || 'white';
  return (
    <div className={`home ${colorMode}`}>
      <DeviceDetail></DeviceDetail>
      <Ticker {...props} />
      <div>
        { colorMode !== 'scene'
          ? <div className="change-panel">
            <Position {...props}></Position>
            { colorMode === 'white'
              ? <LightBright
                  iconName="brightness"
                  controlName="bright_value"
                  {...props}
                ></LightBright>
              : null
            }
            { colorMode === 'colour'
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
