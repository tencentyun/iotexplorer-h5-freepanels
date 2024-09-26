import React, { useEffect, useRef } from 'react';
import { Switch } from '@custom/Switch';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { arrWeek } from '../AddTimer/Repeat';
import { SwipeAction } from '@custom/SwipeAction';
import { useTitle } from '@hooks/useTitle';
import { t } from '@locales';
const ListTimer = ({
  labelEnum,
  renderLabel,
  defaultValue = {},
  className,
  context: { contextDefaultValue = {} },
  setContext,
  timer: { timers, TIMER_API, doTimer },
  history: { PATH, push, query },
}) => {
  useTitle(t('添加定时'));
  const changeStatus = async (TimerId: string, Status: number) => {
    await doTimer(TIMER_API.UPDATE, { Status, TimerId });
  };
  const handleDeleteTimer = async (TimerId: string) => {
    await doTimer(TIMER_API.DELETE, { TimerId });
  };
  const renderDesc = (data: string) => {
    if (!data) return '';
    let result = '';
    let dataObj = {};
    try {
      dataObj = JSON.parse(data) || {};
    } catch (e) {
      console.error(e);
    }
    if (renderLabel) return renderLabel(dataObj);
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
    let min = '' + date.getMinutes();
    return {
      ...contextDefaultValue,
      ...defaultValue,
      Days: [0, 0, 0, 0, 0, 0, 0],
      TimePoint: `${date.getHours()}:${min.length == 1 ? '0' + min : min}`,
    };
  };

  useEffect(() => {
    setContext({ contextDefaultValue: getDefaultValue() });
  }, []);

  return (
    <div className={`timer-cloud  ${className || ''}`}>
      <ul className="timer-cloud-list">
        {timers.map(({ Status, TimerId, TimePoint, Days, Data }, i) => (
          <li className={`timer-list-card gra-border  ${Status === 1 && 'open-status'}`} key={i}>
            <SwipeAction
              ref={ref}
              closeOnAction={false}
              rightActions={[
                {
                  key: 'delete',
                  text: <span>{t('删除')}</span>,
                  color: 'danger',
                  onClick: async () => {
                    const isDelete = await sdk.tips.confirm(t('要删除当前定时吗？'));
                    if (isDelete) handleDeleteTimer(TimerId);
                    ref.current?.close();
                  },
                },
              ]}
            >
              <div className="timer-list-body" key={i}>
                <span className="timer">{TimePoint}</span>
                <span className={`repeat ${Days.split('').filter(v => 1 * v).length > 5 ? 'week-small' : ''}`}>
                  {Days.split('').map((item, index) => (item === '1' ? <span key={index}>{`${arrWeek[index]} `}</span> : ''))}
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
        className="add-timer-btn gra-border"
        onClick={() => {
          setContext(getDefaultValue());

          push(PATH.TIMER_ADD, query);
        }}
      >
        +{t('添加定时')}
      </button>
    </div>
  );
};

export default ListTimer;
