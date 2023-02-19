import React from 'react';
import { Icon } from '@custom/Icon';
import classNames from 'classnames';

const list = [
  ['主题名称1', 'theme1', ['theme1-1', 'theme1-2', 'theme1-3']],
  ['主题名称2', 'theme2', ['theme2-1', 'theme2-2', 'theme2-3']],
  ['主题名称3', 'theme3', ['theme3-1', 'theme3-2', 'theme3-3']],
  ['主题名称4', 'theme4', ['theme4-1', 'theme4-2', 'theme4-3']],
  ['主题名称5', 'theme5', ['theme5-1', 'theme5-2', 'theme5-3']],
  ['主题名称6', 'theme6', ['theme6-1', 'theme6-2', 'theme6-3']],
  ['主题名称7', 'theme7', ['theme7-1', 'theme7-2', 'theme7-3']],
  ['主题名称8', 'theme8', ['theme8-1', 'theme8-2', 'theme8-3']],
  ['主题名称9', 'theme9', ['theme9-1', 'theme9-2', 'theme9-3']],
  ['主题名称10', 'theme10', ['theme10-1', 'theme10-2', 'theme10-3']],
]

export function Theme({ ...props }) {
  const { doControlDeviceData, deviceData = {} } = { ...props };
  const { card_theme } = deviceData;
  return (
    <div className="theme-list">
      {list.map(([title, value, items = []], index) => (
        <div className="content" key={index}>
          <div className="header">
            <div className="title">{title}</div>
            <div className={classNames("theme-btn", card_theme === value ? 'text' : '')} onClick={() => doControlDeviceData('card_theme', value)}>{card_theme === value ? '使用中' : <Icon name="download" />}</div>
          </div>
          <div className="theme-items">
            {items.map(item => (<div key={item} className="theme-item"></div>))}
          </div>
        </div>
      ))}

    </div>
  );
}
