import React, { useState, useEffect } from 'react';
import { RecordList, RecordItemProps } from '@components/business/recorrdList';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './records.less';

export function Records() {
  const [recordList, setRecordList] = useState<RecordItemProps>();

  useEffect(() => {
    // 获取历史记录
    const getDeviceDataHistory = async () => {
      try {
        const time = new Date();
        const currentTime = new Date().getTime();
        const lastYear = new Date().getFullYear() - 1;
        const lastYearTime = time.setFullYear(lastYear);

        const recordListInfo = await sdk.getDeviceDataHistory({
          FieldName: 'manual_feed',
          MaxTime: currentTime,
          MinTime: lastYearTime,
          Limit: 10,
        });

        const list: RecordItemProps[] = [];
        for (let i = 0; i < recordListInfo?.Results.length; i++) {
          const data = recordListInfo.Results[i];
          list.push({
            id: i,
            date: data.Time,
            value: data.Value,
            label: '喂食份数',
          });
        }

        console.log('get info', list);
        if (list && list.length > 0) {
          setRecordList(list as any);
        }
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataHistory();
  }, []);

  return (
    <div className="records-view">
      {recordList ? (
        <>
          <RecordList datas={recordList} />
          <div className="line"></div>
        </>
      ) : (
        <div className="no-record-tips">没有喂食记录</div>
      )}
    </div>
  );
}
