/*
 * @Description: 用户添加密码，基础信息
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Btn } from '@custom/Btn';
import { Cell } from '@custom/Cell';
import { TimePicker } from '@custom/TimePicker';
import { DatePicker } from '@custom/DatePicker';
import { useUser } from './hooks/useUser';
import dayjs from 'dayjs';
import { getTimeArr } from '../utils';
import { tips } from '@src/libs/wxlib';

const arrWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

export function PasswordAdd({ history: { PATH, goBack, query } }) {
  useTitle('生效时间编辑');
  const [{ userInfo }, { editUser }] = useUser({ id: query.userid });

  // 永久/自定义
  const [type, setType] = useState<0|1>(userInfo.effectiveTime?.type || 0);
  // 有效日期
  const [beginDate, setBeginDate] = useState(new Date(userInfo.effectiveTime?.beginDate || Date.now()));
  const [endDate, setEndDate] = useState(new Date(userInfo.effectiveTime?.endDate || Date.now()));
  const [beginVisible, setBeginVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  // 有效时段
  const [beginTime, setBeginTime] = useState(getTimeArr(userInfo.effectiveTime?.beginTime) || ['00', '00']);
  const [endTime, setEndTime] = useState(getTimeArr(userInfo.effectiveTime?.endTime) || ['23', '59']);
  const [beginTimeVisible, setBeginTimeVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);

  const [week, setWeek] = useState(userInfo.effectiveTime?.week || arrWeek.map((label, index) => index)); // 默认全选

  const toggleWeek = (key) => {
    setWeek(week.includes(key) ? week.filter(index => index !== key) : week.slice().concat(key));
  };
  // 弹出面板只能留存一个
  const toggleTimePanel = (type: string, isVisible: boolean) => {
    const list = ['begin', 'end', 'beginTime', 'endTime'];
    if (type === 'begin' && beginVisible !== isVisible) {
      setBeginVisible(isVisible);
    }
    if (type === 'end'  && endVisible !== isVisible) {
      setEndVisible(isVisible);
    }
    if (type === 'beginTime'  && beginTimeVisible !== isVisible) {
      setBeginTimeVisible(isVisible);
    }
    if (type === 'endTime'  && endTimeVisible !== isVisible) {
      setEndTimeVisible(isVisible);
    }
    // 开启一个需要关闭其他面板
    if (isVisible) {
      list.filter(item => item !== type).forEach((idType) => {
        toggleTimePanel(idType, false);
      });
    }
  };

  const changeEffectiveTime = async () => {
    try {
      await editUser({
        userid: userInfo.userid,
        name: userInfo.name,
        effectiveTime: JSON.stringify({
          type,
          beginDate: dayjs(beginDate).format('YYYY/MM/DD'),
          endDate: dayjs(endDate).format('YYYY/MM/DD'),
          beginTime: beginTime.join(':'),
          endTime: endTime.join(':'),
          week,
        }),
      });
    } catch (err) {
      tips.showError('修改失败');
      console.error('修改生效周期失败', err);
    }
  };

  return (
    <main className={classNames('user-password-add')}>
      <div className="choice-type">
        <span>生效时间</span>
        <div>
          <Btn btnText="永久" type={type !== 0 ? 'sub' : 'primary'} size="small" onClick={() => setType(0)} />
          <Btn btnText="自定义" type={type !== 0 ? 'primary' : 'sub'} size="small" onClick={() => setType(1)} />
        </div>
      </div>
      {type !== 0 ? <>
        <Cell
          title="有效日期"
          className="cell-settings cell-nest"
          isLink={false}
          // value={`${dayjs(beginDate).format('YYYY-MM-DD')}-${dayjs(endDate).format('YYYY-MM-DD')}`}
        >
          <Cell
            className="cell-settings-secondary"
            title="开始日期"
            value={beginDate ? dayjs(beginDate).format('YYYY-MM-DD') : ''}
            valueStyle="set"
            onClick={() => toggleTimePanel('begin', true)}
          >
            <DatePicker
              visible={beginVisible}
              showSemicolon={false}
              value={beginDate}
              showUnit={true}
              max={new Date()}
              mask={false}
              showTime={false}
              itemHeight={58}
              height={175}
              showTwoDigit={true}
              title="开始日期"
              onConfirm={(beginDate) => {
                setBeginDate(beginDate);
                toggleTimePanel('begin', false);
              }}
              onCancel={() => toggleTimePanel('begin', false)}
            />
          </Cell>

          <Cell
            className="cell-settings-secondary"
            title="结束日期"
            value={endDate ? dayjs(endDate).format('YYYY-MM-DD') : ''}
            valueStyle="set"
            onClick={() => toggleTimePanel('end', true)}
          >
            <DatePicker
              visible={endVisible}
              showSemicolon={false}
              min={beginDate}
              value={endDate}
              showUnit={true}
              mask={false}
              showTime={false}
              title="结束日期"
              itemHeight={58}
              height={175}
              showTwoDigit={true}
              onConfirm={(endDate) => {
                if (endDate < beginDate) {
                  tips.showError('结束时间不得小于开始时间');
                  return;
                }
                setEndDate(endDate);
                toggleTimePanel('end', false);
              }}
              onCancel={() => toggleTimePanel('end', false)}
            />
          </Cell>
        </Cell>
        <Cell
          title="有效时段"
          className="cell-settings  cell-nest"
          size="medium"
          isLink={false}
          // value={[beginTime.join(':'), endTime.join(':')].join('-')}
        >
          <Cell
            className="cell-settings-secondary"
            title="开始时间"
            value={beginTime.join(':')}
            valueStyle="set"
            onClick={() => toggleTimePanel('beginTime', true)}
          >
            <TimePicker
              showSemicolon={false}
              value={beginTime}
              showUnit={true}
              mask={false}
              showTime={false}
              itemHeight={58}
              height={175}
              showTwoDigit={true}
              title="开始时间"
              onCancel={() => toggleTimePanel('beginTime', false)}
              onConfirm={(val) => {
                setBeginTime(val);
                toggleTimePanel('beginTime', false);
              }}
              confirmText="确认"
              visible={beginTimeVisible}
            />
          </Cell>

          <Cell
            className="cell-settings-secondary"
            title="结束时间"
            value={endTime.join(':')}
            valueStyle="set"
            onClick={() => toggleTimePanel('endTime', true)}
          >
            <TimePicker
              showSemicolon={false}
              value={endTime}
              showUnit={true}
              mask={false}
              showTime={false}
              itemHeight={58}
              height={175}
              showTwoDigit={true}
              title="结束时间"
              onCancel={() => toggleTimePanel('endTime', false)}
              onConfirm={(val) => {
                setEndTime(val);
                toggleTimePanel('endTime', false);
              }}
              confirmText="确认"
              visible={endTimeVisible}
            />
          </Cell>
        </Cell>
        <Cell className="cell-settings" title="生效星期" isLink={false}>
          <ul className="week">
            {arrWeek.map((label, key) => (
              <li key={key} onClick={() => toggleWeek(key)} className={week.includes(key) ? 'checked' : ''}>
                {label}
              </li>
            ))}
          </ul>
        </Cell>
      </> : null}
      <footer className="footer">
        <div
          className="footer-button"
          onClick={async () => {
            await changeEffectiveTime();
            goBack();
          }}
        >
          确定
        </div>
      </footer>
    </main>
  );
}
