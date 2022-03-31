import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { copy } from '@utils';
import { Btn } from '@custom/Btn';
import { Cell } from '@custom/Cell';
import { Input } from '@custom/Input';
import { useTitle } from '@hooks/useTitle';
import { TimePicker } from '@custom/TimePicker';
import { DatePicker } from '@custom/DatePicker';

export const arrWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const PASSWORD_TYPE = {
  SINGLE: 0, // 单次
  CYCLE: 1 // 周期
};

const data = [
  {
    type: 0,
    loseTime: 1648145585399, // 失效时间
    isLose: true
  },
  {
    type: 1,
    loseTime: 1648145585399, // 失效时间
    isLose: false
  }
];

// 随机生成num为数字
const randomCreatePassword = (num) => {
  return Math.floor(Math.random() * Math.pow(10, num));
};

export function AddTempPassword({ history: { goBack } }) {
  useTitle('添加临时密码');
  // 周期与单次
  const [type, setType] = useState(PASSWORD_TYPE.SINGLE);
  // 单次密码
  const [singlePassword, setSinglePassword] = useState({ password: '', time: '' });
  // 周期密码
  const [password, setPassword] = useState({ password: '', time: '' });
  // 有效日期
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [beginVisible, setBeginVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  // 重复
  const [repeat, setRepeat] = useState([0, 1, 2, 3, 4, 5, 6]);
  // 有效时段
  const [beginTime, setBeginTime] = useState(['00', '00']);
  const [endTime, setEndTime] = useState(['23', '59']);
  const [beginTimeVisible, setBeginTimeVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);

  useEffect(() => {
    onRandomGenerator();
  }, []);

  // 点击随机生成
  const onRandomGenerator = () => {
    let params = {}; // 从上面获取对应参数
    // TODO
    console.log('随机生成密码');
    setPassword({ password: randomCreatePassword(6) });
  };
  // 获取单次密码
  const getSinglePassword = () => {
    // TODO
    setSinglePassword({
      password: '372940',
      time: +new Date()
    });
  };

  // 保存周期密码
  const saveCyclePassword = () => {
    // TODO
  };

  const onSubmit = () => {
    if (type === PASSWORD_TYPE.SINGLE) {
      if (singlePassword.password) {
        goBack();
      } else {
        getSinglePassword();
      }
    } else {
      saveCyclePassword();
      goBack();
    }
  };

  const toggleWeek = (key) => {
    setRepeat(repeat.includes(key) ? repeat.filter((index) => index !== key) : repeat.slice().concat(key));
  };

  let btnText = singlePassword.password ? '完成' : '获取密码';
  if (type) {
    btnText = '保存';
  }

  return (
    <div className="add-temp-password">
      <div className="choice-type">
        <span>类型</span>
        <div>
          <Btn btnText="单次" type={type ? 'sub' : 'primary'} size="small" onClick={() => setType(0)} />
          <Btn btnText="周期" type={type ? 'primary' : 'sub'} size="small" onClick={() => setType(1)} />
        </div>
      </div>

      <div className="content">
        {type ? (
          <div>
            <div className="exist-single-password">
              <div className="show-password">
                <div>
                  <Input
                    value={password.password}
                    onChange={(val) => {
                      setPassword({ ...password, password: val });
                    }}
                  />
                </div>
                <span onClick={onRandomGenerator}>随机生成</span>
              </div>
            </div>
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
                onClick={() => setBeginVisible(true)}
              >
                <DatePicker
                  visible={beginVisible}
                  showSemicolon={false}
                  value={beginDate}
                  showUnit={true}
                  mask={false}
                  showTime={false}
                  itemHeight={58}
                  height={175}
                  showTwoDigit={true}
                  title="开始日期"
                  onConfirm={(beginDate) => {
                    setBeginDate(beginDate);
                    setBeginVisible(false);
                  }}
                  onCancel={setBeginVisible.bind(null, false)}
                />
              </Cell>

              <Cell
                className="cell-settings-secondary"
                title="结束日期"
                value={endDate ? dayjs(endDate).format('YYYY-MM-DD') : ''}
                valueStyle="set"
                onClick={() => setEndVisible(true)}
              >
                <DatePicker
                  visible={endVisible}
                  showSemicolon={false}
                  value={endDate}
                  showUnit={true}
                  mask={false}
                  showTime={false}
                  title="结束日期"
                  itemHeight={58}
                  height={175}
                  showTwoDigit={true}
                  onConfirm={(endDate) => {
                    setEndDate(endDate);
                    setEndVisible(false);
                  }}
                  onCancel={setEndVisible.bind(null, false)}
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
                onClick={() => setBeginTimeVisible(true)}
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
                  onCancel={() => setBeginTimeVisible(false)}
                  onConfirm={(val) => {
                    setBeginTime(val);
                    setBeginTimeVisible(false);
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
                onClick={() => setEndTimeVisible(true)}
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
                  onCancel={() => setEndTimeVisible(false)}
                  onConfirm={(val) => {
                    setEndTime(val);
                    setEndTimeVisible(false);
                  }}
                  confirmText="确认"
                  visible={endTimeVisible}
                />
              </Cell>
            </Cell>
            <Cell title="重复" className="cell-settings" size="medium" isLink={false}>
              <ul className="week">
                {arrWeek.map((label, key) => (
                  <li key={key} onClick={() => toggleWeek(key)} className={repeat.includes(key) ? 'checked' : ''}>
                    {label}
                  </li>
                ))}
              </ul>
            </Cell>
          </div>
        ) : singlePassword?.password ? (
          <div className="exist-single-password">
            <div className="show-password">
              <div id="password">{singlePassword.password}</div>
              <span onClick={copy.bind(null, 'password')}>复制</span>
            </div>
            <div className="password-tips">
              <p>有效期</p>
              <p>将于北京时间{dayjs(singlePassword.time).format('YYYY/MM/DD HH:  mm')}或使用过一次后自动失效</p>
            </div>
          </div>
        ) : (
          <div className="tips">有效期为20分钟，失效前仅能使用一次</div>
        )}
      </div>

      <div className="fix-bottom-btn">
        <Btn btnText={btnText} type="primary" onClick={onSubmit} />{' '}
      </div>
    </div>
  );
}
