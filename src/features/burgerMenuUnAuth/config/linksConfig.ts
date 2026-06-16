/**
 * Конфигурация пунктов навигационного меню для неавторизованных пользователей.
 *
 * Содержит ограниченный набор ссылок: вход в аккаунт и юридические страницы.
 */
export const linksConfig = [
    {
        id: 1,
        url: "/auth",
        labelKey: "ariaLabel.goToAuth",
        textKey: "pages.profile",
        isAdmin: false
    },
    {
        id: 2,
        url: "/agreement",
        labelKey: "ariaLabel.goToUserAgreement",
        textKey: "pages.agreement",
        isAdmin: false
    },
    {
        id: 3,
        url: "/policy",
        labelKey: "ariaLabel.goToPolicy",
        textKey: "pages.policy",
        isAdmin: false
    }
];
