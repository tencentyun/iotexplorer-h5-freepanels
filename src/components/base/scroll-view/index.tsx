/*
 * @Author: wrq
 * @Date: 2021-09-22 21:28:03
 * @Description: 滚动视图组件
 */
import { formatPxUnit } from '@libs/utillib';
import React from 'react';
import styled from 'styled-components';

const View = styled.div`
  width: ${(props: ScrollViewProps) => formatPxUnit(props.width || '100vw')};
  height: ${(props: ScrollViewProps) => formatPxUnit(props.height)};
  overflow: hidden;
  overflow-x: ${(props: ScrollViewProps) => (props.scrollX ? 'scroll' : 'scroll')};
  overflow-y: ${(props: ScrollViewProps) => (props.scrollY ? 'scroll' : 'scroll')};
`;

export interface ScrollViewProps extends StyledProps {
  width?: number | string;
  height: number | string;
  // 是否允许横向滚动
  scrollX?: boolean;
  // 是否允许纵向滚动
  scrollY?: boolean;
  children: React.ReactNode;
  // 滚动时触发
  onScroll?: () => void;
}

export function ScrollView(props: ScrollViewProps) {
  // TODO: 上拉刷新 下拉加载更多 需要补充相关实现

  // const handleScroll = (e: React.UIEventHandler<HTMLDivElement>) => {
  //   props.onScroll && props.onScroll();
  // };

  return (
    <View className="_component_base_scroll-view_" {...props}>
      <div className="scroll-wrapper">{props.children}</div>
    </View>
  );
}
