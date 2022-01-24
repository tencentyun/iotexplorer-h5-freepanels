import React, {useState} from 'react';
import './bormal_foot.less'
import classNames from 'classnames';
import {SvgIcon} from '@components/common/icon';
import {useHistory} from 'react-router-dom';
import PurifierList from '../../purifier-list/purifier_list';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {apiControlDeviceData} from '@hooks/useDeviceData';
import TempModel from "../../temp_model/temp_model";
import {getThemeType} from '@libs/theme';
import {toggleBooleanByNumber} from '@libs/utillib';
import {Switch} from "@components/base";


export function Bormal_foot() {
  const themeType = getThemeType();
  // const [lampSrc] = useState(lampIcon);
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
        switch_flow: sdk.deviceData.switch_flow === 1 ? 0 : 1
      });
    }
  };

  return (
    <article id={'morandi_bormal_foot'} className={classNames('morandi_bormal_foot')}>
      <div className="foot_card">
        <div className="card_left">
          <img className="card_img"
               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/purifier-water/purifier-water-purifier-normal.png"
               alt=""/>
        </div>

        <div className="card_right">
          <div className="font_top">
            <div>原水TDS</div>
            <div>{sdk.deviceData.tds_in ? sdk.deviceData.tds_in : 0}</div>
          </div>

          <div className="across"></div>

          <div className="font_foot">
            <div>净水TDS</div>
            <div>{sdk.deviceData.tds_out ? sdk.deviceData.tds_out : 0}</div>
          </div>
        </div>
      </div>
      <div>
        <PurifierList/>
      </div>

      <div className="foot_botton">
        <div className="botton_switch">
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
            name={sdk.deviceData.switch_flow === 1 && 'icon-purifier-take-water-morandi' || 'icon-purifier-take-water-notopen-morandi'}
            color="#000000" width={50} height={50}/>
        </div>
        <div onClick={() => sdk.deviceData.switch === 1 ? setIsShowTempMode(true) : ''}>
          <SvgIcon
            name={sdk.deviceData.switch === 1 && 'icon-purifier-coffee-morandi' || 'icon-purifier-coffee-notopen-morandi'}
            color="#000000" width={50} height={50}/>
        </div>

        <div onClick={onSetup}>
          <SvgIcon
            name={sdk.deviceData.switch === 1 && 'icon-purifier-setup-morandi' || 'icon-purifier-setup-notopen-morandi'}
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

