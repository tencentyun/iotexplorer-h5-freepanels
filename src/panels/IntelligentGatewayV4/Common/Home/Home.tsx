import React, { useEffect, useState } from 'react';
import { Position } from './Position';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Icon } from '@custom/Icon';
import { Tabs } from '@custom/Tabs';
import { Btn } from '@custom/Btn';
import { SubDevice } from '../SubDevice';
import { Modal } from '@custom/Modal';
import classNames from 'classnames';
import { Light } from '../Light'
import { Cell } from '@custom/Cell';
import { LightBright } from '@custom/LightBright';

const GateWay = (props) => {
  // 其他页面返回也刷新
  const [gatewayList, setGatewayList] = useState([]);
  const [visible, setVisible] = useState(false);
  const { deviceData = {}, doControlDeviceData = () => { } } = { ...props };
  useEffect(() => {
  }, []);

  const actions = [
    [
      '守护模式',
      'love',
      () => { doControlDeviceData('guard_mode', !deviceData?.guard_mode) },
      !!deviceData?.guard_mode,
      'switch'
    ],
    [
      '报警声音',
      'bell',
      () => { doControlDeviceData('alarm_sound_switch', !deviceData?.alarm_sound_switch) },
      !!deviceData?.alarm_sound_switch,
      'switch',
    ],
    [
      '报警音量',
      'voice',
      () => { setVisible(true) },
      deviceData?.guard_vol || '0',
      ''
    ],
    [
      '子设备管理',
      'book',
      () => { },
      ''
    ],
  ].filter(v => v);

  return (
    <div className="gateway">
      {/* 圆环组件 */}
      <Position {...props}></Position>
      {/* 功能列表组件 */}
      <div className="comp-block">
        <div className="comp-list">
          {actions.map(([title, prefixIcon, cb, value, type]) => (
            <div className="cell-item">
              <Icon className="custom-icon" name={prefixIcon}></Icon>
              <Cell
                title={title}
                subTitle={value}
                prefixIcon=''
                onClick={cb}
                ele={type}
                eleValue={value}
                onChange={cb}
                isLink={!type}
                className="border"
              ></Cell>
            </div>

          ))}
        </div>
      </div>
      <Modal className='voice-modal' title="告警声音" visible={visible} onClose={() => setVisible(false)}>
        <LightBright
          defaultValue={deviceData['guard_vol'] || 0}
          status={true}
          iconName="light"
          minValue={0}
          maxValue={10}
          onChange={(value, endTouch) => endTouch && doControlDeviceData('guard_vol', value)}
        ></LightBright>
        <Btn className="custom-btn" onClick={() => setVisible(false)}>关闭</Btn>
      </Modal>
    </div>
  );
}


export function Home(props) {
  const tabs = [
    ['1', '家庭守护', 'first'],
    ['2', '夜灯', 'second']
  ];
  const [active, setActive] = useState('1');
  const onTabClick = (tab) => setActive(tab);
  const content = active === '1' ? <GateWay {...props} /> : <Light {...props} />
  return (
    <div className='home'>
      <div className="custom-tabs">
        {tabs.map(item => (<div
          className={classNames("custom-tab", active === item[0] ? 'on' : '', item[2])}
          onClick={() => onTabClick(item[0])}
        >
          <div className="title">{item[1]}</div>
        </div>))}
        <div className="line"></div>
      </div>
      <div className="content">
        {content}
      </div>
    </div>
  )
}
