/*
 * @Description: 记录
 */
import React from 'react';
import dayjs from 'dayjs';
import './Steps.less';

interface stepProps {
  Time: string;
  Value: string;
}
export interface StepsProps {
  stepData: stepProps[];
}

const DAY_DESC: string[] = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
];

export function Steps({ stepData }: StepsProps) {
  const item = (value: stepProps, index: number) => {
    const date = dayjs(Number(value.Time));

    const statusLabel: HashMap = {
      1: '有积水',
      2: '正常',
      3: '检测中',
      4: '未知',
    };

    return (
      <div className="step" key={index}>
        <div className="step-indicator">
          <div className="step-icon-dot"></div>
        </div>
        <div className="step-content">
          <div className="content-left">
            <div className="detail">
              <span className="time">{date.format('HH:mm')}</span>
              <span className="week">{DAY_DESC[date.day()]}</span>
            </div>
            <div className="date">{date.format('YYYY.MM.DD')}</div>
          </div>
          <div className="content-right">
            <div className="status">{statusLabel[Number(value.Value)]}</div>
            <div className="label">状态</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="steps">
      {stepData.length > 0
        && stepData.map((value, index) => item(value, index))}
    </div>
  );
}
