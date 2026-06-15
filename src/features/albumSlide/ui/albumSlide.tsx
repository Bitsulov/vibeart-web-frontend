import c from "./albumSlide.module.scss";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import React from "react";
import {albumClickHandler} from "../model/albumClickHandler";
import clsx from "clsx";

/** Свойства компонента {@link AlbumSlide}. */
interface AlbumSlideProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** URL обложки альбома. При отсутствии отображается иконка-заглушка. */
    imageUrl: string;
    /** Название альбома. */
    name: string;
    /** Метка доступности кнопки слайда для программ чтения с экрана. */
    ariaLabel?: string;
    /**
     * UUID альбома для формирования ссылки `/album/:uuid`.
     * Специальное значение `"all"` отрисовывает текст вместо ссылки
     * (слайд «Все альбомы»).
     */
    UUID: string;
    /** UUID текущего выбранного альбома. Используется для подсветки активного слайда. */
    selectedAlbum: string;
    /** Функция обновления выбранного альбома. */
    setSelectedAlbum: React.Dispatch<React.SetStateAction<string>>;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Признак постоянной активности анимации названия альбома без наведения курсора. */
    animateName?: boolean;
}

/**
 * Слайд альбома в слайдере выбора.
 *
 * При нажатии устанавливает данный альбом как выбранный. Ссылка на страницу
 * альбома встроена в название и доступна независимо от выбора слайда.
 * Специальное значение UUID `"all"` переключает слайдер в режим «все публикации».
 */
export const AlbumSlide = ({
    imageUrl,
    name,
    UUID,
    ariaLabel = "",
    selectedAlbum,
    setSelectedAlbum,
    className = "",
    animateName = false,
    ...props
}: AlbumSlideProps) => {
    const { t } = useTranslation();

	return (
        <button
            aria-label={ariaLabel}
            className={clsx(c.slide, className, selectedAlbum === UUID && c.active)}
            onClick={() => albumClickHandler(setSelectedAlbum, UUID)}
            {...props}
        >
            {imageUrl ?
                <img
                    width="80"
                    height="80"
                    src={imageUrl}
                    alt={t("profile.altAlbum", {name: name})}
                    className={c.album_img}
                />
            :
                <svg className={c.default_icon} width="80" height="80" viewBox="0 0 24 24" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <g id="Layer_2">
                        <path fill="currentColor" d="M17.9,11.3c-0.5-0.8-1.3-1.3-2.3-1.3s-1.8,0.5-2.3,1.3L13,11.8L12,10.1c-0.5-0.9-1.5-1.4-2.5-1.4S7.6,9.2,7,10.1l-4.9,7.9   c-0.4,0.6-0.4,1.4-0.1,2c0.4,0.6,1,1,1.7,1h6.9h10c0.7,0,1.3-0.4,1.6-1c0.3-0.6,0.3-1.3,0-1.9L17.9,11.3z M9.1,18.1   c-0.1,0.1-0.2,0.3-0.2,0.4c0,0.1,0,0.1,0,0.2c0,0.1,0,0.2-0.1,0.3l-5,0l4.9-7.9c0.2-0.4,0.6-0.4,0.8-0.4s0.5,0,0.8,0.4l1.6,2.5   L9.1,18.1z M10.9,19l2-3.2l1-1.5c0,0,0,0,0,0l1.2-1.9c0.2-0.3,0.5-0.3,0.6-0.3c0.1,0,0.4,0,0.6,0.3l4.2,6.7H10.9z"/>
                        <path fill="currentColor" d="M15,5c0,1.7,1.3,3,3,3s3-1.3,3-3s-1.3-3-3-3S15,3.3,15,5z M19,5c0,0.6-0.4,1-1,1s-1-0.4-1-1s0.4-1,1-1S19,4.4,19,5z"/>
                    </g>
                </svg>
            }
            {UUID === "all" ?
                <p className={c.text}>
                    {name}
                </p>
            :
                <Link
                    className={clsx(c.album_link, animateName && c.always_animate)}
                    aria-label={t("ariaLabel.goToAlbum", {name: name})}
                    to={`/album/${UUID}`}
                >
                    <span className={c.album_link_text}>{name}</span>
                </Link>
            }
        </button>
	)
}
