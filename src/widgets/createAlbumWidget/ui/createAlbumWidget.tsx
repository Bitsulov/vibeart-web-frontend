import c from "./createAlbumWidget.module.scss";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useForm, useWatch} from "react-hook-form";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {type ComponentPropsWithoutRef, type Dispatch, type SetStateAction} from "react";
import {submitValidHandler} from "../model/submitValidHandler";
import {submitInvalidHandler} from "../model/submitInvalidHandler";
import {SettingsItem} from "features/settingsItem";
import {StylizedButton} from "features/stylizedButton";
import type {ICreateAlbumForm} from "../lib/types";
import type {AlbumType} from "entities/album";

/** Свойства компонента {@link CreateAlbumWidget}. */
interface CreateAlbumWidgetProps extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
    /** Дополнительный CSS-класс для корневого элемента формы. */
    className?: string;
    /** Функция обновления частичного состояния альбома — используется для обновления предпросмотра. */
    setAlbumInfo: Dispatch<SetStateAction<Partial<AlbumType>>>;
    /** Загруженный файл обложки альбома. */
    loadedFile: File | undefined;
    /** Функция обновления загруженного файла обложки. */
    setLoadedFile: Dispatch<SetStateAction<File | undefined>>;
    /** Функция, вызываемая после успешной валидации формы. Получает функцию навигации как аргумент. */
    onSubmit: (navigation: () => void) => void;
    /** Функция обновления признака ошибки загрузки изображения. */
    setIsErrorImg: Dispatch<SetStateAction<boolean>>;
}

/**
 * Форма создания альбома с полями загрузки обложки, названия и описания.
 *
 * Использует react-hook-form для валидации: название обязательно (не более 15 символов),
 * описание — не более 200 символов. Подписи полей и кнопка отправки адаптируются
 * под ширину экрана. При успешной отправке вызывается {@link submitValidHandler},
 * при ошибке валидации — {@link submitInvalidHandler}.
 */
export const CreateAlbumWidget = ({
    className = "",
    setAlbumInfo,
    loadedFile,
    setLoadedFile,
    onSubmit,
    setIsErrorImg,
    ...props
}: CreateAlbumWidgetProps) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit, control, formState: {isSubmitted, errors} } = useForm<ICreateAlbumForm>({
        shouldFocusError: false
    });

    const windowWidth = useWindowWidth();

    const titleValue = useWatch<ICreateAlbumForm>({control, name: "title"});
    const descriptionValue = useWatch<ICreateAlbumForm>({control, name: "description"});

    const isDesktop = windowWidth >= 1200;

    const submitText = isDesktop ? "createAlbum.submitTextDesktop" : "createAlbum.submitTextMobile";
    const descriptionText = isDesktop ? "createAlbum.textDescriptionDesktop" : "createAlbum.textDescriptionMobile";
    const titlePlaceholder = isDesktop && windowWidth < 1750
        ? "createAlbum.nameTitle"
        : "createAlbum.namePlaceholder";
    const descriptionPlaceholder = isDesktop && windowWidth < 1750
        ? "createAlbum.textTitle"
        : "createAlbum.textPlaceholder";

    return (
        <form
            onSubmit={handleSubmit(
                () => submitValidHandler(navigate, dispatch, loadedFile, setIsErrorImg, onSubmit),
                (errors) => submitInvalidHandler(errors, dispatch)
            )}
            className={`${c.settings} ${className}`}
            {...props}
        >
            <h1 className={c.title}>{t("createAlbum.title")}</h1>
            <div className={c.fields}>
                <SettingsItem
                    title={t("createAlbum.imgTitle")}
                    description={t("createAlbum.imgDescription")}
                    type="buttons"
                    isError={!!errors.img}
                    isSubmitted={isSubmitted}
                    registerProps={register("img")}
                    id="image"
                    setEntityInfo={setAlbumInfo}
                    setLoadedFile={setLoadedFile}
                />
                <SettingsItem
                    title={t("createAlbum.nameTitle")}
                    description={t("createAlbum.nameDescription")}
                    placeholder={t(titlePlaceholder)}
                    type="input"
                    value={titleValue}
                    isError={!!errors.title}
                    isSubmitted={isSubmitted}
                    maxLength={15}
                    registerProps={register("title", {
                        required: "toast.emptyTitle",
                        maxLength: {value: 15, message: "toast.longTitle"},
                        onChange: (e) => setAlbumInfo(album => ({...album, name: e.target.value}))
                    })}
                    id="name"
                    setEntityInfo={setAlbumInfo}
                />
                <SettingsItem
                    title={t("createAlbum.textTitle")}
                    description={t(descriptionText)}
                    placeholder={t(descriptionPlaceholder)}
                    type="textarea"
                    value={descriptionValue}
                    isError={!!errors.description}
                    isSubmitted={isSubmitted}
                    maxLength={200}
                    // minLength={}
                    registerProps={register("description", {
                        maxLength: {value: 200, message: "toast.longDescription"}
                    })}
                    id="description"
                    setEntityInfo={setAlbumInfo}
                />
            </div>
            <StylizedButton aria-label={t("ariaLabel.createAlbum")} className={c.submit} type="submit">
                {t(submitText)}
            </StylizedButton>
        </form>
    )
}
