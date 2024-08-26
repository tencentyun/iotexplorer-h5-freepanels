import React, { useEffect, useMemo, useState } from 'react';
import { List, Picker, Toast, Switch } from 'antd-mobile';
// import { Input, List, Modal, Picker, Switch, Toast } from 'antd-mobile';
import useSWR from 'swr';
// import '../../panel-qualityWhite/MoreSetting/MoreSetting.less';
import { useTitle } from '@hooks/useTitle';

const gradientCycleOptions = [
  [
    { label: '0秒', value: 0 },
    { label: '1秒', value: 1 },
    { label: '2秒', value: 2 },
    { label: '3秒', value: 3 },
    { label: '4秒', value: 4 },
    { label: '5秒', value: 5 },
    { label: '6秒', value: 6 },
    { label: '7秒', value: 7 },
    { label: '8秒', value: 8 },
    { label: '9秒', value: 9 },
    { label: '10秒', value: 10 },
  ],
];

const delayCloseOptions = [
  [
    { label: '无', value: 0 },
    { label: '5秒', value: 5 },
    { label: '10秒', value: 10 },
    { label: '20秒', value: 20 },
    { label: '30秒', value: 30 },
    { label: '1分钟', value: 60 },
    { label: '2分钟', value: 120 },
    { label: '3分钟', value: 180 },
    { label: '4分钟', value: 240 },
    { label: '5分钟', value: 300 },
  ],
];
// const NightLightOptions = [
//   [
//     { label: '无', value: 0 },
//     { label: '5秒', value: 5 },
//     { label: '10秒', value: 10 },
//     { label: '20秒', value: 20 },
//     { label: '30秒', value: 30 },
//     { label: '2分钟', value: 60 },
//     { label: '2分钟', value: 120 },
//     { label: '2分钟', value: 180 },
//     { label: '2分钟', value: 240 },
//     { label: '2分钟', value: 300 },
//   ],
// ];

// const colorModeOptions = [
//   [
//     { label: '单色模式', value: 0 },
//     { label: '双色模式', value: 1 },
//   ],
// ];

const colorDefaultOptions = [
  [
    { label: '暖白光', value: 4000 },
    { label: '明亮光', value: 5000 },
    { label: '温暖光', value: 3000 },
  ],
];

// const defaultSceneTypeOptions = [
//   [
//     { label: '记忆', value: 0 },
//     { label: '明亮', value: 1 },
//     { label: '柔和', value: 2 },
//     { label: '冷光', value: 3 },
//     { label: '暖光', value: 4 },
//     { label: '夜灯', value: 5 },
//     { label: '阅读', value: 6 },
//     { label: '电视', value: 7 },
//     { label: '月光', value: 8 },
//     { label: '自定义', value: 9 },
//   ],
// ];

// const outageStatusOptions = [
//   [
//     { label: '关闭', value: 0 },
//     { label: '记忆', value: 1 },
//   ],
// ];

const timeOptions = (() => {
  const result = [[], []] as any;
  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      result[0].push({ label: `0${i}时`, value: `0${i}` });
    } else {
      result[0].push({ label: `${i}时`, value: `${i}` });
    }
  }
  for (let i = 0; i < 60; i++) {
    if (i < 10) {
      result[1].push({ label: `0${i}分`, value: `0${i}` });
    } else {
      result[1].push({ label: `${i}分`, value: `${i}` });
    }
  }
  return result;
})();

const secondToStr = (num: number) => {
  const minuteStr = Math.floor(num / 60) > 0 ? `${Math.floor(num / 60)}分` : '';
  const secondsStr = num % 60 > 0 ? `${num % 60}秒` : '';
  return minuteStr + secondsStr;
};

