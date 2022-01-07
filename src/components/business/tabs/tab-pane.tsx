/*
 * @Author: wrq
 * @Date: 2021-09-26 21:30:53
 * @Description:
 */
import React from 'react';

export interface TabPaneProps extends StyledProps {
  children?: React.ReactNode;
  // 标题
  title: string;
  // 图标
  icon?: React.ReactNode;
  // 唯一标识
  key: string | number;
}

export function TabPane(props: TabPaneProps) {
  return <div className="_component_business_tab-pane_">{props.children}</div>;
}
