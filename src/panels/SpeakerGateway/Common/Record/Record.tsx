/*
 * @Description: 历史记录详情
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Steps } from '@src/components/custom/Steps';
import { useTitle } from '@hooks/useTitle';
import dayjs from 'dayjs';

window.dayjs = dayjs;

export function Record(props) {
  useTitle('报警历史');
  const [recordList, setRecordList] = useState([]);

  const ALARM_ACTIVES = {
    0: '异常警报',
    1: '防盗报警',
    2: '燃气报警',
    3: '水浸报警',
    4: '烟雾报警',
    5: '紧急sos',
    6: '门铃声',
  };

  // 获取历史记录
  const getDeviceDataHistory = async () => {
    const result = await sdk.requestTokenApi('AppListEventHistory', {
      // AccessToken: "AccessToken",
      Action: 'AppListEventHistory',
      ProductId: props?.deviceInfo?.ProductId,
      DeviceName: props?.deviceInfo?.DeviceName,
      // StartTime: (+ new Date() - 7 * 24 * 60 * 60 * 1000) / 1000,
      // EndTime: (+ new Date())/1000,
      Type: 'alert',
      Size: 100,
    });

    const datas = result?.EventHistory?.map(item => ({
      Time: item.TimeStamp,
      Value: ALARM_ACTIVES[JSON.parse(item?.Data || '{}')?.alarm_type],
      TIME: dayjs(item.TimeStamp).format('MM-DD'),
    })) || [];

    const oData = {};
    // 按照月和日进行分组
    datas.map((item) => {
      oData[item?.TIME] ? oData[item?.TIME].push(item) : (oData[item?.TIME] = [item]);
    });

    const groupData = [];
    for (const key in oData) {
      groupData.push({ key, children: oData[key] });
    }
    setRecordList(groupData);
  };


  useEffect(() => {
    getDeviceDataHistory();
  }, []);


  return (
    <div className={classNames('gateway-record', { 'no-record': recordList.length === 0 })}>
      {recordList.length > 0 ? (
        <>
          {recordList.map(({ key, children }) => {
            const [moth, day] = key?.split('-');

            return (
              <div key={key}>
                <div className='g-date'>
                  <span className='g-day'>{day}</span><span className='g-mouth'>{1 * moth}月</span>
                </div>
                <Steps stepData={children} statusLabels={ALARM_ACTIVES} type={'gateway'} />
              </div>
            );
          })}
        </>
      ) : (
        <div className='no-record-tips'>没有报警历史</div>
      )}
    </div>
  );
}
