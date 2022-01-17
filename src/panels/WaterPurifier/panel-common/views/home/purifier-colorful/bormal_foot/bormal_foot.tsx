import React, {useState} from 'react';
import './bormal_foot.less';
import classNames from 'classnames';
import {SvgIcon} from '@components/common/icon';
import {useHistory} from 'react-router-dom';
import PurifierListColorful from '../purifier-list-colorful/purifier_list_colorful';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {apiControlDeviceData} from '@hooks/useDeviceData';
import TempModel from "../../temp_model/temp_model";
import {getThemeType} from '@libs/theme';
import {toggleBooleanByNumber} from '@libs/utillib';
import {Switch} from "@components/base";

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
        switch_flow: sdk.deviceData.switch_flow === 1 ? 0 : 1
      });
    }
  }

  return (
    <article id={'colorful_bormal_foot'} className={classNames('colorful_bormal_foot')}>

      <div className="foot_card">
        <PurifierListColorful/>
      </div>

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
            name={sdk.deviceData.switch === 1 && 'icon-purifier-take-water-colorful' || 'icon-purifier-take-water-notopen-colorful'}
            color="#000000" width={59} height={66}/>
        </div>
        <div onClick={() => sdk.deviceData.switch === 1 ? setIsShowTempMode(true) : ''}>
          <SvgIcon
            name={sdk.deviceData.switch === 1 && 'icon-purifier-coffee-colorful' || 'icon-purifier-coffee-notopen-colorful'}
            color="#000000" width={77} height={70}/>
        </div>


        <div onClick={onSetup}>
          <SvgIcon
            name={sdk.deviceData.switch === 1 && 'icon-purifier-setup-colorful' || 'icon-purifier-setup-notopen-colorful'}
            color="#000000" width={66} height={66}/>
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
;

export default Bormal_foot;

