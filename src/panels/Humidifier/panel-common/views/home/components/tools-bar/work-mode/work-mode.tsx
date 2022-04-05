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
import { stringKey } from '@libs/global';
import { DeviceSateContext } from '../../../../../deviceStateContext';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import IconChecked from '@components/base/icon-checked/icon-checked';
export const enumWorkMode: stringKey = {
  natural_evaporation: '自然蒸发',
  heating_evaporation: '加热蒸发',
  ultrasonic: '超声波蒸发',
};
const WorkMode: FC<{ onChange?: (val: boolean) => void; cRef?: any }> = ({
  cRef,
  onChange,
}: any) => {
  const [workModeUser, setValue] = useState(sdk.deviceData.work_mode);
  useImperativeHandle(cRef, () => ({
    commit: () => {
      apiControlDeviceData({
        work_mode: workModeUser,
      });
    },
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
