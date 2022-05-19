import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './buttom.less';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { SvgIcon } from '@components/common/icon';
import { TimePicker } from '@components/business';
import { useHistory } from 'react-router';

export function Buttom() {
  const themeType = getThemeType();
  // 倒计时关闭
  const [countDownVisible, onToggleCountDown] = useState(false);

  const handleCountdownDefault = (value: number) => {
    const hours: number = (value - value % (60 * 60)) / (60 * 60);
    const minutes: number = (value % (60 * 60)) / (60);
    const countdownTime: any = [hours.toString(), minutes.toString()];
    return countdownTime;
  };

  const handleCountdownVal = () => {
    const switchOpen = sdk.deviceData.count_down;
    return handleCountdownDefault(switchOpen);
  };
  const handleCountdown = () => {
    onToggleCountDown(true);
  };
  const handlePower = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1,
    });
  };
  const history = useHistory();
  const handleToggle = () => history.push('/timer');
  return (
    <article id={'buttom'} className={classNames('buttom')}>
      <div className="buttom_switch" onClick={handleToggle}>
        <div className="icon">
          <SvgIcon
            name={sdk.deviceData.power_switch === 1 && `icon-five-bw-timer-${themeType}` || `icon-five-bw-timer-${themeType}2`}
            color="#000000" width={60} height={60}/>
        </div>

        <div className="timing_font">
          定时
        </div>
      </div>
      <div id="power" onClick={handlePower}>
        <SvgIcon
          name={sdk.deviceData.power_switch === 1 && `icon-five-bw-switch-${themeType}` || `icon-five-bw-switch-${themeType}2`}
          color="#000000" width={140} height={140}/>
      </div>
      <div className="buttom_timing" onClick={handleCountdown}>
        <div className="icon">
          <SvgIcon
            name={sdk.deviceData.power_switch === 1 && `icon-five-bw-countdown-${themeType}` || `icon-five-bw-countdown-${themeType}2`}
            color="#000000" width={60} height={60}/>
        </div>
        <div className="timing_font">
          倒计时
        </div>
      </div>

      <TimePicker
        showSemicolon={false}
        value={handleCountdownVal()}
        showUnit={true}
        showTime={false}
        showTwoDigit={false}
        theme={themeType}
        title="倒计时关闭"
        onCancel={onToggleCountDown.bind(null, false)}
        onConfirm={(value: any) => {
          const hour = Number(value[0].split('时')[0]);
          const mins = Number(value[1].split('分')[0]);
          const num = hour * 3600 + mins * 60;
          onControlDevice('count_down', num);
        }}
        visible={countDownVisible}
      />
    </article>
  );
}
