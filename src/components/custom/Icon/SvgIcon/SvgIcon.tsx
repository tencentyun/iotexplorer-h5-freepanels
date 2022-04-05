import React from 'react';
export function SvgIcon({ name, className, size }) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const svg = require(`@svg/${name}.svg`);
  // TODO 明确工程处理
  // return <img src={svg && svg.default} className={`svg-icon svg-icon-${size} ${className}`} />;
  return <div className={`svg-icon svg-icon-${size} ${name} ${className || ''} `} />;
}
