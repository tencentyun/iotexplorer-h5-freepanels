import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useMount } from 'ahooks';

export function Slider({
  deviceData: { control, power_switch },
  doControlDeviceData,
}) {
  const [position, setPosition] = useState(sdk.deviceData.position >= 0 && sdk.deviceData.position <= 100
    ? sdk.deviceData.position
    : 0);
  const [animInfo, setAnimInfo] = useState({
    dire: '',
    sTime: 0,
    h2: 0,
    h1: 0,
    tSpan: 1,
  });
  const progress = useRef(null);
  const PROCESS_MIN = 0;
  const PROCESS_MAX = 100;

  const setCurrent = (name, value) => (progress.current.style[name] = value);

  const stopAnim = () => {
    const ts = new Date().getTime() - animInfo.sTime;
    if (!animInfo.sTime) {
      return position == undefined ? 0 : position;
    }
    const { tSpan } = animInfo;
    let newPosition = (ts / tSpan) * (animInfo.h2 - animInfo.h1) + animInfo.h1;
    if (newPosition <= 0) newPosition = 0;
    else if (newPosition >= 100) newPosition = 100;
    setPosition(newPosition);
    setCurrent(
      'height',
      `${(newPosition * (PROCESS_MAX - PROCESS_MIN)) / 100.0 + PROCESS_MIN}%`,
    );
    setCurrent('transition', null);
    doControlDeviceData({
      position: newPosition,
    });
    setAnimInfo({ ...animInfo, dire: '' });
    return newPosition;
  };
  useEffect(() => {
    console.log('进行滚动了', control, power_switch);
    if (!power_switch) {
      stopAnim();
      return undefined;
    }

    if (control === 'down') {
      let curPosition = position;
      if (animInfo.dire === 'up') {
        curPosition = stopAnim();
      }
      const tSpan = (5 * (100 - curPosition)) / 100.0;
      if (tSpan === 0) return;
      setCurrent('transition', `height ${tSpan}s linear`);
      setCurrent('height', `${PROCESS_MAX}%`);
      setAnimInfo({
        sTime: new Date().getTime(),
        tSpan: tSpan * 1000.0,
        h1: curPosition,
        h2: 100,
        dire: 'down',
      });
    } else if (control === 'up') {
      let curPosition = position;
      if (animInfo.dire === 'down') {
        curPosition = stopAnim();
      }
      const tSpan = (5 * (curPosition - 0)) / 100.0;
      if (tSpan === 0) return;
      setCurrent('transition', `height ${tSpan}s linear`);
      setCurrent('height', `${PROCESS_MIN}%`);
      setAnimInfo({
        sTime: new Date().getTime(),
        tSpan: tSpan * 1000.0,
        h1: curPosition,
        h2: 0,
        dire: 'up',
      });
    }
  }, [control, power_switch]);

  const onTransitionEnd = () => {
    setPosition(animInfo.h2);
    doControlDeviceData({
      position: animInfo.h2,
    });
  };

  useMount(() => {
    setCurrent(
      'height',
      `${(position * (PROCESS_MAX - PROCESS_MIN)) / 100.0 + PROCESS_MIN}%`,
    );
  });
  return (
    <article
      className={classNames(
        'slider',
        sdk.deviceData.power_switch === 1 ? '' : 'power-off',
      )}
    >
      <section className="dashboard center">
        <div className="lr-rack-wrapper">
          <div className="lr-rack-img-up" />
          <div className="lr-rack-div-middle">
            <div
              onTransitionEnd={onTransitionEnd}
              ref={progress}
              className="lr-rack-div-progress"
            >
              <div className="lr-rack-img-middle" />
            </div>
            <div className="lr-rack-img-down" />
          </div>
        </div>
      </section>
    </article>
  );
}
