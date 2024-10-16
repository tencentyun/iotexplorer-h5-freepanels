import React, { useEffect, useMemo, useState } from 'react';
import { List, Picker, Toast, Switch } from 'antd-mobile';
// import { Input, List, Modal, Picker, Switch, Toast } from 'antd-mobile';
import useSWR from 'swr';
import '../../panel-qualityWhite/MoreSetting/MoreSetting.less';
import { useTitle } from '@hooks/useTitle';
import { t } from '@locales';

const gradientCycleOptions = [
  [
    { label: `0${t('秒')}`, value: 0 },
    { label: `1${t('秒')}`, value: 1 },
    { label: `2${t('秒')}`, value: 2 },
    { label: `3${t('秒')}`, value: 3 },
    { label: `4${t('秒')}`, value: 4 },
    { label: `5${t('秒')}`, value: 5 },
    { label: `6${t('秒')}`, value: 6 },
    { label: `7${t('秒')}`, value: 7 },
    { label: `8${t('秒')}`, value: 8 },
    { label: `9${t('秒')}`, value: 9 },
    { label: `10${t('秒')}`, value: 10 },
  ],
];

const delayCloseOptions = [
  [
    { label: t('无'), value: 0 },
    { label: `5${t('秒')}`, value: 5 },
    { label: `10${t('秒')}`, value: 10 },
    { label: `20${t('秒')}`, value: 20 },
    { label: `30${t('秒')}`, value: 30 },
    { label: `1${t('分钟')}`, value: 60 },
    { label: `2${t('分钟')}`, value: 120 },
    { label: `3${t('分钟')}`, value: 180 },
    { label: `4${t('分钟')}`, value: 240 },
    { label: `5${t('分钟')}`, value: 300 },
  ],
];
const colorModeOptions = [
  [
    { label: '单色模式', value: 0 },
    { label: '双色模式', value: 1 },
  ],
];
const timeStringToTimestamp = (timeString) => {

  const [hours, minutes] = timeString.split(':').map(Number);
  const now = new Date();

  // 创建一个新的日期对象，并设置为中国标准时间（UTC+8)  
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

  // 将时间转换为 UTC 时间戳（秒数）  
  return Math.floor(date.getTime() / 1000); // 返回的是从1970-01-01 00:00:00 UTC开始的相应时间的秒数。  


};

const nightLightStartTimeOptions = (() => {
  const result = [[], []] as any;
  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      result[0].push({ label: `0${i}${t('时')}`, value: `0${i}` });
    } else {
      result[0].push({ label: `${i}${t('时')}`, value: `${i}` });
    }
  }
  for (let i = 0; i < 60; i++) {
    if (i < 10) {
      result[1].push({ label: `0${i}${t('分')}`, value: `0${i}` });
    } else {
      result[1].push({ label: `${i}${t('分')}`, value: `${i}` });
    }
  }
  return result;
})();
const nightLightEndTimeOptions = (() => {
  const result = [[], []] as any;
  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      result[0].push({ label: `0${i}${t('时')}`, value: `0${i}` });
    } else {
      result[0].push({ label: `${i}${t('时')}`, value: `${i}` });
    }
  }
  for (let i = 0; i < 60; i++) {
    if (i < 10) {
      result[1].push({ label: `0${i}${t('分')}`, value: `0${i}` });
    } else {
      result[1].push({ label: `${i}${t('分')}`, value: `${i}` });
    }
  }
  return result;
})();
const timeOptions = (() => {
  const result = [[], []] as any;
  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      result[0].push({ label: `0${i}${t('时')}`, value: `0${i}` });
    } else {
      result[0].push({ label: `${i}${t('时')}`, value: `${i}` });
    }
  }
  for (let i = 0; i < 60; i++) {
    if (i < 10) {
      result[1].push({ label: `0${i}${t('分')}`, value: `0${i}` });
    } else {
      result[1].push({ label: `${i}${t('分')}`, value: `${i}` });
    }
  }
  return result;
})();

const secondToStr = (num: number) => {
  const minuteStr = Math.floor(num / 60) > 0 ? `${Math.floor(num / 60)}${t('分')}` : '';
  const secondsStr = num % 60 > 0 ? `${num % 60}${t('分')}` : '';
  return minuteStr + secondsStr;
};

