import type { UserType } from "../lib/types";
import type { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

/** Возвращает полный объект текущего пользователя из хранилища Redux. */
export const selectUser = (state: RootState): UserType => state.user;

/**
 * Возвращает признак авторизации текущего пользователя.
 *
 * Предпочтительнее {@link selectUser}, когда компонент зависит только
 * от факта входа в систему, — сужение подписки снижает число лишних
 * перерисовок.
 */
export const selectIsAuthenticated = (state: RootState): boolean =>
    state.user.isAuthenticated;

/**
 * Возвращает мемоизированный объект с полными данными профиля пользователя.
 *
 * Мемоизация через `createSelector` гарантирует, что ссылка на объект
 * не изменится, если данные в хранилище не поменялись, предотвращая
 * лишние перерисовки зависимых компонентов.
 */
export const selectUserInfo = createSelector([selectUser], user => {
    return {
        UUID: user.UUID,
        email: user.email,
        name: user.name,
        username: user.username,
        description: user.description,
        worksCount: user.worksCount,
        subscribersCount: user.subscribersCount,
        subscribesCount: user.subscribesCount,
        albumList: user.albumList,
        createdAt: user.createdAt,
        trustStatus: user.trustStatus,
        isAuthenticated: user.isAuthenticated,
        isBlocked: user.isBlocked,
        onlineStatus: user.onlineStatus,
        role: user.role,
        avatarUrl: user.avatarUrl,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        accessTokenExpiresIn: user.accessTokenExpiresIn,
        refreshTokenExpiresIn: user.refreshTokenExpiresIn
    };
});
