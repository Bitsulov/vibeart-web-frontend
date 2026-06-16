import c from "./inputForm.module.scss";
import clsx from "clsx";
import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { Check, CircleX, EyeClosed, EyeIcon } from "lucide-react";
import { toggleTypeHandler } from "../model/toggleTypeHandler";
import { useTranslation } from "react-i18next";

/** Свойства компонента {@link InputForm}. */
interface InputFormProps extends ComponentPropsWithoutRef<"input"> {
    /** Признак ошибки валидации. Управляет цветом рамки и иконкой статуса. */
    isError: boolean;
    /** Признак того, что форма была отправлена. Статус валидации отображается
     *  только после первой попытки отправки, чтобы не раздражать пользователя
     *  ошибками до взаимодействия с полем. */
    isSubmitted: boolean;
    /** Показывать ли индикатор статуса валидации (цвет рамки и иконка).
     *  По умолчанию `true`. Отключается для полей, не требующих обратной связи. */
    isShowStatus?: boolean;
    /** Тип поля. При `"password"` отображается кнопка переключения видимости. */
    type?: "text" | "email" | "password";
    /** Дополнительный CSS-класс для плавающего замещающего текста (`<label>`). */
    placeholderClassName?: string;
}

/**
 * Поле ввода формы с плавающим замещающим текстом и визуальной обратной связью.
 *
 * Особенности:
 * - Замещающий текст анимированно поднимается при фокусе или заполнении поля.
 * - Для поля типа `"password"` отображается кнопка показа/скрытия пароля.
 * - Иконки валидации (галочка / крестик) и цвет рамки меняются после отправки формы.
 * - Атрибут `aria-invalid` устанавливается автоматически на основе `isError`.
 */
export const InputForm = ({
    type = "text",
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
}: InputFormProps) => {
    const { t } = useTranslation();
    const [currentType, setCurrentType] = useState<"text" | "email" | "password">(type);

    return (
        <div className={c.wrapper}>
            <input
                id={id}
                onChange={onChange}
                type={currentType}
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
            <label
                className={clsx(c.placeholder, value && c.lift, placeholderClassName)}
                htmlFor={id}
            >
                {placeholder}
            </label>
            {type === "password" &&
                (currentType === "password" ? (
                    <button
                        aria-label={t("ariaLabel.showPassword")}
                        type="button"
                        onClick={() => toggleTypeHandler(currentType, setCurrentType)}
                        className={c.show_password}
                    >
                        <EyeIcon
                            width="17"
                            height="17"
                            className={c.show_password_icon}
                        />
                    </button>
                ) : (
                    <button
                        aria-label={t("ariaLabel.hidePassword")}
                        type="button"
                        onClick={() => toggleTypeHandler(currentType, setCurrentType)}
                        className={c.show_password}
                    >
                        <EyeClosed
                            width="17"
                            height="17"
                            className={c.show_password_icon}
                        />
                    </button>
                ))}
            {isShowStatus &&
                (isError ? (
                    <CircleX
                        aria-hidden="true"
                        className={clsx(c.status_icon, isSubmitted && c.error_icon)}
                        width="14"
                        height="14"
                    />
                ) : (
                    <Check
                        aria-hidden="true"
                        className={clsx(c.status_icon, c.correct_icon)}
                        width="14"
                        height="14"
                    />
                ))}
        </div>
    );
};
