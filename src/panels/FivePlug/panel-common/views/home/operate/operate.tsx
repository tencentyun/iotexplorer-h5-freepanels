import React, { useState } from 'react';
import classNames from 'classnames';
import './operate.less';

import { TimePicker } from '@components/business';
import { getThemeType } from '@libs/theme';
import { SvgIcon } from '@components/common/icon';
import { useHistory } from 'react-router';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';

const operate = () => {
  const themeType = getThemeType();
  const history = useHistory();
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
    </div>
  );
};
export default operate;
