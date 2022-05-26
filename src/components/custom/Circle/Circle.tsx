import React from 'react';
export interface CircleProps extends StyledProps {
  length?: number; // 显示的个数
  children?: React.ReactNode; // 内嵌节点
  className?:string;
}

// 带分割的圆环
export const Circle = ({ length = 90, children, className }: CircleProps) => {
  const getSplitEle = (length) => {
    const ele: React.ReactNode[] = [];
    const deg = 360 / length;
    for (let i = 0; i < length; i++) {
      const splitDeg = deg * i;
      const transform = `rotate(${splitDeg}deg)`;
      ele.push(<div style={{ zoom: 1, transform }} className="split" key={i}>
          <div className="g-item"></div>
        </div>);
    }
    return ele;
  };
  return (
    <div className="cus-circle-split">
      <div className="center-flag">{getSplitEle(length)}</div>
      <div className={className || ''}>{children}</div>
    </div>
  );
};
