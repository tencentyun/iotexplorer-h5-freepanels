/*
 * @Author: wrq
 * @Date: 2021-10-02 09:42:35
 * @Description: 通用图标组件
 */
import React from 'react';
import classNames from 'classnames';
import {  getThemeType } from '@libs/theme';
import './style.less';
import { StyledProps, ThemeType } from '@libs/global';
import { px2vw, toUnderscores } from '@src/libs/utillib';

export interface SvgIconProps extends StyledProps {
  name: string;
  theme?: ThemeType;
  color?: string;
  width?: number;
  height?: number;
  gradientId?: string;
  startColor?: string;
  endColor?: string;
}

interface IconStyle {
  fill?: string;
  width?: string;
  height?: string;
}

export function SvgIcon(props: SvgIconProps) {
  const ENVIRO_THEME = getThemeType();
  // 主题类型默认会从 webpack 的环境变量中取，如果 props 中传入了类型，会优先以 props 中的为准，默认 normal
  const theme: SvgIconProps['theme'] = props.theme || ENVIRO_THEME || 'normal';
  // 根据 theme 类型，渲染不同类型的 icon
  const iconName = `#${props.name}`;
  console.log(iconName);
  const iconStyle = () => {
    const style: IconStyle = {};

    if (props.color) {
      style.fill = props.color;
    }
    if (props.width) {
      style.width = px2vw(props.width) as string;
    }
    if (props.height) {
      style.height = px2vw(props.height) as string;
    }

    if (props.gradientId) {
      style.fill = 'url(#' + props.gradientId + ')';
    }
    return style;
  };

  return (
    <svg
      className={classNames(
        '_component_common_icon_',
        'svg-icon',
        `svg-${props.name}`,
        `icon-theme-${toUnderscores(theme)}`,
        props.className
      )}
      style={iconStyle()}
      fill={'red'}
    >
      {props.gradientId ? (
        <defs>
          <linearGradient
            id={props.gradientId}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={props.startColor ? props.startColor : '#28E552'}
            />
            <stop
              offset="100%"
              stopColor={props.endColor ? props.endColor : '#03E1A6'}
            />
          </linearGradient>
        </defs>
      ) : null}

      <use xlinkHref={iconName}></use>
    </svg>
  );
}
