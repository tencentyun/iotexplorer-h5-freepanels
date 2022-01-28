import React, { FC, useEffect, useRef, useState } from 'react';
import './timer-cloud.less';
import AddTimer from './add-timer/add-timer';
import ListTimer from './list-timer/list-timer';
export interface ITimerDataBind {
  [key: string]: string | number;
}
export interface ITimerOptions {
  [key: string]: {
    label: string;
    value_enum?:
      | {
          [key: string]: string;
        }
      | string[]
      | any;
  };
}
export interface ITimerCloud {
  children: React.ComponentProps<any>;
  dataBind: ITimerDataBind;
  options: ITimerOptions;
}

const TimerCloud: FC<ITimerCloud> = props => {
  const oldTitle = document.title;
  window.document.title = '定时';
  const refList = useRef();
  const { children, dataBind, options } = props;
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isNewAdd, setIsNewAdd] = useState(Date.now());

  const handleClose = () => {
    setIsShowAdd(false);
    // 通知list刷新
    (refList.current as any).reload();
  };

  // const handleEdit = (timer: ITimer) => {
  //   setIsEdit(true);
  //   setTimerEdit(timer);
  //   setIsShowAdd(true);
  // };

  useEffect(() => {
    return () => {
      window.document.title = oldTitle;
    };
  });

  return (
    <div className="timer-cloud">
      <ListTimer cRef={refList} dataBind={dataBind} options={options} />
      <AddTimer
        onClose={handleClose}
        visible={isShowAdd}
        dataBind={dataBind}
        key={isNewAdd}
      >
        {children}
      </AddTimer>
      <button
        style={{ display: isShowAdd ? 'none' : '' }}
        className="btn-add-timer-cloud"
        onClick={() => {
          setIsNewAdd(Date.now());
          setIsShowAdd(true);
        }}
      >
        添加定时
      </button>
    </div>
  );
};

export default TimerCloud;
