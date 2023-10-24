import React, { useEffect, useMemo, useState } from 'react';
import './SleepMode.less';
import { Button, CheckList, List, Picker, Popup, SafeArea, Switch, Toast } from 'antd-mobile';
import useSWR from 'swr';
import { h5PanelSdk } from '@src/panels-next/h5PanelSdk';

function genTimeColumns() {
  const columns: [any[], any[]] = [[], []];

  for (let i = 0; i <= 23; i++) {
    const timeStr = i <= 9 ? `0${i}` : `${i}`;
    columns[0].push({
      label: `${timeStr}时`,
      value: timeStr,
    });
  }

  for (let i = 0; i <= 59; i++) {
    const timeStr = i <= 9 ? `0${i}` : `${i}`;
    columns[1].push({
      label: `${timeStr}分`,
      value: timeStr,
    });
  }

  return columns;
}

const timeColumns = genTimeColumns();

const weekColumn = [
  { label: '周一', value: 1 },
  { label: '周二', value: 2 },
  { label: '周三', value: 3 },
  { label: '周四', value: 4 },
  { label: '周五', value: 5 },
  { label: '周六', value: 6 },
  { label: '周日', value: 0 },
];

const SLEEP_MODE_TIMER_START = '__SLEEP_MODE_TIMER_START';
const SLEEP_MODE_TIMER_END = '__SLEEP_MODE_TIMER_END';

interface ITimer {
  Data: string;
  Days: string;
  ProductId: string;
  DeviceName: string;
  Repeat: 0 | 1;
  Status: 0 | 1;
  TimePoint: string;
  TimerId: string;
  TimerName: string;
}

function getTimerDaysDesc(days: string = '1111111') {
  let result: string[] = [];

  const daysStrArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  for (let i = 1; i <= 6; i++) {
    if (days[i] === '1') {
      result.push(daysStrArr[i]);
    }
  }

  if (days[0] === '1') {
    result.push(daysStrArr[0]);
  }

  return result.join('、');
}

function getTimerDaysNumList(days: string = '1111111') {
  const daysNumList: number[] = [];

  for (let i = 0; i < 7; i++) {
    if (days[i] === '1') {
      daysNumList.push(i);
    }
  }

  return daysNumList;
}

