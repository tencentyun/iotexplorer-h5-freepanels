import React, { useState } from 'react';
import { TimerAdd as CloudTimerAdd } from '@custom/TimerCloud';
import { List } from 'antd-mobile';
import { OptionDialog } from '@custom/OptionDialog';
import { Switch } from '@custom/Switch';
import { t } from '@locales';


export const TimerAdd = (props) => {
  const {
    // context: { power_switch = 0, switchNum = 4 },
    context: { switchNum = 4 },
    setContext,
    deviceData,
  } = props;

  const OPTIONS = [
    { label: deviceData.power_switch || t('总开关'), value: 'power_switch' },
    { label: deviceData.name_button1 || t('开关一'), value: 'switch_1' },
    { label: deviceData.name_button2 || t('开关二'), value: 'switch_2' },
    { label: deviceData.name_button3 || t('开关三'), value: 'switch_3' },
    { label: deviceData.name_button4 || t('开关四'), value: 'switch_4' },
    { label: deviceData.name_button5 || t('开关五'), value: 'switch_5' },
  ];

  // 开关选择
  const [powerSwitch, setPowerSwitch] = useState(['power_switch']);
  // 开启或者关闭
  const [enable, setEnable] = useState(0);
  const options = OPTIONS.slice(0, switchNum + 1);
  const labelName = OPTIONS.filter(({ value }) => powerSwitch[0] === value).map(item => item.label)?.[0];

  const labelEnum = {
    power_switch: {
      label: labelName,
      value: [t('关闭'), t('开启')],
    },
  };

  const [visible, setVisible] = useState(false);

  // 根据对应的选择字段值 和启用经用 设置对应的定时值
  const getSwitchNumData = (switchValue, enableValue) => {
    const switchFiled = switchValue === void 0 ? powerSwitch : switchValue;
    const enableStatus = enableValue === void 0 ? enable : enableValue;
    return { [switchFiled]: enableStatus };
  };


  // const getSwitchNumData = (powerSwitch, num) => {
  //   const value = 5 * powerSwitch;
  //   const changeData = { power_switch: powerSwitch };
  //   for (let i = 0; i < num; i++) {
  //     changeData[`switch_${i + 1}`] = value;
  //   }
  //   return changeData;
  // };

  const clone = v => JSON.parse(JSON.stringify(v));

  const onAllSwitchChange = (powerSwitch, enable) => {
    const data = getSwitchNumData(powerSwitch, enable);
    const newContent = clone(props.context);
    // 栓除原有的数据
    OPTIONS.forEach(({ value }) => delete newContent[value]);
    setContext({ ...newContent, ...data }, false);
  };

  return (
    <>
      <CloudTimerAdd labelEnum={labelEnum} {...props}>

        <List.Item
          // className="no-arrow"
          prefix={t('按键')}
          extra={labelName}
          onClick={() => {
            // push(PATH.TIMER_ACTION_SWITCH)
            setVisible(true);
          }}
        />
        <List.Item
          className="no-arrow"
          prefix={t('开关')}
          extra={<Switch
            className="reverse"
            checked={!!enable}
            onChange={(val) => {
              onAllSwitchChange(undefined, val ? 1 : 0);
              setEnable(val ? 1 : 0);
            }}
          />}
          onClick={() => {
            // // push(PATH.TIMER_ACTION_SWITCH)
            // setVisible(true);
          }}
        />
      </CloudTimerAdd>
      {/* // 开关选择 */}
      <OptionDialog
        title={t('开关')}
        visible={visible}
        value={powerSwitch}
        onCancel={() => setVisible(false)}
        onConfirm={(powerSwitch) => {
          setPowerSwitch(powerSwitch);
          onAllSwitchChange(powerSwitch, undefined);
        }}
        options={options}
      ></OptionDialog>
    </>
  );
};
