/*
 * @Author: wrq
 * @Date: 2021-10-23 17:02:40
 * @Description: 调光页
 */
import React, { useState, useEffect } from 'react';
import { LightSwitch } from '@components/business';
import { DeviceSateContext } from '../deviceStateContext';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import './dimmer.less';

const themeType = getThemeType();

export interface DimmerProps {
  onClick?: any;
  onChange?: any;
}

export function Dimmer(props: DimmerProps) {
  const [isVisible, onToggleIsVisible] = useState(true);
  const [brightValue, setBrightValue] = useState(0);

  useEffect(() => {
    props.onClick && props.onClick(isVisible);
  }, [isVisible]);

  useEffect(() => {
    props.onChange && props.onChange(brightValue);
  }, [brightValue]);

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <div className="dimmer-switch-dimmer-view">
          <div className="lamp-switch">
            <LightSwitch
              defaultValue={
                deviceData.bright_value ? deviceData.bright_value / 100 : 0
              }
              theme={themeType}
              onChange={(value: any) => {
                setBrightValue(value);
                onControlDevice('bright_value', value * 100);
              }}
            />
          </div>

          <div
            className="return-button font_line_3"
            onClick={() => onToggleIsVisible(false)}
          >
            轻触返回界面
          </div>
        </div>
      )}
    </DeviceSateContext.Consumer>
  );
}
