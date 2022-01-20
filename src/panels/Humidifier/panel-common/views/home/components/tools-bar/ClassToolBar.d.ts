/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-23 09:00:21
 * @LastEditors:
 * @LastEditTime:
 */
export interface ToolsBarConfig {
  isActive: boolean;
  icon: any;
  width?: number;
  height?: number;
  size?: number;
  // iconActive: any;
  name: string;
  label: string;
  path: string;
  callback: Function;
  click?: Function;
  isFillNone?: boolean;
}
