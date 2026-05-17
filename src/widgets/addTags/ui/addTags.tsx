import c from "./addTags.module.scss";
import {useTranslation} from "react-i18next";
import {SearchInput} from "features/searchInput";
import {type ComponentPropsWithoutRef, type Dispatch, type SetStateAction, useEffect} from "react";
import type {TagType} from "entities/tag";
import {PostTag} from "features/postTag";
import {PagesButtons} from "features/pagesButtons";
import {chooseTagClickHandler} from "../model/chooseTagClickHandler";
import clsx from "clsx";
import {useWindowWidth} from "shared/hooks/useWindowWidth";

/** Свойства компонента {@link AddTags}. */
interface AddTagsProps extends ComponentPropsWithoutRef<"div"> {
    /** Список доступных тегов для выбора. */
    tagsList: TagType[];
    /** Общее количество страниц тегов. */
    pages: number;
    /** Номер текущей страницы. */
    currentPage: number;
    /** Функция обновления номера текущей страницы. */
    setCurrentPage: Dispatch<SetStateAction<number>>;
    /** Количество кнопок страниц, отображаемых по обе стороны от текущей в {@link PagesButtons}. */
    pagesDelta: number;
    /** Функция обновления `pagesDelta`. Значение пересчитывается внутри компонента при изменении ширины экрана. */
    setPagesDelta: Dispatch<SetStateAction<number>>;
    /** Массив названий выбранных тегов. */
    chosenTags: string[];
    /** Функция обновления массива выбранных тегов. */
    setChosenTags: Dispatch<SetStateAction<string[]>>;
}

/**
 * Виджет выбора тегов для публикации: поле поиска, список кнопок-тегов и постраничная навигация.
 *
 * Адаптирует значение `pagesDelta` в зависимости от ширины экрана, чтобы количество
 * кнопок страниц не переполняло панель. Выбранные теги подсвечиваются CSS-классом `c.select`.
 */
export const AddTags = ({
    tagsList,
    pages,
    currentPage,
    setCurrentPage,
    pagesDelta,
    setPagesDelta,
    chosenTags,
    setChosenTags,
    ...props
}: AddTagsProps) => {
    const { t } = useTranslation();

    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth >= 1500) {
            setPagesDelta(3);
        } else if (windowWidth >= 1350) {
            setPagesDelta(4);
        } else if (windowWidth >= 1200) {
            setPagesDelta(3);
        } else {
            setPagesDelta(2);
        }
    }, [windowWidth, setPagesDelta]);

	return (
		<div className={c.tags} {...props}>
			<h2 className={c.title}>{t("createPost.tagsTitle")}</h2>
            <SearchInput className={c.search} />
            <div className={c.tags_list}>
                {tagsList.map((tag, i) =>
                    <PostTag
                        type="button"
                        className={clsx(chosenTags.includes(tag.title) && c.select)}
                        onClick={() => chooseTagClickHandler(tag.title, chosenTags, setChosenTags)}
                        aria-label={t("chooseTag", {name: tag.title})}
                        key={`tag ${i}`}
                        tag={tag}
                    />
                )}
            </div>
            <PagesButtons
                pagesCount={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesDelta={pagesDelta}
            />
		</div>
	)
}
