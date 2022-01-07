/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-31 10:40:22
 * @LastEditors:
 * @LastEditTime:
 */

import React, { FC, useState } from 'react';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import './style.less';
import { List, PickerView } from 'antd-mobile';
import Repeat from '@components/business/timerCloud/add-timer/repeat/repeat';
import { PickerValue } from 'antd-mobile/2x/es/components/picker-view';
import { ITimerDataBind } from '@components/business/timerCloud/timer-cloud';
import { ITimer } from '@components/business/timerCloud/list-timer/list-timer';

const AddTimer: FC<{
  isEdit?: boolean;
  timerEdit?: ITimer;
  onClose?: () => void;
  onConfirm?: () => void;
  visible?: boolean;
  dataBind: ITimerDataBind;
}> = ({ children, onClose, visible, dataBind }) => {
  // const [timerData, setTimerData] = useState(timerEdit);
  const [value, setValue] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [timer, setTimer] = useState<PickerValue[]>([]);
  const renderClock = (num: number) => {
    const arr: string[] = [];
    for (let i = 0; i < num; i++) {
      const iStr = i.toString();
      arr.push(iStr.length > 1 ? iStr : '0' + iStr);
    }
    return arr;
  };
  const handleSubmit = () => {
    const weekStr = value.join('');
    const weekNew = [...value];
    // 用户无选择重复周几时，默认当前系统时间的周几
    if (+weekStr === 0) {
      const currWeek = new Date().getDay();
      weekNew[currWeek] = 1;
    }

    const params = {
      DeviceName: sdk.deviceInfo.DeviceName,
      ProductId: sdk.deviceInfo.ProductId,
      Data: JSON.stringify(dataBind),
      Days: weekNew.join(''),
      TimePoint: timer.join(':'),
      TimerName: Date.now().toString(),
      Repeat: +weekStr ? 1 : 0 //是否需要循环  0:不需要 1 需要
    };
    sdk
      .requestTokenApi('AppCreateTimer', params)
      .then(() => {
        // 请求成功
        sdk.tips.showSuccess('定时添加成功');
        onClose && onClose();
      })
      .catch(() => {
        // 请求失败
        sdk.tips.showError('定时添加失败');
      });
  };

  return (
    <article
      className={classNames('AddTimer-wrap')}
      style={{ display: visible ? '' : 'none' }}
    >
      <div className={'timer-cloud-picker-header'}>{timer.join(':')}</div>
      <PickerView
        value={timer}
        defaultValue={['08', '01']}
        onChange={val => {
          setTimer(val);
        }}
        columns={[renderClock(24), renderClock(60)]}
        className={'timer-cloud-picker'}
      />
      <List>
        {children}
        {/*重复*/}
        <Repeat
          defaultArrWeekVal={value}
          onConfirm={arrWeekVal => {
            setValue(arrWeekVal);
          }}
        />
        {/*/!*备注*!/*/}
        {/*<Desc />*/}
      </List>
      <br />
      <div className={'timer-cloud-footer-bar'}>
        <div className={'button-wrap'}>
          <button onClick={onClose}>取消</button>
          <button onClick={handleSubmit}>保存</button>
        </div>
      </div>
    </article>
  );
};

//AddTimer.propTypes = {
//};

export default AddTimer;
