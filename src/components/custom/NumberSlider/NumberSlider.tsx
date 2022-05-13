/**
 * 数字滑动选择器
 */
import React, { useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller } from 'swiper';
import { Icon } from '@custom/Icon';
import 'swiper/less';
import { numberToArray } from '@utils';

export interface NumberSliderProps {
  className?: string;
  value?: number;
  total?: number;
  disabled?: boolean;
  onChange?: (index: number | undefined) => void;
  onScroll?: (index: number | undefined) => void;
}

export function NumberSlider({
  value = 3,
  className,
  total = 12,
  onChange,
  onScroll,
  disabled = false,
}: NumberSliderProps) {
  const [activeIndex, setActiveIndex] = useState(value);
  const [instance, setInstance] = useState<SwiperCore>();

  useEffect(() => {
    setActiveIndex(value);
    instance && instance.slideTo(value);
  }, []);

  useMemo(() => {
    onScroll && onScroll(activeIndex);
  }, [activeIndex]);

  // 上一页
  const handleChangeSlidePre = () => {
    instance?.slidePrev();
  };

  // 下一页
  const handleChangeSlideNext = () => {
    instance?.slideNext();
  };

  return (
    <div
      className={classNames(
        'cus-number-slider',
        disabled ? 'active' : 'default',
        className,
      )}
    >
      <div className="slider-wrap">
        <div onClick={handleChangeSlidePre}>
          <Icon name="left" />
        </div>
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
            setActiveIndex(swiper.realIndex + 1);
          }}
          loop
        >
          {numberToArray(total).map((label, index) => (
            <SwiperSlide key={index}>{label}</SwiperSlide>
          ))}
        </Swiper>
        <div onClick={handleChangeSlideNext}>
          <Icon name="right" />
        </div>
      </div>
      {!disabled ? (
        <div className="current-block">
          <Icon name="up" />
        </div>
      ) : null}
    </div>
  );
}
