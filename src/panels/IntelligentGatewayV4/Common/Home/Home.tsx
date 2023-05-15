import React, { useEffect, useState } from 'react';
import { Position } from './Position';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Icon } from '@custom/Icon';
import { Tabs } from '@custom/Tabs';
import { Btn } from '@custom/Btn';
import { SubDevice } from '../SubDevice';
import classNames from 'classnames';
import { Light } from '../Light'
import { Cell } from '@custom/Cell';

const GateWay = (props) => {
  // 其他页面返回也刷新
  const [gatewayList, setGatewayList] = useState([]);
  const { deviceData = {}, doControlDeviceData } = { ...props };
  const getDeviceDataGateway = async () => {
    const { h5PanelSdk } = window;
    const { subDeviceList } = await h5PanelSdk.getSubDeviceList();
    try {
      // 获取设备状态
      const deviceIds = subDeviceList.map(({ DeviceId }) => DeviceId);
      const devicesStatus = await sdk.requestTokenApi('AppGetDeviceStatuses', {
        Action: 'AppGetDeviceStatuses',
        // AccessToken: 'AccessToken',
        RequestId: sdk.requestId,
        DeviceIds: deviceIds,
      });
      // "Online": 0 //0 在线；1：离线
      const data = subDeviceList.map(item => ({
        ...item,
        Online: devicesStatus.DeviceStatuses.filter(({ DeviceId }) => DeviceId === item.DeviceId)[0]?.Online,
      }));
      setGatewayList(data);
    } catch (err) {
      console.error('get info fail', err);
    }
  };
  useEffect(() => {
    // 获取网关子设备
    sdk.on('pageShow', () => {
      getDeviceDataGateway();
    });
    getDeviceDataGateway();
    return () => {
      sdk.off('pageShow');
    };
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
      'switch'
    ],
    [
      '报警音量',
      'voice',
      () => { },
      deviceData?.guard_vol || 0,
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
