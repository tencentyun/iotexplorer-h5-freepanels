import React, { useEffect, useState } from 'react';
import { Battery } from '@custom/Battery';
import { Icon } from '@custom/Icon';
import { Disk } from './Disk';
import dayjs from 'dayjs';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Home({
  deviceData,
  doControlDeviceData,
  history: { PATH, push },
}) {
  const [recordTime, setRecordTime] = useState('');
  const [recordStatus, setRecordStatus] = useState('');

  useEffect(() => {
    // 获取历史记录
    const getDeviceDataHistory = async () => {
      try {
        const time = new Date();
        const currentTime = new Date().getTime();
        const lastYear = new Date().getFullYear() - 1;
        const lastYearTime = time.setFullYear(lastYear);

        const recordListInfo = await sdk.getDeviceDataHistory({
          FieldName: 'doorsensor_state',
          MaxTime: currentTime,
          MinTime: lastYearTime,
          Limit: 1,
        });
        setRecordTime(recordListInfo.Results[0]?.Time || '');
        setRecordStatus(recordListInfo.Results[0]?.Value || '');
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataHistory();
  });

  // 获取时间
  const date = dayjs(Number(recordTime));

  const statusLabel: any = {
    0: '关闭',
    1: '打开',
  };

  return (
    <main className="home">
      {/* 顶部 */}
      <header>
        {/* 电源模块 */}
        <Battery
          value={deviceData.voltage || 50}
          isShowPercent={true}
          isShowTip={false}
        />
      </header>

      <Disk deviceData={deviceData} doControlDeviceData={doControlDeviceData}></Disk>
      <div className="tips">
        {recordStatus ? (
          <span>
            {date.format('YYYY-MM-DD HH:mm')}&nbsp;&nbsp;
            {statusLabel[Number(recordStatus)]
              ? statusLabel[Number(recordStatus)]
              : '未知'}
          </span>
        ) : (
          <span>暂无记录</span>
        )}
      </div>
      {/* 设置按钮 */}
      <div className="setting-block">
        <div
          className="setting-button"
          onClick={() => {
            push(PATH.RECORD);
          }}
        >
          <Icon name="record"/>
          <p className="button-name">更多记录</p>
        </div>
        <div
          className="setting-button"
          onClick={() => {
            sdk.goDeviceDetailPage();
          }}
        >
          <Icon name="settings"/>
          <p className="button-name">设置</p>
        </div>
      </div>
    </main>
  );
}
