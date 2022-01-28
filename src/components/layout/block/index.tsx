/*
 * @Author: wrq
 * @Date: 2021-09-19 14:43:29
 * @Description: 圆角背景块
 */
import React from 'react';
import classNames from 'classnames';
import { isUndefined } from 'lodash';
import styled from 'styled-components';
import { formatPxUnit, px2vw  } from '@libs/utillib';
import { StyledProps, ThemeType } from '@libs/global';
import { getThemeType } from '@libs/theme';

const BlockDom = styled.div`
  width: ${(props: BlockDomProps) =>
    props.width ? px2vw(props.width) : 'auto'};
  height: ${(props: BlockDomProps) =>
    props.height ? px2vw(props.height) : 'auto'};
  background-color: ${(props: BlockDomProps) =>
    props.isActive ? '#0F0F0F' : '#fff'};
  border-radius: 60px;
  box-sizing: border-box;
  box-shadow: 0 10px 100px 0 rgba(32, 33, 33, 0.1);
  padding: ${({ padding }: BlockDomProps) =>
    formatPxUnit(isUndefined(padding) ? 60 : padding)};
  overflow: hidden;

  &.block_theme_dark {
    color: var(--global-text-color);
    background-color: unset;
    background-image: linear-gradient(139deg, #333e4d 0%, #202c3a 100%);
    border: 3px solid rgba(62, 68, 84, 0.2);
    box-shadow: 0 6px 100px 0 #242735;
  }
`;

interface BlockDomProps {
  width?: number;
  height?: number;
  padding: string | number;
  isActive?: boolean;
}
export interface BlockProps extends StyledProps {
  theme?: ThemeType;
  padding?: BlockDomProps['padding'];
  width?: BlockDomProps['width'];
  height?: BlockDomProps['height'];
  children: React.ReactNode;
  // 是否展示激活状态的样式
  isActive?: boolean;
  onClick?: any;
}

export function Block({ className, children, ...props }: BlockProps) {
  // 主题类型默认会从 webpack 的环境变量中取，如果 props 中传入了类型，会优先以 props 中的为准，默认 normal
  const theme: ThemeType = props.theme || getThemeType() || 'normal';

  return (
    <BlockDom
      className={classNames(
        '_component_layout_block_',
        `block_theme_${theme}`,
        className
      )}
      {...props}
    >
      {children}
    </BlockDom>
  );
}
