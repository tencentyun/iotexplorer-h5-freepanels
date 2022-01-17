import React, {useState} from 'react';
import classNames from 'classnames';
import {Cell, Switch} from '@components/base';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {getThemeType} from '@libs/theme';
import { apiControlDeviceData, onControlDevice} from '@hooks/useDeviceData';
import Cupnum_model from './cupnum_model/cupnum_model';
import Quantity_model from './quantity_model/quantity_model';
import Water_temperature from './water_temperature/water_temperature';
import {toggleBooleanByNumber} from '@libs/utillib';
import './setup_top.less';

export function SetupList() {
  const flowSrc = (status: String) => {
    switch (status) {
      case 'continue':
        return '持续出水';
      case 'oneHundredMl':
        return '100ML';
      case 'twoHundredMl':
        return '200ML';
      case 'threeHundredMl':
        return '300ML';
      default:
        return '0ML';
    }
  };

  const [selectTheQuantity, theQuantity] = useState(false);
  const [selectTheCupnum, theCupnum] = useState(false);
  const [selectTheTemperature, theTemperature] = useState(false);

  const onQuantity = () => {
    theQuantity(true);
  }

  const onCupnum = () => {
    theCupnum(true);
  }
  const onTemperature = () => {
    theTemperature(true);
  }

  const themeType = getThemeType();

  return (
    <article id={'setup_top'} className={classNames('setup_top')}>
      <div className="setup_head">
        <Cell
          className="_color_white_"
          title="设置杯量"
          // isLink={false}
          onClick={onQuantity}
          value={sdk.deviceData.flow_set ? sdk.deviceData.flow_set + "ML" : ""}
          valueStyle="gray"
          size="medium"
        >
        </Cell>

        <Cell
          className="_color_white_"
          title="取水杯量"
          // isLink={false}
          onClick={onCupnum}
          value={sdk.deviceData.flow ? flowSrc(sdk.deviceData.flow) : ""}
          valueStyle="gray"
          size="medium"
        >
        </Cell>

        <Cell
          className="_color_white_"
          title="温度设置"
          // isLink={false}
          onClick={onTemperature}
          value={sdk.deviceData.temp_set ? sdk.deviceData.temp_set + "°C" : ""}
          valueStyle="gray"
          size="medium"
        >
        </Cell>
      </div>


      <div className="setup_foot">
        <Cell
          className="_color_white_"
          title="自动清洗"
          isLink={false}
          value={
            <Switch
              name={''}
              theme={themeType}
              checked={toggleBooleanByNumber(
                sdk.deviceData.auto_clean ? sdk.deviceData.auto_clean : 0
              )}
              onChange={(value: boolean) => {
                apiControlDeviceData({auto_clean: value ? 1 : 0});
              }}
            />
          }
          valueStyle="gray"
          size="medium"
        >
        </Cell>

        <Cell
          className="_color_white_"
          title="UV"
          isLink={false}
          value={
            <Switch
              name={''}
              theme={themeType}
              checked={toggleBooleanByNumber(
                sdk.deviceData.uv ? sdk.deviceData.uv : 0
              )}
              onChange={(value: boolean) => {
                apiControlDeviceData({uv: value ? 1 : 0});
              }}
            />
          }
          valueStyle="gray"
          size="medium"
        >
        </Cell>

        <Cell
          className="_color_white_"
          title="童锁"
          isLink={false}
          value={
            <Switch
              name={''}
              theme={themeType}
              checked={toggleBooleanByNumber(
                sdk.deviceData.child_lock ? sdk.deviceData.child_lock : 0
              )}
              onChange={(value: boolean) => {
                apiControlDeviceData({child_lock: value ? 1 : 0});
              }}
            />
          }
          valueStyle="gray"
          size="medium"
        >
        </Cell>

        <Cell
          className="_color_white_"
          title="热水解锁"
          isLink={false}
          value={
            <Switch
              name={''}
              theme={themeType}
              checked={toggleBooleanByNumber(
                sdk.deviceData.hotwater_lock ? sdk.deviceData.hotwater_lock : 0
              )}
              onChange={(value: boolean) => {
                apiControlDeviceData({hotwater_lock: value ? 1 : 0});
              }}
            />
          }
          valueStyle="gray"
          size="medium"
        >
        </Cell>

        <Cell
          className="_color_white_"
          title="耗水总量"
          subTitle={sdk.deviceData.water_total ? sdk.deviceData.water_total + 'L' : '0L'}
          isLink={false}
          value={
            <div
              className="reset"
              onClick={() => {
                onControlDevice('water_total', 0);
              }}
            >
              重置
            </div>
          }
          valueStyle="gray"
          size="medium"
        >
        </Cell>
      </div>
      <Quantity_model
        isShow={selectTheQuantity}
        onClose={() => {
          theQuantity(false);
        }}
      />

      <Cupnum_model
        isShow={selectTheCupnum}
        onClose={() => {
          theCupnum(false);
        }}
      />

      <Water_temperature
        isShow={selectTheTemperature}
        onClose={() => {
          theTemperature(false);
        }}
      />

    </article>
  );
};

export default SetupList;
