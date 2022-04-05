/**
 * 记录列表
 */
import React from 'react';
import classNames from 'classnames';
import { StyledProps } from '@libs/global';
import { RecordItem } from './item';
import './style.less';

export interface RecordListProps extends StyledProps {
  datas: RecordItemProps[];
}

export interface RecordItemProps {
  id: number | string;
  // 时间戳
  date: number;
  // 右侧显示内容
  value: string;
  // 右侧底部显示内容名称
  label: string;
}

export function RecordList(props: RecordListProps) {
  const { datas } = props;

  return (
    <div className={classNames('_component_business_record_list_')}>
      <div className="record-list-wrapper">
        {datas.map(item => (
          <RecordItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
