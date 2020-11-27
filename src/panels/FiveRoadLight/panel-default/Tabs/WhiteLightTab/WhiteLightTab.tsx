import React, { useState, useRef, useMemo } from 'react';
import tinycolor from 'tinycolor2';
import { CircleSlider } from '../../components/CircleSlider';
import colorBrightness from '../../images/color-brightness.svg';
import { LightPropSlider } from '../../components/LightPropSlider';
import { TabProps } from '../../LightPanel';
import { WhiteLightColorTheme, ColorTempRange, ColorTempId, BrightnessId } from '../../constants';

const hsls = {
  warn: tinycolor(WhiteLightColorTheme.warn).toHsl(),
  normal: tinycolor(WhiteLightColorTheme.normal).toHsl(),
  cold: tinycolor(WhiteLightColorTheme.cold).toHsl(),
};

const colorTempMiddle = (7000 - 2000) / 2 + 2000;
const [colorTempMin, colorTempMax] = ColorTempRange;


const temp2Angle = (temp: number) => {
  if (typeof temp === 'undefined') return 0;

  const percent = (temp - colorTempMin) / (colorTempMax - colorTempMin);

  let angle = percent * 180 + 270;

  if (angle >= 360) {
    angle = angle - 360;
  }

  return angle;
};

// 白光，颜色是假的，根据angle决定返回色温的值
export function WhiteLightTab({
  templateMap,
  deviceData,
  doControlDeviceData,
  margin,
}: TabProps) {
  const [color, setColor] = useState('#fff');
  const localAngleRef = useRef(0);
  const style = useMemo(() => ({
    backgroundImage: `linear-gradient(90deg, ${WhiteLightColorTheme.warn}, ${WhiteLightColorTheme.normal} 50%, ${WhiteLightColorTheme.cold} 100%)`,
    marginTop: margin,
  }), []);

  const controlColorTempByAngle = (angle) => {
    localAngleRef.current = angle;

    let colorTemp;

    // 4个区间
    if (angle >= 0 && angle < 90) {
      colorTemp = colorTempMiddle + (angle / 90) * (colorTempMax - colorTempMiddle);
    } else if (angle >= 90 && angle < 180) {
      colorTemp = colorTempMax + ((angle - 90) / 90) * (colorTempMiddle - colorTempMax);
    } else if (angle >= 180 && angle < 270) {
      colorTemp = colorTempMiddle + ((angle - 180) / 90) * (colorTempMin - colorTempMiddle);
    } else if (angle >= 270 && angle < 360) {
      colorTemp = colorTempMin + ((angle - 270) / 90) * (colorTempMiddle - colorTempMin);
    }

    doControlDeviceData(ColorTempId, Math.round(colorTemp));
  };

  const changeColorByAngle = (angle) => {
    localAngleRef.current = angle;

    const hsl: Partial<{
      a: number;
      h: number;
      l: number;
      s: number;
    }> = {
      a: 1,
    };

    // 4个区间
    if (angle === 0 || angle === 180) {
      setColor('#fff');
      return;
    } else if (angle === 90) {
      setColor('#5FBCFD');
      return;
    } else if (angle === 270) {
      setColor('#EAB250');
      return;
    } else if (angle > 0 && angle < 90) {
      hsl.h = hsls.cold.h;
      hsl.s = hsls.cold.s;
      hsl.l = hsls.normal.l + (angle / 90) * (hsls.cold.l - hsls.normal.l);
    } else if (angle > 90 && angle < 180) {
      hsl.h = hsls.cold.h;
      hsl.s = hsls.cold.s;
      hsl.l = hsls.cold.l + ((angle - 90) / 90) * (hsls.normal.l - hsls.cold.l);
    } else if (angle > 180 && angle < 270) {
      hsl.h = hsls.warn.h;
      hsl.s = hsls.warn.s;
      hsl.l = hsls.normal.l + ((angle - 180) / 90) * (hsls.warn.l - hsls.normal.l);
    } else if (angle > 270 && angle < 360) {
      hsl.h = hsls.warn.h;
      hsl.s = hsls.warn.s;
      hsl.l = hsls.warn.l + ((angle - 270) / 90) * (hsls.normal.l - hsls.warn.l);
    }

    setColor(`#${tinycolor(hsl as any).toHex()}`);
  };

  const deviceColorAngle = useMemo<number>(() => {
    const angle = temp2Angle(deviceData[ColorTempId]);
    const localAngle = Math.floor(localAngleRef.current);

    if (angle >= 0 && angle < 180) {
      return Math.floor(180 - angle) === localAngle ? localAngle : angle;
    } else if (angle >= 180 && angle < 360) {
      return Math.floor(360 - angle + 180) === localAngle ? localAngle : angle;
    }

    return angle;
  }, [deviceData[ColorTempId]]);

  return (
    <div className='white-light-tab light-panel-tab'>
      <CircleSlider
        color={color}
        onChanging={changeColorByAngle}
        onChange={controlColorTempByAngle}
        angle={deviceColorAngle}
        style={style}
      />
      <LightPropSlider
        icon={colorBrightness}
        value={deviceData[BrightnessId]}
        templateConfig={templateMap[BrightnessId]}
        onChange={(value) => {
          doControlDeviceData(BrightnessId, value);
        }}
      />
    </div>
  );
}
