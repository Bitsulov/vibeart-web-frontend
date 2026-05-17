import type Swiper from "swiper";
import React from "react";

/**
 * Обновляет состояния начала и конца слайдера при смене слайда.
 *
 * @param swiper - Текущий экземпляр Swiper.
 * @param setIsBeginning - Сеттер признака нахождения на первом слайде.
 * @param setIsEnd - Сеттер признака нахождения на последнем слайде.
 */
export function slideChangeHandler(
    swiper: Swiper,
    setIsBeginning: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEnd: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
}
