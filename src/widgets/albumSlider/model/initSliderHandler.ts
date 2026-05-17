import type Swiper from "swiper";
import React, {type RefObject} from "react";

/**
 * Инициализирует экземпляр Swiper и устанавливает начальные состояния границ.
 *
 * @param swiper - Экземпляр Swiper, переданный из события `onSwiper`.
 * @param swiperRef - Ref для хранения экземпляра Swiper.
 * @param setIsBeginning - Сеттер признака нахождения на первом слайде.
 * @param setIsEnd - Сеттер признака нахождения на последнем слайде.
 */
export function initSliderHandler(
    swiper: Swiper,
    swiperRef: RefObject<Swiper | null>,
    setIsBeginning: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEnd: React.Dispatch<React.SetStateAction<boolean>>
) {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
}
