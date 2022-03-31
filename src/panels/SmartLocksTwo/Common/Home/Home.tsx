import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Battery } from '@custom/Battery';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';
import { Disk } from './Disk';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useTitle } from '@hooks/useTitle';

export function Home({
  deviceData,
  productInfo,
  doControlDeviceData,
  history: { PATH, push }
}) {
  useTitle(productInfo.Name ? productInfo.Name :'首页');

  const lockStatusWord = {
    0: '未上锁',
    1: '已关闭',
    2: '已离线'
  };

  return (
    <main className="home">
      {/* 顶部 */}
      <header className="header-wrap">
        <div className="header-left">
          {/* 门锁电源模块 */}
          <div>
            <Battery
              value={deviceData.battery_percentage || 50}
              isShowPercent={true}
              isShowTip={false}
            />
            <label>门锁电池</label>
          </div>
          {/* IPC电源模块 */}
          <div className="ipc">
            <Battery
              value={deviceData.ipc_battery_percentage || 50}
              isShowPercent={true}
              isShowTip={false}
            />
            <label>IPC电池</label>
          </div>
        </div>

        {/* 更多 */}
        <div className="header-right" onClick={()=>{sdk.goDeviceDetailPage();}}>
          <Icon name='more'></Icon>
        </div>
      </header>
      {/* 表盘 */}
      <Disk
        deviceData={deviceData}
        doControlDeviceData={doControlDeviceData}
      ></Disk>

      <div className="middle-wrap">
        <div className="log" onClick={()=>{push(PATH.LOG)}}>
          <Icon name="log"></Icon>
        </div>
        <div className={classNames(
          "status-tip",
          deviceData.lock_motor_state == 1 ? 'locked' : 'unlocked'
        )}>{lockStatusWord[deviceData.lock_motor_state || 0]}</div>
        <div className="config" onClick={()=>{push(PATH.SETTINGS_INDEX)}}>
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
          onClick={()=>{push(PATH.USERS_INDEX)}}
        ></Cell>
        <Cell
          className="cell-border"
          title="临时密码"
          prefixIcon={<Icon name="hourglass"/>}
          size="medium"
          onClick={()=>{push(PATH.TEMP_PASSWORD_INDEX)}}
        ></Cell>
        <Cell
          className="cell-border"
          title="视频监控"
          prefixIcon={<Icon name="monitor"/>}
          size="medium"
          onClick={()=>{push(PATH.VIDEO_MONITOR)}}
        ></Cell>
      </div>
    </main>
  );
}
