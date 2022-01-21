/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-29 09:51:47
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import { Card } from 'antd-mobile';
import classNames from 'classnames';
import { DeviceSateContext } from '@/products/humidifier/deviceStateContext';
import { Button } from '@/components/base';
import IconTheme from '@/components/common/icon/icon-theme';
import { apiControlDeviceData } from '@/utils/api';
import './temperature-unit.less';

const TemperatureUnit = () => {
  const handleCommit = (value: number) => {
    apiControlDeviceData({
      temp_unit_convert: value
    });
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <>
          <Card
            className={classNames('temperatureUnit-wrap')}
            title={
              <div>
                <IconTheme kind={'temp_unit_convert'} width={66} height={56} />
                温标切换
              </div>
            }
          >
            <div
              className={classNames('flex', 'space-between', 'btn-temperature')}
            >
              <Button
                className={classNames(
                  deviceData.temp_unit_convert === 0 ? 'active' : null
                )}
                onClick={() => {
                  handleCommit(0);
                }}
              >
                &#176;C
              </Button>
              <Button
                className={classNames(
                  deviceData.temp_unit_convert === 1 ? 'active' : null
                )}
                onClick={() => {
                  handleCommit(1);
                }}
              >
                &#176;F
              </Button>
            </div>
          </Card>
        </>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default TemperatureUnit;