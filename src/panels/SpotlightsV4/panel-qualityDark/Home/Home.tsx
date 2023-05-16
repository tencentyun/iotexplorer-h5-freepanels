import React from 'react';
import { Position } from '../../Common/Home/Position';
import LightBright from '../../Common/Home/LightBright';
import { ScenePage } from '../../Common/Home/Scene';
import Ticker from '../../Common/Home/Ticker';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';

export function Home(props) {
  // tab模式
  const colorMode = props.deviceData.work_mode || 'white';
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
