import React from 'react';
import { Icon } from '@custom/Icon';

/**
 * 提示内容
 */
export function Notice({
  deviceData: { muffling },
  templateMap,
  doControlDeviceData,
  productInfo,
  history,
  deviceInfo,
  alarmType,
}) {
  // 使用物模型定义
  // let ALARM_ACTIVES = templateMap?.alarm_actives?.define?.mapping || {};

  // 固定写死 无模型对应缺少门铃
  const ALARM_ACTIVES = {
    0: '异常警报',
    1: '防盗报警',
    2: '燃气报警',
    3: '水浸报警',
    4: '烟雾报警',
    5: '紧急sos',
    6: '门铃声',
  };

  // 处理报警上报数据
  const alarm_actives = alarmType;
  // 是否显示 提示
  const isShow = void 0 != alarm_actives;
  if (!isShow) return null;

  const isDoor = alarm_actives == 6;
  const level = isDoor ? 'normal' : 'warn'; // 门铃生
  const message = isDoor ? '当前门铃响起>' : `当前${ALARM_ACTIVES[alarm_actives]}中 >`;
  const cls = `item ${level}`;

  return (
    <div className='notice'>
      <div className={cls}>
        <div className='front'>
          <div className='alarIcon'>
            <Icon className='custom-icon' name='notice'></Icon>
          </div>
          <div className='text'>
            {message}
          </div>
        </div>
        <div className='voice' onClick={() => doControlDeviceData('muffling', !muffling)}>
          <Icon className='custom-icon' name={muffling == '0' ? 'voice-close' : 'voice-open'}></Icon>
        </div>
      </div>
    </div>
  );
}
