import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import classNames from 'classnames';
import { THEME_LIST } from '../contants';
import { useTitle } from '@hooks/useTitle';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Space, SpinLoading } from 'antd-mobile'

export function Theme({ ...props }) {
  useTitle('主题风格');
  const { doControlDeviceData, deviceData = {}, deviceInfo, themeList } = { ...props };
  const { theme_style } = deviceData;
  const [loading, setLoading] = useState(false);

  return (
    <div className="theme-list">
      {themeList.map(({ Name, ResourceThumbnailInfo = [] }, index) => (
        <div className="content" key={index}>
          <div className="header">
            <div className="title">{Name}</div>
            <div className={classNames("theme-btn", theme_style === Name ? 'text' : '')} onClick={() => {
              sdk.requestTokenApi('AppPushResource', {
                Action: 'AppPushResource',
                DeviceId: deviceInfo.DeviceId,
                ResourceName: Name,
              });
              setLoading(true);
              setTimeout(() => setLoading(false), 30000)
            }}>
              {theme_style === Name ? '使用中' : <Icon name="download" />}
            </div>
          </div>
          <div className="theme-items">
            {ResourceThumbnailInfo.map((item, _index) => (<div key={_index} className="theme-item" style={{ backgroundImage: `url(${item.CosUrl})` }}></div>))}
          </div>

        </div>
      ))}
      {loading ? <Space direction='horizontal' wrap block style={{ '--gap': '16px', justifyContent: 'center', alignItems: 'center' }}>
        <SpinLoading style={{ '--size': '48px' }} />
      </Space> : <></>}
    </div>
  );
}
