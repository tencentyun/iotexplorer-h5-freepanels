import React, { useState } from 'react';
import { Switch } from '@custom/Switch';
import { useTitle } from '@hooks/useTitle';
import { Cell } from '@custom/Cell';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions, getDesc } from '@utils';

export function Setting({
  deviceData,
  tips,
  templateMap,
  doControlDeviceData,
}) {
  useTitle('设置');
  // 单位转换
  const [unitSwitchVisible, setUnitSwitch] = useState(false);
  const {
    unit_switch,
    slow_feed,
    export_calibrate,
    weight_calibrate,
    voice_num, // 目前无无模型
    light, //  目前无无模型
  } = deviceData;

  const handleRecovery = async () => {
    // TODO 回复出厂逻辑带确认
    const result = await tips.confirm('确定恢复出厂设置');
  };

  return (
    <div className="settings">
      <Cell
        className="cell-settings"
        title="单位转换"
        value={getDesc(templateMap, 'unit_switch', unit_switch || 'cup')}
        valueStyle="set"
        onClick={() => {
          setUnitSwitch(true);
        }}
      >
        <OptionDialog
          visible={unitSwitchVisible}
          title="抓拍模式"
          defaultValue={[unit_switch]}
          options={getOptions(templateMap, 'unit_switch')}
          onCancel={() => {
            setUnitSwitch(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('unit_switch', value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings"
        title="慢放喂食"
        isLink={false}
        value={
          <Switch
            checked={!!slow_feed}
            onChange={(value: boolean) => {
              doControlDeviceData('slow_feed', Number(value));
            }}
          />
        }
      />
      <Cell
        className="cell-settings"
        title="出粮校准"
        isLink={false}
        value={
          <Switch
            checked={!!export_calibrate}
            onChange={(value: boolean) => {
              doControlDeviceData('export_calibrate', Number(value));
            }}
          />
        }
      />
      <Cell
        className="cell-settings"
        title="出粮校准"
        isLink={false}
        value={
          <Switch
            checked={!!weight_calibrate}
            onChange={(value: boolean) => {
              doControlDeviceData('weight_calibrate', Number(value));
            }}
          />
        }
      />
      <Cell
        className="cell-settings"
        title="粮桶余粮"
        isLink={false}
        value={'粮桶余粮0% | 余粮重量0g'} // TODO 无无模型字段对应
      />
      <Cell
        className="cell-settings"
        title="语音播放次数"
        value={voice_num || 2}
        valueStyle="set"
        onClick={() => {
          setUnitSwitch(true);
        }}
      >
        <OptionDialog
          visible={unitSwitchVisible}
          title="语音播放次数"
          defaultValue={[voice_num || 2]} // 缺少模型字段对应
          options={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
          ]}
          onCancel={() => {
            setUnitSwitch(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('voice_num', value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings"
        title="小夜灯"
        isLink={false}
        value={
          <Switch
            checked={!!light}
            onChange={(value: boolean) => {
              doControlDeviceData('light', Number(value));
            }}
          />
        }
      />
      <Cell
        className="cell-settings"
        title="恢复出厂"
        onClick={handleRecovery}
        value=""
      />
    </div>
  );
}
