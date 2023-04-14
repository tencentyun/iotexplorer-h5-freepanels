/*
 * @Description: 温控器设置
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Block } from '@components/layout';
import { Cell, Switch } from '@components/base';
import { SvgIcon } from '@components/common';
import { Slider } from 'antd-mobile';
// 模版数据
import { DeviceContext } from '../deviceContext';
// 接口，处理属性更改
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { toggleBooleanByNumber } from '@libs/utillib';
import { SkinProps } from '../skinProps';

export function More() {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const history = useHistory();
  const [countdown, setCountdown] = useState(0);

  const cellIcon = (svgName: string) => (
    <SvgIcon className="svg-icon" name={svgName} {...CurrentSkinProps.icon} />
  );

  const soundIcon = () => <div className="icon-sound"></div>;

  const timingIcon = () => <div className="icon-timing"></div>;

  const formatTime = (time: number) => {
    const hour = Math.floor(time / 60 / 60) % 24;

    const day = Math.floor(time / 60 / 60 / 24);

    if (day === 1) {
      return '24小时';
    }
    return `${hour}小时`;
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="more-setting">
          <Block className="setting-block">
            <Cell
              title="声音"
              prefixIcon={soundIcon()}
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="sound"
                  theme={themeType}
                  checked={toggleBooleanByNumber(deviceData.sound_switch)}
                  onChange={(val: boolean) => {
                    onControlDevice('sound_switch', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          <Block className="setting-block">
            <Cell
              title="定时"
              prefixIcon={timingIcon()}
              valueStyle={'gray'}
              size="medium"
              isLink={true}
              onClick={() => {
                history.push('/timing');
              }}
            ></Cell>
          </Block>
          <Block className="setting-block countdown-block">
            <Cell
              // title={`倒计时・${formatTime(countdown)}`}
              title={`倒计时・${formatTime(deviceData.count_down ? deviceData.count_down : 7200)}`}
              prefixIcon={cellIcon('icon-aro-countdown')}
              valueStyle={'gray'}
              size="medium"
              isLink={true}
            ></Cell>
            <Slider
              className="countdown-slider"
              step={3600}
              defaultValue={
                deviceData.count_down ? deviceData.count_down : 7200
              }
              min={0}
              max={86400}
              onAfterChange={(value) => {
                // setCountdown(value);
                onControlDevice('count_down', value);
              }}
            />
          </Block>
        </main>
      )}
    </DeviceContext.Consumer>
  );
}
