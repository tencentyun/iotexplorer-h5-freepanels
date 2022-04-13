import React, { useState, useEffect } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import dayjs from 'dayjs';
import { Steps } from '@custom/Step';
import { Empty } from '@custom/Empty';
const { Step } = Steps;
const defaultData = [
  // {
  //   Time: 1649781697413,
  //   Value: '1',
  // },
  // {
  //   Time: 1649781697413,
  //   Value: '3',
  // },
];
const DAY_DESC: string[] = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
];
export interface RecordItemProps {
  Time: number;
  Value: string;
}

export const Record = ({
  deviceInfo: { DeviceName },
  productInfo: { ProductId },
}) => {
  const [recordList, setRecordList] = useState<RecordItemProps[]>();
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    // 获取历史记录
    const getDeviceDataHistory = async () => {
      try {
        const time = new Date();
        const currentTime = new Date().getTime();
        const lastYear = new Date().getFullYear() - 1;
        const lastYearTime = time.setFullYear(lastYear);

        const recordListInfo = await sdk.getDeviceDataHistory({
          Action: 'AppGetDeviceDataHistory',
          ProductId,
          DeviceName,
          FieldName: 'manual_feed',
          MaxTime: currentTime,
          MinTime: lastYearTime,
          Limit: 10,
        });
        setRecordList(defaultData || recordListInfo?.Results);
        setLoaded(true);
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataHistory();
  }, []);

  const isEmpty = isLoaded && !(recordList && recordList.length);
  window.dayjs = dayjs;
  return (
    <div className="records-list">
      {isEmpty ? (
        <Empty>没有喂食记录</Empty>
      ) : (
        <Steps direction="vertical" className="pet-step">
          {recordList?.map(({ Time, Value }, index) => (
            <Step
              key={index}
              title={
                <div className="step-item-title">
                  <div>
                    <div className="step-time">
                      {dayjs(new Date(Time)).format('HH: mm')}
                    </div>
                    {DAY_DESC[dayjs(new Date(Time)).day()]}
                  </div>
                  <span>{Value}</span>
                </div>
              }
              status={index ? 'wait' : 'finish'}
              description={
                <div className="step-item-desc">
                  <span>
                    {dayjs(new Date(Time)).format('YYYY.MM.DD') || ''}
                  </span>
                  <span>喂食份数</span>
                </div>
              }
            />
          ))}
        </Steps>
      )}
    </div>
  );
};
