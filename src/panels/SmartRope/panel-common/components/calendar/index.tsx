import React, { useState, useMemo } from 'react';
import { SvgIcon } from '@components/common/icon';
import { Popup } from 'antd-mobile';
import { StyledProps, ThemeType } from '@libs/global';
import { getThemeType } from '@libs/theme';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

import './style.less';


export interface CalendarPopupProps extends StyledProps {
  title?: string;
  visible?: boolean;
  value: Date | undefined;
  theme?: ThemeType;
  onCancel?: () => void;
  onConfirm?: (time: Date | undefined) => void;
}

export function CalendarPopup(props: CalendarPopupProps) {
  const themeType = getThemeType();

  const [time, setTime] = useState<Date | undefined>();

  useMemo(() => {
    const initVaule = props.value ? props.value : new Date();

    setTime(initVaule);
  }, [props.visible]);

  const handleCancel = () => {
    props.onCancel && props.onCancel();
  };

  const handleConfirm = () => {
    props.onConfirm && props.onConfirm(time);
  };

  const formatDate = (value: Date | undefined) => dayjs(value).format('MM月DD日');
  return (
    <Popup
      className="calendar-popup-wrap"
      visible={props.visible}
      onMaskClick={handleCancel}
    >
      <main className="calendar-popup">
        <header>
          <div className="btn cancelBtn" onClick={handleCancel}>
            取消
          </div>
          <div className="time-select">
            <div onClick={() => { }}>
              <SvgIcon
                className="slider-button prev"
                name="icon-triangle"
                color="#B5C4D1"
              />
            </div>
            <div className="time">
              {formatDate(time)}
            </div>
            <div onClick={() => { }}>
              <SvgIcon
                className="slider-button next"
                name="icon-triangle"
                color="#B5C4D1"
              />
            </div>
          </div>
          <div className="btn confirmBtn" onClick={() => {
            handleConfirm();
          }}>
            确定
          </div>
        </header>
        <Calendar
          className="calender"
          value={time}
          showNavigation={false}
          showNeighboringMonth={false}
          showWeekNumbers={false}
          minDetail="month"
          tileClassName={'calender-title'}
          locale="en"
          onChange={(value: any, event: any) => {
            console.log(value, '====asdf');
            setTime(value);
          }}
        />
      </main>
    </Popup>
  );
}
