/*
 * @Author: wrq
 * @Date: 2021-09-20 13:51:16
 * @Description: 按钮点击hover效果
 */
import React, { useMemo, useState, Ref, forwardRef } from 'react';
import classNames from 'classnames';
import { StyledProps } from '@libs/global';
import './style.less';

export interface HoverableProps<P extends keyof JSX.IntrinsicElements>
  extends StyledProps {
  // 使用什么标签来渲染，默认为 div
  tag?: P;

  // 子组件
  children?: React.ReactNode;

  // 禁用 hover 效果
  disabled?: boolean;

  // hover时向标签添加的 className, 默认为 hover
  hoverClass?: string;
}

// props符合 JSX.IntrinsicElements[P] 且还需要符合 HoverableProps<P>
export type HoverablePropsType<P extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[P] & HoverableProps<P>;

function HoverableRaw<P extends keyof JSX.IntrinsicElements = 'span'>(
  props: HoverablePropsType<P>,
  ref: Ref<JSX.IntrinsicElements[P]>
) {
  const {
    tag,
    className,
    children,
    hoverClass = 'hover',
    disabled,
    ...htmlProps
  } = props;
  const [hover, setHover] = useState(false);

  useMemo(() => {
    if (disabled) {
      setHover(false);
    }
  }, [disabled]);

  const handleHoverEnd = () => {
    if (disabled) return;

    setHover(false);
  };

  return React.createElement(
    tag || 'div',
    {
      ref,
      className: classNames('_component_common_hoverable_', className, {
        [hoverClass]: !disabled && hover
      }),
      onTouchStart: () => !disabled && setHover(true),
      onTouchMove: () => handleHoverEnd(),
      onTouchEnd: () => handleHoverEnd(),
      ...htmlProps
    },
    children
  );
}

export const Hoverable = forwardRef(HoverableRaw);
