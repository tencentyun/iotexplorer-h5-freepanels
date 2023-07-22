/*
 * @Description: 历史记录详情
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Steps } from '@src/components/custom/Steps';
import { useTitle } from '@hooks/useTitle';

export function Record(props) {
  useTitle('报警历史')
  const [recordList, setRecordList] = useState([]);

  let ALARM_ACTIVES = {
    "0": "异常警报",
    "1": "防盗报警",
    "2": "燃气报警",
    "3": "水浸报警",
    "4": "烟雾报警",
    "5": "紧急sos",
    "6": "门铃声"
  };


    // 获取历史记录
    const getDeviceDataHistory = async () => {
      
      let result = await sdk.requestTokenApi('AppListEventHistory', {
        AccessToken: "AccessToken",
        Action: 'AppListEventHistory',
        ProductId: props?.deviceInfo?.ProductId,
        DeviceName: props?.deviceInfo?.DeviceName,
        StartTime: (+ new Date() - 7 * 24 * 60 * 60 * 1000) / 1000, 
        EndTime: (+ new Date())/1000,
        Type: "alert",
        Size: 100
      });

      // const result = {
      //   EventHistory: [{
      //     "TimeStamp": 1554484903,
      //     "ProductId": "product1",
      //     "DeviceName": "light3",
      //     "EventId": "status_report",
      //     "Type": "info",
      //     "Data": "{\"alarm_type\": 1,\"message\": \"test message:11:35:03.288277\"}"
      //   }, {
      //     "TimeStamp": 1553485903,
      //     "ProductId": "product1",
      //     "DeviceName": "light3",
      //     "EventId": "status_report",
      //     "Type": "info",
      //     "Data": "{\"alarm_type\": 2,\"message\": \"test message:11:35:03.288277\"}"
      //   }, {
      //     "TimeStamp": 1553434903,
      //     "ProductId": "product1",
      //     "DeviceName": "light3",
      //     "EventId": "status_report",
      //     "Type": "info",
      //     "Data": "{\"alarm_type\": 3,\"message\": \"test message:11:35:03.288277\"}"
      //   }, {
      //     "TimeStamp": 1553484903,
      //     "ProductId": "product1",
      //     "DeviceName": "light3",
      //     "EventId": "status_report",
      //     "Type": "info",
      //     "Data": "{\"alarm_type\": 4,\"message\": \"test message:11:35:03.288277\"}"
      //   }]
      // };

      setRecordList(result?.EventHistory?.map(item => ({
        Time: item.TimeStamp,
        Value: ALARM_ACTIVES[JSON.parse(item?.Data || "{}")?.alarm_type]
      })) || []);
   
  };


  useEffect(() => {
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

  return (
    <div className={classNames('gateway-record', { 'no-record': recordList.length === 0 })}>
      {recordList.length > 0 ? (
        <Steps stepData={recordList} statusLabels={ALARM_ACTIVES} type={'gateway'} />
      ) : (
        <div className="no-record-tips">没有报警历史</div>
      )}

      {/* {recordList.length > 0 ? <footer className="footer">
        <div className="footer-button" onClick={clearRecordList}>
          删除
        </div>
      </footer> : null} */}
    </div>
  );
}
