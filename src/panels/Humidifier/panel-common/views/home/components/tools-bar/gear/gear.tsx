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
export const enumGear = {
  level_1: '1档',
  level_2: '2档',
  level_3: '3档',
  level_4: '4档',
  level_5: '5档',
  level_6: '6档',
  level_7: '7档',
  level_8: '8档',
  level_9: '9档',
  level_MO: '10档'
};

const Gear = ({ cRef }: any) => {
  const [gearUser, setValue] = useState(sdk.deviceData.spray_gears);
  useImperativeHandle(cRef, () => ({
    commit: () => {
      apiControlDeviceData({
        spray_gears: gearUser
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
