/*
 * @Description: 单元格
 */
import React, { useRef } from 'react';
import classNames from 'classnames';
// import { noop } from '@libs/utillib';
// import { addClass, removeClass } from '@libs/dom';
import './Cell.less';

export interface CellProps {
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
  valueStyle?: 'normal' | 'gray';
  // 点击后跳转的url
  url?: string;
  // 是否展示右侧箭头
  isLink?: boolean;
  size?: 'normal' | 'medium';
  onClick?: any;
  children?: React.ReactNode;
}

export function Cell({
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
  children
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
    console.log('asdfasd');
    if (!isLink) return;
    console.log('=====asdfasd');
    e.preventDefault();
    e.stopPropagation();

    onClick(meta);
  };

  return (
    <div
      className={classNames(
        'cell'
      )}
      ref={target}
    >
      <div className="cell-wrapper" onClick={handleClick}>
        {/* 左侧图标 */}
        {prefixIcon ? (
          <span className="cell-prefix-icon">{prefixIcon}</span>
        ) : null}

        {/* 标题 */}
        <p className="cell-title">{title}</p>
        {subTitle ? <span className="cell-subtitle">{subTitle}</span> : null}

        {/* 右侧内容区 */}
        <div className={`cell-content cell-content-style-${valueStyle}`}>
          {value}
        </div>

        {/* 右侧箭头 */}
        {isLink ? <span className="icon-arrow-right"></span> : null}
      </div>

      {desc ? <p className="cell-desc">{desc}</p> : null}

      {children}
    </div>
  );
}
