import React from 'react';
import { toUnderscores } from './utillib';

export function withTheme(WrappedComponent: React.ReactNode, theme: string) {
  setThemeType(theme);
  // 给 body 增加主题标识的 className
  const body = document.body;
  console.log('get bodyed....');
  body.classList.add(`theme_${toUnderscores(theme)}`);

  return WrappedComponent;
}

export declare type ThemeType =
  | 'normal'
  | 'blueWhite'
  | 'blue_white'
  | 'dark'
  | 'colorful'
  | 'morandi';


const THEME_INFO = {theme_type: 'normal'};
export function getThemeType(): string {
  // webpack 环境变量
  const { theme_type } = THEME_INFO || {};
  // 非预制的主题类型，则使用默认 normal 主题
  return theme_type || 'normal';
}

export function setThemeType(theme) {
  THEME_INFO.theme_type = theme;
}
