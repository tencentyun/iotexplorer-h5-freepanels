import React, { useRef } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { SwipeAction } from '@custom/SwipeAction';
// 支持活动删除的列表组件

declare type ActionColor = 'light' | 'weak' | 'primary' | 'success' | 'warning' | 'danger';

export declare type Action = {
    key: string | number;
    text: React.ReactNode;
    color?: ActionColor | string;
    onClick?: (e: React.MouseEvent) => void;
};

export interface ListProps {
  data?: HashMap[]; // 渲染的数据
  render?: (item: any, data: HashMap[], index: number) => React.ReactNode; // 渲染方式
  onDelete?: (item: HashMap) => void; // 删除方法
  className?: string;
  getAction?: (item: HashMap, data: HashMap[], index: number) => Action[] | undefined; // 操作动作 默认是删除
}

export function List({
  data = [],
  render,
  onDelete,
  getAction,
  className,
}: ListProps) {
  const ref = useRef(null);

  const defaultGetAction = item => [
    {
      key: 'delete',
      text: <span>删除</span>,
      color: 'danger',
      onClick: async () => {
        const isDelete = await sdk.tips.confirm('确认删除');
        if (isDelete && onDelete) onDelete(item);
        ref.current?.close?.();
      },
    },
  ];

  const defaultRender = item => <div>{item}</div>;

  const getRightActions = getAction || defaultGetAction;
  const renderNode = render || defaultRender;
  return (
    <div className={`cus-swipe-list  ${className || ''}`}>
      <ul className="list-card-container">
        {data.map((item, index) => (
          <li className="list-card " key={index}>
            <SwipeAction
              ref={ref}
              closeOnAction={false}
              rightActions={getRightActions(item, data, index)}
            >
              <div className="list-body">{renderNode(item, data, index)}</div>
            </SwipeAction>
          </li>
        ))}
      </ul>
    </div>
  );
}
