import React, { useEffect, useRef, useState } from 'react';
import AddTimer from './AddTimer/AddTimer';
import ListTimer from './ListTimer/ListTimer';
import { useTitle } from '@hooks/useTitle';

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

export const TimerCloud = (props) => {
  console.log('定时器的参数:', props);
  const refList = useRef();
  const { children, dataBind, options, className } = props;
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isNewAdd, setIsNewAdd] = useState(Date.now());
  useTitle('定时');

  const handleClose = () => {
    setIsShowAdd(false);
    (refList.current as any).reload();
  };

  return (
    <div className={`timer-cloud  ${className || ''}`}>
      <ListTimer cRef={refList} dataBind={dataBind} options={options} />
      <AddTimer onClose={handleClose} visible={isShowAdd} dataBind={dataBind} key={isNewAdd}>
        {children}
      </AddTimer>
      <button
        style={{ display: isShowAdd ? 'none' : '' }}
        className="add-timer-btn"
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
