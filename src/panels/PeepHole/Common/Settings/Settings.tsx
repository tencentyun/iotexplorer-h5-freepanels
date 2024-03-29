/*
 * @Description: 设置
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Cell } from '@custom/Cell';
import { Switch } from '@custom/Switch';
import { OptionDialog } from '@custom/OptionDialog';
import { TimePicker } from '@custom/TimePicker';
import { getTimeArr, isPeepHole } from '../utils';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
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
  console.log(process.env.CATEGORY);

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
  // 音量
  const [beepVolumeVisible, onToggleBeepVolume] = useState(false);

  // 勿扰时间
  const [noDisturbStartTime, setNoDisturbStartTime] = useState(getTimeArr(deviceData.no_disturb_time_set?.start_time) || ['00', '00']); // 开始时间
  const [dormantStartTimeVisible, setDormantStartTimeVisible] = useState(false);
  const [noDisturbEndTime, setNoDisturbEndTime] = useState(getTimeArr(deviceData.no_disturb_time_set?.end_time) || ['23', '59']); // 结束时间
  const [dormantEndTimeVisible, setDormantEndTimeVisible] = useState(false);

  // 设置勿扰时间
  useEffect(() => {
    doControlDeviceData('no_disturb_time_set', {
      start_time: noDisturbStartTime.join(':'),
      end_time: noDisturbEndTime.join(':'),
    });
  }, [noDisturbStartTime, noDisturbEndTime]);

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
            label: String(value),
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
        className="cell-settings"
        title="设备详情"
        isLink={true}
        onClick={() => {
          sdk.goDeviceDetailPage();
        }}
      ></Cell>
      {isPeepHole && <Cell
        className="cell-settings"
        title="摄像头设置"
        isLink={true}
        onClick={() => {
          push(PATH.SETTINGS_CAMERA);
        }}
      />
      }
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
        ? <div className="cell-settings-secondary-wrap">
          {isPeepHole && <Cell
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
                doControlDeviceData('stay_capture_mode', Number(value[0]));
              }}
            />
          </Cell>
          }
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
        className="cell-settings"
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
            doControlDeviceData('unlock_switch', +value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings-high"
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
        value={getDesc('doorbell_song', deviceData.doorbell_song  !== undefined ? deviceData.doorbell_song : 0)}
        valueStyle="set"
        onClick={() => {
          onToggleDoorbellSong(true);
        }}
      >
        <OptionDialog
          visible={doorbellSongVisible}
          title="门铃铃声"
          defaultValue={[deviceData.doorbell_song !== undefined ? deviceData.doorbell_song?.toString() : '0']}
          options={getOptions('doorbell_song')}
          onCancel={() => {
            onToggleDoorbellSong(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('doorbell_song', Number(value[0]));
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings"
        title="音量"
        value={getDesc('volume', deviceData.volume !== undefined ? deviceData.volume : 2)}
        valueStyle="set"
        onClick={() => {
          onToggleBeepVolume(true);
        }}
      >
        <OptionDialog
          visible={beepVolumeVisible}
          title="音量"
          defaultValue={[deviceData.volume !== undefined ? deviceData.volume?.toString() : '2']}
          options={getOptions('volume')}
          onCancel={() => {
            onToggleBeepVolume(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('volume', Number(value[0]));
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className={classNames('cell-settings-high', { 'no-border': deviceData.no_disturb_switch })}
        title="勿扰模式"
        subTitle={'开启后，门锁在特定时间内处理静音模式'}
        size="medium"
        isLink={false}
        value={
          <Switch
            checked={deviceData.no_disturb_switch}
            onChange={(value: boolean) => {
              doControlDeviceData('no_disturb_switch', Number(value));
            }}
          />
        }
      >
      </Cell>
      {deviceData.no_disturb_switch ? <div className="cell-settings-secondary-wrap mb">
        <Cell
          className="cell-settings-secondary"
          title="开始时间"
          value={noDisturbStartTime ? noDisturbStartTime.join(':') : ''}
          valueStyle="set"
          onClick={() => {
            setDormantStartTimeVisible(true);
          }}
        >
          <TimePicker
            showSemicolon={false}
            value={noDisturbStartTime}
            showUnit={true}
            mask={false}
            showTime={false}
            itemHeight={58}
            height={175}
            showTwoDigit={true}
            title="开始时间"
            onCancel={setDormantStartTimeVisible.bind(null, false)}
            onConfirm={(val) => {
              setNoDisturbStartTime(val);
              setDormantStartTimeVisible(false);
            }}
            confirmText="确认"
            visible={dormantStartTimeVisible}
          />
        </Cell>
        <Cell
          className="cell-settings-secondary no-border"
          title="结束时间"
          value={noDisturbEndTime ? noDisturbEndTime.join(':') : ''}
          valueStyle="set"
          onClick={() => {
            setDormantEndTimeVisible(true);
          }}
        >
          <TimePicker
            showSemicolon={false}
            value={noDisturbEndTime}
            showUnit={true}
            mask={false}
            showTime={false}
            itemHeight={58}
            height={175}
            showTwoDigit={true}
            title="结束时间"
            onCancel={setDormantEndTimeVisible.bind(null, false)}
            onConfirm={(val) => {
              setNoDisturbEndTime(val);
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
        value={`${deviceData.battery_percentage || 0}%`}
        valueStyle="set"
        isLink={false}
      ></Cell>
    </main>
  );
}
