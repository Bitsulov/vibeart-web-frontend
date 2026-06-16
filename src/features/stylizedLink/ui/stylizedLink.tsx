import c from "./stylizedLink.module.scss";
import { Link, type LinkProps } from "react-router-dom";

/** Свойства компонента {@link StylizedLink}. */
interface StylizedLinkProps extends Omit<LinkProps, "to"> {
    /** Путь назначения для навигации (передаётся в проп `to` компонента `Link`). */
    href: string;
    /** Текстовое описание для программ чтения с экрана. */
    ariaLabel?: string;
}

/**
 * Навигационная ссылка, стилизованная под основную кнопку приложения.
 *
 * Использует `Link` из React Router, принимая `href` вместо `to`
 * для единообразия с нативными HTML-ссылками в остальных компонентах.
 */
export const StylizedLink = ({
    className,
    children,
    href,
    ariaLabel,
    ...props
}: StylizedLinkProps) => {
    return (
        <Link
            className={`${c.link} ${className}`}
            to={href}
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </Link>
    );
};
