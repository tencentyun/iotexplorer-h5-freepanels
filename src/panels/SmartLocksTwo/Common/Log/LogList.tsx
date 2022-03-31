import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Steps } from '@custom/Step';
import { Icon } from '@custom/Icon';
import { DatePicker } from '@custom/DatePicker';
import { Empty } from '@custom/Empty';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
const { Step } = Steps;

const defaultData = [
  {
    groupDate: 1647856154294, // 分组时间
    children: [
      { label: '妈妈门卡开门', date: 1647856154294 },
      { label: '妈妈门卡开门', date: 1647856154294 },
      { label: '妈妈门卡开门', date: 1647856154294 },
      { label: '妈妈门卡开门', date: 1647856154294 }
    ] // 分组的数据
  },
  {
    groupDate: 1647856154294, // 分组时间
    children: [
      { label: '妈妈门卡开门', date: 1647856154294 },
      { label: '妈妈门卡开门', date: 1647856154294 },
      { label: '妈妈门卡开门', date: 1647856154294 },
      { label: '妈妈门卡开门', date: 1647856154294 },
      { label: '妈妈门卡开门', date: 1647856154294 },
      { label: '妈妈门卡开门', date: 1647856154294 },
      { label: '妈妈门卡开门', date: 1647856154294 },
      { label: '妈妈门卡开门', date: 1647856154294 }
    ] // 分组的数据
  }
];

const getLastMothDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
};

export function LogList({ logType, activeKey }) {
  // 默认显示最近一个月的数据
  const [dateTime, setDateTime] = useState([getLastMothDate(), new Date()]);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const isEmpty = isLoaded && !data.length;
  // 后端加载日志数据
  const loadLog = async (dateTime, logType) => {
    const logList = await Promise.resolve(defaultData);
    setLoaded(true);
    setData(logList);
  };

  useEffect(() => {
    if (logType === activeKey) {
      loadLog(dateTime, logType);
    }
  }, [dateTime, activeKey]);

  console.log('渲染数据');
  return (
    <div className="log-list">
      {isEmpty ? (
        <Empty />
      ) : (
        <>
          {data.map(({ groupDate, children }, index) => (
            <div key={index}>
              <div className="group">{dayjs(groupDate).format('YYYY年MM月') || ''}</div>
              <div className="list">
                <Steps direction="vertical">
                  {children.map(({ label, date }, index) => (
                    <Step
                      key={index}
                      // icon={<div>aaa</div>}
                      title={label}
                      status={index ? 'wait' : 'finish'}
                      description={dayjs(date).format('YYYY.MM.DD HH: mm: ss') || ''}
                    />
                  ))}
                </Steps>
              </div>
            </div>
          ))}
          <div className="date-pick" onClick={setVisible.bind(null, true)}>
            <Icon name="date" size="large"></Icon>
          </div>

          <DatePicker
            visible={visible}
            showSemicolon={false}
            value={dateTime[0]}
            showUnit={true}
            mask={false}
            showTime={false}
            itemHeight={58}
            height={175}
            showTwoDigit={true}
            onConfirm={(startDate) => {
              setDateTime([startDate, new Date()]);
              setVisible(false);
            }}
            onCancel={setVisible.bind(null, false)}
          />
        </>
      )}
    </div>
  );
}
