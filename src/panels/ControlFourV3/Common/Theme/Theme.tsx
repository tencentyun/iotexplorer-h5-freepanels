import React from 'react';
import { Icon } from '@custom/Icon';
import classNames from 'classnames';
import { THEME_LIST } from '../contants';
import { useTitle } from '@hooks/useTitle';

export function Theme({ ...props }) {
  useTitle('主题风格');
  const { doControlDeviceData, deviceData = {} } = { ...props };
  const { theme_style } = deviceData;
  return (
    <div className="theme-list">
      {THEME_LIST.map(([title, value, items = []], index) => (
        <div className="content" key={index}>
          <div className="header">
            <div className="title">{title}</div>
            <div className={classNames("theme-btn", theme_style === value ? 'text' : '')} onClick={() => doControlDeviceData('theme_style', value)}>{theme_style === value ? '使用中' : <Icon name="download" />}</div>
          </div>
          <div className="theme-items">
            {items.map(item => (<div key={item} className="theme-item" style={{ backgroundImage: `url(https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/ControlFour/${item}.png)` }}></div>))}
          </div>
        </div>
      ))}

    </div>
  );
}
