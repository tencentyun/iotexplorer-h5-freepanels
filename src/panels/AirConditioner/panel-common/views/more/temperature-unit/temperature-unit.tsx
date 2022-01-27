/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-29 09:51:47
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import { DeviceSateContext } from '../../../deviceStateContext';
import classNames from 'classnames';
import { Button, Switch } from '@components/base';
import { SvgIcon } from '@components/common';
import { List } from 'antd-mobile';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './temperature-unit.less';
import { toggleBooleanByNumber } from '@libs/utillib';
import SetTemp from '../../more/temperature-unit/set-temp/set-temp';
import { getThemeType } from '@libs/theme';

const themeType = getThemeType();

const TemperatureUnit = () => {
  const handleControlByAction = (key: string, value: any) => {
    apiControlDeviceData({
      [key]: value
    });
  };

  const handleCommit = (value: string) => {
    apiControlDeviceData({
      temp_unit_convert: value
    });
  };

  const iconColor = () => {
    if (themeType === 'colorful') {
      return {
        gradientId: 'unit',
        startColor: '#527DF4',
        endColor: '#044DFF',
        x1: '11.8644068%',
        y1: '18.182147%',
        x2: '104.602754%',
        y2: '88.2505064%'
      };
    } else if (themeType === 'blueWhite') {
      return {
        gradientId: 'unit',
        startColor: '#3374FA',
        endColor: '#549CFC',
        x1: '50%',
        y1: '0%',
        x2: '50%',
        y2: '100%'
      };
    } else if (themeType === 'dark') {
      return {
        gradientId: 'unit',
        startColor: '#00F0FF',
        endColor: '#704DF0',
        x1: '11.8644068%',
        y1: '18.182147%',
        x2: '104.602754%',
        y2: '88.2505064%'
      };
    } else if (themeType === 'morandi') {
      return {
        color: '#576273'
      };
    } else {
      return {
        color: '#000000'
      };
    }
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <section className={classNames('temperatureUnit-wrap')}>
          <div className={classNames('btn-temperature')}>
            <div className="title-wrap">
              <SvgIcon
                className="unit-convert"
                name="icon-heart-unit-convert"
                {...iconColor()}
              />
              <span className="title">温标切换</span>
            </div>
            <div className="btn-wrap">
              <Button
                className={classNames(
                  deviceData.temp_unit_convert === 'celsius' ? 'active' : null
                )}
                onClick={() => {
                  handleCommit('celsius');
                }}
              >
                &#176;C
              </Button>
              <Button
                className={classNames(
                  deviceData.temp_unit_convert === 'fahrenheit'
                    ? 'active'
                    : null
                )}
                onClick={() => {
                  handleCommit('fahrenheit');
                }}
              >
                &#176;F
              </Button>
            </div>
          </div>
          <List>
            {/*湿度设置*/}
            <SetTemp />
            <List.Item
              prefix={'3D扫风'}
              extra={
                <Switch
                  name={''}
                  checked={toggleBooleanByNumber(deviceData.swing_3d)}
                  onChange={(value: boolean) => {
                    handleControlByAction('swing_3d', value);
                  }}
                />
              }
            />
            <List.Item
              prefix={'烘干'}
              extra={
                <Switch
                  name={''}
                  checked={toggleBooleanByNumber(deviceData.drying)}
                  onChange={(value: boolean) => {
                    handleControlByAction('drying', value);
                  }}
                />
              }
            />
            <List.Item
              prefix={'自动'}
              extra={
                <Switch
                  name={''}
                  checked={toggleBooleanByNumber(deviceData.auto)}
                  onChange={(value: boolean) => {
                    handleControlByAction('auto', value);
                  }}
                />
              }
            />
            <List.Item
              prefix={'ECO模式'}
              extra={
                <Switch
                  name={''}
                  checked={toggleBooleanByNumber(deviceData.eco)}
                  onChange={(value: boolean) => {
                    handleControlByAction('eco', value);
                  }}
                />
              }
            />
            <List.Item
              prefix={'换气模式'}
              extra={
                <Switch
                  name={''}
                  checked={toggleBooleanByNumber(deviceData.ventilation)}
                  onChange={(value: boolean) => {
                    handleControlByAction('ventilation', value);
                  }}
                />
              }
            />
            <List.Item
              prefix={'负离子'}
              extra={
                <Switch
                  name={''}
                  checked={toggleBooleanByNumber(deviceData.anion)}
                  onChange={(value: boolean) => {
                    handleControlByAction('anion', value);
                  }}
                />
              }
            />
            <List.Item
              prefix={'自清洁'}
              extra={
                <Switch
                  name={''}
                  checked={toggleBooleanByNumber(deviceData.cleaning)}
                  onChange={(value: boolean) => {
                    handleControlByAction('cleaning', value);
                  }}
                />
              }
            />
            <List.Item
              prefix={'加热'}
              extra={
                <Switch
                  name={''}
                  checked={toggleBooleanByNumber(deviceData.heat)}
                  onChange={(value: boolean) => {
                    handleControlByAction('heat', value);
                  }}
                />
              }
            />
          </List>
        </section>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default TemperatureUnit;
