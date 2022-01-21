import React, {useEffect} from 'react';
import classNames from 'classnames';
import sdk from "qcloud-iotexplorer-h5-panel-sdk";
import { getThemeType } from '@libs/theme';
import {apiControlDeviceData} from '@hooks/useDeviceData';
import { Detail } from './detail/detail';
import './home.less';
const KeyImage =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/insert-key-power/normal/insert-key.svg';
const KeyImageClose =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/insert-key-power/normal/insert-key-close.svg';
const KeyImageBlueWhite =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/insert-key-power/blue-white/insert-key.svg';
const KeyImageBlueWhiteClose =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/insert-key-power/blue-white/insert-key-close.svg';
const KeyImageMorandi =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/insert-key-power/morandi/insert-key.svg';
const KeyImageMorandiClose =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/insert-key-power/morandi/insert-key-close.svg';
export function Home() {
  const themeType = getThemeType();
  useEffect(() => {
    apiControlDeviceData({
      switch: sdk.deviceData.card_status_report === '1' ? 1 : 0
    });
  }, []);
  const sleepImageSrc = () => {
    switch (themeType) {
      case 'blueWhite':
        return sdk.deviceData.power_switch === 1
          ? KeyImageBlueWhite
          : KeyImageBlueWhiteClose;
      case 'morandi':
        return sdk.deviceData.power_switch === 1
          ? KeyImageMorandi
          : KeyImageMorandiClose;
      default:
        return sdk.deviceData.power_switch === 1
          ? KeyImage
          : KeyImageClose;
    }
  };
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.switch === 1 ? '' : 'power-off'
      )}
    >
      {/*仪表盘*/}
      <section className={classNames('dashboard')}>
        <img src={sleepImageSrc()} alt="" />
      </section>
      {/*详情区域*/}
      <Detail />
    </article>
  );
}
