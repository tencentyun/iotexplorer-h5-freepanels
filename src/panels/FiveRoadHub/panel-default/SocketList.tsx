import React from 'react';
import { SectionList } from "@components/SectionList";
import './SocketList.less';

export interface SocketListItem {
  id: string;
  label: string;
  text?: string;
  countdownId?: string;
}

export interface SocketListProps {
  socketList: SocketListItem[];
  onClick: (item: SocketListItem) => any;
}

export function SocketList({
  socketList,
  onClick,
}: SocketListProps) {
  return (
    <div className="socket-list-page clearfix">
      <SectionList>
        {socketList.map((item) => (
          <SectionList.Item
            key={item.id}
            label={item.label}
            onClick={() => onClick(item)}
          >
            {!!item.text && (
              <span>{item.text}</span>
            )}
          </SectionList.Item>
        ))}
      </SectionList>
    </div>
  )
}


