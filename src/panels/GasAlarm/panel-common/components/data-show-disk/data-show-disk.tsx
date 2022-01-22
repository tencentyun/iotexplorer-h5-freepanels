/*
 * @Description: 数据显示表盘
 */
import React from 'react';
import classNames from 'classnames';
import { SvgIcon } from '@components/common';
import { getThemeType } from '@libs/theme';
import './data-show-disk.less';

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

const bubbles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

interface DiskProps {
  status: string;
  value: number;
  unit: string;
}
export function DataShowDisk(props: DiskProps) {
  const { status = 'normal', value = 0, unit = '%' } = props;
  const themeType = getThemeType();
  const currentSkin: any = skinProps[themeType];

  return (
    <div className="data-show-disk">
      <div className={classNames('disk', status === 'alarm' ? 'active' : '')}>
        <div className="data">
          <SvgIcon
            className="data-icon"
            name="icon-gas"
            {...currentSkin[status]}
          />
          <div className="number">
            {value / 10}
            <span className="unit">{unit}</span>
          </div>
        </div>
        <div className="pulse pulse_1"></div>
        <div className="pulse pulse_2"></div>
        <div className="pulse pulse_3"></div>
        <div className="pulse pulse_4"></div>
        <div className="pulse pulse_5"></div>
      </div>
      <ul className={classNames('bg-bubbles')}>
        {bubbles.map(value => (
          <li
            className={classNames(status === 'alarm' ? 'animation' : '')}
            key={value}
          >
            <span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
