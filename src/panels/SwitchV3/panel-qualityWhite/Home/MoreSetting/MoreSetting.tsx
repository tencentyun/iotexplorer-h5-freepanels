import React from 'react';
import { List, Picker, Switch } from 'antd-mobile';
import './MoreSetting.less';
import { useTitle } from '@hooks/useTitle';
import { getSwitchNum } from '@src/panels/SwitchV3/panel-qualityWhite/Home/Home';
import { useSwitchNameMap } from '@src/panels/SwitchV3/hooks/useSwitchNameMap';

const outageStatusOptions = [
  [
    { label: '关闭', value: 0 },
    { label: '记忆', value: 1 },
  ],
];

const modeSwitchOptions = [
  [
    { label: '开关模式', value: 0 },
    { label: '场景模式', value: 1 },
  ],
];

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

const getTimeTextBySecond = (s: number) => {
  let h = Math.floor(s / 3600);
  let m = 0;
  if (s - h * 3600 > 0) {
    m = Math.floor((s - h * 3600) / 60);
  }
  h = `${h}`.padStart(2, '0') as any;
  m = `${m}`.padStart(2, '0') as any;
  return `${h}时${m}分`;
};

export function MoreSetting({
  deviceData,
  doControlDeviceData,
  sdk,
  templateMap,
  history: { PATH, push },
}) {
  useTitle('设置');
  const switchNum = getSwitchNum(templateMap);

  const { data: switchNameMap = {} } = useSwitchNameMap({ switchNum, sdk });

  const {
    outage_status = 0,
    led_brightness = 1,
    auto_light,
  } = deviceData;

  return (
    <>
      <List header='基础设置'>
        <List.Item
          extra={ledBrightnessOptions[0][led_brightness - 1]?.label || '-'}
          clickable
          onClick={async () => {
            const res = await Picker.prompt({
              columns: ledBrightnessOptions,
            });
            const val = res?.[0];
            if (typeof val === 'number') {
              doControlDeviceData({ led_brightness: val });
            }
          }}
        >
          指示灯亮度
        </List.Item>
        <List.Item
          extra={(
            <Switch
              checked={!!auto_light}
              onChange={async () => {
                doControlDeviceData({ auto_light: !auto_light });
              }}
            />
          )}
          description='根据当前时间自动调节指示灯亮度'
        >
          指示灯自动调节模式
        </List.Item>
        <List.Item
          clickable
          onClick={push.bind(null, PATH.TIMER_LIST, { switchNum, isModule: true })}
        >
          定时任务
        </List.Item>
        <List.Item
          extra={outageStatusOptions[0][outage_status]?.label || '-'}
          clickable
          onClick={async () => {
            const res = await Picker.prompt({
              columns: outageStatusOptions,
            });
            const val = res?.[0];
            if (typeof val === 'number') {
              doControlDeviceData({ outage_status: val });
            }
          }}
        >
          断电后通电状态
        </List.Item>
      </List>
      {/* <List header='倒计时关闭设置'>*/}
      {/*  {new Array(switchNum).fill('')*/}
      {/*    .map((_, index) => {*/}
      {/*      const modeProperty = `count_down${index + 1}`;*/}
      {/*      return (*/}
      {/*        <List.Item*/}
      {/*          extra={`${getTimeTextBySecond(deviceData[modeProperty] || 0)} 后关闭`}*/}
      {/*          key={index}*/}
      {/*          onClick={async () => {*/}
      {/*            const res = await Picker.prompt({*/}
      {/*              columns: timeOptions,*/}
      {/*            });*/}
      {/*            if (res) {*/}
      {/*              let [h, m] = res;*/}
      {/*              h = Number(h);*/}
      {/*              m = Number(m);*/}
      {/*              doControlDeviceData({ [modeProperty]: h * 3600 + m * 60 });*/}
      {/*            }*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          {switchNameMap[`switch_${index + 1}`]}*/}
      {/*        </List.Item>*/}
      {/*      );*/}
      {/*    })}*/}
      {/* </List>*/}
      <List header='转无线开关设置'>
        {new Array(switchNum).fill('')
          .map((_, index) => {
            const modeProperty = `mode_switch${index + 1}`;
            const isSceneMode = deviceData[modeProperty] === 1;
            return (
              <List.Item
                extra={modeSwitchOptions[0][deviceData[modeProperty]]?.label || '-'}
                key={index}
                description={isSceneMode && '实体按键不再控制回路通断，仅触发场景'}
                onClick={async () => {
                  const res = await Picker.prompt({
                    columns: modeSwitchOptions,
                  });
                  const val = res?.[0];
                  if (typeof val === 'number') {
                    doControlDeviceData({ [modeProperty]: val });
                  }
                }}
              >
                {switchNameMap[`switch_${index + 1}`]}
              </List.Item>
            );
          })}
      </List>
    </>
  );
}

