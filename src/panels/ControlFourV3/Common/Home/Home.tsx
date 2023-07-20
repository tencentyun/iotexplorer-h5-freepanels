import React, { useState, useEffect } from 'react';
import { LightSwitch } from './LightSwitch';
import { Detail } from './Detail';
import { Modal } from '@custom/Modal';
import { Icon } from '@custom/Icon';
import { Btn as Button, BtnGroup } from '@custom/Btn';
import { Tabs } from '@custom/Tabs';
import { Cell } from '@custom/Cell';
import { Popup } from '@custom/Popup';
import classNames from 'classnames';
import { layoutList, setNewToOld, setOldToNew } from '../Layout/constant';
import { Layout } from '../Layout';
import { THEME_LIST } from '../contants';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

const allSwitch = [
  ['switch_1', '开关一'],
  ['switch_2', '开关二'],
  ['switch_3', '开关三'],
  ['switch_4', '开关四'],
  ['switch_5', '开关五'],
];

export function Home(props) {
  const { doControlDeviceData, templateMap, setContext, deviceData = {}, deviceInfo, history: { PATH, push },
  } = props;
  const switchNum = 3;
  const currentSwitch = allSwitch.slice(0, switchNum);
  let { screen_page = [], theme_style } = { ...deviceData };
  const onChange = (key, value) => doControlDeviceData(key, value ? 1 : 0);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);
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
    setContext({ switchNum });
    getThemeList();
  }, []);

  const isSelected = (s) => {
    return JSON.stringify(s) === JSON.stringify(selected) ? { border: '2px solid #4D9CF8' } : {}
  }

  return (
    <div className="home">
      <Tabs defaultActiveKey='1' className="custom-tabs">
        <Tabs.Tab title='屏幕配置' key='1'>
          {/* 主题风格 */}
          <div className="modular">
            <div className="modular-title">主题风格</div>
            <div className="modular-container">
              <Cell title={theme_style || "默认主题"} prefixIcon={<div className="theme-img" style={{ backgroundImage: `${themeList.filter(({ Name }) => Name === theme_style)?.['ResourceThumbnailInfo']?.[0]?.['CosUrl']}`, backgroundSize: '100%', width: '100%', height: '100%' }} />} onClick={() => push('/theme')} />
            </div>
          </div>
          {/* 我的屏幕 */}
          <div className="modular">
            <div className="modular-title">
              <span>我的屏幕</span>
              {screen_page.length ? <Button className="editor-btn" onClick={() => push('/sort')}>
                <Icon name="editor-other" />
              </Button> : <></>}
            </div>
            <div className="modular-container my-screen">
              <div className="screen-list">
                {screen_page.map((item, index) => {
                  return (<div className="my-screen-selected" key={`my-screen-${index}`} >
                    <Layout
                      style={{ width: 95, height: 95 }}
                      selected={setNewToOld(item)}
                      width={32}
                      height={32}
                      isPreview={true}
                      onPreviewClick={() => {
                        setSelected(setNewToOld(item))
                        push('/editor', { selected: JSON.stringify(setNewToOld(item)), isEdit: true, index })
                      }}
                    />
                    <span className="add-text">{`屏${index + 1}`}</span>
                  </div>)
                })}
                {
                  screen_page?.length !== 6 ? (<div className="screen-add">
                    <Button className="screen-btn" onClick={() => setVisible(true)}>
                      <Icon name="add" />
                    </Button>
                    <span className="add-text">添加</span>
                  </div>) : <></>
                }
              </div>
            </div>
            <Popup
              className="layout-popup"
              visible={visible}
              onMaskClick={() => {
                setVisible(false)
              }}
            >
              <div
                className="popup-content"
              >
                <div className="header">
                  屏幕布局
                </div>
                <div className="content">
                  {layoutList.map((item, index) => <Layout
                    key={`layout-${index}`}
                    style={{ width: 95, height: 95, marginBottom: 24, border: '2px solid transparent', ...isSelected(item) }}
                    selected={item}
                    width={32}
                    height={32}
                    isPreview={true}
                    onPreviewClick={() => setSelected(item)}
                  />)}

                </div>
                <div className="footer">
                  <Button className="custom-btn" onClick={() => setVisible(false)}>取消</Button>
                  <Button className={classNames("custom-btn primary", !selected || !selected.length ? 'disabled' : '')} onClick={() => {
                    const layout = setOldToNew(selected);
                    screen_page.push(layout);
                    doControlDeviceData('screen_page', screen_page);
                    push('/editor', { selected: JSON.stringify(selected), index: screen_page.length - 1 });
                  }}>保存</Button>
                </div>
              </div>
            </Popup>
          </div>
        </Tabs.Tab>
        <Tabs.Tab title='开关' key='2'>
          <div className={`dashboard switch-${switchNum}`}>
            {currentSwitch.map(([key, name], index) => (
              <LightSwitch
                key={key}
                name={(deviceData[`${key}_name`]) || name}
                value={!!deviceData[key]}
                className={`light-switch-${index + 1}`}
                onChange={onChange.bind(null, key)}
              />
            ))}
          </div>
          <Detail {...props} currentSwitch={currentSwitch} />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}
