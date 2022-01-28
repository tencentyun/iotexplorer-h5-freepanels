import React from 'react';
import {toggleBooleanByNumber} from '@libs/utillib';
import {getThemeType} from '@libs/theme';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import { Cell, Switch } from '@components/base';
import { SvgIcon } from '@components/common/icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function ProductSetting() {
  const themeType = getThemeType();

  return (

    <div className="product-setting">
    <Cell
        className="_color_white_"
        title="撤防"
        isLink={false}
        value= {
          <Switch
            name={''}
            theme={themeType}
            checked={toggleBooleanByNumber(
              sdk.deviceData.disarmed ? sdk.deviceData.disarmed : 0
            )}
            onChange={(value: boolean) => {
              apiControlDeviceData({ disarmed: value ? 1 : 0 });
            }}
          />
        }
        valueStyle="gray"
        size="medium"
        prefixIcon={<SvgIcon name={'icon-emergency-disarm-'+themeType} width={40} height={40}/>}
    />

     <Cell
        className="_color_white_"
        title="外出布防"
        isLink={false}
        value= {
          <Switch
            name={''}
            theme={themeType}
            checked={toggleBooleanByNumber(
              sdk.deviceData.arm ? sdk.deviceData.arm : 0
            )}
            onChange={(value: boolean) => {
              apiControlDeviceData({ arm: value ? 1 : 0 });
            }}
          />
        }
        valueStyle="gray"
        size="medium"
        prefixIcon={<SvgIcon name={'icon-emergency-go-out-and-arm-'+themeType} width={40} height={40}/>}
    />

     <Cell
        className="_color_white_"
        title="在家布防"
        isLink={false}
        value= {
          <Switch
            name={''}
            theme={themeType}
            checked={toggleBooleanByNumber(
              sdk.deviceData.home ? sdk.deviceData.home : 0
            )}
            onChange={(value: boolean) => {
              apiControlDeviceData({ home: value ? 1 : 0 });
            }}
          />
        }
        valueStyle="gray"
        size="medium"
        prefixIcon={<SvgIcon name={'icon-emergency-arm-your-home-'+themeType} width={40} height={40}/>}
    />

     <Cell
        className="_color_white_"
        title="SOS紧急"
        isLink={false}
        value= {
          <Switch
            name={''}
            theme={themeType}
            checked={toggleBooleanByNumber(
              sdk.deviceData.sos ? sdk.deviceData.sos : 0
            )}
            onChange={(value: boolean) => {
              apiControlDeviceData({ sos: value ? 1 : 0 });
            }}
          />
        }
        valueStyle="gray"
        size="medium"
        prefixIcon={<SvgIcon name={'icon-emergency-urgent-'+themeType} width={45} height={45}/>}
    />
</div>
  );
};

export default ProductSetting;
