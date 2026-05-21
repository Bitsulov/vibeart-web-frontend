import { expect, test } from "@playwright/test";

const CREATE_POST_URL = "/post/add";

test.describe("CreatePost - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(CREATE_POST_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока CreatePost", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot("create-post.png", {
            animations: "disabled",
            mask: [page.locator("article")],
        });
    });
});
