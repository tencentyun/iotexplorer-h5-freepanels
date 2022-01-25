/**
 * @Description: 功能组
 * @Author: RuiXue
 * @Date: 2021-09-29 09:26:13
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { DeviceSateContext } from '../../../deviceStateContext';
import { Block } from '@components/layout';
import { Cell, Switch } from '@components/base';
import { toggleBooleanByNumber } from '@libs/utillib';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';

const Features = () => {
  const themeType = getThemeType();
  const history = useHistory();

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <Block className="setting-block">
          <Cell
            title="定时"
            size="medium"
            isLink={true}
            onClick={() => {
              history.push('/timer');
            }}
          ></Cell>
          <Cell
            title="负离子"
            size="medium"
            isLink={false}
            value={
              <Switch
                name="anion"
                theme={themeType}
                checked={toggleBooleanByNumber(deviceData.anion)}
                onChange={(val: boolean) => {
                  onControlDevice('anion', Number(val));
                }}
              />
            }
          ></Cell>
          <Cell
            title="香薰"
            size="medium"
            isLink={false}
            value={
              <Switch
                name="fragrance"
                theme={themeType}
                checked={toggleBooleanByNumber(deviceData.fragrance)}
                onChange={(val: boolean) => {
                  onControlDevice('fragrance', Number(val));
                }}
              />
            }
          ></Cell>
          <Cell
            title="除菌"
            size="medium"
            isLink={false}
            value={
              <Switch
                name="sterilization"
                theme={themeType}
                checked={toggleBooleanByNumber(deviceData.sterilization)}
                onChange={(val: boolean) => {
                  onControlDevice('sterilization', Number(val));
                }}
              />
            }
          ></Cell>
          <Cell
            title="加热"
            size="medium"
            isLink={false}
            value={
              <Switch
                name="heat"
                theme={themeType}
                checked={toggleBooleanByNumber(deviceData.heat)}
                onChange={(val: boolean) => {
                  onControlDevice('heat', Number(val));
                }}
              />
            }
          ></Cell>
        </Block>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default Features;
