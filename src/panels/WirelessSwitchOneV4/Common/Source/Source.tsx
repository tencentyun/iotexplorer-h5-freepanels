import React, { useState } from 'react';
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
    default:
      break;
  }
  return before;
}


const getStatisticDate = (type, date) => {
  let formatDate;
  switch (type) {
    case 'day':
      formatDate = `${date?.[0]?.format('YYYY/MM/DD')} - ${date?.[1]?.format('YYYY/MM/DD')}`;
      break;
    case 'month':
      formatDate = date?.[1]?.format('YYYY/MM');
      break;
    case 'year':
      formatDate = date?.[1]?.format('YYYY');
    default:
      break;
  }
  return formatDate;
}

const defaultTimes = {
  day: [getTypeBeforeDate(dayjs(), 'day'), dayjs()],
  month: [getTypeBeforeDate(dayjs(), 'month'), dayjs()],
  year: [getTypeBeforeDate(dayjs(), 'year'), dayjs()]
}

export const Source = (props) => {
  useTitle('电量统计')
  const {
    deviceData = {},
  } = { ...props };
  const { cur_ele, cur_current, cur_voltage, cur_power } = deviceData;
  const statistics = [
    ['周', 'day'],
    ['月', 'month'],
    ['年', 'year']
  ];
  const [pickerVisible, setPickerVisible] = useState(false);
  const [times, setTimes] = useState(defaultTimes);
  return (
    <div className="wireless-source">
      <div className="source-panel">
        <div className="panel-item">
          <div className="item-value">{cur_ele || '-'}</div>
          <div className="item-label">今日电量</div>
          <div className="item-unit">（度）</div>
        </div>
        <div className="panel-item">
          <div className="item-value">{cur_current || '-'}</div>
          <div className="item-label">当前电流</div>
          <div className="item-unit">（A）</div>
        </div>
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
      <div className="statistics">
        <Tabs>
          {statistics.map(([label, type], index) => <Tabs.Tab title={label} key={type}>
            <div className="date-panel">
              <Cell
                className="cell-settings"
                title="统计时间"
                value={getStatisticDate(type, times[type])}
                valueStyle="set"
                onClick={() => setPickerVisible(true)}
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
                  setPickerVisible(false)
                }}
              />
              <EcChart times={times[type]} {...props} />
            </div>
          </Tabs.Tab>)}
        </Tabs>
      </div>

    </div>
  );
}
