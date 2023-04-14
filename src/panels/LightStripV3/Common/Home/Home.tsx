import React from 'react';
import { Position } from './Position';
import LightBright from './LightBright';
import { ScenePage } from './Scene';
import Ticker from './Ticker';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';

export function Home(props) {
  // tab模式
  const colorMode = props.deviceData.colourMode === 0 ? 0 : props.deviceData.colourMode;    // 0 彩色  1 白光  4 场景
  return (
    <div className={`home ${colorMode}`}>
      <DeviceDetail></DeviceDetail>
      <Ticker {...props} />
      <div>
        { colorMode !== 4
          ? <div className="change-panel">
            <Position {...props}></Position>
            { colorMode === 1
              ? <LightBright
                  iconName="brightness"
                  controlName="brightness"
                  {...props}
                ></LightBright>
              : null
            }
            { colorMode === 0
              ? <>
                  <LightBright
                    iconName="temperature"
                    controlName="color_temp"
                    {...props}
                  ></LightBright>
                  <LightBright
                    iconName="brightness"
                    controlName="brightness"
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
