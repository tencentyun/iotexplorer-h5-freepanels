import React from 'react';
import dayjs from 'dayjs';
import { Block } from '@/components/layout';
import { RecordItemProps } from './index';

const DAY_DESC: string[] = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六'
];

export function RecordItem(props: RecordItemProps) {
  // 获取时间
  const date = dayjs(props.date);

  return (
    <div className="_component_business_record_list-item_ record-item">
      {/* 时间轴样式 */}
      <div className="item-timeline"></div>
      {/* 内容区域 */}
      <Block className="item-content">
        <div className="item-top">
          <div className="font_line_2 color_2">
            <span className="time">{date.format('HH:mm')}</span>
            <span className="day color_3">{DAY_DESC[date.day()]}</span>
          </div>
          <p className="item-value font_line_3 color_2">{props.value}</p>
        </div>
        <div className="item-bottom">
          <p className="font_line_2 color_2">{date.format('YYYY-MM-DD')}</p>
          <p className="font_line_2 color_2">{props.label}</p>
        </div>
      </Block>
    </div>
  );
}
