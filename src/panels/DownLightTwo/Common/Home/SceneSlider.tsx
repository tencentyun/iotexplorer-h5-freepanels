import React, { useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller } from 'swiper';
import 'swiper/less';
import { numberToArray } from '@utils';

export interface SceneSliderProps {
  className?: string;
  value?: number;
  options?: string[];
  disabled?: boolean;
  onChange?: (index: number | undefined) => void;
  onScroll?: (index: number | undefined) => void;
}

export function SceneSlider({
  value = 3,
  className,
  options = [],
  onChange,
  onScroll,
  disabled = false,
}: SceneSliderProps) {
  const [activeIndex, setActiveIndex] = useState(value);
  const [instance, setInstance] = useState<SwiperCore>();
  const [instanceTop, setInstanceTop] = useState<SwiperCore>();

  useEffect(() => {
    setActiveIndex(value);
    instance && instance.slideTo(value);
    instanceTop && instanceTop.slideTo(value);
  }, []);


  useMemo(() => {
    onScroll && onScroll(activeIndex);
  }, [activeIndex]);

  const onScrollInner = (value) => {
    instanceTop && instanceTop.slideTo && instanceTop.slideTo(value);
  };

  return (
    <div>
      <div className="cus-photo-slider-top">
        <div className="slider-wrap">
          <Swiper
            className="slider"
            modules={[Controller]}
            initialSlide={value - 1}
            spaceBetween={8}
            slidesPerView={1}
            centeredSlides={true}
            controller={{ control: instanceTop }}
            onSwiper={setInstanceTop}
          >
            {options.map((pic, index) => (
              <SwiperSlide key={index}><div className="pic" style={{ backgroundImage: `url(${pic})` }}/></SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div
        className={classNames(
          'cus-photo-slider',
          disabled ? 'active' : 'default',
          className,
        )}
      >
        <div className="slider-wrap">
          <Swiper
            className="slider"
            modules={[Controller]}
            initialSlide={value - 1}
            spaceBetween={8}
            slidesPerView={5}
            centeredSlides={true}
            onTouchEnd={(e) => {
              onChange && onChange(e.realIndex + 1);
            }}
            controller={{ control: instance }}
            onSwiper={setInstance}
            onSlideChange={(swiper) => {
              onScrollInner(swiper.realIndex);
              setActiveIndex(swiper.realIndex + 1);
            }}
          >
            {options.map((pic, index) => <SwiperSlide key={index}><div className="pic" style={{ backgroundImage: `url(${pic})` }}/></SwiperSlide>)}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
