import { Links, Meta, Scripts, ScrollRestoration, useLocation, useRouteLoaderData } from "react-router";
import { defaultLang } from "shared/const/const";
import { type ReactNode } from "react";

/** Свойства компонента {@link Layout}. */
interface LayoutProps {
    /** Содержимое приложения, вставляемое в `<body>`. */
    children: ReactNode;
}

/**
 * HTML-оболочка приложения.
 *
 * Формирует полный HTML-документ: тег `<html>` с атрибутом `lang`, полученным
 * из загрузчика корневого маршрута через {@link useRouteLoaderData}, теги
 * `<head>` с мета-тегами, SEO-разметкой и иконками, а также специальные
 * компоненты React Router для вставки CSS и скомпилированных ресурсов.
 *
 * Canonical URL строится по нормализованному адресу: завершающий слеш обрезается,
 * чтобы сервер и клиент формировали одинаковый адрес (`/ru/` → `/ru`).
 *
 * @param props - {@link LayoutProps}
 * @returns Полный HTML-документ с переданным содержимым в `<body>`.
 */
export function Layout({ children }: LayoutProps) {
    const data = useRouteLoaderData<{ lang: string }>("root");
    const lang = data?.lang ?? defaultLang;
    const { pathname } = useLocation();
    
    const normalizedPathname = pathname.replace(/\/$/, "") || "/";
    const canonicalURL = `${import.meta.env.VITE_URL}${normalizedPathname}`;

    return (
        <html lang={lang}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="icon" href="/favicon.png" type="image/png" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="/favicon.png" type="image/png" />
                <link rel="canonical" href={canonicalURL} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalURL} />
                <meta property="og:locale" content={lang} />
                <meta property="og:site_name" content="VibeArt" />
                <meta property="og:image" content="/preview-logo.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="theme-color" content="#121212" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
