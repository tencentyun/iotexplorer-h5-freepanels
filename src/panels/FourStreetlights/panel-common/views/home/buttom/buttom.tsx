import React from 'react';
import './buttom.less';
import classNames from 'classnames';
import { SvgIcon } from '@components/common/icon';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useHistory } from 'react-router';

export function Buttom() {
  const handlePower = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1,
    });
  };
  const themeType = getThemeType();
  const history = useHistory();
  const handleToggle = () => history.push('/timer');
  return (
    <article id={'buttom_card'} className={classNames('buttom_card')}>
      <div
        id="power"
        className="buttom_switch"
        onClick={handlePower}
      >
        <div className="icon">
          <SvgIcon
            name={sdk.deviceData.power_switch === 1 && `icon-four-bw-switch-${themeType}` || `icon-four-bw-switch-${themeType}2`}
            color="#000000" width={60} height={60}/>
        </div>

        <div className="switch_font">
          开关
        </div>
      </div>

      <div className="buttom_timing" onClick={handleToggle}>
        <div className="icon">
          <SvgIcon
            name={sdk.deviceData.power_switch === 1 && `icon-four-bw-timer-${themeType}` || `icon-four-bw-timer-${themeType}2`}
            color="#000000" width={60} height={60}/>
        </div>
        <div className="switch_font">
          定时
        </div>
      </div>
    </article>
  );
}
