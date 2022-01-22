/**
 * 表示组件支持通过 className 和 style 进行样式定制
 */
// eslint-disable-next-line no-unused-vars
export declare interface StyledProps {
  /**
   * 组件自定义类名
   */
  className?: string;

  /**
   * 组件自定义样式
   */
  style?: React.CSSProperties;
}

// eslint-disable-next-line no-unused-vars
declare interface TemplatePropertyConfig {
  id: string;
  name: string;
  mode: string;
  define: {
    type: string;
    mapping?: unknown;
    min?: string;
    max?: string;
    start?: string;
    step?: string;
    unit?: string;
  };
  required?: boolean;
}
// eslint-disable-next-line no-unused-vars
// 主题类型 normal-黑白色 blueWhite-蓝白色 dark-暗黑色 colorful-多彩色 morandi-莫兰迪色
export declare type ThemeType =
  | 'normal'
  | 'blueWhite'
  | 'blue_white'
  | 'dark'
  | 'colorful'
  | 'morandi';
// NORMAL = 'normal',
// BLUE_WHITE = 'blueWhite',
// DARK = 'dark',
// COLORFULE = 'colorful',
// MORANDI = 'morandi'

// eslint-disable-next-line no-unused-vars
declare interface ThemeProps {
  theme?: ThemeType;
}

export interface stringKey {
  [key: string]: string;
}
