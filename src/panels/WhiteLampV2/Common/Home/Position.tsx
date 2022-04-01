import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { StyledProps } from '@libs/global';
import { useDidMount } from 'beautiful-react-hooks';

export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}
export function Position({ deviceData: { brightness = 80, color_mode }, doControlDeviceData }) {
  const min_value = 0;
  const max_value = 1000;
  const [dataUser, setDataUser] = useState(300);
  const wrapper = useRef();
  const circle = useRef();
  const updatePosInfo = () => {
    if (!wrapper.current) {
      return;
    }
    const wrap = wrapper.current;
    const point = circle.current;
    const centerX = wrap.clientWidth / 2 - (document.body.clientWidth / 1125.0) * 10;
    const centerY = -wrap.clientHeight / 2 + point?.clientHeight * 0.9;

    const n = parseInt((dataUser / 1000.0) * 275, 10);
    let angle = n > 50 ? n - 50 - 180 : n + 130;
    angle *= Math.PI / 180; // 角度转弧度
    const destX = centerX + ((Math.cos(angle) * wrap?.clientWidth) / 2) * 0.77;
    const destY = centerY + ((Math.sin(angle) * wrap?.clientHeight) / 2) * 0.77;
    point.style.marginLeft = `${destX - point?.clientWidth / 2}px`;
    point.style.marginTop = `${destY - point?.clientHeight / 2}px`;
  };

  useDidMount(() => {
    updatePosInfo();
  });

  const updateBrightColor = (val) => {
    if (val < min_value) {
      val = min_value;
    } else if (val > max_value) {
      val = max_value;
    }
    setDataUser(val);
    doControlDeviceData('set_temp', val);
  };

  const onTouchMove = (e: React.MouseEvent) => {
    const wrap = wrapper.current;
    const point = circle.current;
    const wrap_y = wrap.getBoundingClientRect().y;
    const x = e.changedTouches[0].clientX - wrap.offsetLeft;
    let y = e.changedTouches[0].clientY - wrap_y - document.body.offsetTop;
    y -= wrap.clientHeight - point.clientHeight;
    const centerX = wrap.clientWidth / 2 - (document.body.clientWidth / 1125.0) * 10;
    const centerY = -wrap.clientHeight / 2 + point?.clientHeight * 0.9;

    const dist = Math.sqrt((centerX - x) * (centerX - x) + (centerY - y) * (centerY - y));
    if (dist < (wrap?.clientWidth / 2) * 0.5 || dist > (wrap?.clientWidth / 2) * 1.05) {
      return;
    }
    let angle = (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI;
    if (angle >= 45 && angle < 70) {
      angle = 45;
    } else if (angle > 110 && angle <= 130) {
      angle = 130;
    }
    if (angle > 45 && angle < 130) {
      return;
    }
    const val = angle <= 45 ? angle + 180 + 50 : angle - 130;
    updateBrightColor(parseInt((val / 275.0) * 1000, 10));
    angle *= Math.PI / 180;
    const destX = centerX + ((Math.cos(angle) * wrap?.clientWidth) / 2) * 0.77;
    const destY = centerY + ((Math.sin(angle) * wrap?.clientHeight) / 2) * 0.77;
    point.style.marginLeft = `${destX - point?.clientWidth / 2}px`;
    point.style.marginTop = `${destY - point?.clientHeight / 2}px`;
  };

  return (
    <div className="position_card">
      <div
        ref={wrapper}
        className={classNames('position-wrap', color_mode === 1 && 'scene-bar')}
        onTouchMove={onTouchMove}
        style={{ opacity: brightness / 100 }}
      >
        <div className="position-mask"></div>
        <div className="position-trangle"></div>
        <div className="position-circle-left"></div>
        <div className="position-circle-right"></div>
        <div ref={circle} className="position-point"></div>
      </div>
    </div>
  );
}
