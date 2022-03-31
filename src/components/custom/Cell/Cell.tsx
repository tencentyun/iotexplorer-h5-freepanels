/*
 * @Description: 单元格
 */
import React, { useRef } from 'react';
// import { noop } from '@libs/utillib';
// import { addClass, removeClass } from '@libs/dom';
import './Cell.less';
import { Switch } from '../Switch';
import { CheckBox } from '../CheckBox';
export interface CellProps {
  className?: string;
  // 左侧图标
  prefixIcon?: React.ReactNode;
  // 左侧标题
  title: string;
  // 副标题
  subTitle?: string;
  name?: string;
  // 副标题
  desc?: string;
  // 右侧内容
  value?: string | React.ReactNode;
  // 右侧内容颜色
  valueStyle?: 'normal' | 'set';
  // 点击后跳转的url
  url?: string;
  // 是否展示右侧箭头
  isLink?: boolean;
  size?: 'normal' | 'medium';
  onClick?: any;
  children?: React.ReactNode;
  ele?: string;
  eleValue?: boolean;
  onChange?: any;
}

const supportEle = {
  switch: Switch,
  checkbox: CheckBox
};

export function Cell({
  className,// 支持边框 和下边框 border border-bottom
  prefixIcon,
  title,
  subTitle,
  name,
  value,
  valueStyle = 'normal',
  desc,
  isLink = true,
  size = 'normal',
  onClick,
  children,
  ele = '', // 默认支持两种常见元素 switch / checkbox
  eleValue = false, // 元素值
  onChange = () => ({})
}: CellProps) {
  const target = useRef<any>(null);
  const meta: CellProps = {
    title,
    subTitle,
    name,
    value,
    desc
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isLink) return;
    e.preventDefault();
    e.stopPropagation();
    onClick && onClick(meta);
  };

  const EleComponent = supportEle[ele];

  return (
    <div className={`cell ${className ? className : ''}`} ref={target}>
      <div className="cell-wrapper" onClick={handleClick}>
        {/* 左侧图标 */}
        {prefixIcon ? <span className="cell-prefix-icon">{prefixIcon}</span> : null}

        {/* 标题 */}
        <p className="cell-title">{title}</p>
        {subTitle ? <span className="cell-subtitle">{subTitle}</span> : null}

        {/* 右侧内容区 */}
        <div className={`cell-content cell-content-style-${valueStyle}`}>{value}</div>

        {/* 右侧箭头 */}
        {isLink ? <span className="icon-arrow-right"></span> : null}
        {ele ? <EleComponent onChange={onChange} checked={eleValue} value={eleValue} /> : null}
      </div>

      {desc ? <p className="cell-desc">{desc}</p> : null}

      {children}
    </div>
  );
}
