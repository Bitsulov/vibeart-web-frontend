import c from "./textareaForm.module.scss";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import {Check, CircleX} from "lucide-react";

/** Свойства компонента {@link TextareaForm}. */
interface TextareaFormProps extends ComponentPropsWithoutRef<"textarea"> {
    /** Признак ошибки валидации. Управляет цветом рамки и иконкой статуса. */
    isError: boolean;
    /** Признак того, что форма была отправлена. Статус валидации отображается
     *  только после первой попытки отправки. */
    isSubmitted: boolean;
    /** Показывать ли индикатор статуса валидации. По умолчанию `true`. */
    isShowStatus?: boolean;
    /** Дополнительный CSS-класс для плавающего замещающего текста (`<label>`). */
    placeholderClassName?: string;
}

/**
 * Многострочное поле ввода формы с плавающим замещающим текстом и визуальной обратной связью.
 *
 * Повторяет поведение {@link InputForm}, адаптированное для элемента `<textarea>`:
 * замещающий текст поднимается при фокусе или заполнении, иконки валидации
 * и цвет рамки меняются в зависимости от состояния.
 */
export const TextareaForm = ({
    value,
    className = "",
    onChange,
    isError = false,
    isSubmitted = false,
    isShowStatus = true,
    autoComplete = "on",
    id,
    placeholder = "",
    placeholderClassName = "",
    ...props
}: TextareaFormProps) => {
    return (
        <div className={c.wrapper}>
            <textarea
                id={id}
                onChange={onChange}
                className={clsx(
                    c.input,
                    className,
                    isShowStatus && isSubmitted && isError && c.error,
                    isShowStatus && isSubmitted && !isError && c.correct,
                    !isShowStatus && c.full
                )}
                autoComplete={autoComplete}
                aria-invalid={isError ? "true" : "false"}
                aria-label={placeholder}
                {...props}
            />
            <label className={clsx(c.placeholder, value && c.lift, placeholderClassName)} htmlFor={id}>{placeholder}</label>
            {isShowStatus && (
                isError
                    ? <CircleX aria-hidden="true" className={clsx(c.status_icon, isSubmitted && c.error_icon)} width="14" height="14" />
                    : <Check aria-hidden="true" className={clsx(c.status_icon, c.correct_icon)} width="14" height="14" />
            )}
        </div>
    )
}
