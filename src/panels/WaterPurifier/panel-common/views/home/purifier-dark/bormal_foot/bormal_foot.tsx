import React, { useState } from 'react';
import './bormal_foot.less';
import classNames from 'classnames';
import { SvgIcon } from '@components/common/icon';
import { Switch } from '@components/base';
import { useHistory } from 'react-router-dom';
import PurifierListDark from '../purifier-list-dark/purifier_list_dark';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import TempModel from '../../temp_model/temp_model';
import { toggleBooleanByNumber } from '@libs/utillib';
import { getThemeType } from '@libs/theme';

export function Bormal_foot() {
  const themeType = getThemeType();
  const [isShowTempModeVisible, setIsShowTempMode] = useState(false);

  // const [lampSrc] = useState(lampIcon);
  const history = useHistory();

  const onSetup = () => {
    if (sdk.deviceData.switch === 1) {
      history.push('/setup');
    }
  };
  const onSwitchFlow = () => {
    if (sdk.deviceData.switch === 1) {
      apiControlDeviceData({
        switch_flow: sdk.deviceData.switch_flow === 1 ? 0 : 1,
      });
    }
  };
  const onSwitch = () => {
    apiControlDeviceData({
      switch: sdk.deviceData.switch === 1 ? 0 : 1,
      switch_flow: 0,
    });
  };
  return (
        <article id={'dark_bormal_foot'} className={classNames('dark_bormal_foot')}>
            <div className="foot_card">
             <PurifierListDark />
            </div>

            <div className="foot_botton">
              <div className="temperature_icon" onClick={onSwitch}>
                <Switch
                  name={''}
                  theme={themeType}
                  checked={toggleBooleanByNumber(sdk.deviceData.switch ? sdk.deviceData.switch : 0)}
                  onChange={(value: boolean) => {
                    apiControlDeviceData({
                      switch: value ? 1 : 0,
                      switch_flow: 0,
                    });
                  }}
                />
              </div>
              <div  onClick={onSwitchFlow} className="water_icon">
                  <SvgIcon name={sdk.deviceData.switch_flow === 1 && 'icon-purifier-take-water-dark' || 'icon-purifier-take-water-notopen-dark'} color="#000000" width={50} height={50}/>
              </div>
              <div onClick={() => (sdk.deviceData.switch === 1 ? setIsShowTempMode(true) : '')}>
                  <SvgIcon name={sdk.deviceData.switch === 1 && 'icon-purifier-coffee-dark' || 'icon-purifier-coffee-notopen-dark'} color="#000000" width={50} height={50}/>
              </div>

              <div onClick={onSetup}>
                <SvgIcon name={sdk.deviceData.switch === 1 && 'icon-purifier-setup-dark' || 'icon-purifier-setup-notopen-dark'} color="#000000" width={50} height={50}/>
              </div>
              <TempModel
                isShow={isShowTempModeVisible}
                onClose={() => {
                  setIsShowTempMode(false);
                }}
              />
            </div>

        </article>
  );
}

export default Bormal_foot;

