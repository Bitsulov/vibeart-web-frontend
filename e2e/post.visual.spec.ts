import { expect, test } from "@playwright/test";

const POST_URL = "/en/post/01ARZ3NDEKTSV4RRFFQ69G5FAB";

test.describe("Post - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(POST_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока PostCard", async ({ page }) => {
        await expect(page.locator("main section").nth(0)).toHaveScreenshot("post-card.png", {
            animations: "disabled",
        });
    });

    test("снимок блока PostComments", async ({ page }) => {
        await expect(page.locator("#comments")).toHaveScreenshot("post-comments.png", {
            animations: "disabled",
            mask: [page.locator("#comments a + div > p:last-child")],
        });
    });
});
