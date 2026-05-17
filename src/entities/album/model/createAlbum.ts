import type {AlbumType} from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта альбома.
 *
 * Устанавливает значения по умолчанию для всех необязательных полей:
 * пустые строки для текстовых полей, `0` для id,
 * текущая дата для `createdAt`.
 *
 * @param album - Данные альбома, соответствующие типу `AlbumType`.
 * @returns Нормализованный объект альбома.
 *
 * @example
 * const album = createAlbum({ ULID: "01ARZ...", imageUrl: "/img.jpg" });
 * album.postCount // 0
 */
export function createAlbum({
    id = 0,
    ULID,
    name = "",
    description = "",
    postCount = 0,
    postsList = [],
    imageUrl,
    createdAt = new Date().toISOString()
}: AlbumType) {
    return {
        id,
        ULID,
        name,
        description,
        postCount,
        postsList,
        imageUrl,
        createdAt
    }
}
