import c from "./createPostWidget.module.scss";
import {useTranslation} from "react-i18next";
import {SettingsItem} from "features/settingsItem";
import {useForm, useWatch} from "react-hook-form";
import type {ICreatePostForm} from "../lib/types";
import {
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
    useState
} from "react";
import {submitValidHandler} from "../model/submitValidHandler";
import {submitInvalidHandler} from "../model/submitInvalidHandler";
import {useNavigate} from "react-router-dom";
import {AddTags} from "widgets/addTags";
import {postTagsMock} from "entities/tag";
import {StylizedButton} from "features/stylizedButton";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import type {PostType} from "entities/post";
import {useDispatch} from "react-redux";

/** Свойства компонента {@link CreatePostWidget}. */
interface CreatePostWidgetProps extends ComponentPropsWithoutRef<"form"> {
    /** Общее количество страниц тегов для {@link AddTags}. */
    pages: number;
    /** Номер текущей страницы тегов. */
    currentPage: number;
    /** Функция обновления номера текущей страницы тегов. */
    setCurrentPage: Dispatch<SetStateAction<number>>;
    /** Количество кнопок страниц, отображаемых по обе стороны от текущей. */
    pagesDelta: number;
    /** Функция обновления `pagesDelta`. */
    setPagesDelta: Dispatch<SetStateAction<number>>;
    /** Функция обновления частичного состояния публикации — используется для обновления предпросмотра. */
    setPostInfo: Dispatch<SetStateAction<Partial<PostType>>>;
    /** Функция обновления загруженного файла изображения публикации. */
    setLoadedFile: Dispatch<SetStateAction<File | undefined>>;
    /** Загруженный файл изображения публикации. */
    loadedFile?: File;
    /** Функция, вызываемая после успешной отправки формы. По умолчанию — пустая функция. */
    onSubmit?: () => void;
    /** Дополнительный CSS-класс для корневого элемента формы. */
    className?: string;
}

/**
 * Форма создания публикации с полями загрузки изображения, названия, описания и выбором тегов.
 *
 * Использует react-hook-form для валидации: название обязательно (не более 15 символов),
 * описание — не более 200 символов. Теги выбираются через {@link AddTags}.
 * Подписи полей и кнопка отправки адаптируются под ширину экрана.
 * При успешной отправке вызывается {@link submitValidHandler}, при ошибке — {@link submitInvalidHandler}.
 */
export const CreatePostWidget = ({
    pages,
    currentPage,
    setCurrentPage,
    pagesDelta,
    setPagesDelta,
    setPostInfo,
    setLoadedFile,
    loadedFile,
    onSubmit = () => {},
    className = "",
    ...props
}: CreatePostWidgetProps) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit, control, formState: {isSubmitted, errors} } = useForm<ICreatePostForm>({
        shouldFocusError: false
    });

    const windowWidth = useWindowWidth();

    const titleValue = useWatch<ICreatePostForm>({control, name: "title"});
    const descriptionValue = useWatch<ICreatePostForm>({control, name: "description"});

    const isDesktop = windowWidth >= 1200;

    const submitText = isDesktop ? "createPost.submitTextDesktop" : "createPost.submitTextMobile";
    const descriptionText = isDesktop ? "createPost.textDescriptionDesktop" : "createPost.textDescriptionMobile";
    const titlePlaceholder = isDesktop && windowWidth < 1750
        ? "createPost.nameTitle"
        : "createPost.namePlaceholder";
    const descriptionPlaceholder = isDesktop && windowWidth < 1750
        ? "createPost.textTitle"
        : "createPost.textPlaceholder";

    const [chosenTags, setChosenTags] = useState<string[]>([]);

	return (
		<form
            onSubmit={handleSubmit(
                () => submitValidHandler(navigate, dispatch, loadedFile, onSubmit),
                (errors) => submitInvalidHandler(errors, dispatch)
            )}
            className={`${c.settings} ${className}`}
            {...props}
        >
            <h1 className={c.title}>{t("createPost.title")}</h1>
            <div className={c.fields}>
                <SettingsItem
                    title={t("createPost.imgTitle")}
                    description={t("createPost.imgDescription")}
                    type="buttons"
                    isError={!!errors.img}
                    isSubmitted={isSubmitted}
                    registerProps={register("img")}
                    id="image"
                    setEntityInfo={setPostInfo}
                    setLoadedFile={setLoadedFile}
                />
                <SettingsItem
                    title={t("createPost.nameTitle")}
                    description={t("createPost.nameDescription")}
                    placeholder={t(titlePlaceholder)}
                    type="input"
                    value={titleValue}
                    isError={!!errors.title}
                    isSubmitted={isSubmitted}
                    maxLength={15}
                    registerProps={register("title", {
                        required: "toast.emptyTitle",
                        maxLength: {value: 15, message: "toast.longTitle"},
                        onChange: (e) => setPostInfo(post => ({...post, name: e.target.value}))
                    })}
                    id="name"
                    setEntityInfo={setPostInfo}
                />
                <SettingsItem
                    title={t("createPost.textTitle")}
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
                    setEntityInfo={setPostInfo}
                />
            </div>
            <AddTags
                pagesDelta={pagesDelta}
                setPagesDelta={setPagesDelta}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pages={pages}
                chosenTags={chosenTags}
                setChosenTags={setChosenTags}
                tagsList={postTagsMock}
            />
            <StylizedButton aria-label={t("ariaLabel.createPost")} className={c.submit} type="submit">
                {t(submitText)}
            </StylizedButton>
		</form>
	)
}
