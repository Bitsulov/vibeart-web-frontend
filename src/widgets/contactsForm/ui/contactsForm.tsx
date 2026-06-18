import c from "./contactsForm.module.scss";
import type { PrincipalUserState } from "entities/user";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextareaForm } from "features/textareaForm";
import type { IContactsForm } from "../lib/types";
import { submitValidHandler } from "../model/submitValidHandler";
import { submitInvalidHandler } from "../model/submitInvalidHandler";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { StylizedButton } from "features/stylizedButton";
import type { ComponentPropsWithoutRef } from "react";

/** Свойства компонента {@link ContactsForm}. */
interface ContactsFormProps extends ComponentPropsWithoutRef<"section"> {
    /** Данные текущего пользователя. */
    userInfo: PrincipalUserState;
}

/**
 * Форма для отправки сообщений администрации сайта.
 *
 * Содержит заголовок, описание с email-адресом и текстовое поле с лимитом 1000 символов.
 * Счётчик символов подсвечивается при превышении лимита.
 * При успешной отправке вызывается {@link submitValidHandler}, при ошибке — {@link submitInvalidHandler}.
 */
export const ContactsForm = ({ userInfo: _userInfo, ...props }: ContactsFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const email = import.meta.env.VITE_EMAIL;

    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: { errors, isSubmitted } /*setError*/
    } = useForm<IContactsForm>({ shouldFocusError: false });

    const textValue = useWatch<IContactsForm>({ control, name: "text" });
    const maxTextLength = 1000;
    const textLength = textValue?.length || 0;

    return (
        <section className={c.contacts} {...props}>
            <div className="container">
                <div className={c.contacts_inner}>
                    <h1 className={c.title}>{t("contacts.title")}</h1>
                    <p className={c.description}>
                        {t("contacts.description", { email })}
                    </p>
                    <form
                        onSubmit={handleSubmit(
                            () => submitValidHandler(setValue, dispatch),
                            errors => submitInvalidHandler(errors, dispatch)
                        )}
                        className={c.form}
                    >
                        <div
                            aria-hidden={true}
                            className={clsx(
                                c.limit,
                                errors.text?.type === "maxLength" && c.error
                            )}
                        >
                            {textLength}/{maxTextLength}
                        </div>
                        <TextareaForm
                            {...register("text", {
                                required: "toast.emptyReport",
                                maxLength: {
                                    value: maxTextLength,
                                    message: "toast.longReport"
                                }
                            })}
                            value={textValue}
                            placeholder={t("contacts.textPlaceholder")}
                            isError={!!errors.text}
                            isSubmitted={isSubmitted}
                            className={c.input}
                        />
                        <StylizedButton
                            className={c.submit}
                            aria-label={t("ariaLabel.sendReport")}
                            type="submit"
                        >
                            {t("Send")}
                        </StylizedButton>
                    </form>
                </div>
            </div>
        </section>
    );
};
