/*
 * @Description: 智能锁-表盘
 */
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import lottie from 'lottie-web';
import { Icon } from '@custom/Icon';
import successJSON from '@src/assets/lottie/check.json';
export interface DiskProps {
  deviceData: any;
  doControlDeviceData: (...params: any) => Promise<void>;
  tips: any;
  offline: boolean;
}

let i = 0;

export function Disk({
  deviceData = {},
  tips,
  offline,
}: DiskProps) {
  const [unlockSuccess, setUnlockSuccess] = useState(false);
  const isTouchingRef = useRef(false);
  const animatingRef = useCallback((node) => {
    if (node !== null) {
      lottie.loadAnimation({
        container: document.getElementById('lottie-container') as Element,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: successJSON,
      });
    }
  }, []);

  // 远程解锁成功1s后可以再次解锁
  useEffect(() => {
    if (unlockSuccess === true) {
      setTimeout(() => {
        setUnlockSuccess(false);
      }, 1000);
    }
  }, [unlockSuccess]);

  const currentColor = useMemo(() => {
    if (offline) {
      return '#999999';
    }
    return '#00A884';

    // return '#DA695C';
  }, [offline, deviceData.lock_motor_state]);

  const radius = 120;
  // 周长
  const perimeter = 2 * Math.PI * radius;
  // 开屏动画定时器
  let interval: NodeJS.Timer;
  // 前进计时器
  let forwardInterval: NodeJS.Timer;
  // 后退计时器
  let fallbackInterval: any = null;

  const drawPercent = (percent) => {
    const circle = document.getElementById('circle') as HTMLUnknownElement;
    const indicator = document.getElementById('indicator') as HTMLUnknownElement;
    circle.setAttribute('stroke-dasharray', `${perimeter * percent} ${perimeter * (1 - percent)}`);
    circle.setAttribute('stroke', currentColor);
    const currentAngle = 360 * percent + 270;
    const x = 120 + 120 * Math.cos((currentAngle * Math.PI) / 180);
    const y = 120 + 120 * Math.sin((currentAngle * Math.PI) / 180);
    indicator.setAttribute('cx', `${x}`);
    indicator.setAttribute('cy', `${y}`);
    indicator.setAttribute('fill', currentColor);
  };

  useEffect(() => {
    // 开屏动画
    tickAnimation();
  }, []);

  const tickAnimation = () => {
    let startIndex = 0;
    interval = setInterval(() => {
      startIndex += 5;
      const percent = startIndex / 100;
      drawPercent(percent);

      if (startIndex >= 100) {
        clearInterval(interval);
      }
    }, 60);
  };

  const forwardAnimation = () => {
    // 3s完成动画
    const time = 2000;
    const step = 2;
    const loop = 100 / step;
    forwardInterval = setInterval(() => {
      i += step;
      const percent = i / 100;
      drawPercent(percent);
      if (i >= 100) {
        clearInterval(forwardInterval);
        sdk.callDeviceAction({}, 'unlock_remote')
          .then((res) => {
            console.log(res);
            setUnlockSuccess(true);
          })
          .catch((err) => {
            console.log('解锁失败', err);
            tips.showError('解锁失败');
          });
        i = 0;
      }
    }, time / loop);
  };

  const fallbackAnimation = () => {
    const indicator = document.getElementById('indicator') as HTMLUnknownElement;
    if (fallbackInterval === null) {
      fallbackInterval = setInterval(() => {
        console.log('fallbackInterval', i);
        if (i <= 0) {
          clearFallback();
          indicator.setAttribute('fill', currentColor);
          i = 0;
          return;
        }
        i -= 2;
        const percent = i / 100;
        drawPercent(percent);
      }, 50);
    }
  };

  const handleTouchStart = (e) => {
    console.log('touchStart', e.touches);
    if (offline) {
      tips.showError('设备已离线');
      return;
    }

    if (isTouchingRef.current) {
      console.log('touching');
      return;
    }
    isTouchingRef.current = true;

    longPress();
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  const clearFallback = () => {
    clearInterval(fallbackInterval);
    fallbackInterval = null;
  };

  const handleTouchEnd = (e) => {
    console.log('handleTouchEnd');
    e.preventDefault();
    clearInterval(forwardInterval);
    isTouchingRef.current = false;
    console.log('i', i);
    if (i > 0 && i < 100) {
      fallbackAnimation();
    }
    // 如果离线之后的操作不执行
    if (offline) {
      tips.showError('设备已离线');
      return;
    }
  };

  const longPress = () => {
    clearFallback();
    forwardAnimation();
  };

  return (
    <div
      className="disk"
      onTouchStart={(e) => {
        handleTouchStart(e);
      }}
      onTouchMove={(e) => {
        handleTouchMove(e);
      }}
      onTouchEnd={(e) => {
        handleTouchEnd(e);
      }}
      onTouchCancel={(e) => {
        console.log('onTouchCancel');handleTouchEnd(e);
      }}
    >
      <div className="content-wrap">
        { unlockSuccess ? (
          <div key="check-animation">
            <div id="lottie-container" ref={animatingRef}></div>
            <div className='unlock-tip'>解锁成功</div>
          </div>
        ) : (
          <div className="content" key="status">
            <Icon name={offline ? 'offline' : 'locked'} />
            <span>{!offline && '长按远程解锁'}</span>
          </div>
        )
        }
      </div>

      <svg
        className="circle"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 240"
      >
        <defs>
          <linearGradient id="grad1" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={currentColor} stopOpacity="0" />
            <stop offset="100%" stopColor={currentColor} stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx={120}
          cy={120}
          r={120}
          stroke="rgba(239, 243, 244, 0.75)"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
        />
        {deviceData.lock_motor_state !== 2
          ? <>
            <circle
              id='circle'
              cx={120}
              cy={120}
              r={120}
              stroke={currentColor}
              strokeWidth={5}
              fill={unlockSuccess ? 'rgba(0, 168, 132, 0.1)' : 'none'}
              strokeDasharray={`${0},${perimeter}`}
              strokeDashoffset={perimeter}
              strokeLinecap="round"
              transform="matrix(0, -1, 1, 0, 0, 240)"
            >
            </circle>
            <circle
              id='indicator'
              cx={120}
              cy={0}
              r={5}
              fill={currentColor}
              stroke="none"
            />
          </> : null
        }
      </svg>
    </div>
  );
}
