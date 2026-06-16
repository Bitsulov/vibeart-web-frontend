import React from "react";

/**
 * Добавляет или убирает пост из списка выбранных по его идентификатору.
 *
 * @param isChosen - Признак того, что пост уже выбран.
 * @param UUID - Уникальный идентификатор публикации.
 * @param setSelectedPosts - Сеттер списка выбранных публикаций.
 */
export function postChooseHandler(
    isChosen: boolean,
    UUID: string,
    setSelectedPosts: React.Dispatch<React.SetStateAction<string[]>>
) {
    if (isChosen) {
        setSelectedPosts(posts => posts.filter(post => post !== UUID));
    } else {
        setSelectedPosts(posts => [...posts, UUID]);
    }
}
