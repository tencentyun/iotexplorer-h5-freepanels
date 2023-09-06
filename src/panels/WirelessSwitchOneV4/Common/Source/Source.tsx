import React, { useState, useMemo } from 'react';
import { useTitle } from '@src/hooks/useTitle';
import { Tabs } from '@custom/Tabs';
import { DatePicker } from '@custom/DatePicker';
import { Cell } from '@custom/Cell';
import { EcChart } from '../EcChart';
import dayjs from 'dayjs';

const getTypeBeforeDate = (date, type) => {
  let before = null;
  switch (type) {
    case 'day':
      before = date.subtract(6, 'day');
      break;
    case 'month':
      before = date.subtract(29, 'day');
      break;
    case 'year':
      before = date.subtract(11, 'month');
      break;
    default:
      break;
  }
  return before;
};

const getStatisticDate = (type, date) => {
  let formatDate;
  switch (type) {
    case 'day':
    case 'month':
      formatDate = `${date?.[0]?.format('YYYY/MM/DD')} - ${date?.[1]?.format('YYYY/MM/DD')}`;
      break;
    case 'year':
      formatDate = `${date?.[0]?.format('YYYY/MM')} - ${date?.[1]?.format('YYYY/MM')}`;
      break;
    default:
      break;
  }
  return formatDate;
};

function RandomNum(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

const genMockData = (type, date) => {
  const xArr: string[] = [];
  const yArr: number[] = [];
  let max;
  let calculateType;
  let format;
  let dataRange;

  switch (type) {
    case 'day':
      max = 7;
      calculateType = 'day';
      format = 'YYYY/MM/DD';
      dataRange = [6, 20];
      break;
    case 'month':
      max = 30;
      calculateType = 'day';
      format = 'YYYY/MM/DD';
      dataRange = [6, 20];
      break;
    case 'year':
      max = 12;
      calculateType = 'month';
      format = 'YYYY/MM';
      dataRange = [80, 320];
      break;
    default:
      break;
  }

  for (let i = max - 1; i >= 0; i--) {
    xArr.push(date.subtract(i, calculateType).format(format));
    yArr.push(RandomNum(dataRange[0], dataRange[1]));
  }

  return {
    xArr,
    yArr,
  };
};

const defaultTimes = {
  day: [getTypeBeforeDate(dayjs(), 'day'), dayjs()],
  month: [getTypeBeforeDate(dayjs(), 'month'), dayjs()],
  year: [getTypeBeforeDate(dayjs(), 'year'), dayjs()],
};

export const ElectricStatisticsPanel = ({
  deviceData = {},
}: { deviceData: Record<string, any> }) => {
  const { cur_ele, cur_current, cur_voltage, cur_power } = deviceData;

  return (
    <div className="electric-statistics-panel">
      <div className="panel-item">
        <div className="item-value">{cur_ele || '-'}</div>
        <div className="item-label">今日电量</div>
        <div className="item-unit">（度）</div>
      </div>
      {/* <div className="panel-item">*/}
      {/*  <div className="item-value">{cur_current || '-'}</div>*/}
      {/*  <div className="item-label">当前电流</div>*/}
      {/*  <div className="item-unit">（A）</div>*/}
      {/* </div>*/}
      <div className="panel-item">
        <div className="item-value">{cur_voltage || '-'}</div>
        <div className="item-label">当前电压</div>
        <div className="item-unit">（V）</div>
      </div>
      <div className="panel-item">
        <div className="item-value">{cur_power || '-'}</div>
        <div className="item-label">当前功率</div>
        <div className="item-unit">（W）</div>
      </div>
    </div>
  );
};

export const Source = (props) => {
  useTitle('电量统计');
  const {
    deviceData = {},
  } = { ...props };
  const statistics = [
    ['周', 'day'],
    ['月', 'month'],
    ['年', 'year'],
  ];
  const [pickerVisible, setPickerVisible] = useState(false);
  const [times, setTimes] = useState(defaultTimes);
  const [curTab, updateCurTab] = useState('day');

  const {
    xArr,
    yArr,
  } = useMemo(() => genMockData(curTab, times[curTab][1]), [curTab]);

  return (
    <div className="wireless-source">
      <div className='statistics-panel-wrap'>
        <ElectricStatisticsPanel deviceData={deviceData}/>
      </div>
      <div className="statistics">
        <Tabs
          onChange={id => updateCurTab(id)}
        >
          {statistics.map(([label, type], index) => <Tabs.Tab title={label} key={type}>
            <div className="date-panel">
              <Cell
                isLink={false}
                className="cell-settings"
                title="统计时间"
                value={getStatisticDate(type, times[type])}
                valueStyle="set"
                // onClick={() => setPickerVisible(true)}
              ></Cell>
              <DatePicker
                visible={pickerVisible}
                onCancel={() => setPickerVisible(false)}
                precision={type}
                value={times?.[type]?.[1].toDate()}
                onConfirm={(value) => {
                  times[type][1] = dayjs(value);
                  times[type][0] = getTypeBeforeDate(dayjs(value), type);
                  setTimes(times);
                  setPickerVisible(false);
                }}
              />
              <EcChart xArr={xArr} yArr={yArr} />
            </div>
          </Tabs.Tab>)}
        </Tabs>
      </div>
    </div>
  );
};
