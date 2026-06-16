import c from "./transparentLink.module.scss";
import { Link, type LinkProps } from "react-router-dom";

/** Свойства компонента {@link TransparentLink}. */
interface TransparentLinkProps extends Omit<LinkProps, "to"> {
    /** Путь назначения для навигации (передаётся в проп `to` компонента `Link`). */
    href: string;
    /** Текстовое описание для программ чтения с экрана. */
    ariaLabel?: string;
}

/**
 * Навигационная ссылка с вторичным прозрачным стилем.
 *
 * Используется для действий меньшей приоритетности рядом со {@link StylizedLink}.
 * Принимает `href` вместо `to` для единообразия с нативными HTML-ссылками.
 */
export const TransparentLink = ({
    className,
    children,
    href,
    ariaLabel,
    ...props
}: TransparentLinkProps) => {
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
