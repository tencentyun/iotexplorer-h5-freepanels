import React, {useState} from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { Cell, Switch } from '@components/base';
import { getThemeType } from '@libs/theme';
import { toggleBooleanByNumber } from '@libs/utillib';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './setting.less';
import TwoWifiName from './twoWifiName/twoWifiName';
import TwoWifiPassword from './twoWifiPassword/twoWifiPassword';
import FiveWifiName from './fiveWifiName/fiveWifiName';
import FiveWifiPassword from './fiveWifiPassword/fiveWifiPassword';

export function Setting() {
  const themeType = getThemeType();
  // 2.4G
  const [isShowTwoFour, setIsShowTwoFour] = useState(false);
  const [isShowTwoFourPwd, setIsShowTwoFourPwd] = useState(false);
  // 5G
  const [isShowFive, setIsShowFive] = useState(false);
  const [isShowFivePwd, setIsShowFivePwd] = useState(false);
  return (
    <article className={classNames('setting')}>
      <ul className="setting-list">
        <li className="list-item">
          <div className="item-title">2.4G Wi-Fi</div>
          <Cell
            size="medium"
            title="Wi-Fi开关"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.switch_24g ? sdk.deviceData.switch_24g : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ switch_24g: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="Wi-Fi名称"
            value={sdk.deviceData.name_24g}
            valueStyle="gray"
            onClick={() => {
              setIsShowTwoFour(true);
            }}
          />
          <Cell
            size="medium"
            title="Wi-Fi密码"
            value={sdk.deviceData.sta_config_24g}
            valueStyle="gray"
            onClick={() => {
              setIsShowTwoFourPwd(true);
            }}
          />
        </li>
        <li className="list-item">
          <div className="item-title">5G Wi-Fi</div>
          <Cell
            size="medium"
            title="Wi-Fi开关"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.switch_5g ? sdk.deviceData.switch_5g : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ switch_5g: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="Wi-Fi名称"
            value={sdk.deviceData.name_5g}
            valueStyle="gray"
            onClick={() => {
              setIsShowFive(true);
            }}
          />
          <Cell
            size="medium"
            title="Wi-Fi密码"
            value={sdk.deviceData.sta_config_5g}
            valueStyle="gray"
            onClick={() => {
              setIsShowFivePwd(true);
            }}
          />
        </li>
      </ul>
      <TwoWifiName
        isShow={isShowTwoFour}
        onClose={() => {
          setIsShowTwoFour(false);
        }}
      />
      <TwoWifiPassword
        isShow={isShowTwoFourPwd}
        onClose={() => {
          setIsShowTwoFourPwd(false);
        }}
      />
      <FiveWifiName
        isShow={isShowFive}
        onClose={() => {
          setIsShowFive(false);
        }}
      />
      <FiveWifiPassword
        isShow={isShowFivePwd}
        onClose={() => {
          setIsShowFivePwd(false);
        }}
      />
    </article>
  );
}
