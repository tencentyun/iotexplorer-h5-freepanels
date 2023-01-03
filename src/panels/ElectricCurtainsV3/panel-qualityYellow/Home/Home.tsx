import React, { useRef } from 'react';
import { Action } from './Action';
import Slider from './Slider';
import classNames from 'classnames';

export function Home(props) {
  const myRef = useRef(null);
  return (
    <div className={classNames("home", !!props.deviceData.power_switch ? '' : 'is-off')}>
      <Slider {...props} ref={myRef}></Slider>
      <Action {...props} myRef={myRef}></Action>
    </div>
  );
}
