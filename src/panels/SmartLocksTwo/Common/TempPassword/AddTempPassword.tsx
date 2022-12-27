import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { copy } from '@utils';
import { Btn } from '@custom/Btn';
import { Cell } from '@custom/Cell';
import { Input } from '@custom/Input';
import { useTitle } from '@hooks/useTitle';
import { TimePicker } from '@custom/TimePicker';
import { DatePicker } from '@custom/DatePicker';
import { getDeviceOTP, getSign } from './model';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { tips } from '@src/libs/wxlib';

export const arrWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const PASSWORD_TYPE = {
  SINGLE: 0, // 单次
  CYCLE: 1, // 周期
};

// 随机生成num为数字
const randomCreatePassword = num => Math.floor(Math.random() * (10 ** num))
  .toString()
  .padStart(6, '0');

export function AddTempPassword({ history: { goBack } }) {
  useTitle('添加临时密码');
  // 周期与单次
  const [type, setType] = useState(PASSWORD_TYPE.SINGLE);
  // 单次密码
  const [singlePassword, setSinglePassword] = useState({ password: '', expired: '' });
  // 周期密码
  const [password, setPassword] = useState('');
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
    // 周期性密码由前端生成随机6位数，并加密后发给设备
    console.log('随机生成密码');
    setPassword(randomCreatePassword(6));
  };
  // 获取单次密码
  const getSinglePassword = () => {
    getDeviceOTP().then((res) => {
      setSinglePassword({
        password: res.password,
        expired: dayjs(1000 * (res.expired + 20 * 60) /* 有效期 20分钟 */).format('YYYY/MM/DD HH:mm'),
      });
    })
      .catch((err) => {
        console.log(err);
        window.h5PanelSdk.tips.showError(err.msg);
      });
  };

  // 保存周期密码
  const saveCyclePassword = async () => {
    try {
      const res = await getSign(password);
      const result = await sdk.callDeviceAction({
        take_effect_time: beginTime.join(':'),
        invalid_time: endTime.join(':'),
        check_code: res,
        week: repeat.join(''),
        take_effect_date: dayjs(beginDate).format('YYYY/MM/DD'),
        invalid_date: dayjs(endDate).format('YYYY/MM/DD'),
      }, 'add_cycle_password');
      if (result.OutputParams && JSON.parse(result.OutputParams).result === 1) {
        tips.showInfo('保存成功');
        goBack();
      } else {
        throw new Error('保存周期密码失败');
      }
      console.log('add password result', result);
    } catch (err) {
      console.error('保存周期密码', err);
      tips.showError('保存周期密码出错');
    }
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

  const onSubmit = () => {
    if (type === PASSWORD_TYPE.SINGLE) {
      if (singlePassword.password) {
        goBack();
      } else {
        getSinglePassword();
      }
    } else {
      saveCyclePassword();
    }
  };

  const toggleWeek = (key) => {
    setRepeat(repeat.includes(key) ? repeat.filter(index => index !== key) : repeat.slice().concat(key));
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
                    value={password}
                    readOnly
                    onChange={(val) => {
                      setPassword(val);
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
                onClick={() => toggleTimePanel('begin', true)}
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
                  value={endDate}
                  showUnit={true}
                  min={beginDate}
                  mask={false}
                  showTime={false}
                  title="结束日期"
                  itemHeight={58}
                  height={175}
                  showTwoDigit={true}
                  onConfirm={(endDate) => {
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
        ) : null}
        {!type && singlePassword?.password ? (
          <div className="exist-single-password">
            <div className="show-password">
              <div id="password">{singlePassword.password}</div>
              <span onClick={() => {
                copy('password');
                sdk.tips.showInfo('已复制');
              }}>复制</span>
            </div>
            <div className="password-tips">
              <p>有效期</p>
              <p>将于北京时间 {singlePassword.expired} 或使用过一次后自动失效</p>
            </div>
          </div>
        ) : null}
        {!type && !singlePassword?.password ? (
          <div className="tips">有效期为 20 分钟，失效前仅能使用一次</div>
        ) : null}
      </div>

      <div className="fix-bottom-btn">
        <Btn btnText={btnText} type="primary" onClick={onSubmit} />{' '}
      </div>
    </div>
  );
}
