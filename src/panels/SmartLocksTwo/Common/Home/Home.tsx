import React, { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { Battery } from '@custom/Battery';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';
import { Disk } from './Disk';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useTitle } from '@hooks/useTitle';

// 一个三元组（SmartLocksOne）还是两个三元组（SmartLocksTwo）
const isOneProductId = process.env.CATEGORY === 'SmartLocksOne';

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

  useEffect(() => {
    if (!isOneProductId) {
      sdk.callDeviceAction({}, 'get_ipc_device_id')
        .then((res) => {
          const { OutputParams } = res;
          const { productId, deviceName } = JSON.parse(OutputParams);
          setContext({
            deviceId: `${productId}/${deviceName}`,
          });
        })
        .catch((err) => {
          console.log('获取门锁IPC信息失败', err);
        });
    }
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
        await sdk.callDeviceAction({}, 'wake_up');
        wakeupTimestamp = Date.now();
      }

      await sdk.goVideoPanelPage({
        deviceId: videoDeviceId,
        passThroughParams: { fullScreen: true, wakeupTimestamp },
      });
      sdk.tips.hideLoading();
    } catch (err) {
      console.warn('跳转 video 设备出错', err);
      sdk.tips.showError('跳转实时画面出错，请重试');
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
