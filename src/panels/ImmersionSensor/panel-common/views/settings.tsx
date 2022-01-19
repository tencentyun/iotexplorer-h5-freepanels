/*
 * @Description: 设置
 */

import React from 'react';
import { Block } from '@components/layout';
import { Cell, Switch } from '@components/base';
import { DeviceContext } from '../deviceContext';
// 接口，处理属性更改
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { toggleBooleanByNumber } from '@libs/utillib';

const themeType = getThemeType();

export function Settings() {
  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="sensor-setting">
          <Block className="setting-block">
            <Cell
              title="消音"
              valueStyle={'gray'}
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="mode"
                  theme={themeType}
                  checked={
                    deviceData['muffling']
                      ? toggleBooleanByNumber(deviceData['muffling'])
                      : false
                  }
                  onChange={(val: boolean) => {
                    onControlDevice('muffling', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
        </main>
      )}
    </DeviceContext.Consumer>
  );
}
