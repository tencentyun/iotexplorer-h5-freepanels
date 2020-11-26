import React, { useMemo } from 'react';
import classNames from 'classnames';

import './Tabs.less';

export interface TabConfig {
  key: string | number;
  label: string;
  showHint?: boolean;
}

export interface TabsProps extends StyledProps {
  tabList: TabConfig[];
  animated?: boolean;
  currentTab: string | number;
  onTabChange: (key: string | number) => any;
  children?: React.ReactNode;
  marginBottom?: number;
  activeColor?: string;
}

export function Tabs({
  tabList = [],
  animated = true,
  currentTab,
  onTabChange,
  children,
  marginBottom = 0,
  className,
  style,
  activeColor = '#0066ff',
}: TabsProps) {
  const currentIndex = useMemo(() => {
    let index = -1;

    if (tabList && tabList.length) {
      if (!currentTab) {
        index = 0;
      } else {
        index = tabList.findIndex(item => item.key === currentTab);
      }
    }

    return index;
  }, [tabList, currentTab]);

  return (
    <>
      <div
        className={classNames('tab-container', className, {
          animated,
        })}
        style={{
          ...style,
          marginBottom: `${marginBottom}rpx`,
        }}
      >
        <>
          {tabList.map((item, index) => (
            <div
              key={index}
              className={classNames('tab-item need-hover', {
                active: currentTab === item.key,
                'red-hint': item.showHint,
              })}
              onClick={() => onTabChange(item.key)}
              style={{
                color: currentTab === item.key ? activeColor : '',
              }}
            >
              {item.label}
            </div>
          ))}
          {animated && (
            <div
              className='tab-bar'
              style={{
                width: `${100 / tabList.length}%`,
                transform: `translate3d(${100 * currentIndex}%, 0, 0)`,
              }}
            >
              <div className='tab-bar__inner' style={{ backgroundColor: activeColor }}/>
            </div>
          )}
        </>
      </div>

      <div className='tab-content'>
        {children}
      </div>
    </>
  );
}

export interface TabsPanelProps extends StyledProps {
  tabKey: string | number;
  currentTab: string | number;
  children: React.ReactNode;
  keepAlive?: boolean; // 未激活时 Tab.Panel 是否销毁
}

Tabs.Panel = ({
  tabKey,
  currentTab,
  children,
  keepAlive = true,
  className,
  style,
}: TabsPanelProps) => {
  if (!keepAlive && tabKey !== currentTab) {
    return null;
  }

  return (
    <div
      className={classNames('tab-content-item', className, {
        active: tabKey === currentTab,
      })}
      style={style}
    >
      {children}
    </div>
  );
};
