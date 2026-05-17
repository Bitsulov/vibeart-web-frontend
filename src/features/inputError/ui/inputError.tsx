import c from "./inputError.module.scss";
import {TriangleAlert} from "lucide-react";
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import type { ComponentPropsWithoutRef } from "react";

/** Свойства компонента {@link InputError}. */
interface InputErrorProps extends ComponentPropsWithoutRef<"div"> {
    /** Ключ локализации текста ошибки. Если не передан — блок визуально скрыт,
     *  но остаётся в DOM, чтобы не вызывать скачков верстки при появлении ошибки. */
    text?: string;
    /** Значение атрибута `id` параграфа с сообщением. Указывается в атрибуте
     *  `aria-describedby` связанного поля ввода для доступности. */
    error_id?: string;
}

/**
 * Блок отображения ошибки валидации поля формы.
 *
 * Компонент всегда присутствует в DOM: при отсутствии `text` он скрыт через CSS,
 * что предотвращает смещение элементов при появлении сообщения об ошибке.
 * Содержит иконку предупреждения и локализованный текст ошибки.
 */
export const InputError = ({ error_id, className, text, ...props }: InputErrorProps) => {
    const { t } = useTranslation();

	return (
        <>
            <div className={clsx(c.error, text && c.show, !text && c.hide, className && className)} {...props}>
                <TriangleAlert width="12" height="12" className={c.error_icon} />
                <p id={error_id} className={c.error_text}>{text && t(text)}</p>
            </div>
        </>
	)
}
