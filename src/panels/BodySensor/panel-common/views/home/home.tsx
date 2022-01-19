import React, {useState} from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {Battery} from '@components/business';
import {getThemeType} from '@libs/theme';
import {Cell} from '@components/base';
import PirVisible from './pirVisible/pirVisible';
import KeepTime from './keepTime/keepTime';
import './home.less';
import PersonImage from '../icons/normal/person.svg';
import PersonImageBlueWhite from '../icons/blue-white/person.svg';
import PersonImageDark from '../icons/dark/person.svg';
import PersonImageColorful from '../icons/colorful/person.svg';
import PersonImageMorandi from '../icons/morandi/person.svg';
import AlarmImage from '../icons/normal/alarm.svg';
import AlarmImageBlueWhite from '../icons/blue-white/alarm.svg';
import AlarmImageDark from '../icons/dark/alarm.svg';
import AlarmImageColorful from '../icons/colorful/alarm.svg';
import AlarmImageMorandi from '../icons/morandi/alarm.svg';
import SensitivityImage from '../icons/normal/sensitivity.svg';
import SensitivityImageBlueWhite from '../icons/blue-white/sensitivity.svg';
import SensitivityImageDark from '../icons/dark/sensitivity.svg';
import SensitivityImageColorful from '../icons/colorful/sensitivity.svg';
import SensitivityImageMorandi from '../icons/morandi/sensitivity.svg';
import TimeImage from '../icons/normal/time.svg';
import TimeImageBlueWhite from '../icons/blue-white/time.svg';
import TimeImageDark from '../icons/dark/time.svg';
import TimeImageColorful from '../icons/colorful/time.svg';
import TimeImageMorandi from '../icons/morandi/time.svg';

export function Home() {
  const themeType = getThemeType();
  const [isShowPirVisible, setIsShowPir] = useState(false);
  const [isShowKeepTimeVisible, setIsShowKeepTime] = useState(false);
  const personImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return PersonImage;
      case 'blueWhite':
        return PersonImageBlueWhite;
      case 'dark':
        return PersonImageDark;
      case 'colorful':
        return PersonImageColorful;
      case 'morandi':
        return PersonImageMorandi;
      default:
        return PersonImage;
    }
  };

  const alarmImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return AlarmImage;
      case 'blueWhite':
        return AlarmImageBlueWhite;
      case 'dark':
        return AlarmImageDark;
      case 'colorful':
        return AlarmImageColorful;
      case 'morandi':
        return AlarmImageMorandi;
      default:
        return AlarmImage;
    }
  };

  const sensitivityImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SensitivityImage;
      case 'blueWhite':
        return SensitivityImageBlueWhite;
      case 'dark':
        return SensitivityImageDark;
      case 'colorful':
        return SensitivityImageColorful;
      case 'morandi':
        return SensitivityImageMorandi;
      default:
        return SensitivityImage;
    }
  };

  const timeImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return TimeImage;
      case 'blueWhite':
        return TimeImageBlueWhite;
      case 'dark':
        return TimeImageDark;
      case 'colorful':
        return TimeImageColorful;
      case 'morandi':
        return TimeImageMorandi;
      default:
        return TimeImage;
    }
  };
  const pirSensitivityVal = (val: String) => {
    switch (val) {
      case 'low':
        return '低灵敏度';
      case 'middle':
        return '中灵敏度';
      case 'high':
        return '高灵敏度';
      default:
        return '';
    }
  };
  const keepTimeVal = (val: String) => {
    switch (val) {
      case 'thirtySecond':
        return '有人30S';
      case 'sixtySecond':
        return '有人60S';
      case 'oneHundredAndTwentySecond':
        return '有人120S';
      default:
        return '';
    }
  };
  const BatteryColor = () => {
    switch (themeType) {
      case 'blueWhite':
        return 'white';
      case 'dark':
        return 'white';
      case 'colorful':
        return 'green';
      default:
        return '';
    }
  };
  const cellIcon = (url: string) => (
    <img className="details-icon" src={url}></img>
  );
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 0 && 'power-off'
      )}
    >
      {/*电量*/}
      <Battery
        isShowPercent={false}
        isShowTip={false}
        value={sdk.deviceData.battery_percentage}
        color={BatteryColor()}
      />
      {/*仪表盘*/}
      <section className={classNames('dashboard')}>
        <div className="ticker">
          <section>
            <img src={personImageSrc()} alt=""/>
            <div className="value">人体感应状态</div>
          </section>
          <div className="bg"></div>
        </div>
      </section>
      <div className={classNames('position-wrap', 'text-align-center')}>
        <ul className={classNames('flex', 'space-between')}>
          <li className={sdk.deviceData.pir_state === '0' ? 'active' : ''}>
            检测有人
            <br/>
            移动
          </li>
          <li className="line">|</li>
          <li className={sdk.deviceData.pir_state !== '0' ? 'active' : ''}>
            没有检测到人经过
          </li>
        </ul>
      </div>
      {/* 控制区 */}
      <div className="product-setting">
        <Cell
          className="_color_white_"
          title="防拆报警"
          isLink={false}
          value={
            sdk.deviceData.tamper_event === '1' ? '拆卸告警' : '未拆卸'
          }
          valueStyle="gray"
          prefixIcon={cellIcon(alarmImageSrc())}
          size="medium"
        />
        <Cell
          className="_color_white_"
          title="PIR灵敏度"
          value={
            sdk.deviceData.pir_sensitivity
              ? pirSensitivityVal(sdk.deviceData.pir_sensitivity)
              : ''
          }
          valueStyle="gray"
          size="medium"
          prefixIcon={cellIcon(sensitivityImageSrc())}
          onClick={() => setIsShowPir(true)}
        >
          {/*<ListPicker
                visible={isShowPirVisible}
                title="PIR灵敏度"
                defaultValue={[deviceData['keep_time']]}
                options={[
                  {
                    label: '有人30S',
                    value: 'thirtySecond'
                  },
                  {
                    label: '有人60S',
                    value: 'sixtySecond'
                  },
                  {
                    label: '有人120S',
                    value: 'oneHundredAndTwentySecond'
                  }
                ]}
                onCancel={() => setIsShowPir(false)}
                onConfirm={value => {
                  onControlDevice('keep_time', value[0]);
                  setIsShowPir(false);
                }}
              />*/}
        </Cell>
        <Cell
          className="_color_white_"
          title="有人保持时间"
          value={
            sdk.deviceData.keep_time
              ? keepTimeVal(sdk.deviceData.keep_time)
              : ''
          }
          valueStyle="gray"
          size="medium"
          prefixIcon={cellIcon(timeImageSrc())}
          onClick={() => setIsShowKeepTime(true)}
        />
        <PirVisible
          isShow={isShowPirVisible}
          onClose={() => {
            setIsShowPir(false);
          }}
        />
        <KeepTime
          isShow={isShowKeepTimeVisible}
          onClose={() => {
            setIsShowKeepTime(false);
          }}
        />
      </div>
    </article>
  );
}
