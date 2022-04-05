import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Modal } from '@components/base';
import './record.less';
import dayjs from 'dayjs';
import { Steps } from 'antd-mobile';
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

const History_Records = ({ isShow, onClose }) => {
  const [recordList, setRecordList] = useState([]);
  // 获取历史记录
  const getDeviceDataHistory = async () => {
    try {
      const time = sdk.deviceData.month ? sdk.deviceData.year : new Date();
      const currentTime = sdk.deviceData.year ? sdk.deviceData.month : new Date().getTime();
      const lastYear = new Date().getFullYear() - 1;
      const lastYearTime = time.setFullYear(lastYear);

      const recordListInfo = await sdk.getDeviceDataHistory({
        FieldName: 'alarm_state',
        MaxTime: currentTime,
        MinTime: lastYearTime,
        Limit: 10,
      });
      console.log('get info', recordListInfo);
      setRecordList(recordListInfo.Results);
    } catch (err) {
      console.error('get info fail', err);
    }
    getDeviceDataHistory();
  };

  const handleCommit = () => {
    onClose();
  };

  const statusLabel: any = {
    alarm_sound: '声音告警',
    alarm_light: '光亮报警',
    alarm_sound_light: '声光报警',
    normal: '正常',
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
    <Modal
      title={'历史记录'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <div className="records-view">
        {recordList.length > 0 ? (
          <Steps direction="vertical">
            {recordList.map((value, index) => (
              <Step key={index} title={recordItem(value)} status="wait" />
            ))}
          </Steps>
        ) : (
          <div className="no-record-tips">没有开关记录</div>
        )}
      </div>
    </Modal>
  );
};

export default History_Records;
