import React, { useEffect, useState } from 'react';
import { Position } from '../../Common/Home/Position';
import LightBright from '../../Common/Home/LightBright';
import { ScenePage } from '../../Common/Home/Scene';
import Ticker from '../../Common/Home/Ticker';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';
import RGBColor from '../../Common/Home/RGBColor';

export function Home(props) {
  const {
    deviceData: { color_mode, brightness },
    context,
    productColorMode = 1,
    setTitle,
  } = props;

  // 颜色模式
  const colorMode = color_mode === void 0 ? productColorMode : color_mode;
  // tab 教模式和其他模式
  const work_mode = context?.workMode || colorMode;

  const isPowerOff = !props.deviceData.power_switch ? 'power-off' : 'power-on';

  const isColorFull = colorMode == '2';

  const [brightnessValue, setBrightness] = useState(0);

  useEffect(() => {
    setBrightness(brightness);
  }, [brightness]);

  return (
    <div className={`home ${work_mode == 10 ? 'scene' : colorMode} ${isPowerOff}`}>
      <DeviceDetail></DeviceDetail>
      <Ticker {...props} />
      <div className='content-bottom'>
        {work_mode != '10'
          ? <div className={`change-panel color-mode-${colorMode}`}>
            {
              isColorFull
                ? <div className='color_card'>
                  <RGBColor brightness={brightnessValue} {...props}></RGBColor>
                </div>
                : <Position  {...props} brightness={brightnessValue}></Position>}

            {isColorFull
              ? <>
                <LightBright
                  iconName='temperature'
                  controlName='color_temp'
                  minValue={2700}
                  maxValue={6500}
                  {...props}
                ></LightBright>

                <LightBright
                  iconName='brightness'
                  onChange={setBrightness}
                  controlName='brightness'
                  {...props}
                ></LightBright>
              </>
              : <LightBright
                iconName='brightness'
                controlName='brightness'
                onChange={setBrightness}
                {...props}
              ></LightBright>
            }
          </div>

          : <ScenePage {...props}></ScenePage>
        }
        <Action {...props}></Action>
      </div>
    </div>
  );
}
