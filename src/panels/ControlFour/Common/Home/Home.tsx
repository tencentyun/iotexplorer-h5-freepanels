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
import { LAYOUT, layoutList } from '../Layout/constant';
import { Layout } from '../Layout';


const allSwitch = [
  ['switch_1', '开关一'],
  ['switch_2', '开关二'],
  ['switch_3', '开关三'],
  ['switch_4', '开关四'],
  ['switch_5', '开关五'],
];


const test = [
  [{
    name: '123',
    deviceid: 12,
    type: 1,
    position: [
      [0, 3],
      [0, 2],
    ],
  },
  {
    name: '333',
    deviceid: 122,
    type: 0,
    position: [
      [0, 1],
      [2, 3],
    ],
  },
  {
    name: 'fasdf',
    deviceid: 2,
    type: 0,
    position: [
      [1, 2],
      [2, 3],
    ],
  },
  {
    name: '3adsf',
    deviceid: 33,
    type: 0,
    position: [
      [2, 3],
      [2, 3],
    ],
  },],
  [{
    name: 'adsf',
    deviceid: 80,
    type: 1,
    position: [
      [0, 3],
      [0, 3],
    ],
  },]
];



export function Home(props) {
  const { doControlDeviceData, templateMap, setContext, deviceData = {}, history: { PATH, push },
  } = props;
  const switchNum = 3;
  const currentSwitch = allSwitch.slice(0, switchNum);
  let { card_config = test || [], card_theme = 'theme1' } = { ...deviceData };
  // card_config = card_config.map(item => {
  //   const { position = '[]', ...other } = { ...item };
  //   return { ...other, position: JSON.parse(position) }
  // });
  // console.log(card_config)
  const onChange = (key, value) => doControlDeviceData(key, value ? 1 : 0);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setContext({ switchNum });
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
              <Cell title="主题名称" prefixIcon={<Icon name={card_theme} />} onClick={() => push('/theme')} />
            </div>
          </div>
          {/* 我的屏幕 */}
          <div className="modular">
            <div className="modular-title">
              <span>我的屏幕</span>
              {card_config.length ? <Button className="editor-btn" onClick={() => push('/sort')}>
                <Icon name="editor-other" />
              </Button> : <></>}
            </div>
            <div className="modular-container my-screen">
              <div className="screen-list">
                {card_config.map((item, index) => {
                  return (<div className="my-screen-selected" key={`my-screen-${index}`} >
                    <Layout
                      style={{ width: 95, height: 95 }}
                      selected={item}
                      width={32}
                      height={32}
                      isPreview={true}
                      onPreviewClick={() => {
                        setSelected(item)
                        push('/editor', { selected: JSON.stringify(item), isEdit: true })
                      }}
                    />
                    <span className="add-text">{`屏${index + 1}`}</span>
                  </div>)
                })}
                <div className="screen-add">
                  <Button className="screen-btn" onClick={() => setVisible(true)}>
                    <Icon name="add" />
                  </Button>
                  <span className="add-text">添加</span>
                </div>
              </div>
            </div>
            <Popup
              visible={visible}
              onMaskClick={() => {
                setVisible(false)
              }}
            >
              <div
                className="layout-popup"
              >
                <div className="header">
                  屏幕布局
                </div>
                <div className="content">
                  {layoutList.map((item, index) => <Layout
                    key={`layout-${index}`}
                    style={{ width: 95, height: 95, marginRight: 14, marginBottom: 24, border: '2px solid transparent', ...isSelected(item) }}
                    selected={item}
                    width={32}
                    height={32}
                    isPreview={true}
                    onPreviewClick={() => setSelected(item)}
                  />)}

                </div>
                <div className="footer">
                  <Button className="custom-btn" onClick={() => {
                    setVisible(false)
                  }}>取消</Button>
                  <Button className={classNames("custom-btn primary", !selected || !selected.length ? 'disabled' : '')} onClick={() => {
                    push('/editor', { selected: JSON.stringify(selected) })
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
                name={name}
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