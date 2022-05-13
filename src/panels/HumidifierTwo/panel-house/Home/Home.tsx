import React, { useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
import { Disk } from './Disk';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions, getDesc } from '@utils';

enum enumTempKey {
  celsius = 'temp_set',
  fahrenheit = 'temp_set_f'
}

export function Home({
  deviceData,
  templateMap,
  doControlDeviceData,
  history: { PATH, push },
}) {
  // 工作模式弹窗
  const [modeVisible, setModeVisible] = useState(false);
  const [modeValue, setModeValue] = useState(deviceData.mode || '');
  // 档位弹窗
  const [gearVisible, setGearVisible] = useState(false);
  const [gearValue, setGearValue] = useState(deviceData.fan_speed_enum || '');

  // 根据当前温度单位，控制最大值
  const handleToggle = (isAdd: boolean) => {
    if (deviceData.power_switch !== 1) return;

    const { temp_unit_convert } = deviceData;
    const action = enumTempKey[temp_unit_convert || 'celsius'];
    const max = temp_unit_convert === 'fahrenheit' ? 100 : 50; // 摄氏度
    const oldVal = deviceData[action] || 0;
    if (isAdd) {
      if (oldVal < max) {
        doControlDeviceData({
          [action]: oldVal + 1,
        });
      }
    } else {
      if (oldVal > 0) {
        doControlDeviceData({
          [action]: oldVal - 1,
        });
      }
    }
  };

  return (
    <main className="home">
      {/* 顶部 */}
      <ul className="content-wrap">
        <li className="content-item">
          <div className="content">{deviceData.current_temp || 0}{'°'}<span>{deviceData.temp_unit_convert === 1 ? 'F' : 'C'}</span></div>
          <div className="label">环境温度</div>
        </li>
        <li className="content-item">
          <div className="content">{deviceData.current_humidity || 0}<span>%</span></div>
          <div className="label">环境湿度</div>
        </li>
      </ul>
      {/* 表盘 */}
      <div className="disk-wrap">
        <Disk
          status={deviceData.power_switch === 1}
          value={
            deviceData.unit_convert === 0
              ? deviceData.current_c_temp
              : deviceData.current_f_temp
          }
          unit={
            deviceData.unit_convert === 0
              ? 'C'
              : 'F'
          }
        ></Disk>
      </div>

      {/* 设置按钮 */}
      <footer className="home-footer">
        <div className="control-wrap">
          <div
            className="control-btn"
            onClick={() => {
              handleToggle(false);
            }}
          >
            <Icon name="minus"></Icon>
          </div>
          <div
            className="power-btn"
            onClick={() => {
              doControlDeviceData('power_switch', Number(!deviceData.power_switch));
            }}
          >
            <Icon name="switch"></Icon>
          </div>
          <div
            className="control-btn"
            onClick={() => {
              handleToggle(true);
            }}
          >
            <Icon name="plus"></Icon>
          </div>
        </div>
        <div className="setting-button-wrap">
          <div
            className="block-button-word"
            onClick={() => {
              push(PATH.SETTINGS);
            }}
          >
            <Icon name="mode"/>
            <p className="button-name">超声波</p>
            <OptionDialog
              visible={gearVisible}
              title="工作模式"
              defaultValue={[gearValue ? gearValue : '']}
              options={getOptions(templateMap, 'fan_speed_enum')}
              onCancel={() => {
                setGearVisible(false);
              }}
              onConfirm={(value) => {
                setGearValue(value[0]);
                doControlDeviceData('fan_speed_enum', value[0]);
              }}
            ></OptionDialog>
          </div>
          <div
            className="block-button-word"
            onClick={() => {
              setGearVisible(true);
            }}
          >
            <Icon name="gear"/>
            <p className="button-name">{gearValue ? getDesc(templateMap, 'fan_speed_enum', gearValue) : '档位'}</p>
            <OptionDialog
              visible={gearVisible}
              title="档位"
              defaultValue={[gearValue ? gearValue : '']}
              options={getOptions(templateMap, 'fan_speed_enum')}
              onCancel={() => {
                setGearVisible(false);
              }}
              onConfirm={(value) => {
                setGearValue(value[0]);
                doControlDeviceData('fan_speed_enum', value[0]);
              }}
            ></OptionDialog>
          </div>
          <div
            className="block-button-word"
            onClick={() => {
              push(PATH.SETTINGS);
            }}
          >
            <Icon name="settings"/>
            <p className="button-name">更多</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
