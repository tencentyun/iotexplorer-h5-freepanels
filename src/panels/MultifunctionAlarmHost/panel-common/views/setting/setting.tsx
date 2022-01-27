import React, {useState} from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Dialog } from 'antd-mobile';
import classNames from 'classnames';
import { Cell, Switch } from '@components/base';
import {ListPicker, Option} from '@components/business';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice} from '@hooks/useDeviceData';
import { toggleBooleanByNumber } from '@libs/utillib';
import './setting.less';
import SetPassword from "./setPassword/setPassword";
import SetCallNumber from "./setCallNumber/setCallNumber";
import SetSmsNumber from "./setSmsNumber/setSmsNumber";
import {useHistory} from "react-router";

export function Setting() {
  const themeType = getThemeType();
  const alarmVolValue = (value: string) => {
    switch (value) {
      case 'low':
        return '低';
      case 'middle':
        return '中';
      case 'high':
        return '高';
      case 'mute':
        return '静音';
      default:
        return '低';
    }
  };

  const [delaySetVisible, onToggleDelaySet] = useState(false);
  const [alarmStateVisible, onToggleAlarmState] = useState(false);
  const [alarmVolVisible, onToggleAlarmVol] = useState(false);
  const [alarmBrightVisible, onToggleAlarmBright] = useState(false);
  const [alarmRingtoneVisible, onToggleAlarmRingtone] = useState(false);
  const [callLoopTimesVisible, onToggleCallLoopTimes] = useState(false);
  // 密码
  const [password, onEditPassword] = useState(false);
  // 报警电话号码
  const [callNumber, onEditCallNumber] = useState(false);
  // 报警短信号码
  const [smsNumber, onEditSmsNumber] = useState(false);
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
  const history = useHistory();
  const handleToggle = () => {
    return history.push('/timer');
  };
  const delaySetList: Option[] = [];
  for (let i = 0; i <= 300; i++) {
    delaySetList.push({
      label: i + '秒',
      value: i,
      disabled: false
    });
  }
  const alarmTimeList: Option[] = [];
  for (let i = 0; i <= 60; i++) {
    alarmTimeList.push({
      label: i + '分钟',
      value: i,
      disabled: false
    });
  }
  const alarmBrightList: Option[] = [];
  for (let i = 0; i <= 100; i++) {
    alarmBrightList.push({
      label: i,
      value: i,
      disabled: false
    });
  }
  const callLooptimesList: Option[] = [];
  for (let i = 1; i <= 10; i++) {
    callLooptimesList.push({
      label: i,
      value: i,
      disabled: false
    });
  }
  return (
    <article className={classNames('setting')}>
      <ul className="setting-list">
        <li className="list-item">
          <Cell
            size="medium"
            title="定时"
            value=''
            valueStyle="gray"
            onClick={handleToggle}
          >
          </Cell>
          <Cell
            size="medium"
            title="延时设置"
            value={
              sdk.deviceData.delay_set ? sdk.deviceData.delay_set + '秒' : '0秒'
            }
            valueStyle="gray"
            onClick={() => {
              onToggleDelaySet(true);
            }}
          >
            <ListPicker
              visible={delaySetVisible}
              title="延时设置"
              defaultValue={[
                sdk.deviceData.delay_set ? sdk.deviceData.delay_set : '0'
              ]}
              options={delaySetList}
              onCancel={() => onToggleDelaySet(false)}
              onConfirm={value => {
                onControlDevice('delay_set', value[0]);
                onToggleDelaySet(false);
              }}
            />
          </Cell>
          <Cell
            size="medium"
            title="报警时长"
            value={
              sdk.deviceData.alarm_time
                ? sdk.deviceData.alarm_time + '分钟'
                : '-'
            }
            valueStyle="gray"
            onClick={() => {
              onToggleAlarmState(true);
            }}
          >
            <ListPicker
              visible={alarmStateVisible}
              title="报警时长"
              defaultValue={[
                sdk.deviceData.alarm_time ? sdk.deviceData.alarm_time : '1'
              ]}
              options={alarmTimeList}
              onCancel={() => onToggleAlarmState(false)}
              onConfirm={value => {
                onControlDevice('alarm_time', value[0]);
                onToggleAlarmState(false);
              }}
            />
          </Cell>
        </li>
        <li className="list-item">
          <Cell
            size="medium"
            title="报警声开关"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.switch_alarm_sound
                    ? sdk.deviceData.switch_alarm_sound
                    : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ switch_alarm_sound: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="报警音量"
            value={
              sdk.deviceData.alarm_vol
                ? alarmVolValue(sdk.deviceData.alarm_vol)
                : '低'
            }
            valueStyle="gray"
            onClick={() => {
              onToggleAlarmVol(true);
            }}
          >
            <ListPicker
              visible={alarmVolVisible}
              title="报警音量"
              defaultValue={[
                sdk.deviceData.alarm_vol ? sdk.deviceData.alarm_vol : 'low'
              ]}
              options={[
                {
                  label: '低',
                  value: 'low'
                },
                {
                  label: '中',
                  value: 'middle'
                },
                {
                  label: '高',
                  value: 'high'
                },
                {
                  label: '静音',
                  value: 'mute'
                }
              ]}
              onCancel={() => onToggleAlarmVol(false)}
              onConfirm={value => {
                onControlDevice('alarm_vol', value[0]);
                onToggleAlarmVol(false);
              }}
            />
          </Cell>
          <Cell
            size="medium"
            title="报警灯开关"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.switch_alarm_light
                    ? sdk.deviceData.switch_alarm_light
                    : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ switch_alarm_light: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="报警灯亮度"
            value={
              sdk.deviceData.alarm_bright ? sdk.deviceData.alarm_bright : '0'
            }
            valueStyle="gray"
            onClick={() => {
              onToggleAlarmBright(true);
            }}
          >
            <ListPicker
              visible={alarmBrightVisible}
              title="报警灯亮度"
              defaultValue={[
                sdk.deviceData.alarm_bright ? sdk.deviceData.alarm_bright : '0'
              ]}
              options={alarmBrightList}
              onCancel={() => onToggleAlarmBright(false)}
              onConfirm={value => {
                onControlDevice('alarm_bright', value[0]);
                onToggleAlarmBright(false);
              }}
            />
          </Cell>
          <Cell
            size="medium"
            title="报警铃声"
            value={
              sdk.deviceData.alarm_ringtone
                ? sdk.deviceData.alarm_ringtone
                : 'ringtone_1'
            }
            valueStyle="gray"
            onClick={() => {
              onToggleAlarmRingtone(true);
            }}
          >
            <ListPicker
              visible={alarmRingtoneVisible}
              title="报警铃声"
              defaultValue={[
                sdk.deviceData.alarm_ringtone
                  ? sdk.deviceData.alarm_ringtone
                  : 'ringtone_1'
              ]}
              options={[
                {
                  label: 'ringtone_1',
                  value: 'ringtone_1'
                },
                {
                  label: 'ringtone_2',
                  value: 'ringtone_2'
                },
                {
                  label: 'ringtone_3',
                  value: 'ringtone_3'
                },
                {
                  label: 'ringtone_4',
                  value: 'ringtone_4'
                },
                {
                  label: 'ringtone_5',
                  value: 'ringtone_5'
                }
              ]}
              onCancel={() => onToggleAlarmRingtone(false)}
              onConfirm={value => {
                onControlDevice('alarm_ringtone', value[0]);
                onToggleAlarmRingtone(false);
              }}
            />
          </Cell>
          <Cell
            size="medium"
            title="工作模式提示音"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.switch_mode_sound
                    ? sdk.deviceData.switch_mode_sound
                    : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ switch_mode_sound: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="工作模式指示灯"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.switch_mode_light
                    ? sdk.deviceData.switch_mode_light
                    : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ switch_mode_light: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="键盘按键音"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.switch_kb_sound
                    ? sdk.deviceData.switch_kb_sound
                    : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ switch_kb_sound: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="键盘背景灯"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.switch_kb_light
                    ? sdk.deviceData.switch_kb_light
                    : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ switch_kb_light: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="低电量报警"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.switch_low_battery
                    ? sdk.deviceData.switch_low_battery
                    : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ switch_low_battery: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="告警推送"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.tamper_alarm ? sdk.deviceData.tamper_alarm : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ tamper_alarm: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          {/*<Cell
            size="medium"
            title="告警后延时报警"
            value={'0秒'}
            valueStyle="gray"
          />*/}
          <Cell
            size="medium"
            title="模式生效倒计时提示音"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.tamper_alarm ? sdk.deviceData.tamper_alarm : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ tamper_alarm: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          {/*<Cell
            size="medium"
            title="门铃音量"
            value={'低'}
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="夜灯模式"
            value={'灯开'}
            valueStyle="gray"
          />
          <Cell size="medium" title="夜灯亮度" value={'0'} valueStyle="gray" />
          <Cell
            size="medium"
            title="报警音量大小"
            value={'0'}
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="门铃铃声"
            value={'one-1'}
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="夜灯延时"
            value={'0秒'}
            valueStyle="gray"
          />
        </li>
        <li className="list-item">
          <Cell
            size="medium"
            title="24小时"
            value={''}
            valueStyle="gray"
          ></Cell>
          <Cell
            size="medium"
            title="延迟"
            value={''}
            valueStyle="gray"
          ></Cell>
          <Cell
            size="medium"
            title="其他"
            value={''}
            valueStyle="gray"
          ></Cell>*/}
        </li>
        <li className="list-item">
          <Cell
            size="medium"
            title="设置密码"
            value=""
            valueStyle="gray"
            onClick={() => {
              onEditPassword(true);
            }}
          />
          <Cell
            size="medium"
            title="报警电话号码"
            value=""
            valueStyle="gray"
            onClick={() => {
              onEditCallNumber(true);
            }}
          />
          <Cell
            size="medium"
            title="报警短信号码"
            value=""
            valueStyle="gray"
            onClick={() => {
              onEditSmsNumber(true);
            }}
          />
          <Cell
            size="medium"
            title="报警电话"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.enable_alarm_call
                    ? sdk.deviceData.enable_alarm_call
                    : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ enable_alarm_call: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="报警短信"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.enable_alarm_sms
                    ? sdk.deviceData.enable_alarm_sms
                    : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ enable_alarm_sms: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="未接听重复拨打次数"
            value={sdk.deviceData.call_looptimes}
            valueStyle="gray"
            onClick={() => {
              onToggleCallLoopTimes(true);
            }}
          >
            <ListPicker
              visible={callLoopTimesVisible}
              title="未接听重复拨打次数"
              defaultValue={[
                sdk.deviceData.call_looptimes
                  ? sdk.deviceData.call_looptimes
                  : '1'
              ]}
              options={callLooptimesList}
              onCancel={() => onToggleCallLoopTimes(false)}
              onConfirm={value => {
                onControlDevice('call_looptimes', value[0]);
                onToggleCallLoopTimes(false);
              }}
            />
          </Cell>
        </li>
        {/*<li className="list-item">
          <Cell
            size="medium"
            title="恢复出厂"
            value={''}
            valueStyle="gray"
            onClick={handleRecovery}
          ></Cell>
          <Cell
            size="medium"
            title="主机语言"
            value={'简体中文'}
            valueStyle="gray"
          ></Cell>
        </li>*/}
      </ul>
      <SetPassword
        isShow={password}
        onClose={() => {
          onEditPassword(false);
        }}
      />
      <SetCallNumber
        isShow={callNumber}
        onClose={() => {
          onEditCallNumber(false);
        }}
      />
      <SetSmsNumber
        isShow={smsNumber}
        onClose={() => {
          onEditSmsNumber(false);
        }}
      />
    </article>
  );
}
