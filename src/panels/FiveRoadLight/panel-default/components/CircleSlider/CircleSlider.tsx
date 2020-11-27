import React, { useRef, useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { delay, noop, px2rem, rpx2px } from '@utillib';

import './CircleSlider.less';

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function sanitizeAngle(degrees) {
  return (degrees < 0) ? 360 + (degrees % -360) : degrees % 360;
}

function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

export interface CircleSlider extends StyledProps {
  angle?: number;
  onChanging: (angle: number) => any;
  onChange: (angle: number) => any;
  color?: string;
}

export function CircleSlider({
  angle = -1,
  onChanging = noop,
  onChange = noop,
  style,
  className,
  color,
}: CircleSlider) {
  const [ready, setReady] = useState<boolean>(false);
  const [thumbStyle, setThumbStyle] = useState<React.CSSProperties>({});

  const size = useMemo<{
    radius: number;
    containerSize: number;
    thumbSize: number;
  }>(() => ({
    radius: rpx2px(460 / 2), // 半径
    containerSize: rpx2px(492),
    thumbSize: rpx2px(82),
  }), []);

  const stateRef = useRef<{
    dragging: boolean;
    angleCurrent: number;
    containerRect;
  }>({
    angleCurrent: -1,
    dragging: false,
    containerRect: null as any,
  });

  const onDragStart = (e) => {
    if (!ready) return;

    e.preventDefault();

    stateRef.current.dragging = true;
    animationLoop();
  };

  const onDrag = (e) => {
    if (!ready) return;
    const { containerRect } = stateRef.current;
    const { containerSize } = size;

    const {
      pageX,
      pageY,
    } = e.touches[0];

    const thumbPositionNew = {
      left: pageX - containerRect.left - (containerSize / 2),
      top: pageY - containerRect.top - (containerSize / 2),
    };

    stateRef.current.angleCurrent = Math.round(sanitizeAngle(
      toDegrees(
        Math.atan2(thumbPositionNew.left, -thumbPositionNew.top)
      )
    ) * 100) / 100;

    return false;
  };

  const onDragEnd = (e) => {
    if (!ready) return;
    stateRef.current.dragging = false;
    e.preventDefault();
    onChange(stateRef.current.angleCurrent);
  };

  const setStyle = (angle: number) => {
    const { radius, containerSize, thumbSize } = size;

    const top = -Math.cos(toRadians(angle)) * radius + (containerSize / 2 - thumbSize / 2);
    const left = Math.sin(toRadians(angle)) * radius + (containerSize / 2 - thumbSize / 2);

    setThumbStyle({
      transform: `translate3d(${px2rem(left)}, ${px2rem(top)}, 0)`,
    });
  };

  const initContainerStyle = async () => {
    while (!stateRef.current.containerRect) {
      await delay(50);

      const $ele = document.querySelector('#circle-slider');

      if ($ele) {
        stateRef.current.containerRect = $ele.getBoundingClientRect();
      }
    }

    setReady(true);
  };

  const animationLoop = () => {
    if (stateRef.current.dragging) {
      setStyle(stateRef.current.angleCurrent);
      requestAnimationFrame(() => animationLoop());
      onChanging(stateRef.current.angleCurrent);
    }
  };

  useEffect(() => {
    initContainerStyle();
  }, []);

  useEffect(() => {
    if (ready && angle !== stateRef.current.angleCurrent) {
      stateRef.current.angleCurrent = angle;
      setStyle(stateRef.current.angleCurrent);
      onChanging(stateRef.current.angleCurrent);
    }
  }, [ready, angle]);

  return (
    <div
      className='circle-slider-container'
      style={style}
    >
      <div
        id='circle-slider'
        className={classNames('circle-slider', className)}
      >
        <div
          className='circle-slider-inner'
          style={{
            backgroundColor: color,
          }}
        />
        <div
          className='circle-slider-thumb'
          style={{
            visibility: ready ? 'visible' : 'hidden',
            backgroundColor: color,
            ...thumbStyle,
          }}
          onTouchStart={onDragStart}
          onTouchMove={onDrag}
          onTouchEnd={onDragEnd}
        />
      </div>
    </div>
  );
}