export function MoreSetting({ deviceData, doControlDeviceData, sdk }) {
  useTitle('设置');

  const {
    gradient_cycle = 0,
    // default_scene_type = 0,
    outage_status = 0,
    // night_light_status = 0,
    // default_color_temp = '-',
    // default_brightness = '-',
    delay_close = 0,
    // nightlight=0,
    // color_mode = 0,
    default_color_temp = 4000
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
    openNightTimer: TimerList.find(item => item.Data === '{"night_light_status":1}'),
    closeNightTimer: TimerList.find(item => item.Data === '{"night_light_status":0}'),
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
      content: '请等待...',
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
        content: err?.msg || '更新时间错误',
        icon: 'fail',
      });
      console.error(err);
    }
  };

  const handleChangeNightLight = async (val: boolean) => {
    if (!TimerList) return;
    try {
      const loadingToast = Toast.show({
        content: '请等待...',
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
          Data: '{"night_light_status":1}',
          Days: '1111111',
          Repeat: 1,
          TimePoint: nightLightTime.startTime,
          TimerName: '夜灯开关状态-开',
        });
      }
      if (!closeNightTimer) {
        await sdk.requestTokenApi('AppCreateTimer', {
          ProductId: sdk.productId,
          DeviceName: sdk.deviceName,
          Data: '{"night_light_status":0}',
          Days: '1111111',
          Repeat: 1,
          TimePoint: nightLightTime.endTime,
          TimerName: '夜灯开关状态-关',
        });
      }
      await mutate();
      loadingToast.close();
    } catch (err) {
      Toast.show({
        content: '切换状态失败',
        icon: 'fail',
      });
      console.error('夜灯状态切换失败', err);
    }
  };

  const isOpenNightLightStatus = useMemo(() => openNightTimer?.Status && closeNightTimer?.Status, [TimerList]);

  // const colorTempInputRef = useRef<any>(null);
  // const brightnessInputRef = useRef<any>(null);

  // const showToggleColorMode = sdk.dataTemplate.properties.find(item => item.id === 'color_mode');

  return (
    <>
      <div className='more-setting-container'>


        <List header='基础设置'>
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
            灯光渐变时间
          </List.Item>
          {/* <List.Item*/}
          {/*  extra={defaultSceneTypeOptions[0][default_scene_type]?.label || '物模型非法'}*/}
          {/*  clickable*/}
          {/*  onClick={async () => {*/}
          {/*    const res = await Picker.prompt({*/}
          {/*      columns: defaultSceneTypeOptions,*/}
          {/*    });*/}
          {/*    const val = res?.[0];*/}
          {/*    if (typeof val === 'number') {*/}
          {/*      doControlDeviceData({ default_scene_type: val });*/}
          {/*    }*/}
          {/*  }}*/}
          {/* >*/}
          {/*  默认开启状态*/}
          {/* </List.Item>*/}
          {/* {default_scene_type === 9 && (*/}
          {/*  <>*/}
          {/*    <List.Item*/}
          {/*      extra={`${default_color_temp}K`}*/}
          {/*      onClick={() => {*/}
          {/*        Modal.alert({*/}
          {/*          content: (*/}
          {/*            <Input*/}
          {/*              ref={colorTempInputRef}*/}
          {/*              placeholder='请输入色温值(2700-6500)'*/}
          {/*              type={'number'}*/}
          {/*            />*/}
          {/*          ),*/}
          {/*          style: {*/}
          {/*            '--adm-color-primary': '#30414D',*/}
          {/*          },*/}
          {/*          title: '默认色温',*/}
          {/*          closeOnMaskClick: true,*/}
          {/*          confirmText: '确认',*/}
          {/*          onConfirm: () => {*/}
          {/*            const color_temp = Number(colorTempInputRef.current.nativeElement.value);*/}
          {/*            if (!Number.isNaN(color_temp) && color_temp >= 2700 && color_temp <= 6500) {*/}
          {/*              doControlDeviceData({ default_color_temp: color_temp });*/}
          {/*            } else {*/}
          {/*              Toast.show({ content: '色温值不合法', icon: 'fail' });*/}
          {/*            }*/}
          {/*          },*/}
          {/*        });*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <div style={{ marginLeft: '16px' }}>默认色温</div>*/}
          {/*    </List.Item>*/}
          {/*    <List.Item*/}
          {/*      extra={`${default_brightness}%`}*/}
          {/*      onClick={() => {*/}
          {/*        Modal.alert({*/}
          {/*          content: (*/}
          {/*            <Input*/}
          {/*              ref={brightnessInputRef}*/}
          {/*              placeholder='请输入亮度值(0-100)'*/}
          {/*              type={'number'}*/}
          {/*            />*/}
          {/*          ),*/}
          {/*          style: {*/}
          {/*            '--adm-color-primary': '#30414D',*/}
          {/*          },*/}
          {/*          title: '默认亮度',*/}
          {/*          closeOnMaskClick: true,*/}
          {/*          confirmText: '确认',*/}
          {/*          onConfirm: () => {*/}
          {/*            const brightness = Number(brightnessInputRef.current.nativeElement.value);*/}
          {/*            if (!Number.isNaN(brightness) && brightness >= 0 && brightness <= 100) {*/}
          {/*              doControlDeviceData({ default_brightness: brightness });*/}
          {/*            } else {*/}
          {/*              Toast.show({ content: '亮度值不合法', icon: 'fail' });*/}
          {/*            }*/}
          {/*          },*/}
          {/*        });*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <div style={{ marginLeft: '16px' }}>默认亮度</div>*/}
          {/*    </List.Item>*/}
          {/*  </>*/}
          {/* )}*/}
          <List.Item
            // extra={outageStatusOptions[0][outage_status]?.label || '-'}
            // clickable
            extra={
              <Switch
                uncheckedText='关闭'
                checkedText='记忆'
                checked={outage_status === 1}
                onChange={(value: boolean) => {
                  doControlDeviceData({ outage_status: Number(value) });
                }}
              />
            }
          // const res = await Picker.prompt({
          //   columns: outageStatusOptions,
          //   defaultValue: [outage_status || outageStatusOptions[0][0].value],
          // });
          // const val = res?.[0];
          // if (typeof val === 'number') {
          //   doControlDeviceData({ outage_status: val });
          // }
          // }}
          >
            断电后通电状态
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
            延时关灯
          </List.Item>
          {/* <List.Item
          extra={secondToStr(Number(nightlight)) || '-'}
          clickable
          onClick={async () => {
            const res = await Picker.prompt({
              columns: NightLightOptions,
              defaultValue: [nightlight || NightLightOptions[0][0].value],
            });
            const val = res?.[0];
            if (typeof val === 'number') {
              doControlDeviceData({ nightlight: val });
            }
          }}
        >
          夜灯模式
        </List.Item> */}
          {/* {showToggleColorMode && (
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
        )} */}
          <List.Item
            extra={colorDefaultOptions[0].find((item) => item.value === default_color_temp)?.label || '-'}
            clickable
            onClick={async () => {
              const res = await Picker.prompt({
                columns: colorDefaultOptions,
                defaultValue: [default_color_temp || delayCloseOptions[0][0].value],
              });
              const val = res?.[0];
              if (typeof val === 'number') {
                switch (val) {
                  case 4000:
                    doControlDeviceData({ default_color_temp: 4000, default_brightness: 80 });
                    break;
                  case 5000:
                    doControlDeviceData({ default_color_temp: 5000, default_brightness: 100 });
                    break;
                  case 3000:
                    doControlDeviceData({ default_color_temp: 3000, default_brightness: 60 });
                    break;
                  default:
                    break;
                }
              }
            }}
          >
            默认开启灯光
          </List.Item>
        </List>
        <List header={'夜灯设置'}>
          <List.Item
            extra={(
              <Switch
                loading={isValidating}
                checked={isOpenNightLightStatus}
                onChange={handleChangeNightLight}
              />
            )}
            description='在目标时间段内自动开启夜灯模式'>
            夜灯模式开关
          </List.Item>
          {!!isOpenNightLightStatus && (
            <>
              <List.Item
                clickable
                extra={openNightTimer?.TimePoint || '22:00'}
                onClick={async () => {
                  const res = await Picker.prompt({
                    columns: timeOptions,
                    defaultValue: (openNightTimer?.TimePoint || '22:00')?.split(':'),
                  });
                  if (res) {
                    let [hour, minute] = res;
                    hour = `${hour}`.padStart(2, '0');
                    minute = `${minute}`.padStart(2, '0');
                    console.log(hour, minute);
                    await updateNightLightTimerTimePoint({ ...nightLightTime, startTime: `${hour}:${minute}` });
                    setNightLightTime({ ...nightLightTime, startTime: `${hour}:${minute}` });
                  }
                }}
              >
                夜灯模式开启时间
              </List.Item>
              <List.Item
                clickable
                extra={closeNightTimer?.TimePoint || '06:00'}
                onClick={async () => {
                  const res = await Picker.prompt({
                    columns: timeOptions,
                    defaultValue: (closeNightTimer?.TimePoint || '06:00')?.split(':'),
                  });
                  if (res) {
                    let [hour, minute] = res;
                    hour = `${hour}`.padStart(2, '0');
                    minute = `${minute}`.padStart(2, '0');
                    console.log(hour, minute);
                    await updateNightLightTimerTimePoint({ ...nightLightTime, endTime: `${hour}:${minute}` });
                    setNightLightTime({ ...nightLightTime, endTime: `${hour}:${minute}` });
                  }
                }}
              >
                夜灯模式关闭时间
              </List.Item>
            </>
          )}
        </List>

      </div>
    </>
  );
}
