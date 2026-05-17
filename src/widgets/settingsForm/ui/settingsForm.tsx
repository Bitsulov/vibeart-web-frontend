import c from "./settingsForm.module.scss";
import type {UserType} from "entities/user";
import {type ComponentPropsWithoutRef, type Dispatch, type SetStateAction, useState} from "react";
import {useTranslation} from "react-i18next";
import {useForm, useWatch} from "react-hook-form";
import type {ISettingsForm} from "../lib/types";
import {SettingsItem} from "features/settingsItem";
import {submitValidHandler} from "../model/submitValidHandler";
import {submitInvalidHandler} from "../model/submitInvalidHandler";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {StylizedButton} from "features/stylizedButton";
import {useDispatch} from "react-redux";

/** Свойства компонента {@link SettingsForm}. */
interface SettingsFormProps extends ComponentPropsWithoutRef<"form"> {
    /** Текущие данные пользователя, используемые для предпросмотра аватара и имени в полях. */
    userInfo: Partial<UserType>;
    /** Функция обновления данных пользователя для обновления предпросмотра при изменении полей. */
    setUserInfo: Dispatch<SetStateAction<Partial<UserType>>>;
}

/**
 * Форма редактирования профиля пользователя: аватар, имя, имя пользователя и описание.
 *
 * Использует react-hook-form для валидации: имя — обязательно (3–20 символов),
 * имя пользователя — 2–10 символов, описание — не более 200 символов.
 * Текст кнопки отправки адаптируется под ширину экрана.
 * При успехе вызывается {@link submitValidHandler}, при ошибке — {@link submitInvalidHandler}.
 */
export const SettingsForm = ({
    userInfo,
    setUserInfo,
    ...props
}: SettingsFormProps) => {
    const { t } = useTranslation();
    const windowWidth = useWindowWidth();
    const dispatch = useDispatch();

    const {register, setValue, handleSubmit, control, formState: {errors, isSubmitted}, /*setError*/} = useForm<ISettingsForm>(
        {shouldFocusError: false}
    );

    const isDesktop = windowWidth >= 1200;
    const descriptionText = isDesktop
        ? "settings.descriptionDesktop"
        : "settings.descriptionMobile";

    const submitText = isDesktop
        ? "settings.editDesktop"
        : "settings.editMobile";

    const nameValue = useWatch({ control, name: "title" });
    const idValue = useWatch({ control, name: "id" });
    const descriptionValue = useWatch({ control, name: "description" });

    const [_loadedFile, setLoadedFile] = useState<File | undefined>(undefined);

	return (
		<form
            onSubmit={handleSubmit(
                () => submitValidHandler(setValue),
                (errors) => submitInvalidHandler(errors, dispatch)
            )}
            className={c.form}
            {...props}
        >
            <h1 className={c.title}>{t("settings.title")}</h1>
			<div className={c.settings}>
                <SettingsItem
                    title={t("settings.avatarTitle")}
                    description={t("settings.avatarDescription")}
                    type="avatar"
                    isError={!!errors.avatar}
                    registerProps={register("avatar")}
                    isSubmitted={isSubmitted}
                    setEntityInfo={setUserInfo}
                    setLoadedFile={setLoadedFile}
                    id="avatar"
                    avatarUrl={userInfo.avatarUrl}
                    avatarAlt={userInfo.name || t("avatar")}
                />
                <SettingsItem
                    title={t("settings.nameTitle")}
                    description={t("settings.nameDescription")}
                    type="input"
                    isError={!!errors.title}
                    value={nameValue}
                    minLength={3}
                    maxLength={20}
                    placeholder={t("settings.namePlaceholder")}
                    placeholderClassName={c.small_placeholder}
                    registerProps={register("title", {
                        required: "toast.emptyName",
                        minLength: {
                            value: 3,
                            message: "toast.shortName"
                        },
                        maxLength: {
                            value: 20,
                            message: "toast.longName"
                        }
                    })}
                    isSubmitted={isSubmitted}
                    setEntityInfo={setUserInfo}
                    id="avatar"
                />
                <SettingsItem
                    title={t("settings.idTitle")}
                    description={t("settings.idDescription")}
                    type="id"
                    isError={!!errors.id}
                    value={idValue}
                    minLength={2}
                    maxLength={10}
                    placeholder={t("settings.idPlaceholder")}
                    placeholderClassName={c.small_placeholder}
                    registerProps={register("id", {
                        minLength: {
                            value: 2,
                            message: "toast.shortId"
                        },
                        maxLength: {
                            value: 10,
                            message: "toast.longId"
                        },
                    })}
                    isSubmitted={isSubmitted}
                    setEntityInfo={setUserInfo}
                    id="id"
                />
                <SettingsItem
                    title={t("settings.descriptionTitle")}
                    description={t(descriptionText)}
                    type="textarea"
                    isError={!!errors.description}
                    value={descriptionValue}
                    maxLength={200}
                    placeholder={t("settings.descriptionPlaceholder")}
                    registerProps={register("description", {
                        maxLength: {
                            value: 200,
                            message: "toast.longDescription"
                        }
                    })}
                    isSubmitted={isSubmitted}
                    setEntityInfo={setUserInfo}
                    id="description"
                />
            </div>
            <StylizedButton type="submit" aria-label={t("ariaLabel.saveUser")} className={c.submit}>
                {t(submitText)}
            </StylizedButton>
		</form>
	)
}
