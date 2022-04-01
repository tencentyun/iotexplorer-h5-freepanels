import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './buttom.less';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { SvgIcon } from '@components/common/icon';
import { ValuePicker } from '@components/business';
import { numberToArray } from '@libs/utillib';
import { useHistory } from 'react-router';

export function Buttom() {
  const themeType = getThemeType();
  // 倒计时关闭
  const [countDownVisible, onToggleCountDown] = useState(false);
  const [countdownTime, setCountdown] = useState([]);
  const countDownColumns = () => {
    const hourCols = numberToArray(12, '时');
    const minuteCols = numberToArray(60, '分');

    return [hourCols, minuteCols];
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
      <ValuePicker
        title="倒计时关闭"
        visible={countDownVisible}
        value={countdownTime}
        columns={countDownColumns()}
        onCancel={() => onToggleCountDown(false)}
        onConfirm={(value) => {
          let hour = value[0];
          let minute = value[1];
          if (hour != null) {
            hour = hour.substr(0, hour.length - 1);
          }
          if (minute != null) {
            minute = minute.substr(0, minute.length - 1);
          }
          const countDown = Number(hour) * 3600 + Number(minute) * 60;
          onControlDevice('count_down', Number(countDown));
        }}
      />
    </article>
  );
}
