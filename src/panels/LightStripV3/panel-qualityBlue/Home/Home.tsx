import React from 'react';
import { Position } from '../../Common/Home/Position';
import LightBright from '../../Common/Home/LightBright';
import { ScenePage } from '../../Common/Home/Scene';
import Ticker from '../../Common/Home/Ticker';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';

const classList = {
  0: 'colour',
  1: 'white',
  4: 'sence'
};
export function Home(props) {
  // tab模式
  const colorMode = props.deviceData.colourMode === undefined ? 1 : props.deviceData.colourMode;    // 0 彩色  1 白光  4 场景
  return (
    <div className={`home ${classList[colorMode]}`}>
      <DeviceDetail></DeviceDetail>
      <Ticker {...props} />
      <div className='content-bottom'>
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
                    minValue={2700}
                    maxValue={6000}
                    defaultValue={2700}
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
