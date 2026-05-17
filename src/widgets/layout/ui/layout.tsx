import c from "./layout.module.scss";
import {Header} from "widgets/header";
import { useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {Modal} from "widgets/modal";
import {languagesConfig} from "../config/languagesConfig";
import {Footer} from "widgets/footer";
import {MouseHint} from "features/mouseHint";
import {Toast} from "features/toast";

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
 * Обёртка страницы: шапка, модальное окно смены языка, подсказка мыши, уведомления, основной контент и опциональный подвал.
 *
 * Управляет локальным состоянием видимости модального окна выбора языка
 * и передаёт его в {@link Header} и {@link Modal}.
 */
export const Layout = ({
    isShowFooter = true,
    children,
    isSmallTitle = false,
    className = "",
    ...props
}: LayoutProps) => {
    const [isShowChangeLanguage, setIsShowChangeLanguage] = useState(false);

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
                <MouseHint />
                <Toast />
                {children}
            </main>
            {isShowFooter &&
                <Footer />
            }
		</>
	)
}
