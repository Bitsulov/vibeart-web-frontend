/**
 * @file Фикстуры сущности `tag` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 *
 * Все моки исключены из анализа покрытия кода, так как не содержат
 * тестируемой логики.
 */
import {createTag} from "../model/createTag";

export const postTagsMock = [
    createTag({id: 1, title: "beauty", createdAt: ""}),
    createTag({id: 2, title: "nature", createdAt: ""}),
    createTag({id: 3, title: "aaa", createdAt: ""}),
    createTag({id: 4, title: "beauty", createdAt: ""}),
    createTag({id: 5, title: "aaa", createdAt: ""})
];

export const communityTagsMock = [
    createTag({id: 1, title: "beauty", createdAt: ""}),
    createTag({id: 2, title: "nature", createdAt: ""}),
    createTag({id: 3, title: "aaa", createdAt: ""}),
    createTag({id: 4, title: "beauty", createdAt: ""}),
    createTag({id: 5, title: "aaa", createdAt: ""})
];
