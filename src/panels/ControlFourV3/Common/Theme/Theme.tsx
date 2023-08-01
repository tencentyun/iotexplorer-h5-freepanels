import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Space, SpinLoading } from 'antd-mobile'

export function Theme({ ...props }) {
  useTitle('主题风格');
  console.log('---01进入主题页面---', props);
  const { doControlDeviceData, deviceData = {}, deviceInfo } = { ...props };
  const { theme_style } = deviceData;
  const [loading, setLoading] = useState(false);
  const [themeList, setThemeList] = useState([]);

  const getThemeList = async () => {
    console.log("开始加载数据:")

    const result = await sdk.requestTokenApi('AppGetResourceThumbnailList', {
      Action: 'AppGetResourceThumbnailList',
      AccessToken: 'AccessToken',
      ProductId: deviceInfo.ProductId,
      // FamilyId: sdk.familyId,
      // RoomId: sdk.roomId,
      Offset: 0,
      Limit: 50
    });


    // const result = {
    //   code: 0,
    //   msg: "",
    //   data: {
    //     RequestId: "Fc$RzDVv89",
    //     Result: [
    //       {
    //         CreateTime: "2023-07-18 09:12:42",
    //         ProductName: "SC-A4",
    //         ProductID: "W9NFP9OIAA",
    //         Name: "theme6",
    //         Md5: "560062e5c35c81964f7b3f1a8b59d7e5",
    //         Size: 739437,
    //         Url: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100026956618/W9NFP9OIAA_product/theme6?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1689647332%3B1689654532%26q-key-time%3D1689647332%3B1689654532%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D087ae2d927f2d748ceaacc51063766b060473055",
    //         Description: "",
    //         ResourceThumbnailInfo: [
    //           {
    //             Name: "NW.png",
    //             CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100026956618/W9NFP9OIAA_product/thumbnail/theme6_uncompress/NW.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1689647333%3B1689654533%26q-key-time%3D1689647333%3B1689654533%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D40b6d26386179dd9efeed12807caa47022f2318f"
    //           },
    //           {
    //             Name: "WH,on.png",
    //             CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100026956618/W9NFP9OIAA_product/thumbnail/theme6_uncompress/WH%2Con.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1689647333%3B1689654533%26q-key-time%3D1689647333%3B1689654533%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D348de0e9ab8ac8d6c971b456d3aa25a60860dcc4"
    //           },
    //           {
    //             Name: "WH.png",
    //             CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100026956618/W9NFP9OIAA_product/thumbnail/theme6_uncompress/WH.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1689647333%3B1689654533%26q-key-time%3D1689647333%3B1689654533%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D804abb541c9d209aa8b2481f0f240ec4ef1e10cc"
    //           },
    //           {
    //             Name: "WW,on.png",
    //             CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100026956618/W9NFP9OIAA_product/thumbnail/theme6_uncompress/WW%2Con.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1689647333%3B1689654533%26q-key-time%3D1689647333%3B1689654533%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Df022fc6e62d190c99d636681be2b00592526c220"
    //           },
    //           {
    //             Name: "冬日,on.png",
    //             CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100026956618/W9NFP9OIAA_product/thumbnail/theme6_uncompress/%E5%86%AC%E6%97%A5%2Con.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1689647333%3B1689654533%26q-key-time%3D1689647333%3B1689654533%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Dcf8b1b472f904368999c538d1bfc66f3ca6db653"
    //           },
    //           {
    //             Name: "NW,on.png",
    //             CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100026956618/W9NFP9OIAA_product/thumbnail/theme6_uncompress/NW%2Con.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1689647333%3B1689654533%26q-key-time%3D1689647333%3B1689654533%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D2005346ac765ae0aff28c2f358345b4222cbff1e"
    //           }
    //         ]
    //       }
    //     ],
    //     TotalCount: 1
    //   }
    // }.data;


    const Result = result.Result;

    console.log('获取到的主题数据', result, Result);

    setThemeList(Result);
  }
  const loadData = () => {
    getThemeList();
  }


  // 下载主题
  const downTheme = (ResourceName) => {
    sdk.requestTokenApi('AppPushResource', {
      Action: 'AppPushResource',
      DeviceId: deviceInfo.DeviceId,
      ResourceName,
      AccessToken: 'AccessToken',
      ProductId: deviceInfo.ProductId,
    });
    setLoading(true);
    setTimeout(() => setLoading(false), 30000)
  }

  useEffect(() => {
    setLoading(false);
  }, [theme_style])




  useEffect(() => {
    loadData()
  }, [])


  return (
    <div className="theme-list">
      {themeList.map(({ Name, ResourceThumbnailInfo = [] }, index) => (
        <div className="content" key={index}>
          <div className="header">
            <div className="title">{Name}</div>
            <div className={classNames("theme-btn", theme_style === Name ? 'text' : '')} onClick={() => {
              downTheme(Name);
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