export function MoreSetting({ deviceData, doControlDeviceData, sdk }) {
  useTitle(t('设置'));

  const {
    gradient_cycle = 0,
    // default_scene_type = 0,
    outage_status = 0,
    // night_light_status = 0,
    // default_color_temp = '-',
    // default_brightness = '-',
    delay_close = 0,
    // nightlight=0,
    color_mode = 0,
    // default_color_temp = 4000
  } = deviceData;

  const [nightLightTime, setNightLightTime] = useState({
    startTime: '22:00',
    endTime: '06:00',
  });

  const { data: TimerList = [], isValidating, mutate } = useSWR('AppGetTimerList', async () => {
    const { TimerList } = await sdk.requestTokenApi('AppGetTimerList', {
      ProductId: sdk.productId,
      DeviceName: sdk.deviceName,
    });
    return TimerList || [] as any[];
  });

  const { openNightTimer, closeNightTimer } = useMemo(() => ({
    openNightTimer: TimerList.find(item => item.Data === '{"night_light_status":2}'),
    closeNightTimer: TimerList.find(item => item.Data === '{"night_light_status":3}'),
  }), [TimerList]);

  useEffect(() => {
    if (openNightTimer) {
      setNightLightTime(prev => ({ ...prev, startTime: openNightTimer.TimePoint }));
    }
    if (closeNightTimer) {
      setNightLightTime(prev => ({ ...prev, endTime: closeNightTimer.TimePoint }));
    }
  }, [openNightTimer, closeNightTimer]);

  const updateNightLightTimerTimePoint = async ({ startTime, endTime }) => {
    console.log('[updateNightLightTimerTimePoint]', openNightTimer, closeNightTimer, startTime, endTime);
    const loadingToast = Toast.show({
      content: t('请等待...'),
      icon: 'loading',
      maskClickable: false,
      duration: 60,
    });
    try {
      if (openNightTimer) {
        console.log(openNightTimer.TimePoint, startTime);
        if (openNightTimer.TimePoint !== startTime) {
          await sdk.requestTokenApi('AppModifyTimer', {
            ...openNightTimer,
            ProductId: sdk.productId,
            DeviceName: sdk.deviceName,
            TimerId: openNightTimer.TimerId,
            TimePoint: startTime,
          });
        }
      }
      if (closeNightTimer) {
        if (closeNightTimer.TimePoint !== endTime) {
          await sdk.requestTokenApi('AppModifyTimer', {
            ...closeNightTimer,
            ProductId: sdk.productId,
            DeviceName: sdk.deviceName,
            TimerId: closeNightTimer.TimerId,
            TimePoint: endTime,
          });
        }
      }
      await mutate();
      loadingToast.close();
    } catch (err) {
      Toast.show({
        content: err?.msg || t('更新时间错误'),
        icon: 'fail',
      });
      console.error(err);
    }
  };

  const handleChangeNightLight = async (val: boolean) => {
    console.log(TimerList)
    if (!TimerList) return;
    try {
      const loadingToast = Toast.show({
        content: t('更新时间错误'),
        icon: 'loading',
        maskClickable: false,
        duration: 60,
      });
      if (openNightTimer) {
        if (!!openNightTimer.Status !== val) {
          await sdk.requestTokenApi('AppModifyTimerStatus', {
            ProductId: sdk.productId,
            DeviceName: sdk.deviceName,
            TimerId: openNightTimer.TimerId,
            Status: val ? 1 : 0,
          });
        }
      }
      if (closeNightTimer) {
        if (!!closeNightTimer.Status !== val) {
          await sdk.requestTokenApi('AppModifyTimerStatus', {
            ProductId: sdk.productId,
            DeviceName: sdk.deviceName,
            TimerId: closeNightTimer.TimerId,
            Status: val ? 1 : 0,
          });
        }
      }
      if (!openNightTimer) {
        await sdk.requestTokenApi('AppCreateTimer', {
          ProductId: sdk.productId,
          DeviceName: sdk.deviceName,
          Data: '{"night_light_status":2}',
          Days: '1111111',
          Repeat: 1,
          TimePoint: nightLightTime.startTime,
          TimerName: t('夜灯开关状态-开'),
        });
      }
      if (!closeNightTimer) {
        await sdk.requestTokenApi('AppCreateTimer', {
          ProductId: sdk.productId,
          DeviceName: sdk.deviceName,
          Data: '{"night_light_status":3}',
          Days: '1111111',
          Repeat: 1,
          TimePoint: nightLightTime.endTime,
          TimerName: t('夜灯开关状态-关'),
        });
      }
      await mutate();
      loadingToast.close();
    } catch (err) {
      Toast.show({
        content: t('切换状态失败'),
        icon: 'fail',
      });
      console.error(t('夜灯状态切换失败'), err);
    }
  };

  const isOpenNightLightStatus = useMemo(() => openNightTimer?.Status && closeNightTimer?.Status, [TimerList]);
  const showToggleColorMode = sdk.dataTemplate.properties.find(item => item.id === 'color_mode');
  return (
    <>
      <div className='more-setting-container'>


        <List header={t('基础设置')}>
          <List.Item
            extra={gradientCycleOptions[0][gradient_cycle]?.label || '-'}
            clickable
            onClick={async () => {
              const res = await Picker.prompt({
                columns: gradientCycleOptions,
                defaultValue: [gradient_cycle || gradientCycleOptions[0][0].value],
              });
              const val = res?.[0];
              if (typeof val === 'number') {
                doControlDeviceData({ gradient_cycle: val });
              }
            }}
          >
            {t('灯光渐变时间')}
          </List.Item>

          <List.Item

            extra={
              <Switch
                uncheckedText={t('关闭')}
                checkedText={t('记忆')}
                checked={outage_status === 1}
                onChange={(value: boolean) => {
                  doControlDeviceData({ outage_status: Number(value) });
                }}
              />
            }

          >
            {t('断电后通电状态')}
          </List.Item>
          <List.Item
            extra={secondToStr(Number(delay_close)) || '-'}
            clickable
            onClick={async () => {
              const res = await Picker.prompt({
                columns: delayCloseOptions,
                defaultValue: [delay_close || delayCloseOptions[0][0].value],
              });
              const val = res?.[0];
              if (typeof val === 'number') {
                doControlDeviceData({ delay_close: val });
              }
            }}
          >
            {t('延时关灯')}
          </List.Item>
          {showToggleColorMode && (
            <List.Item
              extra={colorModeOptions[0][color_mode]?.label || '-'}
              clickable
              onClick={async () => {
                const res = await Picker.prompt({
                  columns: colorModeOptions,
                  defaultValue: [color_mode || colorModeOptions[0][0].value],
                });
                const val = res?.[0];
                if (typeof val === 'number') {
                  doControlDeviceData({ color_mode: val });
                }
              }}
            >
              单双色切换
            </List.Item>
          )}
        </List>
        <List header={t('夜灯设置')}>
          <List.Item
            extra={(
              <Switch
                loading={isValidating}
                checked={isOpenNightLightStatus}
                onChange={async (checked) => {
                  // 更新夜灯模式状态  
                  await handleChangeNightLight(checked);

                  // 当夜灯模式开启时，使用动态时间  
                  if (checked) {
                    doControlDeviceData({ night_light_status: 1 });
                  } else {
                    // 处理夜灯模式关闭时的逻辑（如果需要）  
                    doControlDeviceData({ night_light_status: 0 }); // 或者其他逻辑  
                  }
                }}
              />
            )}
            description={t('在目标时间段内自动开启夜灯模式')}
          >
            {t('夜灯模式开关')}
          </List.Item>
          {!!isOpenNightLightStatus && (
            <>
              <List.Item
                clickable
                extra={nightLightTime.startTime || '默认开启时间'}
                onClick={async () => {
                  const res = await Picker.prompt({
                    columns: nightLightStartTimeOptions,
                    defaultValue: (nightLightTime.startTime || '默认开启时间')?.split(':'),
                  });
                  if (res) {
                    let [hour, minute] = res;
                    hour = `${hour}`.padStart(2, '0');
                    minute = `${minute}`.padStart(2, '0');
                    const newTime = `${hour}:${minute}`;
                    const timeStamp = timeStringToTimestamp(newTime);
                    doControlDeviceData({ night_start_time: timeStamp });
                    setNightLightTime({ ...nightLightTime, startTime: newTime });
                    // await updateNightLightTimerTimePoint({ ...nightLightTime, startTime: `${hour}:${minute}` });
                    // setNightLightTime({ ...nightLightTime, startTime: `${hour}:${minute}` });
                  }
                }}
              >
                {t('夜灯模式开启时间')}
              </List.Item>
              <List.Item
                clickable
                extra={nightLightTime.endTime || '默认关闭时间'}
                onClick={async () => {
                  const res = await Picker.prompt({
                    columns: nightLightEndTimeOptions,
                    defaultValue: (nightLightTime.endTime || '默认关闭时间')?.split(':'),
                  });
                  if (res) {
                    let [hour, minute] = res;
                    hour = `${hour}`.padStart(2, '0');
                    minute = `${minute}`.padStart(2, '0');
                    const newTime = `${hour}:${minute}`;
                    const timeStamp = timeStringToTimestamp(newTime);
                    doControlDeviceData({ night_end_time: timeStamp });
                    setNightLightTime({ ...nightLightTime, endTime: newTime });
                    // await updateNightLightTimerTimePoint({ ...nightLightTime, endTime: `${hour}:${minute}` });
                    // setNightLightTime({ ...nightLightTime, endTime: `${hour}:${minute}` });
                  }
                }}
              >
                {t('夜灯模式关闭时间')}
              </List.Item>
            </>
          )}
        </List>

      </div>
    </>
  );
}
