import React, { useRef } from 'react';

export interface ScrollViewProps extends StyledProps {
  children?: React.ReactNode | React.ReactNodeArray;
  onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onReachBottom?: () => void;
  lowerThreshold?: number;
  upperThreshold?: number;
  onReachTop?: () => void;
  scrollTop?: number;
}

export function ScrollView({
  children,
  onScroll,
  onReachBottom,
  onReachTop, // 滚动回到顶部
  scrollTop,  // 触发顶部滚动后重置的滚动高度
  lowerThreshold = 50,
  upperThreshold = 50,
  className,
  style,
}: ScrollViewProps) {
  const reachBottomWithScrollHeight = useRef(-1);
  // const toTopWithScrollHeight = useRef(-1);
  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (onScroll) {
      onScroll(event);
    }

    const target: HTMLDivElement = event.target as HTMLDivElement;
    if (reachBottomWithScrollHeight.current > 0 && reachBottomWithScrollHeight.current !== target.scrollHeight) {
      // ScrollView 内部高度发生变化，重置 reachBottom 状态
      reachBottomWithScrollHeight.current = -1;
    }

    const inReachBottomRange = target.scrollHeight - target.scrollTop - lowerThreshold <= target.clientHeight;

    // const isToTop = target.scrollHeight - target.scrollTop - lowerThreshold
    if(target.scrollTop <= upperThreshold) {
      if(onReachTop){
        onReachTop();
        target.scrollTop = scrollTop || 0
      }
    }

    if (inReachBottomRange) {
      if (reachBottomWithScrollHeight.current !== target.scrollHeight) {
        reachBottomWithScrollHeight.current = target.scrollHeight;
        if (onReachBottom) {
          onReachBottom();
        }
      }
    } else if (reachBottomWithScrollHeight.current > 0) {
      // 离开 bottom 范围，重置 reachBottom 状态
      reachBottomWithScrollHeight.current = -1;
    }
  };

  return (
    <div className={className} style={style} onScroll={handleScroll}>
      {children}
    </div>
  );
}
