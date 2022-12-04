import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { requestTokenApi } from '@src/hooks/useDevice';
import { List } from 'antd-mobile';
import { OptionDialog } from '@custom/OptionDialog';
import { TimePicker } from '@custom/TimePicker';
import { useTitle } from '@hooks/useTitle';

export const arrWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const AddTimer = ({
  children,
  isPopup = true,
  history: { PATH, goBack, push, query },
  setContext,
  context: { Days = [0, 0, 0, 0, 0, 0, 0], TimePoint = '00:00', ...timerData },
  timerHeight,
  isModuleTimer = false
}) => {

  console.log("接受到的高度", timerHeight);
  useTitle('添加定时');
  const [visible, setVisible] = useState(false);
  const [timerVisible, setTimerVisible] = useState(false);
  // 模态框记录
  const [timePoint, setTimePoint] = useState(TimePoint)

  // 设置显示滚动的个数 
  // 7 个 408
  const { isModule } = query || {}; // 是否为模态框弹出三级配置
  const timer = TimePoint.split(':');

  const getWeeks = (weeks: number[]) => {
    if (!weeks) return [];
    const res = [] as number[];
    for (let i = 0; i < weeks.length; i++) {
      if (weeks[i]) {
        res.push(i);
      }
    }
    return res;
  };

  const setWeeksFormat = (weeks: number[]) => {
    if (!weeks) return [];
    const res = [] as number[];
    for (let i = 0; i < 7; i++) {
      res[i] = weeks.includes(i) ? 1 : 0;
    }
    return res;
  };

  const handleSubmit = async (timer) => {
    const weekStr = Days.join('');
    const weekNew = [...Days];
    // 用户无选择重复周几时，默认当前系统时间的周几
    if (+weekStr === 0) {
      const currWeek = new Date().getDay();
      weekNew[currWeek] = 1;
    }
    // 清空无效报文
    const data = { ...timerData };
    delete data.contextDefaultValue;
    delete data.switchNum;
    const Timer = {
      Data: JSON.stringify(data),
      Days: weekNew.join(''),
      TimePoint: timer.map(v => ((`${v}`).length === 1 ? `0${v}` : v)).join(':'),
      TimerName: Date.now().toString(),
      Repeat: +weekStr ? 1 : 0,
    };
    await requestTokenApi('AppCreateTimer', Timer);
    sdk.tips.showSuccess('定时添加成功');
    setContext({}, false);
    goBack();
  };

  const checkedDays = Days.map((day, index) => (day ? arrWeek[index] : '')).filter(v => v);
  const checkedDaysLabel = checkedDays.length ? checkedDays.join(' ') : '仅限一次';

  const onClose = () => {
    goBack();
    setContext({}, false);
  };
  const weeks = getWeeks(Days);

  const onTimeDialogConfirm = (TimePoint) => {
    setTimerVisible(false)
    setContext({ TimePoint: TimePoint.join(':') })
  }


  return (
    <div className="cus-add-timer">
      <div className="time-picker-body">
        <div className="list-card-timer">
          <List>
            {children}
            <List.Item
              className={`week-repeat ${checkedDays.length > 5 ? 'week-small' : ''}`}
              prefix={'重复'}
              extra={checkedDaysLabel}
              onClick={() => {
                isModule ? setVisible(true) : push(PATH.TIMER_ACTION_REPEAT);
              }}
            />
            {
              isModuleTimer ?
                <List.Item
                  prefix={'时间'}
                  extra={TimePoint}
                  onClick={() => { setTimerVisible(true); }}
                /> : null
            }
          </List>
        </div>



        {isModuleTimer ?
          <button
            className="add-timer-btn-dialog gra-border"
            onClick={() => {
              handleSubmit(TimePoint.split(':'))
            }}
          >
            确定
          </button> :
          <>
            {isPopup ? (
              <TimePicker
                showSemicolon={true}
                value={timer}
                mask={false}
                onCancel={onClose}
                onChange={TimePoint => setContext({ TimePoint: TimePoint.join(':') })}
                onConfirm={handleSubmit}
                visible={true}
                showTwoDigit={true}
                isPopUp={false}
                itemHeight={58}
                // 留意后续的问题 编译后可能没有该变量 最好统一为一个高度目前都是三个高度
                // 单个主题没有问题 多个就有问题
                // height={isSevenCheck ? 408 : 175}
                height={timerHeight ? timerHeight : 175}
                confirmText="确认"
              />
            )
              : (<div className="pick-time-view">
                <div className="timer-cloud-picker-header">{timer.join(':')}</div>
                <TimePicker
                  value={timer}
                  onCancel={onClose}
                  showTwoDigit={true}
                  onConfirm={handleSubmit}
                  className="timer-cloud-picker"
                />
              </div>)
            }
          </>
        }
      </div>
      <OptionDialog
        title="重复"
        visible={visible}
        type="multiple"
        value={weeks}
        onCancel={() => setVisible(false)}
        onConfirm={(val) => {
          setContext('Days', setWeeksFormat(val));
        }}
        options={arrWeek.map((label, value) => ({ label, value }))}
      >
        <p className="week-repeat-desc">不勾选将默认只执行一次</p>
      </OptionDialog>


      <TimePicker
        showSemicolon={true}
        value={timer}
        mask={false}
        onCancel={() => {
          setTimerVisible(false)
        }}
        // onChange={TimePoint => setContext(TimePoint.join(':'))}
        onConfirm={onTimeDialogConfirm}
        // onChange={TimePoint => setContext({ TimePoint: TimePoint.join(':') })}
        // onConfirm={handleSubmit}
        visible={timerVisible}
        modalTitle="定时"
        showTwoDigit={true}
        isPopUp={false}
        isModal={true}
        itemHeight={58}
        // 留意后续的问题 编译后可能没有该变量 最好统一为一个高度目前都是三个高度
        // 单个主题没有问题 多个就有问题
        // height={isSevenCheck ? 408 : 175}
        height={timerHeight ? timerHeight : 175}
        confirmText="确认"
      />

      {/* 
      <TimePicker
        showSemicolon={true}
        value={TimePoint.split(':')}
        mask={false}
        onCancel={() => {
          setTimerVisible(false)
        }}
        onChange={TimePoint => setTimePoint(TimePoint.join(':'))}
        onConfirm={onTimeDialogConfirm}
        // onChange={TimePoint => setContext({ TimePoint: TimePoint.join(':') })}
        // onConfirm={handleSubmit}
        visible={timerVisible}
        modalTitle="定时"
        showTwoDigit={true}
        isPopUp={false}
        isModal={true}
        itemHeight={58}
        // 留意后续的问题 编译后可能没有该变量 最好统一为一个高度目前都是三个高度
        // 单个主题没有问题 多个就有问题
        // height={isSevenCheck ? 408 : 175}
        height={timerHeight ? timerHeight : 175}
        confirmText="确认"
      /> */}


    </div>
  );
};

export default AddTimer;
