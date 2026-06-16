import c from "./footerLinksItem.module.scss";
import { Link, type LinkProps, useLocation } from "react-router-dom";

/** Свойства компонента {@link FooterLinksItem}. */
interface FooterLinksItemProps extends LinkProps {
    /** Текстовое описание ссылки для программ чтения с экрана. */
    ariaLabel: string;
}

/**
 * Одна навигационная ссылка в подвале сайта.
 *
 * Автоматически устанавливает `aria-current="page"`, если текущий
 * URL совпадает с адресом ссылки.
 */
export const FooterLinksItem = ({
    to,
    children,
    ariaLabel,
    ...props
}: FooterLinksItemProps) => {
    const path = useLocation().pathname;

    return (
        <Link
            aria-label={ariaLabel}
            to={to}
            aria-current={path === to ? "page" : undefined}
            className={c.link}
            {...props}
        >
            {children}
        </Link>
    );
};
