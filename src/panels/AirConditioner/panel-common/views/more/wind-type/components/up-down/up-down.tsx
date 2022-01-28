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
export const enumUpDown: any = {
  off: '关闭',
  opposite: '相向摆风',
  same: '同向摆风'
};

const UpDown = ({ cRef }: any) => {
  const [value, setValue] = useState(sdk.deviceData.gear_vertical);
  useImperativeHandle(cRef, () => ({
    commit: () => {
      apiControlDeviceData({
        gear_vertical: value
      });
    }
  }));

  const domList = enumToArray(enumUpDown).map(({ label, value }) => (
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
          value={value}
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

export default UpDown;
