/* eslint-disable no-mixed-operators */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './position.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { StyledProps } from '@libs/global';
import { useDidMount } from 'beautiful-react-hooks';
import { onControlDevice } from '@hooks/useDeviceData';

export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}

export function Position(props: LightColorProps) {
  const min_value = 0;
  const max_value = 1000;
  const [dataUser, setDataUser] = useState(props.defaultValue);
  const wrapper = useRef<HTMLDivElement | null>();
  const circle = useRef();
  const [brightness, setBrightness] = useState(sdk.deviceData.brightness ? sdk.deviceData.brightness : 80);
  useEffect(() => {
    setBrightness(sdk.deviceData.brightness);
  }, [sdk.deviceData.brightness]);
  const updatePosInfo = () => {
    if (!wrapper.current) {
      return;
    }
    const wrap = wrapper.current;
    const point = circle.current;
    const centerX = wrap.clientWidth / 2 - document.body.clientWidth / 1125.0 * 10;
    const centerY = -wrap.clientHeight / 2 + point?.clientHeight * 0.9;

    const n = parseInt(dataUser / 1000.0 * 275);
    // 0~50映射为130~180,50~275映射为-180~45
    let angle = n > 50 ? (n - 50 - 180) : n + 130;
    angle *= Math.PI / 180; // 角度转弧度
    const destX = centerX + Math.cos(angle) * wrap?.clientWidth / 2 * 0.77;
    const destY = centerY + Math.sin(angle) * wrap?.clientHeight / 2 * 0.77;
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
    onControlDevice('set_temp', val);
  };

  const handleSelectColor = (e: React.MouseEvent) => {
    const wrap = wrapper.current as HTMLDivElement;
    const point = circle.current;
    const wrap_y = wrap.getBoundingClientRect().y;
    const x = e.changedTouches[0].clientX - wrap.offsetLeft;
    let y = e.changedTouches[0].clientY - wrap_y - document.body.offsetTop;
    y -= wrap.clientHeight - point.clientHeight;
    const centerX = wrap.clientWidth / 2 - document.body.clientWidth / 1125.0 * 10;
    const centerY = -wrap.clientHeight / 2 + point?.clientHeight * 0.9;

    const dist = Math.sqrt((centerX - x) * (centerX - x) + (centerY - y) * (centerY - y));
    if (dist < wrap?.clientWidth / 2 * 0.5 || dist > wrap?.clientWidth / 2 * 1.05) {
      return;
    }
    let angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
    console.log(angle);
    if (angle >= 45 && angle < 70) {
      angle = 45;
    } else if (angle > 110 && angle <= 130) {
      angle = 130;
    }
    if (angle > 45 && angle < 130) {
      return;
    }
    const val = (angle <= 45 ? angle + 180 + 50 : angle - 130);
    console.log(val);
    // 130~180映射为0~50,-180~45映射为50~275
    updateBrightColor(parseInt(val / 275.0 * 1000));
    angle *= Math.PI / 180;
    const destX = centerX + Math.cos(angle) * wrap?.clientWidth / 2 * 0.77;
    const destY = centerY + Math.sin(angle) * wrap?.clientHeight / 2 * 0.77;
    point.style.marginLeft = `${destX - point?.clientWidth / 2}px`;
    point.style.marginTop = `${destY - point?.clientHeight / 2}px`;
  };

  return (
    <div className="position_card">
      <div
        ref={wrapper}
        className={classNames('position-wrap', sdk.deviceData.color_mode === 1 && 'scene-bar')}
        onTouchMove={handleSelectColor}
        style={{ opacity: brightness / 100 }}
      >
        <div id={'position-mask'} className={classNames('position-mask')}></div>
        {/* <div id={'position-cirlce'} className={classNames('position-cirlce')}></div> */}
        <div id={'position-trangle'} className={classNames('position-trangle')}></div>

        <div
          id={'position-circle-left'}
          className={classNames('position-circle-left')}
        ></div>
        <div
          id={'position-circle-right'}
          className={classNames('position-circle-right')}
        ></div>
        <div
          ref={circle}
          className={classNames('position-point')}
        ></div>
      </div>
    </div>
  );
}
