import type {UserType} from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта пользователя.
 *
 * Применяет следующие преобразования:
 * - Добавляет символ `@` к полю `username` (например, `"johndoe"` → `"@johndoe"`).
 * - Устанавливает значения по умолчанию для необязательных полей.
 *
 * @param user - Данные пользователя, соответствующие типу `UserType`.
 * @returns Нормализованный объект пользователя.
 *
 * @example
 * const user = createUser({ UUID: "01ARZ...", email: "a@b.com",
 *   username: "johndoe", createdAt: "2026-01-01T00:00:00.000Z",
 *   trustStatus: "trust", isAuthenticated: true, isBlocked: false,
 *   onlineStatus: "online" });
 * user.username // "@johndoe"
 */
export function createUser({
    UUID,
    name = "",
    email,
    username,
    description = "",
    worksCount = 0,
    subscribersCount = 0,
    subscribesCount = 0,
    albumList = [],
    createdAt,
    trustStatus,
    isAuthenticated,
    isBlocked,
    onlineStatus,
    role = "user",
    avatarUrl = "",
    accessToken = "",
    refreshToken = "",
    accessTokenExpiresIn = 0,
    refreshTokenExpiresIn = 0
}: UserType) {
    return {
        UUID,
        name,
        email,
        username: `@${username}`,
        description,
        worksCount,
        subscribersCount,
        subscribesCount,
        albumList,
        createdAt,
        trustStatus,
        isAuthenticated,
        isBlocked,
        onlineStatus,
        role,
        avatarUrl,
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        refreshTokenExpiresIn
    };
}
