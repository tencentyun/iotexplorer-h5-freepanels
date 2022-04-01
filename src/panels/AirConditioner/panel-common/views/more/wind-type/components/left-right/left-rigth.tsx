/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-28 13:41:48
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useImperativeHandle, useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { List, Radio } from 'antd-mobile';
import { enumToArray } from '@libs/utillib';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import IconChecked from '@components/base/icon-checked/icon-checked';
export const enumLeftRight: any = {
  off: '关闭',
  opposite: '相向摆风',
  same: '同向摆风',
};

const LeftRight = ({ cRef }: any) => {
  const [gearUser, setValue] = useState(sdk.deviceData.gear_horizontal);
  useImperativeHandle(cRef, () => ({
    commit: () => {
      apiControlDeviceData({
        gear_horizontal: gearUser,
      });
    },
  }));

  const domList = enumToArray(enumLeftRight).map(({ label, value }) => (
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
            setValue(val);
          }}
        >
          <List>{domList}</List>
        </Radio.Group>
      }
    </article>
  );
};

export default LeftRight;
