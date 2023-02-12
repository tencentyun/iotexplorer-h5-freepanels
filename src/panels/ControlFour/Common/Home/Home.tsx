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
import { LAYOUT } from '../Layout/constant';


const allSwitch = [
  ['switch_1', '开关一'],
  ['switch_2', '开关二'],
  ['switch_3', '开关三'],
  ['switch_4', '开关四'],
  ['switch_5', '开关五'],
];

const getSwitchNum = (templateMap = {}) => Object.keys(templateMap).filter(v => /^switch/.test(v)).length || 1;
const getLayoutList = () => {
  let arr: Array<object>[] = [];
  for (let key of Object.keys(LAYOUT)) {
    arr.push(LAYOUT[key]);
  }
  return arr;
}

export function Home(props) {
  const { doControlDeviceData, templateMap, setContext, deviceData = {}, history: { PATH, push },
  } = props;
  // const switchNum = getSwitchNum(templateMap);
  const switchNum = 3;
  const currentSwitch = allSwitch.slice(0, switchNum);
  const onChange = (key, value) => doControlDeviceData(key, value ? 1 : 0);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    setContext({ switchNum });

    // setCurrentName(deviceData['name_button1'])
  }, []);

  return (
    <div className="home">
      <Tabs defaultActiveKey='1' className="custom-tabs">
        <Tabs.Tab title='屏幕配置' key='1'>
          {/* 设备离线 */}
          <div className="modular">
            <div className="modular-container">
              <Cell title="设备已离线" prefixIcon={<Icon name="error" />} />
            </div>
          </div>
          {/* 主题风格 */}
          <div className="modular">
            <div className="modular-title">主题风格</div>
            <div className="modular-container">
              <Cell title="主题名称" prefixIcon="" />
            </div>
          </div>
          {/* 我的屏幕 */}
          <div className="modular">
            <div className="modular-title">我的屏幕</div>
            <div className="modular-container my-screen">
              <div className="screen-list"></div>
              <div className="screen-add">
                <Button className="screen-btn" onClick={() => setVisible(true)}>
                  <Icon name="add" />
                </Button>
                <span className="add-text">添加</span>
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
                <div className="header">屏幕布局</div>
                <div className="content">
                  {getLayoutList().map((item, index) => {
                    return (<div key={index} className={classNames('layout-item', JSON.stringify(item) === JSON.stringify(selected) ? 'selected' : '')} onClick={() => setSelected(item)}>
                      <Icon className={`layout-${index + 1}`} />
                    </div>)
                  })}
                </div>
                <div className="footer">
                  <Button className="custom-btn" onClick={() => {
                    setVisible(false)
                  }}>取消</Button>
                  <Button className={classNames("custom-btn primary", !selected || !selected.length ? 'disabled' : '')} onClick={() => {
                    push('/card/editor', { selected: JSON.stringify(selected) })
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
