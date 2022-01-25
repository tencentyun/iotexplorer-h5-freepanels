/*
 * @Description: 设置
 */

import React, { useState } from 'react';
import { Block } from '@components/layout';
import { Cell } from '@components/base';
import { ListPicker, ValuePicker } from '@components/business';
// 模版数据
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';
import { DeviceContext } from '../deviceContext';
import { formatDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { mapsToOptions } from '@libs/utillib';

interface DeviceMaps {
  temp_sampling: [];
  humidity_sampling: [];
}

export function Settings() {
  const [state] = useDeviceData(sdk);
  // 从 sdk 读取到的物模型 maps
  const deviceMaps = formatDeviceData((state as any).templateMap) as DeviceMaps;
  // 温度采样选择器
  const [tempSamplingVisible, onToggleTempSampling] = useState(false);
  // 湿度度采样选择器
  const [humiditySamplingVisible, onToggleHumiditySampling] = useState(false);
  // 温标选择器
  const [tempUnitVisible, onToggleTempUnit] = useState(false);

  const getDes: any = {
    low: '低',
    middle: '中',
    high: '高'
  }

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="sensor-setting">
          <Block className="setting-block">
            <Cell
              title="电池电量状态"
              value={getDes[deviceData.battery_state] || '暂无'}
              valueStyle={'gray'}
              size="medium"
              isLink={false}
            ></Cell>
            <Cell
              title="电池电量"
              value={(deviceData.battery_percentage || 0) + '%'}
              valueStyle={'gray'}
              size="medium"
              isLink={false}
            ></Cell>
            <Cell
              title="防拆"
              value={deviceData.tamper_event == 1 ? '拆卸告警' : '未拆卸'}
              valueStyle={'gray'}
              size="medium"
              isLink={false}
            ></Cell>
            <Cell
              title="温度采样"
              value={(deviceData.temp_sampling || 0) + 's'}
              valueStyle={'gray'}
              size="medium"
              onClick={() => {
                onToggleTempSampling(true);
              }}
            ></Cell>
            <ValuePicker
              visible={tempSamplingVisible}
              value={[
                deviceData['temp_sampling']
                  ? deviceData['temp_sampling'].toString()
                  : ''
              ]}
              title="温度采样"
              columns={[mapsToOptions('temp_sampling', deviceMaps)]}
              onCancel={() => onToggleTempSampling(false)}
              onConfirm={value => {
                onControlDevice('temp_sampling', +(value[0] || '0'));
                onToggleTempSampling(false);
              }}
            />
            <Cell
              title="湿度采样"
              value={(deviceData.humidity_sampling || 0) + 's'}
              valueStyle={'gray'}
              size="medium"
              onClick={() => {
                onToggleHumiditySampling(true);
              }}
            ></Cell>
            <ValuePicker
              visible={humiditySamplingVisible}
              value={[
                deviceData['humidity_sampling']
                  ? deviceData['humidity_sampling'].toString()
                  : ''
              ]}
              title="湿度采样"
              columns={[mapsToOptions('humidity_sampling', deviceMaps)]}
              onCancel={() => onToggleHumiditySampling(false)}
              onConfirm={value => {
                onControlDevice('humidity_sampling', +(value[0] || '0'));
                onToggleHumiditySampling(false);
              }}
            />
            <Cell
              title="温标"
              value={
                deviceData.temp_unit
                  ? deviceData.temp_unit == 1
                    ? '华氏度'
                    : '摄氏度'
                  : '暂无'
              }
              valueStyle={'gray'}
              size="medium"
              onClick={() => {
                onToggleTempUnit(true);
              }}
            >
              <ListPicker
                visible={tempUnitVisible}
                title="温标"
                defaultValue={[
                  deviceData['temp_unit']
                    ? deviceData['temp_unit'].toString()
                    : ''
                ]}
                options={[
                  { value: '0', label: '摄氏度' },
                  { value: '1', label: '华氏度' }
                ]}
                onCancel={() => onToggleTempUnit(false)}
                onConfirm={value => {
                  onControlDevice('temp_unit', Number(value[0]));
                  onToggleTempUnit(false);
                }}
              />
            </Cell>
          </Block>
        </main>
      )}
    </DeviceContext.Consumer>
  );
}
