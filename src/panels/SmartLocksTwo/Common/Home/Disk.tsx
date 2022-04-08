/*
 * @Description: 智能锁-表盘
 */
import React, { useEffect } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Icon } from '@custom/Icon';
export interface DiskProps {
  deviceData: any;
  doControlDeviceData: (...params: any) => Promise<void>;
  tips: any;
}

// let flag: any = 0;
let i = 0;

export function Disk({
  deviceData = {},
  doControlDeviceData,
  tips,
}: DiskProps) {
  const lockStatus = {
    0: 'unlocked',
    1: 'locked',
    offline: 'offline',
  };

  const currentColor = (): string => {
    if (deviceData.lock_motor_state === 1) {
      return '#00A884';
    }
    return '#DA695C';
  };

  const radius = 120;
  // 周长
  const getPerimeter = 2 * Math.PI * radius;
  // 开屏动画定时器
  let interval: NodeJS.Timer;
  // 前进计时器
  let forwardInterval: NodeJS.Timer;
  // 后退计时器
  let fallbackInterval: NodeJS.Timer;

  useEffect(() => {
    // 开屏动画
    tickAnimation();
  }, []);
  const tickAnimation = () => {
    const perimeter = 2 * Math.PI * radius;
    const circle = document.getElementById('circle') as HTMLUnknownElement;
    const indicator = document.getElementById('indicator') as HTMLUnknownElement;
    let startIndex = 0;
    interval = setInterval(() => {
      startIndex += 5;
      const percent = startIndex / 100;
      circle.setAttribute('stroke-dasharray', `${perimeter * percent} ${perimeter * (1 - percent)}`);
      const currentAngle = 360 * percent + 270;
      const x = 120 + 120 * Math.cos((currentAngle * Math.PI) / 180);
      const y = 120 + 120 * Math.sin((currentAngle * Math.PI) / 180);
      indicator.setAttribute('cx', x);
      indicator.setAttribute('cy', y);

      if (startIndex >= 100) {
        clearInterval(interval);
      }
    }, 60);
  };

  const forwardAnimation = () => {
    const perimeter = 2 * Math.PI * radius;
    const circle = document.getElementById('circle') as HTMLUnknownElement;
    const indicator = document.getElementById('indicator') as HTMLUnknownElement;
    forwardInterval = setInterval(() => {
      i += 2;
      const percent = i / 100;
      circle.setAttribute('stroke-dasharray', `${perimeter * percent} ${perimeter * (1 - percent)}`);
      circle.setAttribute('stroke', deviceData.lock_motor_state === 1 ? '#DA695C' : '#00A884');
      const currentAngle = 360 * percent + 270;
      const x = 120 + 120 * Math.cos((currentAngle * Math.PI) / 180);
      const y = 120 + 120 * Math.sin((currentAngle * Math.PI) / 180);
      indicator.setAttribute('cx', x);
      indicator.setAttribute('cy', y);
      indicator.setAttribute('fill', deviceData.lock_motor_state === 1 ? '#DA695C' : '#00A884');

      if (i >= 100) {
        clearInterval(forwardInterval);
        sdk.callDeviceAction({}, 'unlock_remote');
        // doControlDeviceData('lock_motor_state', Number(!deviceData.lock_motor_state));
        // 重置
        i = 0;
      }
    }, 60);
  };

  const fallbackAnimation = () => {
    const perimeter = 2 * Math.PI * radius;
    const circle = document.getElementById('circle') as HTMLUnknownElement;
    const indicator = document.getElementById('indicator') as HTMLUnknownElement;
    fallbackInterval = setInterval(() => {
      if (i <= 0) {
        clearInterval(fallbackInterval);
        indicator.setAttribute('fill', currentColor());
        i = 0;
        return;
      }
      i -= 2;
      const percent = i / 100;
      circle.setAttribute('stroke-dasharray', `${perimeter * percent} ${perimeter * (1 - percent)}`);
      circle.setAttribute('stroke', deviceData.lock_motor_state === 1 ? '#DA695C' : '#00A884');
      const currentAngle = 360 * percent + 270;
      const x = 120 + 120 * Math.cos((currentAngle * Math.PI) / 180);
      const y = 120 + 120 * Math.sin((currentAngle * Math.PI) / 180);
      indicator.setAttribute('cx', x);
      indicator.setAttribute('cy', y);
      indicator.setAttribute('fill', deviceData.lock_motor_state === 1 ? '#DA695C' : '#00A884');
    }, 50);
  };

  const handleTouchStart = (e) => {
    console.log(e, 'handleTouchStart');
    // e.preventDefault();
    // 如果离线之后的操作不执行
    if (deviceData.lock_motor_state === 2) {
      tips.showInfo('设备已离线');
      return;
    }

    // if (flag) {
    //   return;
    // }
    // // 设置定时器
    // flag = setInterval(longPress, 0)
    longPress();
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    console.log(e, 'handleTouchMove');
  };
  const handleTouchEnd = (e) => {
    console.log('handleTouchEnd');
    e.preventDefault();
    // clearInterval(flag);
    // flag = 0;
    clearInterval(forwardInterval);
    if (i > 0 && i < 100) {
      fallbackAnimation();
    }
    // 如果离线之后的操作不执行
    if (deviceData.lock_motor_state === 2) {
      tips.showInfo('设备已离线');
      return;
    }
  };

  const longPress = () => {
    // clearInterval(flag)
    // flag = 0;

    // 长按只能解锁
    if (deviceData.lock_motor_state === 0) {
      console.log('设备已经解锁');
      return;
    }
    clearInterval(fallbackInterval);
    forwardAnimation();
    // console.log(i);
    // if (i > 0 && i < 100) {
    //   clearInterval(forwardInterval);
    //   fallbackAnimation();
    // } else {
    //   // i = 0;
    //   console.log(i);
    //   clearInterval(fallbackInterval);
    //   forwardAnimation();
    // }
  };

  // const handleClick = (e) => {
  //   console.log('onClick');
  //   e.preventDefault();
  //   e.stopPropagation();
  //   tips.showInfo(deviceData.lock_motor_state === 1 ? '长按关锁' : '长按开锁');
  //   if (i > 0 && i < 100) {
  //     clearInterval(forwardInterval);
  //     clearInterval(fallbackInterval);
  //     fallbackAnimation();
  //   }
  // };

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
      // onClick={(e) => {handleClick(e)}}
    >
      <div className="content-wrap">
        <div className="content">
          <Icon name={lockStatus[deviceData.lock_motor_state || '0']} />
        </div>
      </div>
      <svg
        className="circle"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 240"
      >
        <defs>
          <linearGradient id="grad1" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={currentColor()} stopOpacity="0" />
            <stop offset="100%" stopColor={currentColor()} stopOpacity="1" />
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
              stroke={currentColor()}
              strokeWidth={5}
              fill="none"
              strokeDasharray={`${0},${getPerimeter}`}
              strokeDashoffset={getPerimeter}
              strokeLinecap="round"
              transform="matrix(0, -1, 1, 0, 0, 240)"
            >
            </circle>
            <circle
              id='indicator'
              cx={120}
              cy={0}
              r={5}
              fill={currentColor()}
              stroke="none"
            />
          </> : null
        }
      </svg>
    </div>
  );
}
