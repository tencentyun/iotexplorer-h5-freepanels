import React, {useState} from 'react';
import classNames from 'classnames';
import './environment.less';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import {TimePicker} from '@components/business';
import {SvgIcon} from '@components/common/icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {useHistory} from 'react-router-dom';

const Environment = () => {
  const history = useHistory();
  const themeType = getThemeType()=='normal'?'default':getThemeType();

  const togglePower = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1
    });
  };

  const toggleScene = () => {
    if(sdk.deviceData.power_switch === 1){
      history.push('/scene');
    }
  };
  // 倒计时
  const [countDownVisible, onToggleCountDown] = useState(false);
  const handleCountdownDefault = (value: number) => {
    const hours: number = (value - value % (60 * 60)) / (60 * 60);
    const minutes: number = (value % (60 * 60)) / (60);
    const countdownTime: any = [hours.toString(), minutes.toString()];
    return countdownTime;
  };

  const handleCountdownVal = () => {
    let switchOpen = sdk.deviceData.count_down;
    return handleCountdownDefault(switchOpen);
  };
  const handleCountdown = () =>{
    if(sdk.deviceData.power_switch === 1){
      onToggleCountDown(true);
    }
  };
  return (
    <article className={classNames('environment')}>
      <div className={'environment-wrap'}>
        <div id={'work'} onClick={toggleScene} className={classNames('work')}>
          <SvgIcon
           name={sdk.deviceData.power_switch === 1 ? 'icon-lamp-working-' + themeType : 'icon-lamp-working-close-' + themeType} color="#0F0F0F" width={60} height={60}/>
          <div className='work_font'>工作模式</div>
        </div>
        <div id={'power'} onClick={togglePower}>
          <SvgIcon name={sdk.deviceData.power_switch === 1 ? 'icon-lamp-switch-' + themeType : 'icon-lamp-switch-close-' + themeType} color="#0F0F0F" className="switch-button" width={180}
                   height={120}/>
        </div>
        <div id={'hand'} className={classNames('clock')} onClick={handleCountdown}>
          <SvgIcon name={sdk.deviceData.power_switch === 1 ? 'icon-lamp-countdown-' + themeType : 'icon-lamp-countdown-close-' + themeType} color="#0F0F0F" width={60} height={60}/>
          <div className='clock_font'>倒计时</div>
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
            const hour: number = Number(value[0].split('时')[0]);
            const mins: number = Number(value[1].split('分')[0]);
            const num = hour * 3600 + mins * 60;
            onControlDevice('count_down', num);
          }}
          visible={countDownVisible}
        />
      </div>
    </article>
  );
};

export default Environment;
