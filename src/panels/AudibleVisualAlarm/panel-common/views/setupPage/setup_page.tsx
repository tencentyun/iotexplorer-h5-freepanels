import React, { useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { toggleBooleanByNumber } from '@libs/utillib';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { Cell, Switch } from '@components/base';
import { ListPicker } from '@components/business';
import IconChecked from '@components/base/icon-checked/icon-checked';

import './setup_page.less';

export function SetupPage() {
  const themeType = getThemeType();
  const [tamperEventVisible, onToggleTamperEvent] = useState(false);
  const [masterModeVisible, onToggleMasterMode] = useState(false);
  const batteryStateSrc = (battery: string) => {
    switch (battery) {
      case 'low':
        return '低';
      case 'middle':
        return '中';
      case 'high':
        return '高';
      default:
        return '';
    }
  };
  const tamperEventSrc = (mode: string) => {
    switch (mode) {
      case '0':
        return '未拆卸';
      case '1':
        return '拆卸告警';
      default:
        return '';
    }
  };
  const masterModeSrc = (mode: string) => {
    switch (mode) {
      case 'Disarmed':
        return '撤防';
      case 'Arm':
        return '布防';
      case 'home':
        return '在家';
      case 'Sos':
        return '紧急';
      case 'Work':
        return '工作';
      case 'Play':
        return '休闲';
      default:
        return '';
    }
  };
  return (
    <article className={classNames('page_home')}>
      <div className="setup_bgcolor">
        <Cell
          className="_color_white_"
          title="报警开关"
          isLink={false}
          value={
            <Switch
              name={''}
              theme={themeType}
              checked={toggleBooleanByNumber(sdk.deviceData.power_switch ? sdk.deviceData.power_switch : 0)}
              onChange={(value: boolean) => {
                apiControlDeviceData({ power_switch: value ? 1 : 0 });
              }}
            />
          }
          valueStyle="gray"
          size="medium"
          // onClick={() => setIsShowPir(true)}
        />

        <div className="setup_hr">
          <hr className="page_hr"/>
        </div>

        <Cell
          className="_color_white_"
          title="电池电量状态"
          isLink={false}
          value={sdk.deviceData.battery_state ? batteryStateSrc(sdk.deviceData.battery_state) : ''}
          valueStyle="gray"
          size="medium"
        />
        <div className="setup_hr">
          <hr className="page_hr"/>
        </div>

        <Cell
          className="_color_white_"
          title="电池电量"
          isLink={false}
          value={sdk.deviceData.battery_percentage ? `${sdk.deviceData.battery_percentage}%` : '0%'}
          valueStyle="gray"
          size="medium"
          // onClick={() => setIsShowPir(true)}
        />
        <div className="setup_hr">
          <hr className="page_hr"/>
        </div>

        <Cell
          className="_color_white_"
          title="防拆报警"
          value={sdk.deviceData.tamper_event ? tamperEventSrc(sdk.deviceData.tamper_event) : ''}
          valueStyle="gray"
          size="medium"
          onClick={() => {
            onToggleTamperEvent(true);
          }}
        >
          <ListPicker
            visible={tamperEventVisible}
            title="防拆报警"
            defaultValue={[
              sdk.deviceData.tamper_event ? sdk.deviceData.tamper_event : '',
            ]}
            options={[
              {
                label: '未拆卸',
                value: '0',
              },
              {
                label: '拆卸告警',
                value: '1',
              },
            ]}
            onCancel={() => onToggleTamperEvent(false)}
            onConfirm={(value) => {
              onControlDevice('tamper_event', value[0]);
              onToggleTamperEvent(false);
            }}
          />
        </Cell>
        <div className="setup_hr">
          <hr className="page_hr"/>
        </div>
        <Cell
          className="_color_white_"
          title="工作模式"
          //   isLink={false}
          value={sdk.deviceData.master_mode ? masterModeSrc(sdk.deviceData.master_mode) : ''}
          valueStyle="gray"
          size="medium"
          onClick={() => {
            onToggleMasterMode(true);
          }}
        >
          <ListPicker
            visible={masterModeVisible}
            title="工作模式"
            defaultValue={[
              sdk.deviceData.master_mode ? sdk.deviceData.master_mode : '',
            ]}
            options={[
              {
                label: '撤防',
                value: 'Disarmed',
              },
              {
                label: '布防',
                value: 'Arm',
              },
              {
                label: '在家',
                value: 'home',
              },
              {
                label: '紧急',
                value: 'Sos',
              },
              {
                label: '工作',
                value: 'Work',
              },
              {
                label: '休闲',
                value: 'Play',
              },
            ]}
            onCancel={() => onToggleMasterMode(false)}
            onConfirm={(value) => {
              onControlDevice('master_mode', value[0]);
              onToggleMasterMode(false);
            }}
          />
        </Cell>
      </div>
    </article>
  );
}
