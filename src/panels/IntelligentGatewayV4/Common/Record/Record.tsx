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

  useEffect(() => {
    // 获取历史记录
    const getDeviceDataHistory = async () => {
      try {
        // const time = new Date();
        // const currentTime = new Date().getTime();
        // const lastYear = new Date().getFullYear() - 1;
        // const lastYearTime = time.setFullYear(lastYear);

        let result = await sdk.requestTokenApi('AppListEventHistory', {
          Action: 'AppListEventHistory',
          ProductId: props?.deviceInfo?.ProductId,
          DeviceName: props?.deviceInfo?.DeviceName,
          Size: 50
        });
        result.EventHistory = [{
          "TimeStamp": 1553484903,
          "ProductId": "product1",
          "DeviceName": "light3",
          "EventId": "status_report",
          "Type": "info",
          "Data": "{\"status\": 0,\"message\": \"test message:11:35:03.288277\"}"
        }, {
          "TimeStamp": 1553484903,
          "ProductId": "product1",
          "DeviceName": "light3",
          "EventId": "status_report",
          "Type": "info",
          "Data": "{\"status\": 0,\"message\": \"test message:11:35:03.288277\"}"
        }, {
          "TimeStamp": 1553484903,
          "ProductId": "product1",
          "DeviceName": "light3",
          "EventId": "status_report",
          "Type": "info",
          "Data": "{\"status\": 0,\"message\": \"test message:11:35:03.288277\"}"
        }, {
          "TimeStamp": 1553484903,
          "ProductId": "product1",
          "DeviceName": "light3",
          "EventId": "status_report",
          "Type": "info",
          "Data": "{\"status\": 0,\"message\": \"test message:11:35:03.288277\"}"
        }]
        setRecordList(result?.EventHistory?.map(item => ({ Time: item.TimeStamp, Value: JSON.parse(item?.Data || "{}")?.message })));
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

  return (
    <div className={classNames('gateway-record', { 'no-record': recordList.length === 0 })}>
      {recordList.length > 0 ? (
        <Steps stepData={recordList} statusLabels={
          {
            0: '关闭',
            1: '开启',
            2: '未知',
          }
        } type={'gateway'} />
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
