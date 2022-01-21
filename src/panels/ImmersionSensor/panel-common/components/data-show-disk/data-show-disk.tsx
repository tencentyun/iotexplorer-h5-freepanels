/*
 * @Description: 数据显示表盘
 */
import React from 'react';
import classNames from 'classnames';
import { SvgIcon } from '@components/common';
import { getThemeType } from '@libs/theme';
import './data-show-disk.less';

const themeType = getThemeType();

const skinProps = {
  normal: {
    normal: { color: '#000000' },
    alarm: { color: '#FFFFFF' }
  },
  blueWhite: {
    normal: { color: '#000000' },
    alarm: { color: '#FFFFFF' }
  },
  dark: {
    normal: { color: '#FFFFFF' },
    alarm: { color: '#FFFFFF' }
  },
  colorful: {
    normal: { color: '#FFFFFF' },
    alarm: { color: '#FFFFFF' }
  },
  morandi: {
    normal: { color: '#B5ABA1' },
    alarm: { color: '#FFFFFF' }
  }
};

const currentSkin: any = skinProps[themeType];

interface DiskProps {
  status: string;
}
export function DataShowDisk(props: DiskProps) {
  const { status = 'normal' } = props;

  let currentStatus = '';
  if (status == 'Alarm') {
    currentStatus = 'alarm';
  } else {
    currentStatus = 'normal';
  }

  return (
    <div className="data-show-disk">
      <div
        className={classNames(
          'disk',
          currentStatus === 'alarm' ? 'active' : ''
        )}
      >
        <div className="data">
          <SvgIcon
            className="data-icon"
            name="icon-seeper"
            {...currentSkin[currentStatus]}
          />
        </div>
        <div className="pulse pulse_1"></div>
        <div className="pulse pulse_2"></div>
        <div className="pulse pulse_3"></div>
        <div className="pulse pulse_4"></div>
        <div className="pulse pulse_5"></div>
      </div>
      <div
        className={classNames(
          'bg-bubbles',
          currentStatus === 'alarm' ? 'animation' : ''
        )}
      >
        <div>
          <span></span>
        </div>
        <div>
          <span></span>
        </div>
        <div>
          <span></span>
        </div>
      </div>
    </div>
  );
}