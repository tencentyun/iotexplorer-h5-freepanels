import React, {useState} from 'react';
import './bormal_foot.less';
import classNames from 'classnames';
import {SvgIcon} from '@components/common/icon';
import {Switch} from '@components/base';
import {useHistory} from 'react-router-dom';
import PurifierList from '../../purifier-list/purifier_list';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {apiControlDeviceData} from '@hooks/useDeviceData';
import TempModel from "../../temp_model/temp_model";
import {toggleBooleanByNumber} from '@libs/utillib';
import {getThemeType} from '@libs/theme';
export function Bormal_foot() {
  const themeType = getThemeType();
  // const [lampSrc] = useState(lampIcon);
  const [isShowTempModeVisible, setIsShowTempMode] = useState(false);

  const history = useHistory();

  const onSetup = () => {
    if (sdk.deviceData.switch === 1) {
      history.push('/setup')
    }
  }
  const onSwitchFlow = () => {
    if (sdk.deviceData.switch === 1) {
      apiControlDeviceData({
        switch_flow: sdk.deviceData.switch_flow === 1 ? 0 : 1
      });
    }
  }
  return (
    <article id={'bluewhite_bormal_foot'} className={classNames('bluewhite_bormal_foot')}>
      <PurifierList/>
      <div className="foot_botton">
        <div>
          <Switch
            name={''}
            theme={themeType}
            checked={toggleBooleanByNumber(
              sdk.deviceData.switch ? sdk.deviceData.switch : 0
            )}
            onChange={(value: boolean) => {
              apiControlDeviceData({
                switch: value ? 1 : 0,
                switch_flow: 0
              });
            }}
          />
        </div>

        <div onClick={onSwitchFlow} className="water_icon">
          <SvgIcon
            name={sdk.deviceData.switch_flow === 1 && 'icon-purifier-take-water-blueWhite' || 'icon-purifier-take-water-notopen-blueWhite'}
            color="#000000" width={50} height={50}/>
        </div>
        <div onClick={() => sdk.deviceData.switch === 1 ? setIsShowTempMode(true) : ''}>
          <SvgIcon
            name={sdk.deviceData.switch === 1 && 'icon-purifier-coffee-blueWhite' || 'icon-purifier-coffee-notopen-blueWhite'}
            color="#000000" width={50} height={50}/>
        </div>

        <div onClick={onSetup}>
          <SvgIcon
            name={sdk.deviceData.switch === 1 && 'icon-purifier-setup-blueWhite' || 'icon-purifier-setup-notopen-blueWhite'}
            color="#000000" width={50} height={50}/>
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
};

export default Bormal_foot;

