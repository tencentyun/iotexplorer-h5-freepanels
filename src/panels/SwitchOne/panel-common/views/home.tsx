/*
 * @Author: wrq
 * @Date: 2021-10-16 14:51:26
 * @Description: 首页
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Block } from '@components/layout';
import { BizSwitch } from '@components/business';
// import { ValuePicker } from '@components/business';
import { TimePicker } from '@components/business';
// import { numberToArray } from '@libs/utillib';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Home() {
  const themeType = getThemeType();
  const history = useHistory();

  // 倒计时
  const [countDownVisible, onToggleCountDown] = useState(false);
  // const [countdownTime, setCountdown] = useState([]);
  const [enterFlag, setEnterFlag] = useState(false);
  // const countDownColumns = () => {
  //   const hourCols = numberToArray(12, '时');
  //   const minuteCols = numberToArray(60, '分');

  //   return [hourCols, minuteCols];
  // };

  const handleCountdownDefault = (value: number) => {
    // (value - value % (60 * 60)) / (60 * 60)
    const hours: number = (value - value % (60 * 60)) / (60 * 60);
    const minutes: number = (value % (60 * 60)) / (60);
    const countdownTime: any = [hours.toString(), minutes.toString()];
    return countdownTime;
  };

  const handleCountdown = () => {
    onToggleCountDown(true);
  };

  const handleClock = () => {
    history.push('/timing');
  };

  const handleSetting = () => {
    sdk.goDeviceDetailPage();
  };

  return (
    <div className="switch-one-home-view">
      <div className="settings" onClick={handleSetting}>
        <div className="icon-more"></div>
      </div>
      <BizSwitch
        className="biz-switch"
        name="开关1"
        value={sdk.deviceData.power_switch === 1 }
        theme={themeType}
        onInitChange={(value) => {
          setEnterFlag(value);
        }}
        onChange={(value) => {
          if (enterFlag) {
            onControlDevice('power_switch', value ? 1 : 0);
          }
        }}
      />

      <div className="switch-setting">
        <Block
          className="setting-button"
          onClick={() => {
            handleClock();
          }}
        >
          <div className="button-icon icon-clock"></div>
          <p className="button-name">定时</p>
        </Block>
        <Block
          className="setting-button"
          onClick={handleCountdown}
        >
          <div className="button-icon icon-countdown"></div>
          <p className="button-name">倒计时</p>
        </Block>
      </div>
      <TimePicker
        showSemicolon={false}
        value={handleCountdownDefault(sdk.deviceData.count_down)}
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
}
