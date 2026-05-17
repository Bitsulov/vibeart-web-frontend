import i18n from 'i18next';

/**
 * Возвращает локализованную строку относительного времени
 * (например, «2 часа назад» или «через 3 дня»).
 *
 * Перебирает единицы времени от лет до секунд и возвращает строку
 * для первой подходящей единицы. Если разница менее одной секунды,
 * возвращает ключ перевода `"justNow"`.
 *
 * @param language - Код языка по стандарту BCP 47 (например, `"ru"`, `"en"`).
 * @param date - Дата для сравнения с текущим моментом (объект `Date`
 *   или строка ISO 8601).
 * @returns Локализованная строка относительного времени.
 *
 * @example
 * getLocalTimeAgoString("ru", new Date(Date.now() - 7200000)) // "2 часа назад"
 * getLocalTimeAgoString("en", "2026-05-14T10:00:00.000Z")    // "3 days ago"
 */
export function getLocalTimeAgoString(language: string, date: Date | string) {
    const rtf = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });
    const diff = (new Date(date).getTime() - Date.now()) / 1000;

    const units: { unit: Intl.RelativeTimeFormatUnit; sec: number }[] = [
        { unit: 'year',   sec: 31536000 },
        { unit: 'month',  sec: 2592000  },
        { unit: 'week',   sec: 604800   },
        { unit: 'day',    sec: 86400    },
        { unit: 'hour',   sec: 3600     },
        { unit: 'minute', sec: 60       },
        { unit: 'second', sec: 1        },
    ];

    for(const { unit, sec } of units) {
        if(Math.abs(diff) >= sec) {
            return rtf.format(Math.round(diff / sec), unit);
        }
    }

    return i18n.t("justNow");
}
