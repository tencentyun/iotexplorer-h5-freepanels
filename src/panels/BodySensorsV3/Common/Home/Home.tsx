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

export function Home({
  deviceData,
  doControlDeviceData,
}) {
  // const [sensitivityVisible, setSensitivityVisible] = useState(false);
  // const [keepTimeVisible, setKeepTimeVisible] = useState(false);

  // const enumSensitivity: stringKey = {
  //   low: '低灵敏度',
  //   middle: '中灵敏度',
  //   high: '高灵敏度',
  // };

  // const enumTime: stringKey = {
  //   thirtySecond: '有人30S',
  //   sixtySecond: '有人60S',
  //   oneHundredAndTwentySecond: '有人120S',
  // };

  return (
    <main className="home">
      {/* 顶部 */}
      <header>
        {/* 电源模块 */}
        <Battery
          value={deviceData.battery_percentage || 50}
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
      <div className={classNames('setting-block', `${deviceData.tamper_event === 1 ? 'is-checked' : ''}`)} onClick={() => {
        doControlDeviceData('tamper_event', Number(!deviceData.tamper_event));
      }}>
        <Cell
          className="setting-button"
          title="防拆报警"
          prefixIcon={<Icon name="alarm" />}
          size="medium"
          isLink={false}
          subTitle={`${deviceData.tamper_event === 1 ? '开启' : '关闭'}`}
          value={
            <Switch
              checked={deviceData.tamper_event == 1}
              onChange={(value: boolean) => {
                doControlDeviceData('tamper_event', Number(value));
              }}
            />
          }
        ></Cell>
        {/* <Cell
          className="setting-button"
          title="PIR灵敏度"
          prefixIcon={<Icon name="sensitivity"/>}
          size="medium"
          value={enumSensitivity[deviceData.pir_sensitivity] || ''}
          onClick={() => {
            setSensitivityVisible(true);
          }}
        >
          <OptionDialog
            visible={sensitivityVisible}
            title="PIR灵敏度"
            defaultValue={[deviceData.pir_sensitivity]}
            options={[
              { value: 'low', label: '低灵敏度' },
              { value: 'middle', label: '中灵敏度' },
              { value: 'high', label: '高灵敏度' },
            ]}
            onCancel={() => {
              setSensitivityVisible(false);
            }}
            onConfirm={(value) => {
              console.log(value);
              doControlDeviceData('pir_sensitivity', value[0]);
            }}
          ></OptionDialog>
        </Cell> */}
        {/* <Cell
          className="setting-button"
          title="有人保持时间"
          prefixIcon={<Icon name="time"/>}
          size="medium"
          value={enumTime[deviceData.keep_time] || ''}
          onClick={() => {
            setKeepTimeVisible(true);
          }}
        >
          <OptionDialog
            visible={keepTimeVisible}
            title="有人保持时间"
            defaultValue={[deviceData.keep_time]}
            options={[
              { value: 'thirtySecond', label: '有人30S' },
              { value: 'sixtySecond', label: '有人60S' },
              { value: 'oneHundredAndTwentySecond', label: '有人120S' },
            ]}
            onCancel={() => {
              setKeepTimeVisible(false);
            }}
            onConfirm={(value) => {
              console.log(value);
              doControlDeviceData('keep_time', value[0]);
            }}
          ></OptionDialog>
        </Cell> */}
      </div>
    </main>
  );
}
