/*
 * @Description: 历史记录详情
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Steps } from '@src/components/custom/Steps';

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
          FieldName: 'doorsensor_state',
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

  return (
    <main className={classNames('more-record', { 'no-record': recordList.length === 0 })}>
      {recordList.length > 0 ? (
          <Steps stepData={recordList}/>
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
