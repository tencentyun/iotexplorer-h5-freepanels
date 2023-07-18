import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import classNames from 'classnames';
import { THEME_LIST } from '../contants';
import { useTitle } from '@hooks/useTitle';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Space, SpinLoading } from 'antd-mobile'

export function Theme({ ...props }) {
  useTitle('主题风格');
  const { doControlDeviceData, deviceData = {}, deviceInfo } = { ...props };
  const { theme_style } = deviceData;
  const [loading, setLoading] = useState(false);
  const [themeList, setThemeList] = useState([]);

  const getThemeList = async () => {
    const { Result } = await sdk.requestTokenApi('AppGetResourceThumbnailList', {
      Action: 'AppGetResourceThumbnailList',
      // AccessToken: 'AccessToken',
      ProductId: deviceInfo.ProductId,
      // FamilyId: sdk.familyId,
      // RoomId: sdk.roomId,
      Offset: 0,
      Limit: 50
    });
    console.log('theme', Result);
    // const result1 = [
    //   {
    //     "CreateTime": "2023-07-03 16:38:15",
    //     "ProductName": "5uiy7bb6_test2023",
    //     "ProductID": "0I2YXP9S11",
    //     "Name": "测试",
    //     "Md5": "9b5959e6147f4e15d5809eb4ef5ff678",
    //     "Size": 2008054,
    //     "Description": "缩略图",
    //     "ResourceThumbnailInfo": [
    //       {
    //         "CosUrl": "https://iothub-tasktest-1256872341.cos.ap-guangzhou.myqcloud.com/600000559219/0I2YXP9S11_product/thumbnail/%E6%B5%8B%E8%AF%95_uncompress/6lIVr77uihU.jpg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDQhstjLituhcKq9D2c096pJZaKsFl8PVV%26q-sign-time%3D1688440470%3B1688447670%26q-key-time%3D1688440470%3B1688447670%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D7f57ca6761ffb3bcefb8fb78ba16f49ad852b54e",
    //         "Name": "6lIVr77uihU.jpg"
    //       },
    //       {
    //         "CosUrl": "https://iothub-tasktest-1256872341.cos.ap-guangzhou.myqcloud.com/600000559219/0I2YXP9S11_product/thumbnail/%E6%B5%8B%E8%AF%95_uncompress/9jFPVQzUgNY.jpg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDQhstjLituhcKq9D2c096pJZaKsFl8PVV%26q-sign-time%3D1688440470%3B1688447670%26q-key-time%3D1688440470%3B1688447670%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D7b402a94fe2bcb36cbc618fb09a046aedb7aabfa",
    //         "Name": "9jFPVQzUgNY.jpg"
    //       }
    //     ]
    //   },
    //   {
    //     "CreateTime": "2023-07-03 17:02:10",
    //     "ProductName": "5uiy7bb6_test2023",
    //     "ProductID": "0I2YXP9S11",
    //     "Name": "测试资源",
    //     "Md5": "9b5959e6147f4e15d5809eb4ef5ff678",
    //     "Size": 2008054,
    //     "Description": "新",
    //     "ResourceThumbnailInfo": [
    //       {
    //         "CosUrl": "https://iothub-tasktest-1256872341.cos.ap-guangzhou.myqcloud.com/600000559219/0I2YXP9S11_product/thumbnail/%E6%B5%8B%E8%AF%95_uncompress/6lIVr77uihU.jpg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDQhstjLituhcKq9D2c096pJZaKsFl8PVV%26q-sign-time%3D1688440470%3B1688447670%26q-key-time%3D1688440470%3B1688447670%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D7f57ca6761ffb3bcefb8fb78ba16f49ad852b54e",
    //         "Name": "6lIVr77uihU.jpg"
    //       },
    //       {
    //         "CosUrl": "https://iothub-tasktest-1256872341.cos.ap-guangzhou.myqcloud.com/600000559219/0I2YXP9S11_product/thumbnail/%E6%B5%8B%E8%AF%95_uncompress/9jFPVQzUgNY.jpg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDQhstjLituhcKq9D2c096pJZaKsFl8PVV%26q-sign-time%3D1688440470%3B1688447670%26q-key-time%3D1688440470%3B1688447670%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D7b402a94fe2bcb36cbc618fb09a046aedb7aabfa",
    //         "Name": "9jFPVQzUgNY.jpg"
    //       }
    //     ]
    //   }
    // ];
    setThemeList(Result);
  }

  useEffect(() => {
    getThemeList()
  }, [])
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
