import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

/**
 * Маршруты приложения без языкового префикса.
 *
 * Используются для клиентской навигации через `<Link>`. При открытии
 * {@link InitProvider} автоматически добавляет языковой префикс в URL.
 * Дублируются под `/:lang` для SSR и внешних ссылок с языковым префиксом.
 *
 * Все динамические сегменты используют ULID.
 */
const appRoutes = [
    index("./routes/_index.tsx"),
    route("auth", "./routes/auth.tsx"),
    route("register", "./routes/register.tsx"),
    route("forgotPassword", "./routes/forgotPassword.tsx"),
    route("profile/:ulid", "./routes/profile.$ulid.tsx"),
    route("gallery", "./routes/gallery.tsx"),
    route("post/add", "./routes/post.add.tsx"),
    route("post/:ulid", "./routes/post.$ulid.tsx"),
    route("post/:ulid/edit", "./routes/post.$ulid.edit.tsx"),
    route("album/add", "./routes/album.add.tsx"),
    route("album/:ulid", "./routes/album.$ulid.tsx"),
    route("album/:ulid/edit", "./routes/album.$ulid.edit.tsx"),
    route("chats", "./routes/chats.tsx"),
    route("chats/:ulid", "./routes/chats.$ulid.tsx"),
    route("communities", "./routes/communities.tsx"),
    route("communities/add", "./routes/communities.add.tsx"),
    route("communities/:ulid", "./routes/communities.$ulid.tsx"),
    route("communities/:ulid/edit", "./routes/communities.$ulid.edit.tsx"),
    route("settings", "./routes/settings.tsx"),
    route("notifications", "./routes/notifications.tsx"),
    route("agreement", "./routes/agreement.tsx"),
    route("policy", "./routes/policy.tsx"),
    route("contacts", "./routes/contacts.tsx"),
];

/**
 * Маршруты приложения с языковым префиксом `/:lang`.
 *
 * Дублируют {@link appRoutes}, но каждый маршрут имеет уникальный `id`,
 * так как React Router запрещает использовать один и тот же файл маршрута
 * в нескольких деревьях без явного идентификатора.
 */
const langAppRoutes = [
    index("./routes/_index.tsx", { id: "lang-index" }),
    route("auth", "./routes/auth.tsx", { id: "lang-auth" }),
    route("register", "./routes/register.tsx", { id: "lang-register" }),
    route("forgotPassword", "./routes/forgotPassword.tsx", { id: "lang-forgotPassword" }),
    route("profile/:ulid", "./routes/profile.$ulid.tsx", { id: "lang-profile" }),
    route("gallery", "./routes/gallery.tsx", { id: "lang-gallery" }),
    route("post/add", "./routes/post.add.tsx", { id: "lang-post-add" }),
    route("post/:ulid", "./routes/post.$ulid.tsx", { id: "lang-post" }),
    route("post/:ulid/edit", "./routes/post.$ulid.edit.tsx", { id: "lang-post-edit" }),
    route("album/add", "./routes/album.add.tsx", { id: "lang-album-add" }),
    route("album/:ulid", "./routes/album.$ulid.tsx", { id: "lang-album" }),
    route("album/:ulid/edit", "./routes/album.$ulid.edit.tsx", { id: "lang-album-edit" }),
    route("chats", "./routes/chats.tsx", { id: "lang-chats" }),
    route("chats/:ulid", "./routes/chats.$ulid.tsx", { id: "lang-chats-item" }),
    route("communities", "./routes/communities.tsx", { id: "lang-communities" }),
    route("communities/add", "./routes/communities.add.tsx", { id: "lang-communities-add" }),
    route("communities/:ulid", "./routes/communities.$ulid.tsx", { id: "lang-communities-item" }),
    route("communities/:ulid/edit", "./routes/communities.$ulid.edit.tsx", { id: "lang-communities-edit" }),
    route("settings", "./routes/settings.tsx", { id: "lang-settings" }),
    route("notifications", "./routes/notifications.tsx", { id: "lang-notifications" }),
    route("agreement", "./routes/agreement.tsx", { id: "lang-agreement" }),
    route("policy", "./routes/policy.tsx", { id: "lang-policy" }),
    route("contacts", "./routes/contacts.tsx", { id: "lang-contacts" }),
];

/**
 * Итоговое дерево маршрутов приложения.
 *
 * Служебные маршруты `robots.txt` и `sitemap.xml` обрабатываются первыми.
 * Корневой маршрут `/` перенаправляет на языковую версию через {@link _redirect}.
 * Маршруты без языкового префикса нужны для клиентской навигации,
 * с префиксом `/:lang` — для серверного рендеринга и прямых ссылок.
 * Маршрут `*` перехватывает все несуществующие пути и показывает страницу ошибки.
 */
export default [
    route("robots.txt", "./routes/robots.txt.ts"),
    route("sitemap.xml", "./routes/sitemap.xml.ts"),
    index("./routes/_redirect.tsx"),
    ...appRoutes,
    ...prefix(":lang", langAppRoutes),
    route("*", "./routes/$.tsx"),
] satisfies RouteConfig;