export function SleepMode() {
  const [daysPopupVisible, setDaysPopupVisible] = useState(false);
  const [selectDays, setSelectDays] = useState<number[]>([]);

  // useEffect(() => {
  //   h5PanelSdk.requestTokenApi('AppDeleteTimer', {
  //     ProductId: h5PanelSdk.productId,
  //     DeviceName: h5PanelSdk.deviceName,
  //     TimerId: '128284bd474f4dbc9da09b96e21aa2f9',
  //   });
  //   h5PanelSdk.requestTokenApi('AppDeleteTimer', {
  //     ProductId: h5PanelSdk.productId,
  //     DeviceName: h5PanelSdk.deviceName,
  //     TimerId: 'e3cf1868caf74ee184088de0a7da0d75',
  //   });
  // }, []);

  const {
    data: {
      startSleepModeTimer,
      endSleepModeTimer,
    } = {},
    isValidating,
    mutate,
  } = useSWR('AppGetTimerList', async () => {
    const { TimerList = [] } = await h5PanelSdk.requestTokenApi('AppGetTimerList', {
      ProductId: h5PanelSdk.productId,
      DeviceName: h5PanelSdk.deviceName,
      Offset: 0,
      Limit: 50,
    }) as {
      TimerList: ITimer[];
    };

    const startSleepModeTimer = TimerList.find(timer => timer.TimerName === SLEEP_MODE_TIMER_START);
    const endSleepModeTimer = TimerList.find(timer => timer.TimerName === SLEEP_MODE_TIMER_END);

    return {
      startSleepModeTimer,
      endSleepModeTimer,
    };
  });

  const isOpenSleepMode = useMemo(() => {
    return !!startSleepModeTimer?.Status && !!endSleepModeTimer?.Status;
  }, [startSleepModeTimer, endSleepModeTimer]);

  useEffect(() => {
    setSelectDays(getTimerDaysNumList(startSleepModeTimer?.Days));
  }, [startSleepModeTimer]);

  useEffect(() => {
    console.log('[睡眠模式定时器=]', startSleepModeTimer, endSleepModeTimer);
  }, [startSleepModeTimer, endSleepModeTimer]);

  const updateSleepModeTimer = async (timerParams: Partial<ITimer>) => {
    try {
      const loading = Toast.show({ content: '更新中', icon: 'loading' });
      await h5PanelSdk.requestTokenApi('AppModifyTimer', {
        ...timerParams,
      });
      await mutate();
      loading.close();
    } catch (err) {
      console.error(err);
      Toast.show({ content: '更新失败', icon: 'fail' });
    }
  };

  const onSleepModeChange = async (flag: boolean) => {
    try {
      const loading = Toast.show({ content: '更新中', icon: 'loading', duration: 0 });

      if (!startSleepModeTimer) {
        await h5PanelSdk.requestTokenApi('AppCreateTimer', {
          ProductId: h5PanelSdk.productId,
          DeviceName: h5PanelSdk.deviceName,
          TimerName: SLEEP_MODE_TIMER_START,
          Days: '1111111',
          TimePoint: '22:00',
          Repeat: 1,
          Data: JSON.stringify({ sleep_mode: 1 }),
        });
      } else {
        await h5PanelSdk.requestTokenApi('AppModifyTimerStatus', {
          ProductId: h5PanelSdk.productId,
          DeviceName: h5PanelSdk.deviceName,
          TimerId: startSleepModeTimer.TimerId,
          Status: flag ? 1 : 0,
        });
      }

      if (!endSleepModeTimer) {
        await h5PanelSdk.requestTokenApi('AppCreateTimer', {
          ProductId: h5PanelSdk.productId,
          DeviceName: h5PanelSdk.deviceName,
          TimerName: SLEEP_MODE_TIMER_END,
          Days: '1111111',
          TimePoint: '06:00',
          Repeat: 1,
          Data: JSON.stringify({ sleep_mode: 0 }),
        });
      } else {
        await h5PanelSdk.requestTokenApi('AppModifyTimerStatus', {
          ProductId: h5PanelSdk.productId,
          DeviceName: h5PanelSdk.deviceName,
          TimerId: endSleepModeTimer.TimerId,
          Status: flag ? 1 : 0,
        });
      }

      await mutate();
      loading.close();
    } catch (err) {
      console.error(err);
      Toast.show({ content: '更新失败', icon: 'fail' });
    }
  };

  return (
    <div className='page-sleep-mode'>
      <List header='开启睡眠模式后音箱灯光会变暗，声音会变小'>
        <List.Item extra={(
          <Switch
            checked={isOpenSleepMode}
            onChange={onSleepModeChange}
            loading={isValidating}
          />
        )}>
          睡眠模式
        </List.Item>
      </List>
      {isOpenSleepMode && (
        <List style={{ marginTop: 12 }}>
          <List.Item
            extra={startSleepModeTimer?.TimePoint || '23:00'}
            onClick={async () => {
              const value = await Picker.prompt({
                columns: timeColumns,
              });
              await updateSleepModeTimer({
                ...startSleepModeTimer,
                TimePoint: value?.join(':'),
              });
            }}
          >
            开始时间
          </List.Item>
          <List.Item
            extra={endSleepModeTimer?.TimePoint || '06:00'}
            onClick={async () => {
              const value = await Picker.prompt({
                columns: timeColumns,
              });
              await updateSleepModeTimer({
                ...endSleepModeTimer,
                TimePoint: value?.join(':'),
              });
            }}
          >
            结束时间
          </List.Item>
          <List.Item
            extra={getTimerDaysDesc(startSleepModeTimer?.Days)}
            onClick={() => {
              setSelectDays(getTimerDaysNumList(startSleepModeTimer?.Days));
              setDaysPopupVisible(true);
            }}
          >
            有效日
          </List.Item>
        </List>
      )}

      <Popup
        className={'popup-week-checklist'}
        visible={daysPopupVisible}
        onMaskClick={() => {
          setDaysPopupVisible(false);
        }}
        destroyOnClose
        bodyStyle={{
          boxSizing: 'border-box',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          padding: '8px 16px 0',
        }}
      >
        <div>
          <CheckList
            multiple
            value={selectDays}
            onChange={(val) => setSelectDays(val as number[])}
          >
            {weekColumn.map(({ label, value }) => (
              <CheckList.Item key={value} value={value}>
                {label}
              </CheckList.Item>
            ))}

          </CheckList>
          <Button
            block
            color='primary'
            onClick={async () => {
              if (!selectDays.length) {
                Toast.show('至少选择一天');
                return;
              }
              let TimerDays = '';
              for (let i = 0; i <= 6; i++) {
                if (selectDays.includes(i)) {
                  TimerDays += '1';
                } else {
                  TimerDays += '0';
                }
              }
              console.log('选择的days=', TimerDays, selectDays);
              await updateSleepModeTimer({
                ...startSleepModeTimer,
                Days: TimerDays,
              });
              await updateSleepModeTimer({
                ...endSleepModeTimer,
                Days: TimerDays,
              });

              setDaysPopupVisible(false);
            }}
          >
            确定
          </Button>
          <SafeArea position='bottom' />
        </div>
      </Popup>
    </div>
  );
}
