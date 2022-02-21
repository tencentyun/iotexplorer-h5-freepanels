/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-28 15:32:14
 * @LastEditors:
 * @LastEditTime:
 */

import React, { FC, useImperativeHandle, useState } from 'react';
import { enumToArray } from '@libs/utillib';
import { List, Radio } from 'antd-mobile';
import {stringKey} from '@libs/global';
import { DeviceSateContext } from '../../../../../deviceStateContext';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import IconChecked from '@components/base/icon-checked/icon-checked';
export const enumWorkMode: stringKey = {
  auto: '自动',
  cold: '制冷',
  hot: '制热',
  arefaction: '除湿',
  wind: '送风',
  eco: 'ECO',
  floor_heat: '地暖',
  floor_eat_and_heat: '地暖及制热'
};
// eslint-disable-next-line no-unused-vars
const WorkMode: FC<{ onChange?: (val: boolean) => void; cRef?: any; defaultValue?: string | number }> = ({
  cRef,
  defaultValue,
  onChange
}: any) => {
  const [workModeUser, setValue] = useState(sdk.deviceData.mode);
  useImperativeHandle(cRef, () => ({
    commit: () => {
      apiControlDeviceData({
        mode: workModeUser
      });
    }
  }));

  const domList = enumToArray(enumWorkMode).map(({ label, value }) => (
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
    <DeviceSateContext.Consumer>
      {() => (
        <article>
          {
            <Radio.Group
              defaultValue={defaultValue}
              value={workModeUser}
              onChange={(val: any) => {
                setValue(val);
                onChange && onChange(val);
              }}
            >
              <List>{domList}</List>
            </Radio.Group>
          }
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default WorkMode;
