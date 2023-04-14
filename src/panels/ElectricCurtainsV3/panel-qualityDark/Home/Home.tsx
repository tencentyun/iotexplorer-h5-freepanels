import React, { useRef } from 'react';
import { Action } from './Action';
import Slider from '../../Common/Home/Slider';
import classNames from 'classnames';

export function Home(props) {
  const myRef = useRef(null);
  const {deviceData} = props;
  return (
    <div className={classNames("home", deviceData.power_switch ? '' : 'is-off')}>
      <Slider {...props} ref={myRef}></Slider>
      <Action {...props} myRef={myRef}></Action>
    </div>
  );
}
