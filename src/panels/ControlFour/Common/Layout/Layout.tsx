import React, { useEffect, useState } from 'react';
import { LAYOUT } from './constant';
import { Icon } from '@custom/Icon';
import classNames from 'classnames';


export function Layout(props) {
  const {
    width = 110,
    height = 110,
    selected = [],
    // position = [],
    // name = null,
    // deviceId = null,
  } = { ...props };

  const [current, setCurrent] = useState({ type: 1});

  useEffect(() => {
    if (selected.length) {
      setCurrent(selected)
    }
  }, [selected])

  return (
    <div className="wrapper">
      {selected.map(({position: [[x1, x2], [y1, y2]], type }, index) => {
        return (
          <div
            key={index}
            className={classNames("region", type === 0 ? "switch" : "device")}
            style={{ width: (width * (x2 - x1)), height: (height * (y2 - y1)), left: x1 * width, top: y1 * height }}>
            {current.deviceId ? <div className="selected">{current.name}</div> : <Icon name={`layout-add-${type}`}></Icon>}
          </div>
        );
      })}
    </div>
  );
}
