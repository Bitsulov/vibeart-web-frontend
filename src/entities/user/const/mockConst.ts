/**
 * @file Фикстуры сущности `user` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 */
import {createUser} from "../model/createUser";
import type {AuthResponse, UserDetailResponse} from "../lib/types";
import avatar from "shared/icons/img-CTA.jpg";

export const principalUserMock = createUser({
    UUID: "00000000-0000-4000-8000-00000000000b",
    email: "testEmail@test.com",
    name: "testUsergffdgfd",
    username: "testUser",
    description: "Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    albumList: [],
    createdAt: new Date().toISOString(),
    trustStatus: "untrust",
    isAuthenticated: true,
    isBlocked: true,
    onlineStatus: "online",
    role: "user",
    avatarUrl: "",
    accessToken: "",
    refreshToken: "",
    accessTokenExpiresIn: 0,
    refreshTokenExpiresIn: 0
});

export const profileUserMock = createUser({
    UUID: "00000000-0000-4000-8000-000000000006",
    email: "testEmail2@test.com",
    name: "testUser",
    username: "testUser",
    description: "Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user",
    worksCount: 0,
    subscribersCount: 999100,
    subscribesCount: 0,
    albumList: [],
    createdAt: "2026-03-22T18:50:29.921Z",
    trustStatus: "trust",
    isAuthenticated: true,
    isBlocked: false,
    onlineStatus: "online",
    role: "user",
    avatarUrl: avatar,
    accessToken: "",
    refreshToken: "",
    accessTokenExpiresIn: 0,
    refreshTokenExpiresIn: 0
});

export const authResponseMock: AuthResponse = {
    uuid: "00000000-0000-4000-8000-00000000000a",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    accessTokenExpiresIn: 60000,
    refreshTokenExpiresIn: 120000,
};

export const userDetailResponseMock: UserDetailResponse = {
    uuid: "00000000-0000-4000-8000-00000000000a",
    name: "testUser",
    username: "testUser",
    email: "testEmail@test.com",
    photoUrl: "",
    enabled: "true",
};

export const communityAdminsMock = [
    createUser({
        UUID: "00000000-0000-4000-8000-000000000014",
        email: "admin1@test.com",
        name: "Alice Wonder",
        username: "alice.wonder",
        description: "",
        worksCount: 12,
        subscribersCount: 450,
        subscribesCount: 30,
        albumList: [],
        createdAt: "2025-12-01T10:00:00.000Z",
        trustStatus: "trust",
        isAuthenticated: true,
        isBlocked: false,
        onlineStatus: "online",
        role: "user",
        avatarUrl: avatar,
        accessToken: "",
        refreshToken: "",
        accessTokenExpiresIn: 0,
        refreshTokenExpiresIn: 0
    }),
    createUser({
        UUID: "00000000-0000-4000-8000-00000000001b",
        email: "admin2@test.com",
        name: "Bob Rivers",
        username: "bob.rivers",
        description: "",
        worksCount: 7,
        subscribersCount: 210,
        subscribesCount: 15,
        albumList: [],
        createdAt: "2026-01-05T08:00:00.000Z",
        trustStatus: "trust",
        isAuthenticated: true,
        isBlocked: false,
        onlineStatus: "offline",
        role: "user",
        avatarUrl: avatar,
        accessToken: "",
        refreshToken: "",
        accessTokenExpiresIn: 0,
        refreshTokenExpiresIn: 0
    }),
];
