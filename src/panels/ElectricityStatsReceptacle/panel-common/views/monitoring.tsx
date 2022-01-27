/*
 * @Description: 电源/运行监测
 */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Block } from '@components/layout';
import { SvgIcon } from '@components/common';
import { LineChart } from '../components/line-chart';
import { DeviceContext } from '../deviceContext';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import dayjs from 'dayjs';
import { getThemeType } from '@libs/theme';
import { SkinProps } from '../skinProps';

const MONTH_DESC: string[] = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月'
];
const nowTime = dayjs(new Date());
const nowMonth = nowTime.month();
const nowYear = nowTime.year();

const monthDays = new Date(nowYear, nowMonth, 0).getDate(); // 计算本月天数
const startOfMonth = new Date(nowYear, nowMonth, 1, 0, 0, 0).getTime();
const endOfMonth = new Date(nowYear, nowMonth, monthDays, 23, 59, 59).getTime();

const data: any = [
  {
    x: '1',
    y: 0.1
  },
  {
    x: '2',
    y: 0.5
  },
  {
    x: '3',
    y: 0.4
  },
  {
    x: '4',
    y: 1.2
  },
  {
    x: '4',
    y: 0.2
  },
  {
    x: '6',
    y: 1.2
  },
  {
    x: '7',
    y: 0.2
  }
];

// 聚合数据接口内结构
interface AggsDataProps {
  Data: number; // 数据
  Date: string; // 日期
  TimestampMs: number; // 时间戳
}

interface ChartItem {
  x: string;
  y: number;
}

