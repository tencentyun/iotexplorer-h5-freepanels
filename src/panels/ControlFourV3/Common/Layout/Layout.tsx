import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import classNames from 'classnames';

export function Layout(props) {
  const {
    width = 110,
    height = 110,
    selected = [],
    isPreview = false,
    onPreviewClick = () => { },
    style = {},
    isCanDelete = false,
    onDelete = () => { },
    onBlackClick = () => { },
    onWhiteClick = () => { },
  } = { ...props };
  return (
    <div className="wrapper" style={...style}>
      {isCanDelete && <div className="layout-delete" onClick={onDelete}></div>}
      {isPreview && <div className="mask" onClick={onPreviewClick}></div>}
      {selected.map(({ position: [[x1, x2], [y1, y2]], type, device, name }, index) => {
        return (
          <div
            key={index}
            className={classNames("region", type === 0 ? "switch" : "device",)}
            onClick={() => {
              if (type === 0) {
                onWhiteClick(index);
                return;
              }
              onBlackClick(index);
            }}
            style={{ width: (width * (x2 - x1)), height: (height * (y2 - y1)), left: x1 * width, top: y1 * height }}>
            {isPreview ? '' : device ? <div className="selected">{name || device}</div> : <Icon name={`layout-add-${type}`}></Icon>}
          </div>
        );
      })}
    </div>
  );
}
