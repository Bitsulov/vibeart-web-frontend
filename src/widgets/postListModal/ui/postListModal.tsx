import c from "./postListModal.module.scss";
import { Post } from "features/post";
import { PagesButtons } from "features/pagesButtons";
import type { PostType } from "entities/post";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { postChooseHandler } from "../model/postChooseHandler";
import clsx from "clsx";

/** Свойства компонента {@link PostListModal}. */
interface PostListModalProps {
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Список публикаций для отображения. */
    postList: PostType[];
    /** Общее количество страниц публикаций. */
    pagesCount: number;
    /** Номер текущей страницы. */
    currentPage: number;
    /** Функция обновления номера текущей страницы. */
    setCurrentPage: Dispatch<SetStateAction<number>>;
    /** Количество кнопок страниц, отображаемых по обе стороны от текущей в {@link PagesButtons}. */
    pagesDelta: number;
    /** Функция обновления `pagesDelta`. Значение пересчитывается внутри компонента при изменении ширины экрана. */
    setPagesDelta: Dispatch<SetStateAction<number>>;
    /** Массив UUID публикаций, выбранных пользователем для добавления в альбом. */
    selectedPosts: string[];
    /** Функция обновления массива выбранных публикаций. */
    setSelectedPosts: Dispatch<SetStateAction<string[]>>;
}

/**
 * Список публикаций с постраничной навигацией для выбора внутри модального окна.
 *
 * Адаптирует значение `pagesDelta` в зависимости от ширины экрана.
 * Выбранные публикации подсвечиваются CSS-классом `c.active`. Клик по публикации
 * переключает её выбранность через {@link postChooseHandler}.
 * При пустом списке отображает локализованную заглушку.
 */
export const PostListModal = ({
    className = "",
    postList = [],
    pagesCount,
    currentPage,
    setCurrentPage,
    pagesDelta,
    setPagesDelta,
    selectedPosts = [],
    setSelectedPosts,
    ...props
}: PostListModalProps) => {
    const { t } = useTranslation();

    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth >= 1620) {
            setPagesDelta(4);
        } else if (windowWidth >= 1500) {
            setPagesDelta(3);
        } else if (windowWidth >= 1350) {
            setPagesDelta(4);
        } else if (windowWidth >= 1200) {
            setPagesDelta(3);
        } else if (windowWidth >= 520) {
            setPagesDelta(4);
        } else if (windowWidth >= 450) {
            setPagesDelta(3);
        } else {
            setPagesDelta(2);
        }
    }, [windowWidth, setPagesDelta]);

    const isPostsExists = postList.length !== 0;

    return (
        <section className={`${c.post_list} ${className}`} {...props}>
            {isPostsExists ? (
                <>
                    <div className={c.list}>
                        {postList.map(post => {
                            const isChosenPost = selectedPosts.includes(post.UUID);

                            return (
                                <Post
                                    imageUrl={post.imageUrl}
                                    key={`post ${post.UUID}`}
                                    title={post.name}
                                    date={post.createdAt}
                                    author={post.author}
                                    UUID={post.UUID}
                                    isShowAuthor={false}
                                    type="button"
                                    className={clsx(c.post, isChosenPost && c.active)}
                                    onClick={() =>
                                        postChooseHandler(
                                            isChosenPost,
                                            post.UUID,
                                            setSelectedPosts
                                        )
                                    }
                                    target="_blank"
                                />
                            );
                        })}
                    </div>
                    <PagesButtons
                        pagesDelta={pagesDelta}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        pagesCount={pagesCount}
                        className={c.pages}
                    />
                </>
            ) : (
                <h1 className={`${c.title} ${c.empty}`}>{t("emptyPosts")}</h1>
            )}
        </section>
    );
};
