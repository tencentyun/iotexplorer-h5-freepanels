import React, { useMemo, useState, useEffect } from 'react';
import { Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/less';

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
        <div className="cus-photo-slider-top1">
            <div className="slider-wrap1">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    initialSlide={value}
                    onClick={(index) => {
                        console.log(index);
                    }}
                    className="mySwiper"
                >
                    {items.map((item, index) => <SwiperSlide key={index}>{item}</SwiperSlide>)}
                    {/* <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide> */}
                </Swiper>
            </div>
        </div>

    );
}
