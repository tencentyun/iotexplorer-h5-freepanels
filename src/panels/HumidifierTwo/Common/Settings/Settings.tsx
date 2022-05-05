/*
 * @Description: 加湿器-设置页面
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Cell } from '@custom/Cell';
import { Switch } from '@custom/Switch';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions, getDesc } from '@utils';

export function Settings({
  deviceData,
  templateMap,
  doControlDeviceData,
  history: { PATH, push },
  tips,
}) {
  const [isShowModalSprayVolume, setIsShowModalSprayVolume] = useState(false);
  const [isShowModalSprayMode, setIsShowModalSprayMode] = useState(false);

  // 滤芯复位
  const onResetClick = async () => {
    const isReset = await tips.confirm('确定要复位滤网吗？');
    if (isReset) {
      doControlDeviceData('filter_reset', 1);
    }
  };

  return (
    <main className="settings-wrap">
      <Cell
        className="cell-settings"
        title="定时"
        onClick={() => {
          push(PATH.TIMER_LIST);
        }}
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
        title="香薰"
        isLink={false}
        value={
          <Switch
            checked={deviceData.fragrance === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('fragrance', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="除菌"
        isLink={false}
        value={
          <Switch
            checked={deviceData.sterilization === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('sterilization', Number(value));
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
        className="cell-settings mt"
        title="温标切换"
        size="medium"
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
        className="cell-settings mt"
        title="滤芯复位"
        onClick={onResetClick}
      ></Cell>
      <Cell
        className="cell-settings mt"
        title="喷雾开关"
        isLink={false}
        value={
          <Switch
            checked={deviceData.spray === 1}
            onChange={(val: boolean) => {
              doControlDeviceData('spray', Number(val));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="喷雾量"
        value={getDesc(templateMap, 'spray_volume', deviceData.spray_volume) || '暂无'}
        valueStyle="set"
        isLink={true}
        onClick={() => {
          setIsShowModalSprayVolume(true);
        }}
      >
        {/* 喷雾量弹窗*/}
        <OptionDialog
          visible={isShowModalSprayVolume}
          title="喷雾量"
          defaultValue={[deviceData.spray_volume]}
          options={getOptions(templateMap, 'spray_volume')}
          onCancel={() => setIsShowModalSprayVolume(false)}
          onConfirm={(value) => {
            doControlDeviceData('spray_volume', value[0]);
          }}
        />
      </Cell>
      <Cell
        className="cell-settings"
        title="喷雾模式"
        size="medium"
        value={getDesc(templateMap, 'spray_mode', deviceData.spray_mode) || '暂无'}
        valueStyle="set"
        onClick={() => {
          setIsShowModalSprayMode(true);
        }}
      >
        {/* 喷雾类型弹窗*/}
        <OptionDialog
          visible={isShowModalSprayMode}
          title="喷雾模式"
          defaultValue={[deviceData.spray_volume]}
          options={getOptions(templateMap, 'spray_mode')}
          onCancel={() => setIsShowModalSprayMode(false)}
          onConfirm={(value) => {
            doControlDeviceData('spray_mode', value[0]);
          }}
        />
      </Cell>
      <Cell
        className="cell-settings"
        title="睡眠"
        isLink={false}
        value={
          <Switch
            checked={deviceData.sleep === 1}
            onChange={(val: boolean) => {
              doControlDeviceData('sleep', Number(val));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="童锁开关"
        isLink={false}
        value={
          <Switch
            checked={deviceData.childjock === 1}
            onChange={(val: boolean) => {
              doControlDeviceData('childjock', Number(val));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="滤网寿命"
        size="medium"
        value={deviceData.filterlife}
        isLink={false}
      ></Cell>
      <Cell
        className="cell-settings"
        title="等离子"
        isLink={false}
        value={
          <Switch
            checked={deviceData.plasma === 1}
            onChange={(val: boolean) => {
              doControlDeviceData('plasma', Number(val));
            }}
          />
        }
      ></Cell>
    </main>
  );
}
