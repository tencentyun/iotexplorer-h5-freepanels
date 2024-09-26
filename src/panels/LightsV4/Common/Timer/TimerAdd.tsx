import React, { useState } from 'react';
import { TimerAdd as CloudTimerAdd } from '@custom/TimerCloud';
import { List } from 'antd-mobile';
import { OptionDialog } from '@custom/OptionDialog';
import { t } from '@locales';
const labelEnum = {
  power_switch: {
    label: t('开关'),
    value: [t('开关'), t('开启')],
  },
};

export const TimerAdd = (props) => {
  const {
    context: { power_switch = 0 },
    setContext,
  } = props;
  const [visible, setVisible] = useState(false);
  const onAllSwitchChange = (powerSwitch) => {
    setContext({ power_switch: powerSwitch });
  };
  return (
    <>
      <CloudTimerAdd labelEnum={labelEnum} {...props}>
        <List.Item
          prefix={t('开关')}
          extra={labelEnum.power_switch.value[power_switch]}
          onClick={() => {
            setVisible(true);
          }}
        />
      </CloudTimerAdd>
      <OptionDialog
        title={t('开关')}
        visible={visible}
        value={[power_switch]}
        onCancel={() => setVisible(false)}
        onConfirm={(val) => {
          onAllSwitchChange(val?.[0] * 1);
        }}
        options={[
          { label: t('开启'), value: 1 },
          { label: t('关闭'), value: 0 },
        ]}
      ></OptionDialog>
    </>
  );
};
