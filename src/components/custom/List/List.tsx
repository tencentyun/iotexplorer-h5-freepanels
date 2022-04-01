import React, { useRef } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { SwipeAction } from '@custom/SwipeAction';
// 支持活动删除的列表组件

export interface ListProps {
  data?: any[]; // 渲染的数据
  render?: any; // 渲染方式
  onDelete?: any; // 删除方法
  className?: string;
  getAction?: any[]; // 操作动作 默认是删除
}

export function List({ data = [], render, onDelete, getAction, className }: ListProps) {
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
            <SwipeAction ref={ref} closeOnAction={false} rightActions={getRightActions(item, data, index)}>
              <div className="list-body">{renderNode(item, data, index)}</div>
            </SwipeAction>
          </li>
        ))}
      </ul>
    </div>
  );
}
