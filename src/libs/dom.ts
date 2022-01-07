/*
 * @Author: wrq
 * @Date: 2021-09-19 21:38:38
 * @Description: dom工具库
 */

/**
 * 添加类名
 */
export function addClass(
  target: HTMLElement,
  className: string | string[]
): void {
  if (typeof className === 'string') {
    target.classList.add(className);
  } else {
    for (let i = 0; i < className.length; i++) {
      const name = className[i];

      target.classList.add(name);
    }
  }
}

/**
 * 删除类名
 */
export function removeClass(
  target: Element,
  className: string | string[]
): void {
  if (typeof className === 'string') {
    target.classList.remove(className);
  } else {
    for (let i = 0; i < className.length; i++) {
      const name = className[i];

      target.classList.remove(name);
    }
  }
}

export interface OffsetResult {
  left: number;
  top: number;
}

export function getOffset(element: any, target?: any): OffsetResult {
  // var element = document.getElementById(element),
  //     target  = target ? document.getElementById(target) : window;
  const t = target || window;
  const offset = {
    top: element.offsetTop,
    left: element.offsetLeft
  };
  let parent = element.offsetParent;
  while (parent !== null && parent !== t) {
    offset.left += parent.offsetLeft;
    offset.top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return offset;
}
