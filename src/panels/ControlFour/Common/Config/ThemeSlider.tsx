import React, { useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller } from 'swiper';
import 'swiper/less';
import { Pagination } from "swiper";

export interface ThemeSliderProps {
    className?: string;
    value?: number;
    items?: string[];
    disabled?: boolean;
    onChange?: (index: number | undefined) => void;
    onScroll?: (index: number | undefined) => void;
}

export function ThemeSlider({
    value = 3,
    className,
    items = [],
    onChange,
    onScroll,
}: ThemeSliderProps) {

    return (
        <div className="cus-photo-slider-top">
            <div className="slider-wrap">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide>
                </Swiper>
            </div>
        </div>

    );
}
