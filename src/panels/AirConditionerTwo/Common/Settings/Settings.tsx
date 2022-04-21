/*
 * @Description: 空调-设置页面
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Cell } from '@custom/Cell';
import { Switch } from '@custom/Switch';
import { NumberSlider } from './NumberSlider';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions, getDesc } from '@utils';

export function Settings({
  deviceData,
  templateMap,
  doControlDeviceData,
  history: { PATH, push },
}) {
  // 上下摆风档位gear_vertical
  const [gearVerticalVisible, setGearVertical] = useState(false);
  // 左右摆风档位
  const [gearHorizontalVisible, setGearHorizontal] = useState(false);
  // 湿度设置
  const [humidityVisible, setHumidity] = useState(false);

  return (
    <main className="settings">
      <Cell
        className="cell-settings"
        title="耗电"
        value={`${deviceData.power_consumption || 0}Kwh`}
        valueStyle="set"
        isLink={false}
      ></Cell>
      <Cell
        className="cell-settings"
        title="当前温度"
        value={deviceData.temp_unit_convert === 'fahrenheit' ? `${deviceData.temp_current_f || 0}°F` : `${deviceData.temp_current_f || 0}°C`}
        valueStyle="set"
        isLink={false}
      ></Cell>
      <Cell
        className="cell-settings"
        title="上下摆风挡位"
        value={''}
        valueStyle="set"
        onClick={() => {
          setGearVertical(true);
        }}
      >
        <NumberSlider
          className="gear-slider"
          defaultValue={deviceData.angle_horizontal}
          maxValue={180}
          minValue={0}
          status={deviceData.power_switch}
          onChange={(value: number) => {
            // setVal(value);
          }}
        ></NumberSlider>
        <OptionDialog
          visible={gearVerticalVisible}
          title="上下摆风挡位"
          defaultValue={[deviceData.angle_vertical ? deviceData.angle_vertical?.toString() : '2']}
          options={getOptions(templateMap, 'angle_vertical')}
          onCancel={() => {
            setGearVertical(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('angle_vertical', value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings"
        title="左右摆风挡位"
        value={''}
        valueStyle="set"
      ></Cell>
      <Cell
        className="cell-settings"
        title="温标切换"
        isLink={false}
      >
        <div className="unit-convert">
          <div
            className={classNames('unit-btn', { active: deviceData.temp_unit_convert === 'celsius' })}
            onClick={() => {
              doControlDeviceData('temp_unit_convert', 'celsius');
            }}
          >°C</div>
          <div
            className={classNames('unit-btn', { active: deviceData.temp_unit_convert === 'fahrenheit' })}
            onClick={() => {
              doControlDeviceData('temp_unit_convert', 'fahrenheit');
            }}
          >°F</div>
        </div>
      </Cell>
      <Cell
        className="cell-settings"
        title="温度设置"
        value={''}
        valueStyle="set"
      ></Cell>
      <Cell
        className="cell-settings"
        title="3D扫风"
        isLink={false}
        value={
          <Switch
            checked={deviceData.swing_3d === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('swing_3d', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="烘干"
        isLink={false}
        value={
          <Switch
            checked={deviceData.drying === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('drying', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="自动"
        isLink={false}
        value={
          <Switch
            checked={deviceData.auto === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('auto', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="ECO模式"
        isLink={false}
        value={
          <Switch
            checked={deviceData.eco === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('eco', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="换气模式"
        isLink={false}
        value={
          <Switch
            checked={deviceData.ventilation === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('ventilation', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="负离子"
        isLink={false}
        value={
          <Switch
            checked={deviceData.anion === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('anion', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="自清洁"
        isLink={false}
        value={
          <Switch
            checked={deviceData.cleaning === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('cleaning', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="加热"
        isLink={false}
        value={
          <Switch
            checked={deviceData.heat === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('heat', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="云定时"
        isLink={true}
        onClick={() => {
          push(PATH.TIMER_LIST);
        }}
      ></Cell>
    </main>
  );
}
