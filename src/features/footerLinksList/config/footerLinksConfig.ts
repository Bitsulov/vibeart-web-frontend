/**
 * Конфигурация ссылок в подвале сайта.
 *
 * Каждый элемент содержит ключ перевода для метки доступности (`ariaLabel`),
 * путь назначения (`src`) и ключ перевода текста ссылки (`text`).
 */
export const footerLinksConfig = [
    {ariaLabel: "ariaLabel.goToContacts", src: "/contacts", text: "pages.contactsWithUs"},
    {ariaLabel: "ariaLabel.goToUserAgreement", src: "/agreement", text: "pages.agreement"},
    {ariaLabel: "ariaLabel.goToPolicy", src: "/policy", text: "pages.policy"}
];
