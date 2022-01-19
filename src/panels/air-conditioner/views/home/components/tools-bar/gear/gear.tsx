/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-28 13:41:48
 * @LastEditors:
 * @LastEditTime:
 */

import React, { FC, useImperativeHandle, useState } from 'react';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { List, Radio } from 'antd-mobile';
import { enumToArray } from '@/utils';
import { apiControlDeviceData } from '@/utils/api';
import IconChecked from '@/components/base/icon-checked/icon-checked';
export const enumGear: any = {
  sleep: '睡眠',
  health: '健康',
  natural: '自然',
  strong: '强力',
  auto: '自动',
  low: '低风',
  middle: '中风',
  high: '高风',
  mute: '静音'
};

// eslint-disable-next-line no-unused-vars
const Gear: FC<{ cRef?: string; onChange?: (val: any) => void }> = ({
  cRef,
  onChange
}: any) => {
  const [gearUser, setValue] = useState(sdk.deviceData.fan_speed_enum);
  useImperativeHandle(cRef, () => ({
    commit: () => {
      apiControlDeviceData({
        fan_speed_enum: gearUser
      });
    }
  }));

  const domList = enumToArray(enumGear).map(({ label, value }) => (
    <List.Item
      key={label}
      prefix={value}
      extra={
        <Radio
          value={label}
          icon={checked => <IconChecked isChecked={checked} />}
        />
      }
    />
  ));

  return (
    <article>
      {
        <Radio.Group
          value={gearUser}
          onChange={(val: any) => {
            onChange && onChange(val);
            setValue(val);
          }}
        >
          <List>{domList}</List>
        </Radio.Group>
      }
    </article>
  );
};

export default Gear;
