import React, { useEffect, useState } from 'react';
import { Modal } from '@components/Modal';
import './CalendarList.less';
import moment, { Moment } from 'moment';
import classNames from 'classnames';
import { ScrollView } from '@components/ScrollView';

export interface CalendarListProps {
  changeDate: Function;
  visible: boolean;
  setVisible: Function;
  // reload: Function;
  disabledDate?: (date: Moment) => boolean;
}

export function CalendarList({
  changeDate,
  visible,
  setVisible,
  // reload,
  disabledDate = () => false,
}: CalendarListProps) {
  const [calendarList, setCalendarList] = useState<any[]>([]);
  const onCalendarClose = () => {
    setVisible(false);
  };
  const weekDayMap = {
    Sunday: '日',
    Monday: '一',
    Tuesday: '二',
    Wednesday: '三',
    Thursday: '四',
    Friday: '五',
    Saturday: '六',
  };

  // 初始化先获取当前月份的arr
  useEffect(() => {
    const initDate = moment();
    const monthArr = getMonthArr(initDate, true);
    const newDate = moment(initDate).add(1, 'month');
    const nextMonthArr = getMonthArr(newDate);
    const item = {
      date: initDate,
      monthArr,
    };
    const nextItem = {
      date: newDate,
      monthArr: nextMonthArr,
    };
    const newCalendarList = [item, nextItem];
    setCalendarList(newCalendarList);
  }, []);

  // 每个月份占据35格，这里获取好排列方式
  const getMonthArr = (momentDate, isToday = false): any[] => {
    // 日历中对今天的展示做特殊处理，要区分是否包含today
    let todayIndex = -1;
    if (isToday) {
      todayIndex = momentDate.format('D');
    }
    const weekday = momentDate.clone().startOf('month')
      .format('dddd');
    const length = momentDate.daysInMonth();
    // startIndex为日历矩阵中第一个不为空的格子
    const startIndex = Object.keys(weekDayMap).indexOf(weekday);
    const newArray = new Array(42).fill('')
      .map((item, index) => {
        if (index >= startIndex && index < startIndex + length) {
          const res =          Number(todayIndex) - 1 === index - startIndex
            ? '今天'
            : index - startIndex + 1 < 10
              ? `0${index - startIndex + 1}`
              : index - startIndex + 1;
          return res;
        }
      });
    if (!newArray[28]) {
      return newArray.splice(0, 28);
    } if (!newArray[35]) {
      return newArray.splice(0, 35);
    }
    return newArray;
  };

  return (
    <Modal
      visible={visible}
      fixedBottom={true}
      onClose={onCalendarClose}
      maskClosable={true}
      title={'选择日期'}
    >
      <>
        {/* 日历<组件 */}
        <div className="calendar-header-week">
          {Object.values(weekDayMap).map((item, index) => (
              <div
                className={classNames('calendar-header-week-item', {
                  'calendar-header-week-item-active':
                    index === 0 || index === 6,
                })}
              >
                {item}
              </div>
          ))}
        </div>
        <ScrollView
          className="calendar-scroll"
          scrollTop={300}
          onReachBottom={() => {
            const nextMonth = moment(calendarList[calendarList.length - 1].date).add(1, 'month');
            const monthArr = getMonthArr(nextMonth);
            const newArray = calendarList.concat();
            newArray.push({
              date: nextMonth,
              monthArr,
            });
            setCalendarList(newArray);
          }}
          onReachTop={() => {
            const prevMonth = moment(calendarList[0].date).subtract(1, 'month');
            const monthArr = getMonthArr(prevMonth);
            const newArray = calendarList.concat();
            newArray.unshift({
              date: prevMonth,
              monthArr,
            });
            setCalendarList(newArray);
          }}
          style={{ height: '300px', overflow: 'scroll' }}
        >
          {calendarList.map(item => (
              <>
                <div className="calendar-month-title">
                  {item.date.format('yyyy')}年{item.date.format('MM')}月
                </div>
                <div className="calendar-month-wrapper">
                  {item.monthArr.map((_item, index) => (
                      <div
                        aria-disabled={true}
                        onClick={() => {
                          console.log(item.date);
                          const date =                            _item === '今天'
                            ? moment()
                            : item.date
                              .clone()
                              .startOf('month')
                              .add(Number(_item) - 1, 'days');
                          // changeDate(date);
                          // reload({newDate:date});
                          changeDate(date);
                          setVisible(false);
                        }}
                        className={classNames('calendar-month-day', {
                          'calendar-weekend':
                            index % 7 === 0 || (index + 1) % 7 === 0,
                          'calendar-today': _item === '今天',
                          'calendar-disabled': disabledDate(_item === '今天'
                            ? moment()
                            : item.date
                              .startOf('month')
                              .add(Number(_item) - 1, 'days')),
                        })}
                      >
                        {_item || ''}
                      </div>
                  ))}
                </div>
              </>
          ))}
        </ScrollView>
      </>
    </Modal>
  );
}
