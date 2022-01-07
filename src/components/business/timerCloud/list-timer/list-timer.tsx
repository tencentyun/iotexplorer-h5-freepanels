/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-11-01 16:31:55
 * @LastEditors:
 * @LastEditTime:
 */

import React, { FC, useEffect, useImperativeHandle, useState } from 'react';
import classNames from 'classnames';
import { Switch } from '@components/base';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { arrWeek } from '@components/business/timerCloud/add-timer/repeat/repeat';
import {
  ITimerDataBind,
  ITimerOptions
} from '@components/business/timerCloud/timer-cloud';

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
  const { UserID, ProductId, DeviceName } = sdk.deviceInfo;

  useImperativeHandle(cRef, () => ({
    reload: () => {
      getDataPage();
    }
  }));

  const changeStatus = (TimerId: string, Status: number) => {
    const action = 'AppModifyTimerStatus';
    const params = {
      TimerId,
      UserID,
      ProductId,
      DeviceName,
      Status
    };
    sdk
      .requestTokenApi(action, params)
      .then(() => {
        getDataPage();
      })
      .catch(() => {
        sdk.tips.showError('状态更新失败');
      });
  };

  const getDataPage = () => {
    const action = 'AppGetTimerList';
    const params = {
      UserID,
      ProductId,
      DeviceName
    };
    sdk
      .requestTokenApi(action, params)
      .then((res: any) => {
        setDataList(res.TimerList || []);
      })
      .catch((err: any) => {
        // 请求失败
        console.error(err);
      });
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

  const handleDeleteTimer = (TimerId: string) => {
    const params = {
      DeviceName: sdk.deviceInfo.DeviceName,
      ProductId: sdk.deviceInfo.ProductId,
      TimerId
    };
    sdk
      .requestTokenApi('AppDeleteTimer', params)
      .then(() => {
        getDataPage();
      })
      .catch(() => {
        sdk.sips.showError('删除失败');
      });
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

  const stopTextMenu = (e: Event) => {
    e.preventDefault();
  };

  useEffect(() => {
    getDataPage();
  }, []);

  useEffect(() => {
    document.addEventListener('contextmenu', stopTextMenu);
    return () => {
      document.removeEventListener('contextmenu', stopTextMenu);
    };
  });

  return (
    <ul className={classNames('timer-cloud-wrap')}>
      {dataList.map((item: ITimer) => (
        <li
          className={classNames('timer-list-card', item.Status === 1 && 'curr')}
          onTouchStart={() => {
            handleTouchStart(item.TimerId);
          }}
          onTouchEnd={handleTouchEnd}
          key={item.TimerId}
        >
          <div className={classNames('timer-list-body')}>
            <span className={'timer'}>{item.TimePoint}</span>
            <span className={'repeat'}>
              {item.Days.split('').map((iitem, iindex) => {
                return iitem === '1' ? arrWeek[iindex] + ' ' : '';
              })}
            </span>
            <span className={'switch'}>
              <Switch
                name={'o'}
                checked={item.Status === 1}
                onChange={(isChecked: boolean) => {
                  changeStatus(item.TimerId, isChecked ? 1 : 0);
                }}
              />
            </span>
          </div>
          <div className={classNames('timer-list-desc')}>
            {renderDesc(item.Data)}
          </div>
        </li>
      ))}
    </ul>
  );
};

//ListTimer:FC<>.propTypes = {
//};

export default ListTimer;
