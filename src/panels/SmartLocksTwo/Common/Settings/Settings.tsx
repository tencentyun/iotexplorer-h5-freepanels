/*
 * @Description: 设置
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Cell } from '@custom/Cell';
import { Switch } from '@custom/Switch';
import { OptionDialog } from '@custom/OptionDialog';
import { TimePicker } from '@custom/TimePicker';

interface OptionProps {
  label: string;
  value: string | number;
}

export function Settings({
  deviceData,
  templateMap,
  doControlDeviceData,
  history: { PATH, push },
}) {
  useTitle('设置');
  // 抓拍模式
  const [stayCaptureModeVisible, onToggleStayCaptureMode] = useState(false);
  // 逗留距离
  const [stayTriggerDistanceVisible, onToggleStayTriggerDistance] = useState(false);
  // 逗留保持时间
  const [stayHoldTimeVisible, onToggleStayHoldTime] = useState(false);
  // 多重验证
  const [unlockSwitchVisible, onToggleUnlockSwitch] = useState(false);
  // 门铃铃声
  const [doorbellSongVisible, onToggleDoorbellSong] = useState(false);
  // 导航音量
  const [beepVolumeVisible, onToggleBeepVolume] = useState(false);

  // 休眠时间/勿扰模式
  const [dormantTime, setDormantTime] = useState(false);
  // 休眠时间
  const [effectTime, setEffectTime] = useState(['00', '00']); // 开始时间
  const [effectTimeVisible, setEffectTimeVisible] = useState(false);
  const [effectivenessTime, setEffectivenessTime] = useState(['23', '59']); // 结束时间
  const [effectivenessTimeVisible, setEffectivenessTimeVisible] = useState(false);
  // 勿扰时间
  const [dormantStartTime, setDormantStartTime] = useState(['00', '00']); // 开始时间
  const [dormantStartTimeVisible, setDormantStartTimeVisible] = useState(false);
  const [dormantEndTime, setDormantEndTime] = useState(['23', '59']); // 结束时间
  const [dormantEndTimeVisible, setDormantEndTimeVisible] = useState(false);

  const getDesc = (key:string, type: string): string => {
    if (templateMap[key]) {
      const typeObj = templateMap[key];

      return typeObj.define.mapping[type];
    }
    return '';
  };

  const getOptions = (key:string) => {
    if (templateMap[key]) {
      if (templateMap[key].define.type === 'enum') {
        const options: OptionProps[] = [];
        Object.entries(templateMap[key].define.mapping).forEach(([index, value]) => {
          options.push({
            label: value,
            value: index,
          });
        });
        return (options || []).length > 0 ? options : [];
      }
    }
    return [
      { label: '没数据', value: '0' },
    ];
  };

  return (
    <main className={classNames('settings')}>
      <Cell
        className="cell-settings mb"
        title="摄像头设置"
        isLink={true}
        onClick={() => {
          push(PATH.SETTINGS_CAMERA);
        }}
      ></Cell>
      <Cell
        className={classNames('cell-settings', { 'no-border': deviceData.stay_alarm_mode === 1 })}
        title="逗留侦测"
        isLink={false}
        value={
          <Switch
            checked={deviceData.stay_alarm_mode === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('stay_alarm_mode', Number(value));
            }}
          />
        }
      >
      </Cell>
      {deviceData.stay_alarm_mode === 1
        ? <div className="cell-settings-secondary-wrap mb">
          <Cell
            className="cell-settings-secondary"
            title="抓拍模式"
            value={getDesc('stay_capture_mode', deviceData.stay_capture_mode ? deviceData.stay_capture_mode : 2)}
            valueStyle="set"
            onClick={() => {
              onToggleStayCaptureMode(true);
            }}
          >
            <OptionDialog
              visible={stayCaptureModeVisible}
              title="抓拍模式"
              defaultValue={[deviceData.stay_capture_mode ? deviceData.stay_capture_mode?.toString() : '2']}
              options={getOptions('stay_capture_mode')}
              onCancel={() => {
                onToggleStayCaptureMode(false);
              }}
              onConfirm={(value) => {
                doControlDeviceData('stay_capture_mode', value[0]);
              }}
            ></OptionDialog>
          </Cell>
          <Cell
            className="cell-settings-secondary"
            title="逗留距离"
            value={getDesc('stay_trigger_distance', deviceData.stay_trigger_distance ? deviceData.stay_trigger_distance : 2)}
            valueStyle="set"
            onClick={() => {
              onToggleStayTriggerDistance(true);
            }}
          >
            <OptionDialog
              visible={stayTriggerDistanceVisible}
              title="逗留距离"
              defaultValue={[deviceData.stay_trigger_distance ? deviceData.stay_trigger_distance?.toString() : '2']}
              options={getOptions('stay_trigger_distance')}
              onCancel={() => {
                onToggleStayTriggerDistance(false);
              }}
              onConfirm={(value) => {
                doControlDeviceData('stay_trigger_distance', value[0]);
              }}
            ></OptionDialog>
          </Cell>
          <Cell
            className="cell-settings-secondary"
            title="逗留保持时间"
            value={`${deviceData.stay_hold_time || '10'}秒`}
            valueStyle="set"
            onClick={() => {
              onToggleStayHoldTime(true);
            }}
          >
            <OptionDialog
              visible={stayHoldTimeVisible}
              title="逗留保持时间"
              defaultValue={[deviceData.stay_hold_time ? deviceData.stay_hold_time : 10]}
              options={[{ label: '5秒', value: 5 }, { label: '10秒', value: 10 }, { label: '15秒', value: 15 }, { label: '20秒', value: 20 }]}
              onCancel={() => {
                onToggleStayHoldTime(false);
              }}
              onConfirm={(value) => {
                doControlDeviceData('stay_hold_time', value[0]);
              }}
            ></OptionDialog>
          </Cell>
          <Cell
            className="cell-settings-secondary no-border"
            title="报警信息推送"
            isLink={false}
            value={
              <Switch
                checked={deviceData.detect_message === 1}
                onChange={(value: boolean) => {
                  doControlDeviceData('detect_message', Number(value));
                }}
              />
            }
          ></Cell>
        </div> : null
      }
      <Cell
        className="cell-settings-high mb"
        title="门铃可视对讲"
        subTitle={'开启后，微信将接收到门铃可视呼叫'}
        isLink={false}
        value={
          <Switch
            checked={deviceData.doorbell === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('doorbell', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings mb"
        title="录像设置"
        isLink={true}
        onClick={() => {
          push(PATH.SETTINGS_VIDEO);
        }}
      ></Cell>
      <Cell
        className={classNames('cell-settings-high', { 'no-border': deviceData.dormant_switch === 1 })}
        title="休眠设置"
        subTitle={'开启后，门锁在休眠时间段内多数功能不可使用'}
        isLink={false}
        value={
          <Switch
            checked={deviceData.dormant_switch === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('dormant_switch', Number(value));
            }}
          />
        }
      >
      </Cell>
      {deviceData.dormant_switch === 1 ? <div className="cell-settings-secondary-wrap mb">
        <Cell
          className="cell-settings-secondary"
          title="开始时间"
          value={deviceData.dormant_time_set ? deviceData.dormant_time_set.start_time : effectTime.join(':')}
          valueStyle="set"
          onClick={() => {
            setEffectTimeVisible(true);
          }}
        >
          <TimePicker
            showSemicolon={false}
            value={effectTime}
            showUnit={true}
            mask={false}
            showTime={false}
            itemHeight={58}
            height={175}
            showTwoDigit={true}
            title="开始时间"
            onCancel={setEffectTimeVisible.bind(null, false)}
            onConfirm={(val) => {
              setEffectTime(val);
              setEffectTimeVisible(false);
            }}
            confirmText="确认"
            visible={effectTimeVisible}
          />
        </Cell>
        <Cell
          className="cell-settings-secondary no-border"
          title="结束时间"
          value={deviceData.dormant_time_set ? deviceData.dormant_time_set.end_time : effectivenessTime.join(':')}
          valueStyle="set"
          onClick={() => {
            setEffectivenessTimeVisible(true);
          }}
        >
          <TimePicker
            showSemicolon={false}
            value={effectivenessTime}
            showUnit={true}
            mask={false}
            showTime={false}
            itemHeight={58}
            height={175}
            showTwoDigit={true}
            title="结束时间"
            onCancel={setEffectivenessTimeVisible.bind(null, false)}
            onConfirm={(val) => {
              setEffectivenessTime(val);
              setEffectivenessTimeVisible(false);
            }}
            confirmText="确认"
            visible={effectivenessTimeVisible}
          />
        </Cell>
      </div> : null}
      <Cell
        className="cell-settings mb"
        title="多重验证"
        value={getDesc('unlock_switch', deviceData.unlock_switch ? deviceData.unlock_switch : 0)}
        valueStyle="set"
        onClick={() => {
          onToggleUnlockSwitch(true);
        }}
      >
        <OptionDialog
          visible={unlockSwitchVisible}
          title="多重验证"
          defaultValue={[deviceData.unlock_switch ? deviceData.unlock_switch?.toString() : '0']}
          options={getOptions('unlock_switch')}
          onCancel={() => {
            onToggleUnlockSwitch(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('unlock_switch', value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings-high mb"
        title="离家布防"
        subTitle={'开启后，从内面板开门将触发报警提醒'}
        isLink={false}
        value={
          <Switch
            checked={deviceData.arming_switch === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('arming_switch', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="门铃铃声"
        value={getDesc('doorbell_song', deviceData.doorbell_song ? deviceData.doorbell_song : 0)}
        valueStyle="set"
        onClick={() => {
          onToggleDoorbellSong(true);
        }}
      >
        <OptionDialog
          visible={doorbellSongVisible}
          title="门铃铃声"
          defaultValue={[deviceData.doorbell_song ? deviceData.doorbell_song?.toString() : '0']}
          options={getOptions('doorbell_song')}
          onCancel={() => {
            onToggleDoorbellSong(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('doorbell_song', value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings mb"
        title="导航音量"
        value={getDesc('beep_volume', deviceData.beep_volume ? deviceData.beep_volume : 2)}
        valueStyle="set"
        onClick={() => {
          onToggleBeepVolume(true);
        }}
      >
        <OptionDialog
          visible={beepVolumeVisible}
          title="导航音量"
          defaultValue={[deviceData.beep_volume ? deviceData.beep_volume?.toString() : '2']}
          options={getOptions('beep_volume')}
          onCancel={() => {
            onToggleBeepVolume(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('beep_volume', value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className={classNames('cell-settings-high', { 'no-border': dormantTime })}
        title="勿扰模式"
        subTitle={'开启后，可是门锁在特定时间内处理静音模式'}
        size="medium"
        isLink={false}
        value={
          <Switch
            checked={dormantTime}
            onChange={(value: boolean) => {
              setDormantTime(value);
            }}
          />
        }
      >
      </Cell>
      {dormantTime ? <div className="cell-settings-secondary-wrap mb">
        <Cell
          className="cell-settings-secondary"
          title="开始时间"
          value={dormantStartTime ? dormantStartTime.join(':') : ''}
          valueStyle="set"
          onClick={() => {
            setDormantStartTimeVisible(true);
          }}
        >
          <TimePicker
            showSemicolon={false}
            value={dormantStartTime}
            showUnit={true}
            mask={false}
            showTime={false}
            itemHeight={58}
            height={175}
            showTwoDigit={true}
            title="开始时间"
            onCancel={setDormantStartTimeVisible.bind(null, false)}
            onConfirm={(val) => {
              setDormantStartTime(val);
              setDormantStartTimeVisible(false);
            }}
            confirmText="确认"
            visible={dormantStartTimeVisible}
          />
        </Cell>
        <Cell
          className="cell-settings-secondary no-border"
          title="结束时间"
          value={dormantEndTime ? dormantEndTime.join(':') : ''}
          valueStyle="set"
          onClick={() => {
            setDormantEndTimeVisible(true);
          }}
        >
          <TimePicker
            showSemicolon={false}
            value={dormantEndTime}
            showUnit={true}
            mask={false}
            showTime={false}
            itemHeight={58}
            height={175}
            showTwoDigit={true}
            title="结束时间"
            onCancel={setDormantEndTimeVisible.bind(null, false)}
            onConfirm={(val) => {
              setDormantEndTime(val);
              setDormantEndTimeVisible(false);
            }}
            confirmText="确认"
            visible={dormantEndTimeVisible}
          />
        </Cell>
      </div> : null }

      <Cell
        className="cell-settings"
        title="门锁电池电量"
        value={deviceData.battery_percentage || '0%'}
        valueStyle="set"
        isLink={false}
      ></Cell>
      <Cell
        className="cell-settings"
        title="摄像头电池电量"
        value={deviceData.ipc_battery_percentage || '0%'}
        valueStyle="set"
        isLink={false}
      ></Cell>
    </main>
  );
}
