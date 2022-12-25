import React, { useState } from 'react';
import { Battery } from '@custom/Battery';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';
import { Switch } from '@custom/Switch';
import { OptionDialog } from '@custom/OptionDialog';
import { Disk } from './Disk';
import classNames from 'classnames';

interface stringKey {
  [key: string]: string;
}

const HUMIDITY_LIST = {
  1: '干燥',
  2: '略干',
  3: '舒适',
  4: '潮湿'
};

const TEMPERATURE_LIST = {
  1: '寒冷',
  2: '冷',
  3: '舒适',
  4: '热',
  5: '酷热'
};

export function Home({
  deviceData,
  doControlDeviceData,
}) {

  return (
    <main className="home">
      {/* 顶部 */}
      <header>
        {/* 电源模块 */}
        <Battery
          value={deviceData?.low_voltage?.voltage || 50}
          isShowPercent={true}
          isShowTip={false}
        />
      </header>
      {/* 表盘 */}
      <Disk
        deviceData={deviceData}
        doControlDeviceData={doControlDeviceData}
      ></Disk>

      {/* 设置按钮 */}
      <div className={classNames('setting-block')}>
        <Cell
          className="setting-button"
          title={TEMPERATURE_LIST[deviceData?.temperature?.level || 1] }
          prefixIcon={<Icon name="temperature" />}
          size="medium"
          isLink={false}
          subTitle="温度等级"
        ></Cell>
        <Cell
          className="setting-button"
          title={HUMIDITY_LIST[deviceData?.humidity?.level || 1]}
          prefixIcon={<Icon name="humidity" />}
          size="medium"
          isLink={false}
          subTitle="湿度等级"
        ></Cell>
      </div>
    </main>
  );
}
