import React, { useState } from 'react';
import classNames from 'classnames';
import './operate.less';

import { ValuePicker } from '@components/business';
import { getThemeType } from '@libs/theme';
import { numberToArray } from '@libs/utillib';
import { SvgIcon } from '@components/common/icon';
import { useHistory } from 'react-router';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';

const operate = () => {
  const themeType = getThemeType();
  const history = useHistory();
  // 倒计时关闭
  const [countDownVisible, onToggleCountDown] = useState(false);
  // const [powerOff, onTogglePower] = useState(false);
  const [countdownTime, setCountdown] = useState([]);
  const countDownColumns = () => {
    const hourCols = numberToArray(12, '时');
    const minuteCols = numberToArray(60, '分');

    return [hourCols, minuteCols];
  };
  const handleCountdown = () => {
    onToggleCountDown(true);
  };
  const handleToggle = () => history.push('/timer');
  const handlePower = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1,
    });
  };
  return (
    <div id={'operate-wrap'} className={classNames('operate-wrap')}>

      <div id={'clock'} className={classNames('clock')} onClick={handleToggle}>
        <SvgIcon
          name={sdk.deviceData.power_switch === 1 && `icon-timer-${themeType}2` || `icon-timer-${themeType}`}/>
        <div className={classNames('clock_time')}>
          定时
        </div>
      </div>

      <div id="power" onClick={handlePower} className={classNames('powerWrap')}>

        {/* {(sdk.deviceData.power_switch===0) ? <img src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/water-heater/open-dark.png" alt="" />:
            <SvgIcon name={'icon-total_switch-'+themeType+2} width={230} height={230} />
            } */}
        {sdk.deviceData.power_switch === 1 ? (
          <SvgIcon
            name={`icon-total_switch-${themeType}2`}
            color="#2D3134" />
        ) : (
          <SvgIcon
            name={`icon-total_switch-${themeType}`}
            color="#2D3134" />
        )}
      </div>
      <div id={'setting'} className={classNames('work_mode')} onClick={handleCountdown}>
        <SvgIcon
          name={sdk.deviceData.power_switch === 1 && `icon-settings-${themeType}2` || `icon-settings-${themeType}`}/>
        <div className={classNames('work_font')}>
          设置
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
          onToggleCountDown(false);
        }}
      />
    </div>
  );
};
export default operate;
