import React, { useEffect, useState } from 'react';
import { Position } from './Position';
import { Icon } from '@custom/Icon';
import { Btn } from '@custom/Btn';
import { Modal } from '@custom/Modal';
import { Cell } from '@custom/Cell';
import { LightBright } from '@custom/LightBright';
import { Notice } from './Notice/Notice';
import { Voice } from './Notice/Voice';
import { noop } from '@utillib';
import { MusicPlayer } from '../MusicPlayer/MusicPlayer';
import { Btn as Button, BtnGroup } from '@custom/Btn';


const GateWay = (props) => {
  // 其他页面返回也刷新
  const [visible, setVisible] = useState(false);
  const {
    deviceData = {},
    sdk,
    doControlDeviceData = noop,
    history,
    getLocal,
    setLocal
  } = props;

    // 第一次进入页面弹出模式选择框
    const localKey = 'isEnterd';
    const isFirstEnter = getLocal(localKey) == void 0;
    const [modeVisible, setModeVisible] = useState(isFirstEnter);

    // sdk.requestTokenApi('AppPublishAccessTokenToDevice', {
    //   Action: 'AppPublishAccessTokenToDevice',
    //   DeviceName: sdk.deviceName,
    //   ProductId: sdk.productId,
    // });
  
  const actions = [
    // [
    //   '夜灯设置',
    //   'lamp',
    //   () => {
    //     history?.push('/nightlight');
    //   },
    //   // !!deviceData?.guard_mode,
    //   '',
    //   '',
    // ],
    [
      '门铃场景',
      'block',
      () => {
        history?.push('/scene');
      },
      // !!deviceData?.guard_mode,
      '',
      '',
    ],
    [
      '安防报警',
      'alarm',
      () => {
        history?.push('/alarm');
      },
      !!deviceData?.alarm_sound_switch,
      '',
    ],
    // [
    //   '红外遥控设备',
    //   '',
    //   () => {
    //     history?.push('/alarm');
    //   },
    //   '',
    //   '',
    // ],
    // [
    //   '⾳乐播放',
    //   '',
    //   () => {
    //     history?.push('/alarm');
    //   },
    //   '',
    //   'musicplayer',
    // ],
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
      '',
    ],
    [
      '报警历史',
      'record',
      () => {
        history?.push('/record');
      },
      '',
    ],
  ].filter(v => v);
  return (
    <div className='gateway'>
      {/* 圆环组件 */}
      <Position {...props}></Position>
      {/* 系统声音 */}
      <Voice  {...props} />


      {/* 功能列表组件 */}
      <div className='comp-block'>
        <div className='comp-list'>
          <div className='sub-device-list'>
            <div className='sub-device'>
              <Cell
                title={'添加子设备'}
                className='border'
                prefixIcon={<Icon className='custom-icon' name='add'></Icon>}
                onClick={() => {
                  window.h5PanelSdk.callMpApi('navigateTo', {
                    url: `/pages/Device/AddDevice/AddSubDeviceLLSync/AddSubDeviceLLSync?gatewayDeviceId=${window.h5PanelSdk.deviceId}&autoStartScan=true`,
                  });
                }}
              ></Cell>
            </div>
            <div className='sub-device'>
              <Cell
                title={'子设备列表'}
                className='border'
                prefixIcon={<Icon className='custom-icon' name='book'></Icon>}
                onClick={() => {
                  // history?.push('/subDevice');
                  window.h5PanelSdk.callMpApi('navigateTo', {
                    url: `/pages/Device/GatewaySubDeviceList/GatewaySubDeviceList?gatewayDeviceId=${window.h5PanelSdk.deviceId}&isLLSyncGateway=true`,
                  });
                }}
              ></Cell>
            </div>
          </div>
          {actions.map(([title, prefixIcon, cb, value, type], index) => {
            // 根据 item 的 type 属性决定渲染哪种类型的 div
            if (type === 'musicplayer') {
              return <MusicPlayer {...props} />;
            } else {
              // 如果有其他类型，可以在这里处理
              return <div className='cell-item' key={index}>
                        <Icon className='custom-icon' name={prefixIcon}></Icon>
                        <Cell
                          title={title}
                          subTitle={value}
                          prefixIcon=''
                          onClick={cb}
                          ele={type}
                          eleValue={value}
                          onChange={cb}
                          isLink={!type}
                          className='border'
                      ></Cell>
                </div>;
            }
          })}
          
        </div>
      </div>
      <Modal className='voice-modal' title='告警声音' visible={visible} onClose={() => setVisible(false)}>
        <LightBright
          defaultValue={deviceData.guard_vol || 0}
          status={true}
          iconName='light'
          minValue={0}
          maxValue={10}
          onChange={(value, endTouch) => endTouch && doControlDeviceData('guard_vol', value)}
        ></LightBright>
        <Btn className='custom-btn' onClick={() => setVisible(false)}>关闭</Btn>
      </Modal>
      <div className='accessToken-box'>
        <Modal
            visible={modeVisible}
          >
            <div className='modal-title'>
              <div className='title'>用户信息授权</div>
              <div className='second-title'>为了享受完整的服务和功能，请点击此处进行授权操作，让您的体验更加顺畅。</div>
            </div>
            <div className='modal-footer'>
              <BtnGroup
                layout='flex'
              >
                <Button
                  className='btn-save'
                  onClick={() => {
                    setModeVisible(false);
                    setLocal(localKey, true);
                    sdk.requestTokenApi('AppPublishAccessTokenToDevice', {
                      Action: 'AppPublishAccessTokenToDevice',
                      DeviceName: sdk.deviceName,
                      ProductId: sdk.productId,
                    });
                  }}
                >
                  确定
                </Button>
              </BtnGroup>
            </div>

          </Modal>
      </div>
      
    </div>
  );
};


export function Home(props) {
  // 接受到的告警类型
  const [alarmType, setAlarmType] = useState();
  const { sdk } = props;

  // 绑定告警信息监听
  useEffect(() => {
    const handlePropertyReport = ({ deviceId, Payload }) => {
      // console.log("监听->接受到的数据::::", {
      //   deviceId,
      //   Payload
      // }, JSON.stringify({
      //   deviceId,
      //   Payload
      // }))
      // 测试
      // const PayloadTest = {
      //   method: 'event_post',
      //   clientToken: '123',
      //   version: '1.0',
      //   eventId: 'alarm_event',
      //   type: 'alert',
      //   timestamp: 1689925478905,
      //   params: { alarm_type: 2 },
      // };
      if (deviceId !== sdk.deviceId) return;
      if (Payload.eventId !== 'alarm_event') return;
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
      <div className='custom-notice'>
        <Notice {...props} alarmType={alarmType} />
      </div>
      <div className='content'>
        <GateWay {...props} />
      </div>
    </div>
  );
}
