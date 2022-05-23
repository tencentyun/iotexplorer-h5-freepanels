import React from 'react';
import { Icon } from '@custom/Icon';
import { Position } from './Position';
import LightBright from './LightBright';
import Ticker from './Ticker';
import Action from './Action';
import { ScenePage } from './Scene';

export function Home(props) {
  // tab模式
  const colorMode = props.deviceData.color_mode || 'white';
  const onSwitchChange = () => {
    props.doControlDeviceData({ power_switch: props.deviceData.power_switch ? 0 : 1 });
  };
  return (
    <div className="home">
      { colorMode !== 'scene'
        ? <div className="change-panel">
          {/* <div onClick={onSwitchChange}>
            <Icon></Icon>
          </div> */}
          <Position {...props}></Position>
          <Action {...props}></Action>
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
        : <div className="change-panel">
          <ScenePage {...props}></ScenePage>
          <Action className="big-action" {...props}></Action>
        </div>
      }
      <Ticker {...props} />
    </div>
  );
}
