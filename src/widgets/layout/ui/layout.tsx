import c from "./layout.module.scss";
import { Header } from "widgets/header";
import { useEffect, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Modal } from "widgets/modal";
import { languagesConfig } from "../config/languagesConfig";
import { Footer } from "widgets/footer";
import { MouseHint } from "features/mouseHint";
import { Toast } from "features/toast";
import { CookiesModal } from "features/cookiesModal";
import { useLocation } from "react-router-dom";
import { cookiesNoticeDisabledPaths } from "../config/cookiesNoticeDisabledPaths";
import { getCookieByName } from "shared/lib/getCookieByName";

/** Свойства компонента {@link Layout}. */
interface LayoutProps extends ComponentPropsWithoutRef<"main"> {
    /** Дочерний контент, отображаемый внутри тега `<main>`. */
    children?: ReactNode;
    /** Признак видимости подвала страницы. По умолчанию `true`. */
    isShowFooter?: boolean;
    /** Если `true`, заголовок страницы в шапке отображается уменьшенным шрифтом. По умолчанию `false`. */
    isSmallTitle?: boolean;
    /** Дополнительный CSS-класс для тега `<main>`. */
    className?: string;
}

/**
 * Обёртка страницы: шапка, модальные окна, подсказка мыши, уведомления, основной контент и опциональный подвал.
 *
 * Управляет видимостью модального окна выбора языка и модального окна куки.
 * Куки-окно показывается на клиенте при первом посещении (кука `acceptedCookie` отсутствует)
 * и скрывается на страницах из {@link cookiesNoticeDisabledPaths}.
 */
export const Layout = ({
    isShowFooter = true,
    children,
    isSmallTitle = false,
    className = "",
    ...props
}: LayoutProps) => {
    const location = useLocation();
    const pathSegment = location.pathname.split("/")[2] ?? "";
    const currentPath = pathSegment ? `/${pathSegment}` : "/";

    const [isShowChangeLanguage, setIsShowChangeLanguage] = useState(false);

    const [isShowConfirmCookies, setIsShowConfirmCookies] = useState(false);

    useEffect(() => {
        if (
            !getCookieByName("acceptedCookie") &&
            !cookiesNoticeDisabledPaths.includes(currentPath)
        ) {
            setIsShowConfirmCookies(true);
        }
    }, [currentPath]);

    return (
        <>
            <Header
                isShowChangeLanguage={isShowChangeLanguage}
                languagesConfig={languagesConfig}
                setIsShowChangeLanguage={setIsShowChangeLanguage}
                isSmallTitle={isSmallTitle}
            />
            <main className={`${c.main} ${className}`} {...props}>
                <Modal
                    languagesConfig={languagesConfig}
                    isShowChangeLanguage={isShowChangeLanguage}
                    setIsShowChangeLanguage={setIsShowChangeLanguage}
                />
                <CookiesModal
                    isShow={isShowConfirmCookies}
                    setIsShow={setIsShowConfirmCookies}
                />
                <MouseHint />
                <Toast />
                {children}
            </main>
            {isShowFooter && <Footer />}
        </>
    );
};
