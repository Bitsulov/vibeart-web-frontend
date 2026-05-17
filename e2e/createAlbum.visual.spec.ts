import { expect, test } from "@playwright/test";

const CREATE_ALBUM_URL = "/album/add";

test.describe("CreateAlbum - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(CREATE_ALBUM_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока CreateAlbum", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot("create-album.png", {
            animations: "disabled",
        });
    });
});
