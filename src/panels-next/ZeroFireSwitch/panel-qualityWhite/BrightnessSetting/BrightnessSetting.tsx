import React, { useMemo } from 'react';
import { List, Picker, Switch, Toast } from 'antd-mobile';
import { useDeviceStore } from '@src/panels-next/PanelWrap';
import useSWR from 'swr';
import { h5PanelSdk } from '@src/panels-next/h5PanelSdk';

const ledBrightnessOptions = [
  [
    { label: '1级-亮度0%', value: 1 },
    { label: '2级-亮度10%', value: 2 },
    { label: '3级-亮度40%', value: 3 },
    { label: '4级-亮度60%', value: 4 },
    { label: '5级-亮度80%', value: 5 },
    { label: '6级-亮度100%', value: 6 },
  ],
];

export function BrightnessSetting() {
  const { deviceData, controlDeviceData } = useDeviceStore();
  const {
    led_brightness = 1,
    // auto_light,
  } = deviceData;

  const { data: TimerList = [], isValidating, mutate: reloadTimerList } = useSWR('AppGetTimerList', async () => {
    const { TimerList } = await h5PanelSdk.requestTokenApi('AppGetTimerList', {
      ProductId: h5PanelSdk.productId,
      DeviceName: h5PanelSdk.deviceName,
    });
    return TimerList || [] as any[];
  });

  const {
    ledBrightnessTimerWhen630AM,
    ledBrightnessTimerWhen1830PM,
    ledBrightnessTimerWhen2130PM,
  } = useMemo(() => ({
    ledBrightnessTimerWhen630AM: TimerList.find(item => item.Data === '{"led_brightness":5}'), // 80
    ledBrightnessTimerWhen1830PM: TimerList.find(item => item.Data === '{"led_brightness":3}'), // 40
    ledBrightnessTimerWhen2130PM: TimerList.find(item => item.Data === '{"led_brightness":2}'), // 10
  }), [TimerList]);

  const isOpenAutoLedBrightness = useMemo<boolean>(
    () => ledBrightnessTimerWhen630AM?.Status
      && ledBrightnessTimerWhen1830PM?.Status
      && ledBrightnessTimerWhen2130PM?.Status,
    [TimerList],
  );

  const toggleAutoLedBrightness = async (checked: boolean) => {
    try {
      const loadingToast = Toast.show({
        content: '请等待...',
        icon: 'loading',
        maskClickable: false,
        duration: 60,
      });

      const timerConfigList = [
        { TimerPoint: '06:30', Data: '{"led_brightness":5}' },
        { TimerPoint: '18:30', Data: '{"led_brightness":3}' },
        { TimerPoint: '21:30', Data: '{"led_brightness":2}' },
      ];

      // eslint-disable-next-line
      for (const [index, timer] of [ledBrightnessTimerWhen630AM, ledBrightnessTimerWhen1830PM, ledBrightnessTimerWhen2130PM].entries()) {
        if (timer) {
          await h5PanelSdk.requestTokenApi('AppModifyTimerStatus', {
            ProductId: h5PanelSdk.productId,
            DeviceName: h5PanelSdk.deviceName,
            TimerId: timer.TimerId,
            Status: checked ? 1 : 0,
          });
        } else {
          await h5PanelSdk.requestTokenApi('AppCreateTimer', {
            ProductId: h5PanelSdk.productId,
            DeviceName: h5PanelSdk.deviceName,
            Data: timerConfigList[index].Data,
            Days: '1111111',
            Repeat: 1,
            TimePoint: timerConfigList[index].TimerPoint,
            TimerName: '指示灯亮度调节',
          });
        }
      }

      // 开启时调节一下亮度
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      let brightness = 2;
      if (hour === 6) {
        if (minute >= 30) {
          // 5
          brightness = 5;
        } else {
          // 2
          brightness = 2;
        }
      }
      if (hour === 18) {
        if (minute >= 30) {
          // 3
          brightness = 3;
        } else {
          // 5
          brightness = 5;
        }
      }
      if (hour === 21) {
        if (minute >= 30) {
          // 2
          brightness = 2;
        } else {
          // 3
          brightness = 3;
        }
      }
      if (hour > 21 && hour <= 24 && hour >= 0 && hour < 6) {
        // 2
        brightness = 2;
      }
      if (hour > 6 && hour < 18) {
        // 5
        brightness = 5;
      }
      if (hour > 18 && hour < 21) {
        // 3
        brightness = 3;
      }

      await reloadTimerList();

      if (checked) {
        controlDeviceData({ led_brightness: brightness });
      }

      loadingToast.close();
    } catch (err) {
      Toast.show({
        content: '切换状态失败',
        icon: 'fail',
      });
      console.error('状态AutoLedBrightness切换失败', err);
    }
  };

  return (
    <div className='page-brightness-setting'>
      <List header='指示灯设置'>
        <List.Item
          extra={ledBrightnessOptions[0][led_brightness - 1]?.label || '-'}
          clickable
          onClick={async () => {
            const res = await Picker.prompt({
              columns: ledBrightnessOptions,
              defaultValue: [Number(led_brightness || 1)]
            });
            const val = res?.[0];
            if (typeof val === 'number') {
              controlDeviceData({ led_brightness: val });
            }
          }}
        >
          指示灯亮度
        </List.Item>
        <List.Item
          extra={(
            <Switch
              loading={isValidating}
              checked={isOpenAutoLedBrightness}
              onChange={async (val) => {
                await toggleAutoLedBrightness(val);
              }}
            />
          )}
          description='根据当前时间自动调节指示灯亮度'
        >
          指示灯自动调节模式
        </List.Item>
      </List>
    </div>
  );
}
