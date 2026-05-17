import c from "./galleryAddButton.module.scss";
import {Link, type LinkProps} from "react-router-dom";
import {useTranslation} from "react-i18next";

/** Свойства компонента {@link GalleryAddButton}. */
interface GalleryAddButtonProps extends Omit<LinkProps, "to"> {
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
}

/**
 * Ссылка-кнопка для перехода на страницу создания поста (`/post/add`).
 *
 * Текст и метка доступности локализованы через i18next.
 */
export const GalleryAddButton = ({ className = "", ...props }: GalleryAddButtonProps) => {
    const { t } = useTranslation();

	return (
		<Link
            to="/post/add"
            aria-label={t("ariaLabel.goToCreatePostPage")}
            className={`${c.button} ${className}`}
            {...props}
        >
            {t("gallery.addPost")}
		</Link>
	)
}
