import React from 'react';
import { SvgIcon } from './SvgIcon';
export interface IconProps {
  name?: string; // 图标名称
  className?: string; // class类名
  size?: string; // 参考SIZE
  type?: string; // 图标类型 svg 和 icon  默认svg
  checked?: boolean; // 编辑兼容一期Radio
}

// 图标大小
export const SIZE = { NORMAL: 'normal', SMALL: 'small', LARGE: 'large' };

// 图标类型
export const TYPE = { SVG: 'svg', ICON: 'icon' };

export function Icon(props: IconProps) {
  const { name, className, checked, size = SIZE.NORMAL, type = TYPE.SVG } = props;
  let realIconName = name;
  if (checked !== void 0) {
    realIconName = checked ? 'select' : 'unselect';
  }
  return (
    <div className={`icon icon-${realIconName}`} data-name={realIconName}>
      {type === TYPE.SVG ? <SvgIcon name={realIconName} className={className} size={size} /> : <div> icon待规划</div>}
    </div>
  );
}
