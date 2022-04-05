/*
 * @Description: 烟雾报警器记录
 */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Steps } from 'antd-mobile';
import dayjs from 'dayjs';

import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

const { Step } = Steps;

const DAY_DESC: string[] = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
];

interface HistoryResultProps {
  Time: string;
  Value: string;
}

export function Record() {
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    // 获取历史记录
    const getDeviceDataHistory = async () => {
      try {
        const time = new Date();
        const currentTime = new Date().getTime();
        const lastYear = new Date().getFullYear() - 1;
        const lastYearTime = time.setFullYear(lastYear);

        const recordListInfo = await sdk.getDeviceDataHistory({
          FieldName: 'smoke_sensor_state',
          MaxTime: currentTime,
          MinTime: lastYearTime,
          Limit: 10,
        });
        console.log('get info', recordListInfo);
        setRecordList(recordListInfo.Results);
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataHistory();
  }, []);

  // 清除消息记录
  const clearRecordList = () => {
    if (recordList.length === 0) {
      sdk.tips.show('没有记录可清除');
      return;
    }
    try {
      sdk.requestTokenApi('AppDeleteDeviceDataHistory', {
        Action: 'AppDeleteDeviceDataHistory',
        DeviceName: sdk.deviceName,
        ProductId: sdk.productId,
      });
      setRecordList([]);
      sdk.tips.show('记录已清除');
    } catch (err) {
      sdk.tips.show(err);
    }
  };

  const statusLabel: any = {
    1: '烟雾报警',
    2: '正常',
    3: '检测中',
    4: '未知',
  };
  // 记录里面的内容
  const recordItem = (result: HistoryResultProps) => {
    // 获取时间
    const date = dayjs(Number(result.Time));

    return (
      <div className="item">
        <div className="item-left">
          <div className="detail">
            <span className="time">{date.format('HH:mm')}</span>
            <span className="week">{DAY_DESC[date.day()]}</span>
          </div>
          <div className="date">{date.format('YYYY-MM-DD')}</div>
        </div>
        <div className="item-right">
          <div className="status">{statusLabel[Number(result.Value)]}</div>
          <div className="label">状态</div>
        </div>
      </div>
    );
  };

  return (
    <main className={classNames('smoke-alarm-record', { 'bottom-fill': recordList.length > 0 })}>
      {recordList.length > 0 ? (
        <Steps direction="vertical">
          {recordList.map((value, index) => (
            <Step key={index} title={recordItem(value)} status="wait" />
          ))}
        </Steps>
      ) : (
        <div className="no-record-tips">没有报警记录</div>
      )}

      <footer className="footer">
        <div className="footer-button" onClick={clearRecordList}>
          消除记录
        </div>
      </footer>
    </main>
  );
}
