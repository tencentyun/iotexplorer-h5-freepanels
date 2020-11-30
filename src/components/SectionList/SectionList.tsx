import React, { useEffect } from 'react';
import classNames from 'classnames';
import { noop, rpx2rem } from '@utillib';
import './SectionList.less';

export interface SectionListProps extends StyledProps {
  title?: string | React.ReactNode;
  marginTop?: number; // 单位rpx
  children: React.ReactNode;
}

export function SectionList({
  title,
  marginTop = 32,
  children,
  className,
  style,
}: SectionListProps) {
  return (
    <div
      className={classNames('section-list-container', className)}
      style={{
        marginTop: rpx2rem(marginTop),
        ...style,
      }}
    >
      {!!title && (
        <div className='section-title'>{title}</div>
      )}

      <div
        className={classNames('section-list')}
      >
        {children}
      </div>
    </div>
  );
}

export interface SectionListItemProps extends StyledProps {
  onClick?: any;
  label?: string | React.ReactNode;
  labelWidth?: number | string;
  labelLineHeight?: number;
  labelIcon?: string;
  labelTextOverflow?: boolean;
  textAlign?: 'right' | 'left';
  children?: React.ReactNode;
  hideBorderBottom?: boolean;
  showBorderBottom?: boolean;
  textOverflow?: boolean;
  clickable?: boolean;
  needHover?: boolean;
  redSuffix?: string;
  showHint?: boolean;
}

SectionList.Item = ({
  onClick,
  label,
  labelWidth = 168,
  labelLineHeight = 48,
  labelIcon,
  textAlign = 'right',
  children,
  showBorderBottom = false,
  hideBorderBottom,
  textOverflow = true,
  labelTextOverflow = true,
  clickable: initClickable,
  needHover = true,
  redSuffix = '',
  showHint = false,
  className,
}: SectionListItemProps) => {
  const clickable = typeof initClickable === 'undefined' ? !!onClick : initClickable;

  useEffect(() => {
    if (hideBorderBottom) {
      console.warn('DEPRECATED: SectionList.Item hideBorderBottom 属性已废弃，可以不需要传自动判断是否最后一项，如遇特殊情况需要展示最后一项的border 请使用 showBorderBottom:true');
    }
  }, [hideBorderBottom]);

  return (
    <div
      className={classNames('section-item', className, {
        'need-hover': needHover,
        'show-border-bottom': showBorderBottom,
        'align-right': textAlign === 'right',
      })}
      onClick={clickable && !!onClick ? onClick : noop}
    >
      <div
        className={classNames('section-item_inner', {
          'append-arrow': clickable,
          'right-red-hint': showHint,
        })}
      >
        <div
          className={classNames('item-label', {
            'text-overflow': labelTextOverflow,
          })}
          style={{
            width: typeof labelWidth === 'string' ? labelWidth : rpx2rem(labelWidth),
            lineHeight: rpx2rem(labelLineHeight),
          }}
        >
          {!!labelIcon && (
            <img
              className='item-label-icon'
              src={labelIcon}
            />
          )}

          {/* 真机中需将text-overflow设置到此层才能生效 */}
          <div className={classNames('label-text', {
            'text-overflow': labelTextOverflow,
          })}
          >
            {label}
            {redSuffix && <label style={{ color: 'red' }}>{redSuffix}</label>}
          </div>
        </div>

        <div
          className={classNames('item-content', {
            'text-overflow': textOverflow,
          })}
          style={{
            marginRight: rpx2rem(clickable ? 52 : 0),
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
