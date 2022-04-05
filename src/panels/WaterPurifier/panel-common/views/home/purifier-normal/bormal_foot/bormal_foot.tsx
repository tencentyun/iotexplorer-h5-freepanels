import React, { useState } from 'react';
import './bormal_foot.less';
import classNames from 'classnames';
import { SvgIcon } from '@components/common/icon';
import { useHistory } from 'react-router-dom';
import PurifierList from '../../purifier-list/purifier_list';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import TempModel from '../../temp_model/temp_model';
import { Switch } from '@components/base';
import { toggleBooleanByNumber } from '@libs/utillib';
import { getThemeType } from '@libs/theme';

const themeType = getThemeType();
export function Bormal_foot() {
  const [isShowTempModeVisible, setIsShowTempMode] = useState(false);
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
  return (
    <article id={'bormal_foot'} className={classNames('bormal_foot')}>
      <PurifierList/>
      <div className="across">

      </div>
      <div className="bormal_foot_botton">
        <div>
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
        <div onClick={onSwitchFlow}>
          <SvgIcon
            name={sdk.deviceData.switch_flow === 1 && 'icon-purifier-take-water-normal' || 'icon-purifier-take-water-notopen-normal'}
            color="#000000" width={50} height={50}/>
        </div>
        <div onClick={() => (sdk.deviceData.switch === 1 ? setIsShowTempMode(true) : '')}>
          <SvgIcon
            name={sdk.deviceData.switch === 1 && 'icon-purifier-coffee-normal' || 'icon-purifier-coffee-notopen-normal'}
            color="#000000" width={50} height={50}/>
        </div>
        <div onClick={onSetup}>
          <SvgIcon
            name={sdk.deviceData.switch === 1 && 'icon-purifier-setup-normal' || 'icon-purifier-setup-notopen-normal'}
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
}

export default Bormal_foot;

