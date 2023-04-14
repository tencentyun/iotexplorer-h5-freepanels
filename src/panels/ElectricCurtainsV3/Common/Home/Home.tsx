import React, { useRef } from 'react';
import { Action } from './Action';
import Slider from './Slider';

export function Home(props) {
  const myRef = useRef(null);
  return (
    <div className="home">
      <Slider {...props} ref={myRef}></Slider>
      <Action {...props} myRef={myRef}></Action>
    </div>
  );
}
