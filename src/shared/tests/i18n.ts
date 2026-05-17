/**
 * @file Тестовый экземпляр i18next.
 *
 * Инициализируется с пустым словарём, поэтому все ключи перевода
 * возвращаются как есть (без замены на переведённый текст).
 * Это упрощает проверки в тестах: вместо зависимости от конкретного
 * перевода достаточно проверять ключ (`"pages.profile"`), а не его
 * значение (`"Профиль"`).
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
    lng: 'ru',
    fallbackLng: 'ru',
    ns: ['translation'],
    defaultNS: 'translation',
    resources: {
        ru: { translation: {} }, // пустой — ключи вернутся как есть
    },
    interpolation: { escapeValue: false },
})

export default i18n;
