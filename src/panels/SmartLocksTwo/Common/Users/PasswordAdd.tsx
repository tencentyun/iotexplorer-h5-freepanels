/*
 * @Description: 用户添加密码，基础信息
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';
import { TimePicker } from '@custom/TimePicker';

const arrWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export function PasswordAdd({ deviceData, templateMap, doControlDeviceData, history: { PATH, push, query } }) {
  useTitle('用户编辑');
  const [userList, setUserList] = useState([
    { name: '我', type: '指纹1 密码1' },
    { name: '妈妈', type: '指纹2' },
    { name: '我', type: '指纹1 密码1' },
  ]);
  const [status, setStatus] = useState(true);
  const [week, setWeek] = useState(arrWeek.map((label, index) => index)); // 默认全选
  const [effectTime, setEffectTime] = useState(['00', '00']); // 生效时间
  const [effectTimeVisible, setEffectTimeVisible] = useState(false);
  const [effectivenessTime, setEffectivenessTime] = useState(['23', '59']); // 失效时间
  const [effectivenessTimeVisible, setEffectivenessTimeVisible] = useState(false);

  const synch_method = {
    fingerprint: 'fingerprint',
    password: 'password',
    card: 'card',
    face: 'face',
  };

  const toggleWeek = (key) => {
    setWeek(week.includes(key) ? week.filter(index => index !== key) : week.slice().concat(key));
  };

  return (
    <main className={classNames('user-password-add')}>
      {/* <Cell
        className="cell-settings"
        title="备注"
        value={'请输入指纹备注'}
        valueStyle="set"
        isLink={false}
      ></Cell> */}
      <Cell className="cell-settings" title="生效星期" isLink={false}>
        <ul className="week">
          {arrWeek.map((label, key) => (
            <li key={key} onClick={() => toggleWeek(key)} className={week.includes(key) ? 'checked' : ''}>
              {label}
            </li>
          ))}
        </ul>
      </Cell>
      <Cell
        className="cell-settings"
        title="生效时间"
        value={effectTime ? effectTime.join(':') : '请选择开始时间'}
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
          title="生效时间"
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
        className="cell-settings"
        title="失效时间"
        value={effectivenessTime ? effectivenessTime.join(':') : '请选择结束时间'}
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
          title="失效时间"
          onCancel={setEffectivenessTimeVisible.bind(null, false)}
          onConfirm={(val) => {
            setEffectivenessTime(val);
            setEffectivenessTimeVisible(false);
          }}
          confirmText="确认"
          visible={effectivenessTimeVisible}
        />
      </Cell>

      <footer className="footer">
        <div
          className="footer-button"
          onClick={() => {
            push(PATH.USERS_PSDRESULT, query);
          }}
        >
          下一步
        </div>
      </footer>
    </main>
  );
}
