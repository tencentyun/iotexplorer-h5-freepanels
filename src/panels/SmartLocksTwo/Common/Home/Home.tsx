import React, { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { Battery } from '@custom/Battery';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';
import { Disk } from './Disk';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useTitle } from '@hooks/useTitle';

// 只有一个三元组的版本
const isOneProductId = true;

const lockStatusWord = {
  0: '未上锁',
  1: '已上锁',
  2: '已离线',
};

const lockStatus = {
  0: 'unlocked',
  1: 'locked',
  2: 'offline',
};

export function Home({
  deviceData,
  productInfo,
  doControlDeviceData,
  context,
  setContext,
  offline,
  history: { PATH, push },
  tips,
}) {
  const title = sdk.deviceDisplayName || productInfo.Name || '首页';
  useTitle(title);
  const disabledRef = useRef(false);
  const videoDeviceId = isOneProductId ? sdk.deviceId : context.deviceId;
  useEffect(() => {
    if (offline) {
      sdk.offlineTip.show();
    } else {
      sdk.offlineTip.hide();
    }
  }, [offline]);

  useEffect(() => {
    const listener = function () {
      if (document.visibilityState === 'visible') {
        disabledRef.current = false;
      }
    };
    document.addEventListener('visibilitychange', listener);
    return () => document.removeEventListener('visibilitychange', listener);
  }, []);

  // 检测用户是否订阅门铃强提醒
  useEffect(() => {
    if (sdk.deviceStatus === 0) {
      return;
    }
    sdk.requestTokenApi('AppIsWechatSubscribeable', {
      DeviceName: sdk.deviceName,
      ProductId: sdk.productId,
    }).then(({ AppWechatSubscribeableProperty: describeInfo }) => {
      console.log({ describeInfo });
      // 当前产品可以订阅消息
      if (describeInfo.IsSubscribeable) {
        const bellSubscribeInfo = describeInfo.Templates.find(tpl => tpl.Title === '门铃呼叫提醒');
        if (bellSubscribeInfo && bellSubscribeInfo.Status === 0) {
          sdk.tips.showModal({
            title: '温馨提示',
            content: '检测到您尚未订阅微信消息，将无法接收门铃呼叫，请前去订阅',
            confirmText: '去订阅',
          }).then((isConfirm) => {
            console.log({ isConfirm });
            if (isConfirm) {
              sdk._appBridge.callMpApi('navigateTo', {
                url: `/pages/Device/ConfigWXNotify/ConfigWXNotify?deviceId=${sdk.deviceId}`,
              });
            }
          });
        }
      }
    });
  }, []);

  // 门锁状态
  const status = useMemo(() => {
    if (offline) return 2;
    return deviceData.lock_motor_state || 0;
  }, [offline, deviceData]);

  const goVideoPanel = async () => {
    if (offline) {
      sdk.tips.showError('设备已离线');
      return;
    }
    if (!videoDeviceId) {
      console.warn('video device Id 为空');
      return;
    }
    console.warn('开始跳转', Date.now(), videoDeviceId);
    if (disabledRef.current) {
      console.warn('重复点击');
      return;
    }
    disabledRef.current = true;
    sdk.once('pageShow', () => {
      sdk.insightReportor.error('LOCK_GOTO_VIDEO_ENABLE');
      disabledRef.current = false;
    });

    // 如果发送了 wake_up 指令，就会有时间戳
    let wakeupTimestamp;
    try {
      sdk.tips.showLoading('正在跳转');
      const { wakeup_state } = await sdk.getDeviceData();
      sdk.insightReportor.info('LOCK_VIDEO_INFO', { videoDeviceId, isOneProductId, wakeup_state: deviceData.wakeup_state, httpWakeupState: wakeup_state });

      if (wakeup_state.Value !== 1) {
        try {
          await sdk.callDeviceAction({}, 'wake_up');
        } catch (err) {
          // action有响应 和 wakeup_state 变成1 有一项OK 就能跳转
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              if (deviceData.wakeup_state === 1) {
                resolve(1);
              } else {
                reject(`唤醒设备超时:${err.code}`);
              }
            }, 1000);
          });
        }
        wakeupTimestamp = Date.now();
      }

      await sdk.goVideoPanelPage({
        deviceId: videoDeviceId,
        passThroughParams: { fullScreen: true, wakeupTimestamp },
      });
      sdk.tips.hideLoading();
    } catch (err) {
      console.warn('跳转 video 设备出错', err);
      sdk.tips.showError('设备唤醒失败，请重试');
      sdk.insightReportor.error('LOCK_GOTO_VIDEO_ERROR', { message: err });
      disabledRef.current = false;
      return;
    }
  };

  return (
    <main className="home">
      {/* 顶部 */}
      <header className="header-wrap">
        <div className="header-left">
          {/* 门锁电源模块 */}
          <div>
            <Battery
              value={deviceData.battery_percentage || 0}
              isShowPercent={true}
              isShowTip={false}
            />
            <label>门锁电池</label>
          </div>
        </div>

        {/* 更多 */}
        <div className="header-right" onClick={() => {
          sdk.goDeviceDetailPage();
        }}>
          <Icon name='more'></Icon>
        </div>
      </header>
      {/* 表盘 */}
      <Disk
        deviceData={deviceData}
        offline={offline}
        doControlDeviceData={doControlDeviceData}
        tips={tips}
      ></Disk>

      <div className="middle-wrap">
        <div className="log" onClick={() => {
          push(PATH.LOG);
        }}>
          <Icon name="log"></Icon>
        </div>
        <div className={classNames(
          'status-tip',
          lockStatus[status],
        )}>{lockStatusWord[status]}</div>
        <div className="config" onClick={() => {
          push(PATH.SETTINGS_INDEX);
        }}>
          <Icon name="config"></Icon>
        </div>
      </div>

      {/* 设置按钮 */}
      <div className="setting-block">
        <Cell
          className="cell-border"
          title="用户管理"
          prefixIcon={<Icon name="time"/>}
          size="medium"
          onClick={() => {
            push(PATH.USERS_INDEX);
          }}
        ></Cell>
        <Cell
          className="cell-border"
          title="临时密码"
          prefixIcon={<Icon name="hourglass"/>}
          size="medium"
          onClick={() => {
            push(PATH.TEMP_PASSWORD_INDEX);
          }}
        ></Cell>
        <Cell
          className={classNames('cell-border', { disabled: offline || !videoDeviceId })}
          title="实时画面"
          prefixIcon={<Icon name="monitor"/>}
          size="medium"
          onClick={() => {
            goVideoPanel();
          }}
        ></Cell>
      </div>
    </main>
  );
}
