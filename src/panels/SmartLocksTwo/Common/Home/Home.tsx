import React, { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { Battery } from '@custom/Battery';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';
import { Disk } from './Disk';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useTitle } from '@hooks/useTitle';

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
  offline,
  context,
  setContext,
  history: { PATH, push },
  tips,
}) {
  useTitle(productInfo.Name ? productInfo.Name : '首页');
  const disabledRef = useRef(false);
  useEffect(() => {
    if (offline) {
      sdk.offlineTip.show();
    } else {
      sdk.offlineTip.hide();
    }
  }, [offline]);

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
    if (disabledRef.current) {
      return;
    }
    disabledRef.current = true;
    try {
      if (deviceData.wakeup_state !== 1) {
        await sdk.callDeviceAction({}, 'wake_up');
      }
      await sdk.goDevicePanelPage(sdk.deviceId || 'II0Q47L8B9/e_69518626_1', {
        passThroughParams: { fullScreen: true },
      });
      disabledRef.current = false;
    } catch (err) {
      console.warn('跳转 video 设备出错', err);
      sdk.insightReportor.error('LOCK_GOTO_VIDEO_ERROR', { message: err.message || err.msg });
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
          className={classNames('cell-border', { disabled: offline })}
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
