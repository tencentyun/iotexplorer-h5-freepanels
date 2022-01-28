import React, { useState, useEffect } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import dayjs from 'dayjs';
import { Steps } from 'antd-mobile';
import './record.less';

const { Step } = Steps;

const DAY_DESC: string[] = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六'
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
          FieldName: 'woke_mode',
          MaxTime: currentTime,
          MinTime: lastYearTime,
          Limit: 10
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
    sdk.tips.show('接口未开发，功能暂时不能使用！');
  };

  const statusLabel: any = {
    disarmed: '撤防',
    arm: '布防',
    home: '在家',
    sos: '紧急',
    work: '工作',
    play: '休闲'
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
  }
  return (
    <div className="records-view">
      {recordList.length > 0 ? (
        <Steps direction="vertical">
          {recordList.map((value, index) => (
            <Step key={index} title={recordItem(value)} status="wait" />
          ))}
        </Steps>
      ) : (
        <div className="no-record-tips">没有历史记录</div>
      )}
      <div
        className="del-record"
        onClick={() => {
          clearRecordList();
        }}
      >
        清除记录
      </div>
    </div>
  );
}
