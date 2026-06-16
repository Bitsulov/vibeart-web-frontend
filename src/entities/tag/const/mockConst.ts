/**
 * @file Фикстуры сущности `tag` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 *
 * Все моки исключены из анализа покрытия кода, так как не содержат
 * тестируемой логики.
 */
import { createTag } from "../model/createTag";

export const postTagsMock = [
    createTag({ title: "beauty", createdAt: "" }),
    createTag({ title: "nature", createdAt: "" }),
    createTag({ title: "aaa", createdAt: "" }),
    createTag({ title: "beauty", createdAt: "" }),
    createTag({ title: "aaa", createdAt: "" })
];

export const communityTagsMock = [
    createTag({ title: "beauty", createdAt: "" }),
    createTag({ title: "nature", createdAt: "" }),
    createTag({ title: "aaa", createdAt: "" }),
    createTag({ title: "beauty", createdAt: "" }),
    createTag({ title: "aaa", createdAt: "" })
];
