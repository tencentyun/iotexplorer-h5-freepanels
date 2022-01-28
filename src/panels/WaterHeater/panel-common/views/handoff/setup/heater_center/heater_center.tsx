import React, {useState} from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './heater_center.less';
import classNames from 'classnames';
import {toggleBooleanByNumber} from '@libs/utillib';
import {apiControlDeviceData,onControlDevice} from '@hooks/useDeviceData';
import Drawdown from '../../../home/pop-up/drawdown/drawdown'
import {Cell, Switch} from '@components/base';
import {useHistory} from 'react-router-dom';
import { getThemeType } from '@libs/theme';

export function Normal_Center() {
  const history = useHistory();

  const [selectTheDrawdown, theDrawdown] = useState(false);
  const themeType = getThemeType();

  const onDrawdown = () => {
    theDrawdown(true);
  }
  const onCloud = () => {
    // 更多跳转
    return history.push('/timer');
  };

  const handleHeatMode = (mode: String) => {
    onControlDevice('heat_mode', mode);
  };

  const handleMagnesiumRod = () => {
    apiControlDeviceData({
      work_life_reset_1: sdk.deviceData.work_life_reset_1 === 1 ? 0 : 1
    });
  };
  const handleLiner = () => {
    apiControlDeviceData({
      work_life_reset_2: sdk.deviceData.work_life_reset_2 === 1 ? 0 : 1
    });
  };
  return (
    <article id={'setup_center'} className={classNames('setup_center')}>
      <div className="hot_card">
        <div className="card_top">
          <div className="font_span">
            <div className="card_size">制热模式</div>
          </div>
          <div className="card_botton">
            <div className={classNames('card_botton1', sdk.deviceData.heat_mode === 'half_tank_heating' ? 'check' : '')}
                 onClick={() => handleHeatMode('half_tank_heating')}>半胆制热
            </div>
            <div
              className={classNames('card_botton2', sdk.deviceData.heat_mode === 'whole_tank_heating' ? 'check' : '')}
              onClick={() => handleHeatMode('whole_tank_heating')}>整胆制热
            </div>
          </div>


        </div>
        <div className="setting">

          <Cell
            onClick={onDrawdown}
            className="_color_white_"
            title="水位设置"
            value={sdk.deviceData.water_set ? sdk.deviceData.water_set + '%' : '0%'}
            valueStyle="gray"
            size="medium"
          />
          <Cell
            className="_color_white_"
            title="童锁开关"
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
          />
          <Cell
            className="_color_white_"
            title="消毒"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.disinfection ? sdk.deviceData.disinfection : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({disinfection: value ? 1 : 0});
                }}
              />
            }
            valueStyle="gray"
            size="medium"
          />
          <Cell
            className="_color_white_"
            title="即时加热"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.instant_heating ? sdk.deviceData.instant_heating : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({instant_heating: value ? 1 : 0});
                }}
              />
            }
            valueStyle="gray"
            size="medium"
          />
          <Cell
            className="_color_white_"
            title="夜电"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.night_power ? sdk.deviceData.night_power : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({night_power: value ? 1 : 0});
                }}
              />
            }
            valueStyle="gray"
            size="medium"
          />
          <Cell
            className="_color_white_"
            title="增容"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.capacity_expansion ? sdk.deviceData.capacity_expansion : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({capacity_expansion: value ? 1 : 0});
                }}
              />
            }
            valueStyle="gray"
            size="medium"
          />
          <Cell
            className="_color_white_"
            title="3D速热"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.heating_3d ? sdk.deviceData.heating_3d : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({heating_3d: value ? 1 : 0});
                }}
              />
            }
            valueStyle="gray"
            size="medium"
          />
          <Cell
            className="_color_white_"
            title="微波开关"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.microwave_switch ? sdk.deviceData.microwave_switch : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({microwave_switch: value ? 1 : 0});
                }}
              />
            }
            valueStyle="gray"
            size="medium"
          />
          <Cell
            className="_color_white_"
            title="微波开关"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.outage ? sdk.deviceData.outage : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({outage: value ? 1 : 0});
                }}
              />
            }
            valueStyle="gray"
            size="medium"
          />
        </div>
      </div>

      <div className="cloud">
        <Cell
          className="_color_white_"
          title="云定时"
          // isLink={false}
          value=""
          valueStyle="gray"
          size="medium"
          onClick={onCloud}
        />
      </div>

      <div className="longevity">
        <div className="longevity_head">
          <div className="longevity_span">
            <div className="content_num">{sdk.deviceData.work_life_1 ? sdk.deviceData.work_life_1 : 0}</div>
            <div className="content_font">寿命</div>
          </div>

          <div className="longevity_span">
            <div className="content_num">{sdk.deviceData.work_life_2 ? sdk.deviceData.work_life_2 : 0}</div>
            <div className="content_font">内胆寿命</div>
          </div>

        </div>

        <div className="longevity_center">
          <div className="longevity_reset">镁棒寿命重置</div>
          <div className="reset_span" onClick={handleMagnesiumRod}>重置</div>
        </div>

        <div className="longevity_center">
          <div className="longevity_reset">内胆寿命重置</div>
          <div className="reset_span" onClick={handleLiner}>重置</div>
        </div>
      </div>


      <Drawdown
        isShow={selectTheDrawdown}
        onClose={() => {
          theDrawdown(false);
        }}
      />


    </article>
  );
};

export default Normal_Center;

