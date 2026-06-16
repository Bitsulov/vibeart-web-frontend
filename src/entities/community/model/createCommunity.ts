import type { CommunityType } from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта сообщества.
 *
 * Устанавливает значения по умолчанию: `0` для счётчиков, пустые строки
 * для текстовых полей, пустой массив для `albumsList`, `false` для
 * булевых флагов, `"trust"` для `trustStatus`.
 *
 * @param community - Данные сообщества, соответствующие типу `CommunityType`.
 * @returns Нормализованный объект сообщества.
 *
 * @example
 * const community = createCommunity({ UUID: "01ARZ...", owner: principalUserMock,
 *   username: "art-club" });
 * community.isSubscribed // false
 * community.posts        // 0
 */
export function createCommunity({
    UUID,
    owner,
    username,
    title = "",
    description = "",
    albumsList = [],
    posts = 0,
    subscribers = 0,
    subscribes = 0,
    createdAt = new Date().toISOString(),
    imageUrl = "",
    isSubscribed = false,
    isBlocked = false,
    trustStatus = "trust"
}: CommunityType) {
    return {
        UUID,
        owner,
        username,
        title,
        description,
        albumsList,
        posts,
        subscribers,
        subscribes,
        createdAt,
        imageUrl,
        isSubscribed,
        isBlocked,
        trustStatus
    };
}
