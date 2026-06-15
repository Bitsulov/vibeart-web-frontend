import {describe, expect, it} from "vitest";
import type {UserType} from "../lib/types";
import {setUserInfo, userReducer} from "./userSlice";
import {createAlbum} from "../../album";

const initialState: UserType = {
    UUID: "",
    name: "",
    email: "a",
    username: "",
    description: "",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    albumList: [],
    createdAt: "",
    trustStatus: "untrust",
    isAuthenticated: false,
    isBlocked: true,
    onlineStatus: "offline",
    role: "user",
    avatarUrl: "",
    accessToken: "",
    refreshToken: "",
    accessTokenExpiresIn: 0,
    refreshTokenExpiresIn: 0
}

describe("userSlice - слайс с данными текущего пользователя", () => {
    it("Изменение данных пользователя", () => {
        const result = userReducer(initialState, setUserInfo({
            UUID: "00000000-0000-4000-8000-00000000000b",
            name: "testUser",
            email: "testUser@gmail.com",
            username: "test_user",
            description: "description description description",
            worksCount: 1,
            subscribersCount: 10,
            subscribesCount: 5,
            albumList: [createAlbum({
                UUID: "",
                createdAt: "2026-03-29T17:25:15.940Z",
                name: "name",
                description: "description",
                postCount: 0,
                imageUrl: "",
                postsList: []
            })],
            createdAt: "2026-03-29T17:25:15.940Z",
            trustStatus: "untrust",
            isAuthenticated: true,
            isBlocked: false,
            onlineStatus: "online",
            role: "admin",
            avatarUrl: "/img/avatar.png",
        }));

        expect(result).toEqual({
            ...initialState,
            UUID: "00000000-0000-4000-8000-00000000000b",
            name: "testUser",
            email: "testUser@gmail.com",
            username: "test_user",
            description: "description description description",
            worksCount: 1,
            subscribersCount: 10,
            subscribesCount: 5,
            albumList: [createAlbum({
                UUID: "",
                createdAt: "2026-03-29T17:25:15.940Z",
                name: "name",
                description: "description",
                postCount: 0,
                imageUrl: "",
                postsList: []
            })],
            createdAt: "2026-03-29T17:25:15.940Z",
            trustStatus: "untrust",
            isAuthenticated: true,
            isBlocked: false,
            onlineStatus: "online",
            role: "admin",
            avatarUrl: "/img/avatar.png",
        });
    });
    it("Частичное изменение данных пользователя", () => {
        const result = userReducer(initialState, setUserInfo({
            UUID: "00000000-0000-4000-8000-000000000007",
            name: "testUser2",
            description: "description description description description",
            avatarUrl: "/img/avatar2.png",
        }));

        expect(result).toEqual({
            ...initialState,
            UUID: "00000000-0000-4000-8000-000000000007",
            name: "testUser2",
            description: "description description description description",
            avatarUrl: "/img/avatar2.png",
        });
    });
});
