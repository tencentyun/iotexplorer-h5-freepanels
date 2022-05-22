import React from 'react';
import { Position } from './Position';
import LightBright from './LightBright';
import { ScenePage } from './Scene';
import Ticker from './Ticker';
import Action from './Action';

export function Home(props) {
  // 电源开/关
  const isPowerOpen = props.deviceData.power_switch === 1;
  // tab模式
  const colorMode = props.deviceData.color_mode;
  return (
    <div className="home">
      <Ticker {...props} />
      <div>
        { colorMode !== 2
          ? <div className="change-panel">
            <Position {...props}></Position>
            { (colorMode === 0 && isPowerOpen)
              ? <LightBright {...props} iconName="temperature"></LightBright>
              : null
            }
            { (colorMode === 1 && isPowerOpen)
              ? <>
                <LightBright {...props} iconName="brightness"></LightBright>
                <LightBright {...props} iconName="temperature"></LightBright>
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
