import React, { useState, useEffect } from 'react';
import _ from '@underscore';
import tinycolor from 'tinycolor2';
import { CircleSlider } from '../../components/CircleSlider';
import './ColorLightTab.less';
import { TabProps } from '../../Panel';
import colorBrightness from '../../images/color-brightness.svg';
import colorTemp from '../../images/color-temp.svg';
import { LightPropSlider } from '../../components/LightPropSlider';
import { ColorValueId, ColorValueIdOld } from '../../constants';

interface HSVColor {
  hue?: number; // 色调，360度，从0~360分别对应圆盘的各个角度,精度0.01
  saturation?: number; // 饱和度，0~100%，精度1
  value?: number; // 明度,0~100%，精度1
}

// hsv中sv的物模型
const svTemplateConfig = {
  define: {
    start: 0,
    max: 100,
    min: 0,
    step: 1,
    unit: '%',
  },
};

export function ColorLightTab({
  deviceData,
  doControlDeviceData,
  margin,
}: TabProps) {
  // local change -> hsv -> color -> control
  // outter color value -> hsv -> color
  const [hsv, setHsv] = useState<HSVColor>(deviceData[ColorValueId] || {
    hue: 0,
    saturation: 100,
    value: 100,
  });

  const [color, setColor] = useState('#fff');

  useEffect(() => {
    if (hsv) {
      const { hue, saturation, value } = hsv;

      // @ts-ignore
      setColor(`#${tinycolor({ h: hue, s: `${saturation}%`, v: `${value}%`, a: 1 }).toHex()}`);
    }
  }, [hsv]);

  useEffect(() => {
    if (deviceData[ColorValueId] && !_.isEqual(deviceData[ColorValueId], hsv)) {
      setHsv(deviceData[ColorValueId]);
    }
  }, [deviceData[ColorValueId]]);

  const controlColorValue = (hsvValue: HSVColor) => {
    const nextHsv: HSVColor = { ...hsv };

    _.forEach(hsvValue, (value, key) => {
      if (value) {
        nextHsv[key] = value;
      }
    });

    const { hue, saturation, value } = nextHsv;

    doControlDeviceData({
      [ColorValueId]: nextHsv,
      [ColorValueIdOld]: [hue, saturation, value].join(';'), // 向前兼容
    });
  };

  return (
    <div className='color-light-tab light-panel-tab'>
      <CircleSlider
        color={color}
        onChanging={(value) => {
          setHsv({
            ...hsv,
            hue: value,
          });
        }}
        onChange={(value) => {
          controlColorValue({ hue: value });
        }}
        angle={hsv.hue}
        className='color-slider'
        style={{
          marginTop: margin,
        }}
      />
      <LightPropSlider
        icon={colorBrightness}
        value={hsv.value}
        templateConfig={svTemplateConfig}
        onChanging={(value) => {
          setHsv({
            ...hsv,
            value,
          });
        }}
        onChange={(value) => {
          setHsv({
            ...hsv,
            value,
          });
          controlColorValue({ value });
        }}
      />
      <LightPropSlider
        icon={colorTemp}
        value={hsv.saturation}
        templateConfig={svTemplateConfig}
        onChanging={(value) => {
          setHsv({
            ...hsv,
            saturation: value,
          });
        }}
        onChange={(value) => {
          setHsv({
            ...hsv,
            saturation: value,
          });
          controlColorValue({ saturation: value });
        }}
      />
    </div>
  );
}
