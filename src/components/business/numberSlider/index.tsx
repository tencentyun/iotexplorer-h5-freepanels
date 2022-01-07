/**
 * 数字滑动选择器
 */
import React, { useRef } from 'react';
import classNames from 'classnames';
import { StyledProps, ThemeType } from '@libs/global';
import './style.less';

export interface NumberSliderProps extends StyledProps {
  defaultValue?: number;
  value?: number;
  min: number;
  max: number;
  // 是否禁用
  disabled?: boolean;
  // 是否显示左右滑动按钮
  showButton?: boolean;
  theme?: ThemeType;
  onChange?: any;
}

export function NumberSlider(props: NumberSliderProps) {
  const { className } = props;
  const ref = useRef();
  //const isDragged = useDrag(ref);
  //console.log(isDragged);

  const slideRender = () => {
    const { min, max } = props;
    const len = max - min + 1;
    if (max <= min) {
      console.error('props max must greater than min');
      return null;
    }
    const datas = Array.from({ length: len }, (_, index) => min + index);
    return (
      <ul ref={ref}>
        {datas.map(num => (
          <li key={num}>{num}</li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className={classNames('_component_business_number-slider_', className)}
    >
      <div className="slider-wrap">
        <a className="slider-button prev"></a>
        <div className="slider">{slideRender()}</div>
        <a className="slider-button prev"></a>
      </div>
      <div className="current-block"></div>
    </div>
  );
}
