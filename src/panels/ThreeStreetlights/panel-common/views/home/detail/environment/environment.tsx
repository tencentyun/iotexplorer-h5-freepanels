import React, {useState} from 'react';
import classNames from 'classnames';
import './environment.less';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import {ValuePicker} from '@components/business';
import {numberToArray} from '@libs/utillib';
import {SvgIcon} from '@components/common/icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {useHistory} from 'react-router-dom';

const themeType = getThemeType();
const Environment = () => {
  const history = useHistory();

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
  const [countdownTime] = useState([]);
  const countDownColumns = () => {
    const hourCols = numberToArray(12, '时');
    const minuteCols = numberToArray(60, '分');

    return [hourCols, minuteCols];
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
          <SvgIcon name={sdk.deviceData.power_switch === 1 ? 'icon-lamp-working-' + themeType : 'icon-lamp-working-close-' + themeType} color="#0F0F0F" width={75} height={75}/>
          <div className='work_font'>工作模式</div>
        </div>
        <div id={'power'} onClick={togglePower}>
          <SvgIcon name={sdk.deviceData.power_switch === 1 ? 'icon-lamp-switch-' + themeType : 'icon-lamp-switch-close-' + themeType} color="#0F0F0F" className="switch-button" width={180}
                   height={180}/>
        </div>
        <div id={'hand'} className={classNames('clock')} onClick={handleCountdown}>
          <SvgIcon name={sdk.deviceData.power_switch === 1 ? 'icon-lamp-countdown-' + themeType : 'icon-lamp-countdown-close-' + themeType} color="#0F0F0F" width={75} height={75}/>
          <div className='clock_font'>倒计时</div>
        </div>
        <ValuePicker
          title="倒计时关闭"
          visible={countDownVisible}
          value={countdownTime}
          columns={countDownColumns()}
          onCancel={() => {
            onToggleCountDown(false);
          }}
          onConfirm={value => {
            let hour = value[0];
            let minute = value[1];
            if (hour != null) {
              hour = hour.substr(0, hour.length - 1);
            }
            if (minute != null) {
              minute = minute.substr(0, minute.length - 1);
            }
            const countDown = Number(hour) * 3600 + Number(minute) * 60;
            if (sdk.deviceData.power_switch === 1) {
              onControlDevice('count_down', countDown);
            }
            onToggleCountDown(false);
          }}
        />
      </div>
    </article>
  );
};

export default Environment;
