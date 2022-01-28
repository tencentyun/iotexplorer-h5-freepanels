import React, { useState } from 'react';
import { Cell, Switch } from '@components/base';
import { Block } from '@components/layout';
import { ListPicker } from '@components/business';
import { Dialog } from 'antd-mobile';
import { DeviceContext } from '../deviceContext';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import './setting.less';

export function Setting() {
  const themeType = getThemeType();
  // 单位选择器
  const [unitVisible, onToggleUnit] = useState(false);

  // 回复出厂设置
  const handleRecovery = async () => {
    const result = await Dialog.confirm({
      content: '确定恢复出厂设置'
    });
    if (result) {
      // Toast.show({ content: '点击了确认', position: 'bottom' })
    } else {
      // Toast.show({ content: '点击了取消', position: 'bottom' })
    }
  };

  const unitLabel: any = {
    cup: '杯子',
    oz: '碗',
    grid: '碟'
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <div className="setting-view">
          <Block className="list-item">
            <Cell
              size="medium"
              title="单位转换"
              value={unitLabel[deviceData.unit_switch]}
              valueStyle="gray"
              onClick={() => {
                onToggleUnit(true);
              }}
            >
              <ListPicker
                visible={unitVisible}
                title="单位转换"
                defaultValue={[deviceData.unit_switch]}
                options={[
                  {
                    label: '杯子',
                    value: 'cup'
                  },
                  {
                    label: '碗',
                    value: 'oz'
                  },
                  {
                    label: '碟',
                    value: 'grid'
                  }
                ]}
                layoutType="middle"
                onCancel={() => onToggleUnit(false)}
                onConfirm={value => {
                  onControlDevice('unit_switch', value[0]);
                  onToggleUnit(false);
                }}
              />
            </Cell>
          </Block>
          <Block className="list-item">
            <Cell
              size="medium"
              title="慢放喂食"
              value={
                <Switch
                  name="slowFeed"
                  theme={themeType}
                  checked={
                    deviceData['slow_feed']
                      ? Boolean(deviceData['slow_feed'])
                      : false
                  }
                  onChange={(val: boolean) => {
                    onControlDevice('slow_feed', Number(val));
                  }}
                />
              }
              isLink={false}
            ></Cell>
          </Block>
          <Block className="list-item">
            <Cell
              size="medium"
              title="出粮校准"
              value={
                <Switch
                  name="exportCalibrate"
                  theme={themeType}
                  checked={
                    deviceData['export_calibrate']
                      ? Boolean(deviceData['export_calibrate'])
                      : false
                  }
                  onChange={(val: boolean) => {
                    onControlDevice('export_calibrate', Number(val));
                  }}
                />
              }
              isLink={false}
            ></Cell>
          </Block>
          <Block className="list-item">
            <Cell
              size="medium"
              title="余量校准"
              value={
                <Switch
                  name="weightCalibrate"
                  theme={themeType}
                  checked={
                    deviceData['weight_calibrate']
                      ? Boolean(deviceData['weight_calibrate'])
                      : false
                  }
                  onChange={(val: boolean) => {
                    onControlDevice('weight_calibrate', Number(val));
                  }}
                />
              }
              isLink={false}
            ></Cell>
          </Block>
          {/* <Block className="list-item">
            <Cell
              size="medium"
              title="粮桶余粮"
              value={'粮桶余粮0% | 余粮重量0g'}
              valueStyle="gray"
              isLink={false}
            ></Cell>
          </Block> */}
          {/* <Block className="list-item">
            <Cell
              size="medium"
              title="语音播报次数"
              value={'2'}
              valueStyle="gray"
            >
              <ValuePicker
                visible={alarmTimeVisible}
                value={[(deviceData['alarm_time'] ? deviceData['alarm_time'].toString() : '')]}
                title="报警时长"
                columns={[mapsToOptions('alarm_time', deviceMaps)]}
                onCancel={() => onToggleAlarmTime(false)}
                onConfirm={value => {
                  onControlDevice('alarm_time', +(value[0] || '0'));
                  onToggleAlarmTime(false);
                }}
              />
            </Cell>
          </Block> */}
          {/* <Block className="list-item">
            <Cell
              size="medium"
              title="小夜灯"
              value={<Switch name="manfangweishi" />}
              isLink={false}
            ></Cell>
          </Block> */}
          {/* <Block className="list-item">
            <Cell size="medium" title="恢复出厂" onClick={handleRecovery}></Cell>
          </Block> */}
        </div>
      )}
    </DeviceContext.Consumer>
  );
}
