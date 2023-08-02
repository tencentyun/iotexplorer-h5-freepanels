/*
 * @Description: 历史记录详情
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Steps } from '@src/components/custom/Steps';
import { useTitle } from '@hooks/useTitle';
import dayjs from "dayjs";
window.dayjs = dayjs;

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
      // AccessToken: "AccessToken",
      Action: 'AppListEventHistory',
      ProductId: props?.deviceInfo?.ProductId,
      DeviceName: props?.deviceInfo?.DeviceName,
      // StartTime: (+ new Date() - 7 * 24 * 60 * 60 * 1000) / 1000, 
      // EndTime: (+ new Date())/1000,
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

    let datas = result?.EventHistory?.map(item => ({
      Time: item.TimeStamp,
      Value: ALARM_ACTIVES[JSON.parse(item?.Data || "{}")?.alarm_type],
      TIME: dayjs(item.TimeStamp).format("MM-DD"),
    })) || [];


  //   const datas =[
  //     {
  //     "Time": 1690108605484,
  //     "Value": "水浸报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690108605475,
  //     "Value": "烟雾报警",
  //     "TIME": "07-24"
  // },
  // {
  //     "Time": 1690108605466,
  //     "Value": "燃气报警",
  //     "TIME": "07-25"
  // },
  // {
  //     "Time": 1690308605464,
  //     "Value": "紧急sos",
  //     "TIME": "07-28"
  // },
  // {
  //     "Time": 1690108605463,
  //     "Value": "异常警报",
  //     "TIME": "07-28"
  // },
  // {
  //     "Time": 1690108605459,
  //     "Value": "防盗报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690208605455,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690109605453,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690108583361,
  //     "Value": "燃气报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690108583360,
  //     "Value": "水浸报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690108583358,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690108583350,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690108583344,
  //     "Value": "烟雾报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690108583344,
  //     "Value": "防盗报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690108583344,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690108583328,
  //     "Value": "异常警报",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107999838,
  //     "Value": "烟雾报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107999837,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107999836,
  //     "Value": "燃气报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107999834,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107999826,
  //     "Value": "异常警报",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107999826,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107999822,
  //     "Value": "防盗报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107999820,
  //     "Value": "水浸报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107492575,
  //     "Value": "燃气报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107492575,
  //     "Value": "烟雾报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107492573,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107492570,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107492561,
  //     "Value": "水浸报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107492558,
  //     "Value": "防盗报警",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107492557,
  //     "Value": "异常警报",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107492557,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // },
  // {
  //     "Time": 1690107443365,
  //     "Value": "紧急sos",
  //     "TIME": "07-23"
  // }];



    let oData = {};
    // 按照月和日进行分组
    datas.map(item => {
      oData[item?.TIME] ? oData[item?.TIME].push(item) : (oData[item?.TIME] = [item])
    })

    let groupData = [];
    for (let key in oData) {
      groupData.push({ key, children: oData[key] });
    }


    setRecordList(groupData);

  };


  useEffect(() => {
    getDeviceDataHistory();
  }, []);


  return (
    <div className={classNames('gateway-record', { 'no-record': recordList.length === 0 })}>
      {recordList.length > 0 ? (<>
        {
          recordList.map(({ key, children }) => {

            let [moth, day] = key?.split('-');

            return <div>
              <div className='g-date'>
                <span className="g-day">{day}</span><span className='g-mouth'>{1 * moth}月</span>
              </div>
              <Steps stepData={children} statusLabels={ALARM_ACTIVES} type={'gateway'} />
            </div>
          })

        }


      </>) : (
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
