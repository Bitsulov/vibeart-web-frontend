/**
 * Конфигурация пунктов навигационного меню для авторизованных пользователей.
 *
 * Каждый элемент описывает одну ссылку: URL назначения, ключ перевода
 * для текста и метки доступности, а также признак видимости исключительно
 * для администраторов (`isAdmin`).
 */
export const linksConfig = [
    {id: 1, url: "/profile/", labelKey: "ariaLabel.goToProfile", textKey: "pages.profile", isAdmin: false},
    {id: 2, url: "/gallery", labelKey: "ariaLabel.goToGallery", textKey: "pages.gallery", isAdmin: false},
    {id: 3, url: "/chats", labelKey: "ariaLabel.goToChats", textKey: "pages.chats", isAdmin: false},
    {id: 4, url: "/notifications", labelKey: "ariaLabel.goToNotifications", textKey: "pages.notifications", isAdmin: false},
    {id: 5, url: "/communities", labelKey: "ariaLabel.goToCommunities", textKey: "pages.communities", isAdmin: false},
    {id: 6, url: "/admin", labelKey: "ariaLabel.goToAdmin", textKey: "pages.admin", isAdmin: true}
];
