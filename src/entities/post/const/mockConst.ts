/**
 * @file Фикстуры сущности `post` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 *
 * Все моки исключены из анализа покрытия кода, так как не содержат
 * тестируемой логики.
 */
import { createPost } from "../model/createPost";
import img from "shared/icons/img-CTA.jpg";
import img2 from "shared/icons/img-template.jpg";
import { profileUserMock } from "entities/user";
import { postTagsMock } from "entities/tag";

export const profileAlbum1PostsMock = [
    createPost({
        UUID: "00000000-0000-4000-8000-000000000007",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-00000000000b",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-00000000000a",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-000000000006",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    })
];

export const profileAlbum2PostsMock = [
    createPost({
        UUID: "00000000-0000-4000-8000-000000000007",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-00000000000b",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-00000000000a",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-000000000006",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-000000000013",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-000000000006",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-000000000013",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    })
];

export const postMock = createPost({
    UUID: "00000000-0000-4000-8000-000000000007",
    name: "Post title",
    description:
        "Description Description Description Description Description Description Description Description Description",
    author: profileUserMock,
    likes: 999000000,
    comments: 999000000,
    reports: 999000000,
    commentList: [],
    tagsList: postTagsMock,
    checkStatus: "checked",
    AIStatus: "good",
    imageUrl: img,
    createdAt: "2025-09-01T00:00:00.000Z"
});

export const galleryPostsMock = [
    createPost({
        UUID: "00000000-0000-4000-8000-00000000000d",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-000000000012",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img2,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-000000000013",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img2,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-00000000000e",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img2,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-000000000011",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-00000000000f",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img2,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createPost({
        UUID: "00000000-0000-4000-8000-000000000010",
        name: "post 1 name",
        description:
            "post 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 namepost 1 name",
        author: profileUserMock,
        likes: 1,
        comments: 1,
        reports: 1,
        commentList: [],
        tagsList: [],
        checkStatus: "checked",
        AIStatus: "good",
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    })
];
