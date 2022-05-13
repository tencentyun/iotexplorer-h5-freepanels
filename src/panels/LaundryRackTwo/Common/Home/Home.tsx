import React, { useRef } from 'react';
import { Action } from './Action';
import { ConfigAction } from './ConfigAction';
import { Slider } from './Slider';

const getTimeToHour = (time: number) => {
  if (!time) return '00:00:00';
  const minute =    ((time % 3600) / 60).toString().length < 2
    ? `0${((time % 3600) / 60).toString()}`
    : ((time % 3600) / 60).toString();
  const hour =    Math.floor(time / 3600).toString().length < 2
    ? `0${Math.floor(time / 3600).toString()}`
    : Math.floor(time / 3600).toString();
  const times = ` ${hour}:${minute}:00`;
  return times;
};

export function Home(props) {
  const {
    deviceData: { disinfect_left, air_dry_left, drying_left },
  } = props;
  return (
    <div className="home">
      <div className="header-info">
        <Slider {...props}></Slider>
        <div className="title">
          <div>
            消毒剩余时间:
            {getTimeToHour(disinfect_left)}
          </div>
          <div>
            风干剩余时间:
            {getTimeToHour(air_dry_left)}
          </div>
          <div>
            烘干剩余时间:
            {getTimeToHour(drying_left)}
          </div>
        </div>
      </div>
      <Action {...props} ></Action>
      <ConfigAction {...props}></ConfigAction>
    </div>
  );
}
