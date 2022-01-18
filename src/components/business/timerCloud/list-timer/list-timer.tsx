import React, { FC, useEffect, useImperativeHandle, useState } from 'react';
import classNames from 'classnames';
import { Switch } from '@components/base';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { arrWeek } from '../add-timer/repeat/repeat';
import {
  ITimerDataBind,
  ITimerOptions
} from '../timer-cloud';

// import { requestTokenApi } from '@/business';
import { requestTokenApi } from '@hooks/useDeviceData';
export interface ITimer {
  TimerId: string;
  TimerName: string;
  ProductId: string;
  DeviceName: string;
  Days: string;
  TimePoint: string;
  Repeat: number;
  Data: string;
  Status: number;
  CreateTime: number;
  UpdateTime: number;
}

const ListTimer: FC<{
  cRef?: any;
  // eslint-disable-next-line no-unused-vars
  onEdit?: (timer: ITimer) => void;
  dataBind: ITimerDataBind;
  options: ITimerOptions;
}> = ({ cRef, options }) => {
  const [dataList, setDataList] = useState([] as ITimer[]);

  useImperativeHandle(cRef, () => ({ reload: getTimerList }));

  const TIMER_API = {
    UPDATE: 'AppModifyTimerStatus',
    LIST: 'AppGetTimerList',
    DELETE: 'AppDeleteTimer'
  };

  const changeStatus = async (TimerId: string, Status: number) => {
    await requestTokenApi(TIMER_API.UPDATE, { Status, TimerId });
    getTimerList();
  };

  const getTimerList = async () => {
    const { TimerList } = await requestTokenApi(TIMER_API.LIST, {});
    setDataList(TimerList || []);
  };

  const handleDeleteTimer = async (TimerId: string) => {
    await requestTokenApi(TIMER_API.DELETE, { TimerId });
    getTimerList();
  };

  let timerTouch: any = null;

  const handleTouchStart = (TimerId: string) => {
    timerTouch = setTimeout(async () => {
      const res = await sdk.tips.confirm('要删除当前定时吗？');
      if (res) handleDeleteTimer(TimerId);
    }, 800);
  };

  const handleTouchEnd = () => {
    clearTimeout(timerTouch);
  };

  const renderDesc = (data: string) => {
    let result = '';
    try {
      const dataObj = JSON.parse(data) as any;
      Object.keys(dataObj).forEach(k => {
        const value = options[k].value_enum
          ? options[k].value_enum[dataObj[k]]
          : dataObj[k];
        if (value) result += `${options[k].label}: ${value} `;
      });
    } catch (e) {
      console.error(e);
    }
    return result;
  };

  const stopTextMenu = (e: Event) => e.preventDefault();

  useEffect(() => {
    getTimerList();
  }, []);

  const eventKey = 'contextmenu';
  useEffect(() => {
    document.addEventListener(eventKey, stopTextMenu);
    return () => {
      document.removeEventListener(eventKey, stopTextMenu);
    };
  });

  return (
    <ul className="timer-cloud-wrap">
      {dataList.map(({ Status, TimerId, TimePoint, Days, Data }: ITimer) => (
        <li
          className={classNames('timer-list-card', Status === 1 && 'curr')}
          onTouchStart={handleTouchStart.bind(this, TimerId)}
          onTouchEnd={handleTouchEnd}
          key={TimerId}
        >
          <div className="timer-list-body">
            <span className="timer">{TimePoint}</span>
            <span className="repeat">
              {Days.split('').map((item, index) => {
                return item === '1' ? arrWeek[index] + ' ' : '';
              })}
            </span>
            <span className="switch">
              <Switch
                name="status"
                checked={Status === 1}
                onChange={(isChecked: boolean) => {
                  changeStatus(TimerId, isChecked ? 1 : 0);
                }}
              />
            </span>
          </div>
          <div className="timer-list-desc">{renderDesc(Data)}</div>
        </li>
      ))}
    </ul>
  );
};

export default ListTimer;
