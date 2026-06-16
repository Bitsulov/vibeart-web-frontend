import c from "./communitiesAddButton.module.scss";
import { useTranslation } from "react-i18next";
import { Link, type LinkProps } from "react-router-dom";

/** Свойства компонента {@link CommunitiesAddButton}. */
interface CommunitiesAddButtonProps extends Omit<LinkProps, "to"> {
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
}

/**
 * Ссылка-кнопка для перехода на страницу создания сообщества (`/communities/add`).
 *
 * Текст и метка доступности локализованы через i18next.
 */
export const CommunitiesAddButton = ({
    className = "",
    ...props
}: CommunitiesAddButtonProps) => {
    const { t } = useTranslation();

    return (
        <Link
            to="/communities/add"
            aria-label={t("ariaLabel.goToCreateCommunityPage")}
            className={`${c.button} ${className}`}
            {...props}
        >
            {t("communities.addCommunity")}
        </Link>
    );
};
