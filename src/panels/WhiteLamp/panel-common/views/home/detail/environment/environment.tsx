import React from 'react';
import classNames from 'classnames';
import './environment.less';
import {SvgIcon} from '@components/common/icon';
import {getThemeType} from '@libs/theme';
import {apiControlDeviceData} from '@hooks/useDeviceData';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {useHistory} from 'react-router';

const Environment = () => {
  const themeType = getThemeType();
  const history = useHistory();
  const handlePower = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1
    });
  };
  const handleToggle = () => {
    return history.push('/timer');
  };
  return (
    <article className={classNames('environment')}>
      <div className={'environment-wrap'}>
        <div id={'power-new'} className={classNames('power')} onClick={handlePower}>
          {/* <img src={workSrc} alt="" /> */}
          <SvgIcon
            name={sdk.deviceData.power_switch != 1 && 'icon-white-lamp-switch-' + themeType + '2' || 'icon-white-lamp-switch-' + themeType}
            color="#0F0F0F" width={79} height={78}/>
          <div className={classNames('clock_height')}>开关</div>
        </div>

        <div id={'hand'} className={classNames('clock')} onClick={handleToggle}>
          <SvgIcon
            name={sdk.deviceData.power_switch != 1 && 'icon-white-lamp-timer-' + themeType + '2' || 'icon-white-lamp-timer-' + themeType}
            color="#0F0F0F" width={79} height={78}/>
          <div className={classNames('clock_height')}>定时</div>
        </div>
      </div>
    </article>
  );
};

export default Environment;
