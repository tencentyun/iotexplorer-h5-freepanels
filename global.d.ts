declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";
declare const wx;

declare type HashMap = {
  [key : string]: number | string | any[]
}
/**
 * 表示组件支持通过 className 和 style 进行样式定制
 */
declare interface StyledProps {
  /**
   * 组件自定义类名
   */
  className?: string;

  /**
   * 组件自定义样式
   */
  style?: React.CSSProperties;
}

declare interface SelectorOption {
  text: string;
  value: string;
}

declare global {
  interface Window {
    h5PanelSdk: any;
  }
}

declare interface ListResponse<T> {
  list: T[];
  total: number;
}

declare interface ReducerAction<T> {
  type: T;
  payload?: any;
}

declare interface TemplatePropertyConfig {
  id: string;
  name: string;
  mode: string;
  define: {
    type: string;
    mapping?: HashMap;
    min?: string;
    max?: string;
    start?: string;
    step?: string;
    unit?: string;
  };
  required?: boolean;
}

export {};
