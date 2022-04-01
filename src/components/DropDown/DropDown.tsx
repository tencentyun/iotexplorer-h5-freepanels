import React from 'react';
import './DropDown.less';
export function DropDown({ onClick, text }) {
  return (
    <div className="drop-down" onClick={onClick}>
      <div>{text}</div>
    </div>
  );
}
