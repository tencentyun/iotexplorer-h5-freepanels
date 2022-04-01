import React, { useEffect, useRef } from 'react';
import { Switch } from '@custom/Switch';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { arrWeek } from '../AddTimer/Repeat';
import { SwipeAction } from '@custom/SwipeAction';

const ListTimer = ({
  labelEnum,
  renderLabel,
  defaultValue = {},
  className,
  context: { contextDefaultValue = {} },
  setContext,
  timer: { timers, TIMER_API, doTimer },
  history: { PATH, push }
}) => {
  const changeStatus = async (TimerId: string, Status: number) => {
    await doTimer(TIMER_API.UPDATE, { Status, TimerId });
  };
  const handleDeleteTimer = async (TimerId: string) => {
    await doTimer(TIMER_API.DELETE, { TimerId });
  };
  const renderDesc = (data: string) => {
    if (renderLabel) return renderLabel(data);
    if (!data) return '';
    let result = '';
    let dataObj = {};
    try {
      dataObj = JSON.parse(data) || {};
    } catch (e) {
      console.error(e);
    }
    Object.keys(dataObj).forEach((k) => {
      const value = labelEnum[k]?.value?.[dataObj[k]];
      if (value) result += `${labelEnum[k].label}: ${value} `;
    });
    return result;
  };
  const ref = useRef(null);

  // 确保每次打开的当前时间不一样
  const getDefaultValue = () => {
    const date = new Date();
    return {
      ...contextDefaultValue,
      ...defaultValue,
      Days: [0, 0, 0, 0, 0, 0, 0],
      TimePoint: `${date.getHours()}:${date.getMinutes()}`
    };
  };

  useEffect(() => {
    setContext({ contextDefaultValue: getDefaultValue() });
  }, []);

  return (
    <div className={`timer-cloud  ${className || ''}`}>
      <ul className="timer-cloud-list">
        {timers.map(({ Status, TimerId, TimePoint, Days, Data }) => (
          <li className={`timer-list-card  ${Status === 1 && 'open-status'}`} key={TimerId}>
            <SwipeAction
              ref={ref}
              closeOnAction={false}
              rightActions={[
                {
                  key: 'delete',
                  text: <span>删除</span>,
                  color: 'danger',
                  onClick: async () => {
                    const isDelete = await sdk.tips.confirm('要删除当前定时吗？');
                    if (isDelete) handleDeleteTimer(TimerId);
                    ref.current?.close();
                  }
                }
              ]}
            >
              <div className="timer-list-body">
                <span className="timer">{TimePoint}</span>
                <span className={`repeat ${Days.split('').filter((v) => 1 * v).length > 5 ? 'week-small' : ''}`}>
                  {Days.split('').map((item, index) => (item === '1' ? `${arrWeek[index]} ` : ''))}
                </span>
                <span className="switch">
                  <Switch
                    checked={Status === 1}
                    onChange={(isChecked: boolean) => {
                      changeStatus(TimerId, isChecked ? 1 : 0);
                    }}
                  />
                </span>
              </div>
              <div className="timer-list-desc">{renderDesc(Data)}</div>
            </SwipeAction>
          </li>
        ))}
      </ul>
      <button
        className="add-timer-btn"
        onClick={() => {
          setContext(getDefaultValue());
          console.log('默认值------------:', getDefaultValue());
          push(PATH.TIMER_ADD);
        }}
      >
        添加定时
      </button>
    </div>
  );
};

export default ListTimer;
