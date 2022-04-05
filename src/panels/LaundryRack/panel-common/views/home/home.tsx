import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './home.less';
import { Detail } from './detail/detail';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import { useDidMount } from 'beautiful-react-hooks';

import iconUp from '../icons/normal/lr-rack-up.svg';
import iconMiddle from '../icons/normal/lr-rack-middle.svg';
const iconDown =      'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/laundry-rack/normal/down.svg';

export function Home() {
  const [position, setPosition] = useState((sdk.deviceData.position >= 0 && sdk.deviceData.position <= 100)
    ? sdk.deviceData.position : 0);
  const [srcDown] = useState(iconDown);
  const [animInfo, setAnimInfo] = useState({ dire: '' });
  const progress = useRef();
  const PROCESS_MIN = 12;
  const PROCESS_MAX = 58;

  const stopAnim = () => {
    const ts = new Date().getTime() - animInfo.sTime;
    if (!animInfo.sTime) {
      return position == undefined ? 0 : position;
    }
    const { tSpan } = animInfo;
    let newPosition = ts / tSpan * (animInfo.h2 - animInfo.h1) + animInfo.h1;
    if (newPosition <= 0) newPosition = 0;
    else if (newPosition >= 100) newPosition = 100;
    setPosition(newPosition);
    progress.current.style.height = `${newPosition * (PROCESS_MAX - PROCESS_MIN) / 100.0 + PROCESS_MIN}%`;
    progress.current.style.transition = null;
    apiControlDeviceData({
      position: newPosition,
    });
    setAnimInfo({ dire: '' });
    return newPosition;
  };
  useEffect(() => {
    if (sdk.deviceData.control === 'stop') {
      stopAnim();
    }

    if (sdk.deviceData.control === 'down') {
      let curPosition = position;
      if (animInfo.dire === 'up') {
        curPosition = stopAnim();
      }
      const tSpan = 5 * (100 - curPosition) / 100.0;
      if (tSpan == 0) return;
      progress.current.style.transition = `height ${tSpan}s linear`;
      progress.current.style.height = `${PROCESS_MAX}%`;
      setAnimInfo({ sTime: new Date().getTime(), tSpan: tSpan * 1000.0, h1: curPosition, h2: 100, dire: 'down' });
    } else if (sdk.deviceData.control === 'up') {
      let curPosition = position;
      if (animInfo.dire === 'down') {
        curPosition = stopAnim();
      }
      const tSpan = 5 * (curPosition - 0) / 100.0;
      if (tSpan == 0) return;
      progress.current.style.transition = `height ${tSpan}s linear`;
      progress.current.style.height = `${PROCESS_MIN}%`;
      setAnimInfo({ sTime: new Date().getTime(), tSpan: tSpan * 1000.0, h1: curPosition, h2: 0, dire: 'up' });
    }
  }, [sdk.deviceData.control]);

  const onTransitionEnd = () => {
    setPosition(animInfo.h2);
    apiControlDeviceData({
      position: animInfo.h2,
    });
  };

  useDidMount(() => {
    progress.current.style.height = `${position * (PROCESS_MAX - PROCESS_MIN) / 100.0 + PROCESS_MIN}%`;
  });
  const getTimeToHour = (time: number) => {
    const minute = (time % 3600 / 60).toString().length < 2
      ? `0${(time % 3600 / 60).toString()}` : (time % 3600 / 60).toString();
    const hour = Math.floor(time / 3600).toString().length < 2
      ? `0${Math.floor(time / 3600).toString()}` : Math.floor(time / 3600).toString();
    const times = ` ${hour}:${minute}:00`;
    return times;
  };
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 1 ? '' : 'power-off',
      )}
    >
      <section className={classNames('dashboard')}>
        <div className={classNames('lr-rack-wrapper')}>
          <img className={classNames('lr-rack-img-up')} src={iconUp} alt="" />
          <div className={classNames('lr-rack-div-middle')} >
            <div onTransitionEnd={onTransitionEnd} ref={progress} className={classNames('lr-rack-div-progress')}>
              <img className={classNames('lr-rack-img-middle')} src={iconMiddle} alt=""/>
            </div>
            <img className={classNames('lr-rack-img-down')} src={srcDown} alt="" />
          </div>
        </div>
        <div className="title">
          <div>
            消毒剩余时间:
            {sdk.deviceData.disinfect_left
              ? getTimeToHour(sdk.deviceData.disinfect_left)
              : '00:00:00'}
          </div>
          <div>
            风干剩余时间:
            {sdk.deviceData.air_dry_left
              ? getTimeToHour(sdk.deviceData.air_dry_left)
              : '00:00:00'}
          </div>
          <div>
            烘干剩余时间:
            {sdk.deviceData.drying_left
              ? getTimeToHour(sdk.deviceData.drying_left)
              : '00:00:00'}
          </div>
        </div>
      </section>
      <Detail />
    </article>
  );
}
