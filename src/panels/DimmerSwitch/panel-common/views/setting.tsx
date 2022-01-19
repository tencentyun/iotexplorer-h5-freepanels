/*
 * @Author: wrq
 * @Date: 2021-10-23 17:02:40
 * @Description: 设置页
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Block } from '@components/layout';
import { ListPicker } from '@components/business';
import { Slider } from '../components/slider';
import { DeviceSateContext } from '../deviceStateContext';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import './setting.less';

const themeType = getThemeType();

export function Setting() {
  const [typeVisible, onToggleTypeSelect] = useState(false);

  const [isUnlock, onToggleIsUnlock] = useState(false);
  const [brightValue, setBrightValue] = useState(1);

  const optionsLabel: any = {
    led: 'LED灯',
    incandescent: '白炽灯',
    eco: '节能灯'
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <div className="dimmer-switch-setting-view">
          <Block
            className="lamp-type-select"
            padding="73px 110px"
            onClick={() => onToggleTypeSelect(true)}
          >
            <span className="icon-lamp"></span>

            <div className="select-explain">
              <p className="font_line_3 color_2">选择您的灯泡类型</p>
              <p className="font_line_2 color_3">
                {deviceData.light_type
                  ? optionsLabel[deviceData.light_type]
                  : '点击可重新选择'}
              </p>
            </div>
          </Block>

          <div className="explain-text">
            <h5 className="font_line_3 color_3">设置调光器的最低亮度</h5>
            <p className="font_line_2 color_3">
              请将灯泡亮度设置为合适的值，进行灯灯调光和开关操作。如果操作过程中，灯出现闪烁和熄灭，请增加最低亮度，直至没有闪烁和熄灭。
            </p>
          </div>

          <div className="control-status">
            <div
              className={classNames('icon-lock', isUnlock ? '' : 'lock')}
              onClick={() => {
                onToggleIsUnlock(!isUnlock);
              }}
            ></div>
            <p>{isUnlock ? '操作打开' : '已锁定'}</p>
          </div>

          <Block className="setting-panel">
            <div className="setting-slider">
              <Slider
                value={
                  deviceData.brightness_min
                    ? deviceData.brightness_min / 100
                    : 0.01
                }
                isAvailable={isUnlock}
                theme={themeType}
                onChange={(value: any) => {
                  setBrightValue(value * 100);
                }}
              />
            </div>

            <div
              className={classNames(
                'submit-button',
                'font_line_3',
                isUnlock ? '' : 'lock'
              )}
              onClick={() => {
                if (!isUnlock) return;
                onControlDevice('brightness_min', brightValue);
              }}
            >
              完成
            </div>
          </Block>

          <ListPicker
            visible={typeVisible}
            title="灯泡类型"
            defaultValue={[
              deviceData.light_type ? deviceData.light_type : 'led'
            ]}
            options={[
              { value: 'led', label: 'LED灯' },
              { value: 'incandescent', label: '白炽灯' },
              { value: 'eco', label: '节能灯' }
            ]}
            onCancel={() => onToggleTypeSelect(false)}
            onConfirm={value => {
              onToggleTypeSelect(false);
              onControlDevice('light_type', value);
            }}
          />
        </div>
      )}
    </DeviceSateContext.Consumer>
  );
}
