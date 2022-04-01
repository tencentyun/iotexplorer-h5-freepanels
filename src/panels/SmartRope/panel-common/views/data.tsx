/**
 * 数据
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Block } from '@components/layout';
import { SvgIcon } from '@components/common';
import { LineChart } from '../components/lineChart/line-chart';
import { TrainingData } from '../components/trainingData';
import { DeviceSateContext } from '../deviceStateContext';
import { getThemeType } from '@libs/theme';
import { ThemeType } from '@libs/global';
import { SkinProps } from '../skinProps';

import { CalendarPopup } from '../components/calendar';
import dayjs from 'dayjs';

import './data.less';

const data: any = [
  {
    x: '00:00',
    y: 0.1,
  },
  {
    x: '12:00',
    y: 0.5,
  },
  {
    x: '24:00',
    y: 0.4,
  },
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

export function Data() {
  const theme: ThemeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[theme];
  // 时间单位类型，天、周、月、年
  const [unitType, setUnitType] = useState('day');
  const [mode, setMode] = useState('duration');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [time, setTime] = useState<Date | undefined>(new Date());

  const formatDate = (value: Date | undefined) => dayjs(value).format('MM月DD日');

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <main className="data-container">

          <Block className="data-chart">
            <div className="select-wrap">
              <div className="button-wrap">
                <div
                  className={classNames(
                    'button-month',
                    unitType === 'day' ? 'active' : '',
                  )}
                  onClick={() => {
                    setUnitType('day');
                  }}
                >
                  日
                </div>
                <div
                  className={classNames(
                    'button-month',
                    unitType === 'week' ? 'active' : '',
                  )}
                  onClick={() => {
                    setUnitType('week');
                  }}
                >
                  周
                </div>
                <div
                  className={classNames(
                    'button-month',
                    unitType === 'month' ? 'active' : '',
                  )}
                  onClick={() => {
                    setUnitType('month');
                  }}
                >
                  月
                </div>
                <div
                  className={classNames(
                    'button-year',
                    unitType === 'year' ? 'active' : '',
                  )}
                  onClick={() => {
                    setUnitType('year');
                  }}
                >
                  年
                </div>
              </div>
            </div>
            <div className="time-select" onClick={() => {
              setCalendarVisible(true);
            }}>
              <div onClick={() => {}}>
                <SvgIcon
                  className="slider-button prev"
                  name="icon-triangle"
                  color="#B5C4D1"
                />
              </div>
              <div className="time">
                {formatDate(time)}
              </div>
              <div onClick={() => {}}>
                <SvgIcon
                  className="slider-button next"
                  name="icon-triangle"
                  color="#B5C4D1"
                />
              </div>
            </div>

            {data ? (
              <LineChart className="line-chart" data={data} {...CurrentSkinProps.lineChart}/>
            ) : null}
            <div className="footer-select-wrap">
              <div className="button-wrap">
                <div
                  className={classNames(
                    'button-month',
                    mode === 'duration' ? 'active' : '',
                  )}
                  onClick={() => {
                    setMode('duration');
                  }}
                >
                  个数
                </div>
                <div
                  className={classNames(
                    'button-month',
                    mode === 'calorie' ? 'active' : '',
                  )}
                  onClick={() => {
                    setMode('calorie');
                  }}
                >
                  卡路里
                </div>
                <div
                  className={classNames(
                    'button-month',
                    mode === 'time' ? 'active' : '',
                  )}
                  onClick={() => {
                    setMode('time');
                  }}
                >
                  时长
                </div>
              </div>
            </div>
          </Block>
          {unitType === 'year' && <TrainingData
            title="年度运动报告"
            titleIcon={
              <span className="icon-training-report"></span>
            }
            totalCount={0}
            titalTime={0}
            totalCalories={0}
          ></TrainingData>}

          <CalendarPopup
            visible={calendarVisible}
            value={time}
            onCancel={() => {
              setCalendarVisible(false);
            }}
            onConfirm={(value) => {
              setTime(value);
              setCalendarVisible(false);
            }}
          ></CalendarPopup>
        </main>
      )}
    </DeviceSateContext.Consumer>
  );
}
