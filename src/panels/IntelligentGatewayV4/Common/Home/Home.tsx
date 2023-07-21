import React, { useEffect, useState } from 'react';
import { Position } from './Position';
import { Icon } from '@custom/Icon';
import { Btn } from '@custom/Btn';
import { Modal } from '@custom/Modal';
import { Cell } from '@custom/Cell';
import { LightBright } from '@custom/LightBright';
import { Notice } from './Notice/Notice';
import { Voice } from './Notice/Voice';











const GateWay = (props) => {
  // 其他页面返回也刷新
  const [gatewayList, setGatewayList] = useState([]);
  const [visible, setVisible] = useState(false);
  const { deviceData = {}, sdk, doControlDeviceData = () => { }, history, deviceInfo } = { ...props };





  useEffect(() => {
  }, []);

  const actions = [
    [
      '门铃场景',
      'block',
      () => { history?.push('/scene') },
      // !!deviceData?.guard_mode,
      '',
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
      () => {
        sdk._appBridge.callMpApi('navigateTo', {
          url: `/pages/Device/ConfigWXNotify/ConfigWXNotify?deviceId=${sdk.deviceId}`,
        });

      },
      // !!deviceData?.guard_vol,
      '',
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
      {/* 系统声音 */}
      <Voice  {...props} />


      {/* 功能列表组件 */}
      <div className="comp-block">
        <div className="comp-list">
          <div className="sub-device-list">
            <div className="sub-device">
              <Cell
                title={'添加子设备'}
                className="border"
                prefixIcon={<Icon className="custom-icon" name="add"></Icon>}
                onClick={() => { history?.push('/search/device', { start: Math.random() }) }}
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
  // 接受到的告警类型 
  const [alarmType, setAlarmType] = useState();
  const { sdk } = props;

  // 绑定告警信息监听
  useEffect(() => {
    const handlePropertyReport = ({ deviceId, Payload }) => {
      console.log("监听->接受到的数据::::", {
        deviceId,
        Payload
      }, JSON.stringify({
        deviceId,
        Payload
      }))
      // 测试
      const PayloadTest = { "method": "event_post", "clientToken": "123", "version": "1.0", "eventId": "alarm_event", "type": "alert", "timestamp": 1689925478905, "params": { "alarm_type": 2 } };
      if (deviceId !== sdk.deviceId) return;
      if (Payload.eventId != "alarm_event") return;
      setAlarmType(Payload?.params?.alarm_type);
      // console.log("监听->接受到的当前告警上报的数据::::", Payload.alarm_event, { deviceId, Payload })
    };
    sdk.on('wsEventReport', handlePropertyReport);
    return () => {
      sdk.off('wsEventReport', handlePropertyReport);
    };
  }, []);

  return (
    <div className='home'>
      <div className="custom-notice">
        <Notice {...props} alarmType={alarmType} />
      </div>
      <div className="content">
        <GateWay {...props} />
      </div>
    </div>
  )
}
