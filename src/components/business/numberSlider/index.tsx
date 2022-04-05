/**
 * 数字滑动选择器
 */
import React, { useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller } from 'swiper';
import { StyledProps, ThemeType } from '@libs/global';
import { SvgIcon } from '@components/common';
import './style.less';
import 'swiper/less';

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

  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  useEffect(() => {
    props.defaultValue ? setActiveIndex(props.defaultValue) : setActiveIndex(3);
  }, []);

  useMemo(() => {
    props.onChange && props.onChange(activeIndex);
  }, [activeIndex]);

  // 上一页
  const handleChangeSlidePre = () => {
    const instance = swiperInstance;
    instance?.slidePrev();
  };

  // 下一页
  const handleChangeSlideNext = () => {
    const instance = swiperInstance;
    instance?.slideNext();
  };

  return (
    <div
      className={classNames(
        'component_business_number-slider',
        props.disabled ? 'active' : 'default',
        `theme-${props.theme}`,
        className,
      )}
    >
      <div className="slider-wrap">
        <div
          onClick={() => {
            handleChangeSlidePre();
          }}
        >
          <SvgIcon className="slider-button prev" name="icon-triangle" />
        </div>
        <Swiper
          className="slider"
          modules={[Controller]}
          spaceBetween={Math.floor(50 / 3)}
          slidesPerView={5}
          centeredSlides={true}
          controller={{ control: swiperInstance }}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex + 1);
          }}
          loop
        >
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
          <SwiperSlide>6</SwiperSlide>
          <SwiperSlide>7</SwiperSlide>
          <SwiperSlide>8</SwiperSlide>
          <SwiperSlide>9</SwiperSlide>
          <SwiperSlide>10</SwiperSlide>
          <SwiperSlide>11</SwiperSlide>
          <SwiperSlide>12</SwiperSlide>
        </Swiper>
        <div
          onClick={() => {
            handleChangeSlideNext();
          }}
        >
          <SvgIcon className="slider-button next" name="icon-triangle" />
        </div>
      </div>
      {props.disabled ? <div className="current-block"></div> : null}
    </div>
  );
}