export function Monitoring() {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const [currentStatus, setCurrentStatus] = useState('power');
  const [lineChartList, setLineChartList] = useState<ChartItem>();
  // 电量
  const [electricity, setElectricity] = useState(0);
  // 功耗
  const [power, setPower] = useState(0);
  // 电流
  const [current, setCurrent] = useState(0);
  // 电压
  const [voltage, setVoltage] = useState(0);

  const [year, setYear] = useState(nowYear);
  const [month, setMonth] = useState(nowMonth);
  const [mode, setMode] = useState('month');

  useEffect(() => {
    // 折线图数据
    getLineChartList();
    getPowerData();
    getCurrentData();
    getVoltageData();
  }, []);

  // 获取电量折线数据列表
  const getLineChartList = async () => {
    try {
      const chartData = await sdk.requestTokenApi('AppGetDeviceAggsData', {
        Action: 'AppGetDeviceAggsData',
        DeviceId: sdk.deviceId,
        AggMethod: 'sum',
        Interval: '7d',
        FieldName: 'power',
        MinTime: startOfMonth,
        MaxTime: endOfMonth
      });
      console.log('get chartData', chartData);
      if (chartData.Results && chartData.Results.length > 0) {
        const data: any = [];
        chartData.Results.map((value: AggsDataProps) => {
          const obj = { x: '', y: 0 };
          obj.x = formatGetData(value.TimestampMs).toString();
          obj.y = value.Data * 7 * 24;
          data.push(obj);
        });
        setLineChartList(data);
      } else {
        setLineChartList(data);
      }
    } catch (err) {
      console.error('get info fail', err);
    }
  };

  // 获取功率数据
  const getPowerData = async () => {
    try {
      const data = await sdk.requestTokenApi('AppGetDeviceAggsData', {
        Action: 'AppGetDeviceAggsData',
        DeviceId: sdk.deviceId,
        AggMethod: 'sum',
        Interval: monthDays + 'd',
        FieldName: 'power',
        MinTime: startOfMonth,
        MaxTime: endOfMonth
      });
      console.log('get setPower', data);
      if (data.Results && data.Results.length > 0) {
        setPower(data.Results[0].Data);
      } else {
        setPower(0);
      }
    } catch (err) {
      console.error('get info fail', err);
    }
  };

  // 获取电流数据
  const getCurrentData = async () => {
    try {
      const data = await sdk.requestTokenApi('AppGetDeviceAggsData', {
        Action: 'AppGetDeviceAggsData',
        DeviceId: sdk.deviceId,
        AggMethod: 'sum',
        Interval: monthDays + 'd',
        FieldName: 'current',
        MinTime: startOfMonth,
        MaxTime: endOfMonth
      });
      console.log('get current', data);
      if (data.Results && data.Results.length > 0) {
        setCurrent(data.Results[0].Data);
      } else {
        setCurrent(0);
      }
    } catch (err) {
      console.error('get info fail', err);
    }
  };

  // 获取电压数据
  const getVoltageData = async () => {
    try {
      const data = await sdk.requestTokenApi('AppGetDeviceAggsData', {
        Action: 'AppGetDeviceAggsData',
        DeviceId: sdk.deviceId,
        AggMethod: 'sum',
        Interval: monthDays + 'd',
        FieldName: 'voltage',
        MinTime: startOfMonth,
        MaxTime: endOfMonth
      });
      console.log('get setVoltage', data);
      if (data.Results && data.Results.length > 0) {
        setVoltage(data.Results[0].Data);
      } else {
        setVoltage(0);
      }
    } catch (err) {
      console.error('get info fail', err);
    }
  };

  // 电源监测
  const handlePowerMon = () => {
    setCurrentStatus('power');
  };
  // 运行监测
  const handleRunMon = () => {
    setCurrentStatus('run');
  };

  // 时间选择 向前
  const handlePreSelect = () => {
    if (mode === 'month') {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else {
      setYear(year - 1);
    }
  };
  // 时间选择 向后
  const handleNextSelect = () => {
    if (mode === 'month') {
      if (month === 11) {
        setMonth(0);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    } else {
      setYear(year + 1);
    }
  };

  const formatGetData = (time: number) => {
    return dayjs(time).format('MM/DD');
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="electricity-monitoring">
          <Block className="monitoring-switch-button">
            <div
              className={classNames(
                'button-name',
                currentStatus === 'power' ? 'button-name-active' : ''
              )}
              onClick={handlePowerMon}
            >
              电源监测
            </div>
            <div className="split"></div>
            <div
              className={classNames(
                'button-name',
                currentStatus === 'run' ? 'button-name-active' : ''
              )}
              onClick={handleRunMon}
            >
              运行监测
            </div>
          </Block>

          <Block className="monitoring-data">
            <div className="time-select">
              <div onClick={handlePreSelect}>
                <SvgIcon
                  className="slider-button prev"
                  name="icon-triangle"
                  color="#B5C4D1"
                />
              </div>
              <div className="time">
                {mode === 'month' ? year + MONTH_DESC[month] : year}
              </div>
              <div onClick={handleNextSelect}>
                <SvgIcon
                  className="slider-button next"
                  name="icon-triangle"
                  color="#B5C4D1"
                />
              </div>
            </div>
            <div className="select-wrap">
              <div className="desc">
                <span className="number">{electricity}</span>当
                {mode === 'month' ? '月' : '年'}电量
              </div>
              <div className="button-wrap">
                <div
                  className={classNames(
                    'button-month',
                    mode === 'month' ? 'active' : ''
                  )}
                  onClick={() => {
                    setMode('month');
                  }}
                >
                  月
                </div>
                <div
                  className={classNames(
                    'button-year',
                    mode === 'year' ? 'active' : ''
                  )}
                  onClick={() => {
                    setMode('year');
                  }}
                >
                  年
                </div>
              </div>
            </div>
            {lineChartList ? (
              <LineChart className="line-chart" data={lineChartList} {...CurrentSkinProps.lineChart} />
            ) : null}
            <div className="footer-data">
              <div>功耗:{power}W</div>
              <div>电流:{current}mA</div>
              <div>电压:{voltage}V</div>
            </div>
          </Block>
        </main>
      )}
    </DeviceContext.Consumer>
  );
}
