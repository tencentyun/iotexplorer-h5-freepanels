import React, { useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
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
      <div className={classNames('conditioner-image', deviceData.power_switch === 1 ? 'conditioner-open' : 'conditioner-close')}>
        {deviceData.power_switch === 1 ? <div className="air-cloud"></div> : null}
      </div>
      <div className={classNames('temperature', { active: deviceData.power_switch === 1 })}>
        <p className="num">{deviceData.temp_unit_convert === 'fahrenheit' ? `${deviceData.temp_set_f || '0'}°F` : `${deviceData.temp_set || '0'}°C`}</p>
        <p className="content">
          当前温度 {deviceData.temp_unit_convert === 'fahrenheit' ? deviceData.temp_current_f || 0 : deviceData.temp_current || 0}
          <i>&#176;</i>
          {deviceData.temp_unit_convert === 'fahrenheit' ? 'F' : 'C'}
        </p>
      </div>
      <ul className={classNames('setting-content', { active: deviceData.power_switch === 1 })}>
        <li className="setting-item">
          <div className="content">{getDesc(templateMap, 'fan_speed_enum', gearValue) || '暂无'}</div>
          <div className="label">风速</div>
        </li>
        <li className="setting-item">
          <div className="content">{getDesc(templateMap, 'status', deviceData.status) || '暂无'}</div>
          <div className="label">状态</div>
        </li>
      </ul>

      {/* 设置按钮 */}
      <div className={classNames('setting-button-wrap', { active: deviceData.power_switch === 1 })}>
        <div
          className="block-button-icon"
          onClick={() => {
            if (deviceData.power_switch !== 1) return;
            setModeVisible(true);
          }}
        >
          <Icon name="mode"/>
          <p className="button-name">{modeValue ? getDesc(templateMap, 'mode', modeValue) : '模式'}</p>
          <OptionDialog
            visible={modeVisible}
            title="模式"
            defaultValue={[modeValue ? modeValue : '']}
            options={getOptions(templateMap, 'mode')}
            onCancel={() => {
              setModeVisible(false);
            }}
            onConfirm={(value) => {
              setModeValue(value[0]);
              doControlDeviceData('mode', value[0]);
            }}
          ></OptionDialog>
        </div>
        <div
          className="block-button-icon"
          onClick={() => {
            if (deviceData.power_switch !== 1) return;
            setGearVisible(true);
          }}
        >
          <Icon name="gear"/>
          <p className="button-name">{gearValue ? getDesc(templateMap, 'fan_speed_enum', gearValue) : '风速'}</p>
          <OptionDialog
            visible={gearVisible}
            title="风速"
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
          className="block-button-icon"
          onClick={() => {
            if (deviceData.power_switch !== 1) return;
            push(PATH.SETTINGS);
          }}
        >
          <Icon name="settings"/>
          <p className="button-name">设置</p>
        </div>
      </div>
      {/* 设置按钮 */}
      <footer className={classNames('home-footer', { active: deviceData.power_switch === 1 })}>
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
            className="control-btn"
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
      </footer>
    </main>
  );
}
