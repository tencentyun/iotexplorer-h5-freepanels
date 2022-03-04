
import { useEffect, useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

const TIMER_API = {
  UPDATE: 'AppModifyTimerStatus',
  LIST: 'AppGetTimerList',
  DELETE: 'AppDeleteTimer'
};

export const requestTokenApi = (action: string, data = {} as any) => {
  const { ProductId, DeviceName, UserID } = sdk.deviceInfo;
  console.log('requestTokenApi==============', action, {
    UserID,
    ProductId,
    DeviceName,
    ...data
  });
  return sdk.requestTokenApi(action, {
    UserID,
    ProductId,
    DeviceName,
    ...data
  });
};

export const useTimer = () => {
  const [timers, setTimers] = useState([]);
  useEffect(() => {
    refreshTimerList();
    // return () => { };
  }, []);

  const refreshTimerList = async () => {
    const timerList = await requestTokenApi(TIMER_API.LIST);
    console.log('requestTokenApi===== TimerList =========', timerList.TimerList);
    setTimers(timerList.TimerList);
  };

  const doTimer = async (action: string, data = {} as any) => {
    const result = await requestTokenApi(action, data);
    await refreshTimerList();
    return result;
  };
  return [{ timers, TIMER_API, isExistTimer: !!timers.filter(({ Status }) => Status === 1).length }, { doTimer }];
}
