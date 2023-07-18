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
  const { deviceData = {}, doControlDeviceData = () => { }, history, deviceInfo } = { ...props };
  useEffect(() => {
  }, []);

  const actions = [
    [
      '门铃场景',
      'block',
      () => { history?.push('/scene') },
      !!deviceData?.guard_mode,
      ''
    ],
    [
      '安防报警',
      'alarm',
      () => { history?.push('/alarm') },
      !!deviceData?.alarm_sound_switch,
      '',
    ],
    [
      '微信通知',
      'weixin',
      () => { history.push(`/pages/Device/ConfigWXNotify/ConfigWXNotify?deviceId=${deviceInfo.DeviceId}`) },
      !!deviceData?.guard_vol,
      ''
    ],
    [
      '报警历史',
      'record',
      () => { history?.push('/record') },
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
          <div className="sub-device-list">
            <div className="sub-device">
              <Cell
                title={'添加子设备'}
                className="border"
                prefixIcon={<Icon className="custom-icon" name="add"></Icon>}
                onClick={() => { history?.push('/subDevice') }}
              ></Cell>
            </div>
            <div className="sub-device">
              <Cell
                title={'子设备列表'}
                className="border"
                prefixIcon={<Icon className="custom-icon" name="book"></Icon>}
                onClick={() => { history?.push('/subDevice') }}
              ></Cell>
            </div>
          </div>
          {actions.map(([title, prefixIcon, cb, value, type], index) => (
            <div className="cell-item" key={index}>
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
  return (
    <div className='home'>
      <div className="custom-notice">

      </div>
      <div className="content">
        <GateWay {...props} />
      </div>
    </div>
  )
}
