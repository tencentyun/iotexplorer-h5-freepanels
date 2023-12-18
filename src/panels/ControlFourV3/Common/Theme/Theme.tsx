import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';

import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Space, SpinLoading ,Toast} from 'antd-mobile'


export function Theme({ ...props }) {
  useTitle('主题风格');
  console.log('---01进入主题页面---', wx, props);


  const { doControlDeviceData, deviceData = {}, deviceInfo } = { ...props };
  const { theme_style } = deviceData;
  const [loading, setLoading] = useState(false);
  const [themeList, setThemeList] = useState([]);
  const [title, setTitle] = useState("下载中");

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
    //   RequestId: "azJQxe#m6",
    //   Result: [{
    //     CreateTime: "2023-11-10 11:13:32",
    //     ProductName: "奇趣智控屏",
    //     ProductID: "79P7F8KK12",
    //     Name: "主题10",
    //     Md5: "e6053059081abf49b7015c996abd3020",
    //     Size: 406786,
    //     Url: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/%E4%B8%BB%E9%A2%9810?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D4bcf5fe5b59dc5e88e4f4e2b83b93638b6f993d2",
    //     Description: "",
    //     ResourceThumbnailInfo: [{
    //       Name: "1.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%9810_uncompress/1.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D4b1cc664c66648cb4c4d2d8aeb235dd6e57e66f0"
    //     },
    //     {
    //       Name: "2.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%9810_uncompress/2.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Db23b24a8c9fdacc3a7204effc501e0b7681112de"
    //     },
    //     {
    //       Name: "3.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%9810_uncompress/3.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Db1f9386389a3f69a2fcef1059888f6518b8f441a"
    //     }]
    //   },
    //   {
    //     CreateTime: "2023-11-10 11:08:13",
    //     ProductName: "奇趣智控屏",
    //     ProductID: "79P7F8KK12",
    //     Name: "主题2",
    //     Md5: "2a1ad3569e40baecba0e2bb8e4d84c0f",
    //     Size: 443123,
    //     Url: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/%E4%B8%BB%E9%A2%982?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Dd51c4815182a8cfc813e52ba4461a548629afc0d",
    //     Description: "",
    //     ResourceThumbnailInfo: [{
    //       Name: "1.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%982_uncompress/1.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D8b75c57e7fa57d386bd457af9affcf96bea6c653"
    //     },
    //     {
    //       Name: "2.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%982_uncompress/2.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D6e70c89407f0e53508dcaf2d8af2f0cd258aae17"
    //     },
    //     {
    //       Name: "3.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%982_uncompress/3.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Dca3bb65f72e42e3c722daad6539c69b5d56f80d8"
    //     }]
    //   },
    //   {
    //     CreateTime: "2023-11-10 11:10:48",
    //     ProductName: "奇趣智控屏",
    //     ProductID: "79P7F8KK12",
    //     Name: "主题3",
    //     Md5: "ec77941bd489438ff6097f2800f31bb5",
    //     Size: 49459,
    //     Url: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/%E4%B8%BB%E9%A2%983?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Df6abef5fb9134f9210e40dcfb900badf86f7f82a",
    //     Description: "",
    //     ResourceThumbnailInfo: [{
    //       Name: "1.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%983_uncompress/1.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D0f43b3229d9cb287c633c8aa95d0760211551232"
    //     },
    //     {
    //       Name: "2.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%983_uncompress/2.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D711da0fd69ae40e4d85bf1cc6533b90f19c9669b"
    //     },
    //     {
    //       Name: "3.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%983_uncompress/3.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3De651306f4437ddd1d46a50c102b905c519c82fa0"
    //     }]
    //   },
    //   {
    //     CreateTime: "2023-11-10 11:27:39",
    //     ProductName: "奇趣智控屏",
    //     ProductID: "79P7F8KK12",
    //     Name: "主题4",
    //     Md5: "7945c3d5b83d9a37248e99ad1def608c",
    //     Size: 783503,
    //     Url: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/%E4%B8%BB%E9%A2%984?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Dcd7bb00a4f39c21d8a9fb1e66cf6f318be60c22d",
    //     Description: "",
    //     ResourceThumbnailInfo: [{
    //       Name: "1.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%984_uncompress/1.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Dded693c3ba1f52dfaf56426da96db634b4ba953b"
    //     },
    //     {
    //       Name: "2.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%984_uncompress/2.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D8c3ec87f3d5ded5ffb3fa17de121fe8ab44032e7"
    //     },
    //     {
    //       Name: "3.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%984_uncompress/3.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D10742ec6da8d755a559c07e9494e5eb3776162e6"
    //     }]
    //   },
    //   {
    //     CreateTime: "2023-11-10 11:11:35",
    //     ProductName: "奇趣智控屏",
    //     ProductID: "79P7F8KK12",
    //     Name: "主题5",
    //     Md5: "c7c7ccbb18d6f250d11e4f941c22837d",
    //     Size: 260385,
    //     Url: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/%E4%B8%BB%E9%A2%985?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D113dd96d939b7d534d961d2e3a4b5e528d5fe6e6",
    //     Description: "",
    //     ResourceThumbnailInfo: [{
    //       Name: "3.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%985_uncompress/3.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D059002e58a58032b30bf1e68c4abe6848ee9cb3c"
    //     },
    //     {
    //       Name: "1.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%985_uncompress/1.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D62e264335b3a1a89ce7af9021371994dbf5410b3"
    //     },
    //     {
    //       Name: "2.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%985_uncompress/2.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D5f8155d0dc46f986a4f17b89b0eeb4d7957bf99c"
    //     }]
    //   },
    //   {
    //     CreateTime: "2023-11-10 11:11:58",
    //     ProductName: "奇趣智控屏",
    //     ProductID: "79P7F8KK12",
    //     Name: "主题6",
    //     Md5: "2122bce08a676be3904dccec6e6a11d7",
    //     Size: 549509,
    //     Url: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/%E4%B8%BB%E9%A2%986?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D52d802ac5e9fcb2c1a42dd4dffeda2edd32b2a10",
    //     Description: "",
    //     ResourceThumbnailInfo: [{
    //       Name: "1.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%986_uncompress/1.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D263861e223c89b2e15582de646c0a1a9dd7bc22f"
    //     },
    //     {
    //       Name: "2.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%986_uncompress/2.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D03051dc4a4eddb486fb6e2281289c018a18b23e5"
    //     },
    //     {
    //       Name: "3.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%986_uncompress/3.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D7cdd703d7ff211cfb32baee25d294f14255377e1"
    //     }]
    //   },
    //   {
    //     CreateTime: "2023-11-10 11:12:30",
    //     ProductName: "奇趣智控屏",
    //     ProductID: "79P7F8KK12",
    //     Name: "主题7",
    //     Md5: "071d1b28dd924337c23d2fbebbcf765b",
    //     Size: 404372,
    //     Url: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/%E4%B8%BB%E9%A2%987?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Dd1afbaca57c320ae9bdff31412b0d3d008a4ee42",
    //     Description: "",
    //     ResourceThumbnailInfo: [{
    //       Name: "1.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%987_uncompress/1.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D1ca6f0a1b4dbc978e4bdc146424388d766d258fd"
    //     },
    //     {
    //       Name: "2.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%987_uncompress/2.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Dc387a4613be0b9661bdeb3778d98baa2bfdb3105"
    //     },
    //     {
    //       Name: "3.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%987_uncompress/3.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Df5f95d5bcc92163548037b2a9195774696718ac5"
    //     }]
    //   },
    //   {
    //     CreateTime: "2023-11-10 11:12:51",
    //     ProductName: "奇趣智控屏",
    //     ProductID: "79P7F8KK12",
    //     Name: "主题8",
    //     Md5: "8c9a96b41d7a7c4cb596df8ccb2dc792",
    //     Size: 787338,
    //     Url: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/%E4%B8%BB%E9%A2%988?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D17387e25075c27b9254b9cbb317e0554306c354a",
    //     Description: "",
    //     ResourceThumbnailInfo: [{
    //       Name: "1.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%988_uncompress/1.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D117a90722877a9c90e5f3c387920416eb84ca34c"
    //     },
    //     {
    //       Name: "2.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%988_uncompress/2.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D2e4244a43a38280546a96bfe2c06072a35249803"
    //     },
    //     {
    //       Name: "3.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%988_uncompress/3.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3De3539a4d8707cecca483c0b8c8ee0b9022f7bdb7"
    //     }]
    //   },
    //   {
    //     CreateTime: "2023-11-10 11:13:13",
    //     ProductName: "奇趣智控屏",
    //     ProductID: "79P7F8KK12",
    //     Name: "主题9",
    //     Md5: "d4c04b8fca93fdfc408fe4a98ef5980f",
    //     Size: 470365,
    //     Url: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/%E4%B8%BB%E9%A2%989?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934175%3B1699941375%26q-key-time%3D1699934175%3B1699941375%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3De752c1d69be3a885a79a19bd1792836ae2e68927",
    //     Description: "",
    //     ResourceThumbnailInfo: [{
    //       Name: "1.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%989_uncompress/1.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Dd7b8a283239c67ab3f0df64cb710babb2c4487ec"
    //     },
    //     {
    //       Name: "2.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%989_uncompress/2.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D256b7c44a0097faff836339736eeccdb1d3aeb9a"
    //     },
    //     {
    //       Name: "3.png",
    //       CosUrl: "https://iothub-taskidc-1258344699.cos.ap-guangzhou.myqcloud.com/100027307365/79P7F8KK12_product/thumbnail/%E4%B8%BB%E9%A2%989_uncompress/3.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDTkrlRTGsFYt0ueARs58wZ8kARWcoob3T%26q-sign-time%3D1699934176%3B1699941376%26q-key-time%3D1699934176%3B1699941376%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D861b22fb2fcd4f975479604a30ae3fb0707d1503"
    //     }]
    //   }],
    //   TotalCount: 9
    // }


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
    setTitle("下载中");
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      Toast.show({
        icon: 'success',
        content: '更新成功',
      }) 
    }, 30000)
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
      {/* {loading ? <Space direction='horizontal' wrap block style={{ '--gap': '16px', justifyContent: 'center', alignItems: 'center' }}> */}
      {loading ? <Space direction='horizontal' wrap block style={
        {
          '--gap': '16px', justifyContent: 'center', alignItems: 'center',
          position: "absolute",
          width: "calc(100vw - 32px)",
          height: "calc(100vh - 24px)"
        }}>
        <div className='v-center bg-c'>
          <SpinLoading style={{ '--size': '48px' }} />
          <div className='loading-title'>{title}</div>
        </div>
      </Space> : <></>}
    </div>
  );
}
