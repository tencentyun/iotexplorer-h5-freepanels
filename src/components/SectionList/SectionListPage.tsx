import React from 'react';
import { SectionList } from './SectionList';
import './SectionList.less';

export interface SectionListPageItemProps {
  id: string;
  label: string;
  text?: string;
}

export interface SectionListPageProps {
  list: SectionListPageItemProps[];
  onClick: (item: SectionListPageItemProps) => any;
}

export function SectionListPage({
  list,
  onClick,
}: SectionListPageProps) {
  return (
    <div className="section-list-page clearfix">
      <SectionList>
        {list.map(item => (
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
  );
}


