import React, { useState, useRef } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import dayjs from 'dayjs';
import { Steps } from 'antd-mobile';
import './record.less';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
  const [value, onChange] = useState(new Date());

  // 获取历史记录
  const getDeviceDataHistory = async () => {
    try {
      const time = onChange;
      const currentTime = new Date(time).getTime();
      const lastYearTime = currentTime - 1000 * 60 * 60 * 24;

      const recordListInfo = await sdk.getDeviceDataHistory({
        FieldName: 'systolic_pressure',
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

  // 清除消息记录
  const clearRecordList = () => {
    sdk.tips.show('接口未开发，功能暂时不能使用！');
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
          <div className="status">{Number(result.Value)}血压</div>
          <div className="label">心率</div>
        </div>
      </div>
    );
  };

  const calendar = useRef();

  const goToday = (e) => {
    e.stopPropagation();
    // setCalView(new Date())
    // history.back();
    calendar.current.setActiveStartDate(new Date());
  };
  const viewChange = (e) => {
    const el = document.getElementsByClassName('react-calendar__navigation__next2-button')[0];
    if (e.view == 'month') {
      el.style.visibility = 'visible';
    } else {
      el.style.visibility = 'hidden';
    }
  };
  return (
    <div className="records-view">
      <div onClick={getDeviceDataHistory}>
        <Calendar
          ref={calendar}
          onChange={(value, event) => onChange(value)}
          onViewChange={viewChange}
          value={value}
          showNeighboringMonth={false}
          next2Label={(<div className={'today'} onClick={e => goToday(e)}>今天</div>)}
          tileContent={({ activeStartDate, date, view }) => (view === 'month' ? date.getDate() : null)}
        />
      </div>
      {recordList.length > 0 ? (
        <Steps direction="vertical">
          {recordList.map((value, index) => (
            <Step key={index} title={recordItem(value)} status="wait" />
          ))}
        </Steps>
      ) : (
        <div className="no-record-tips">没有历史记录</div>
      )}
    </div>
  );
}
