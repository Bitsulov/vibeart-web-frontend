import { expect, test } from "@playwright/test";

const CREATE_ALBUM_URL = "/en/album/add";

test.describe("CreateAlbum - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(CREATE_ALBUM_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
    });

    test("снимок блока CreateAlbum", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "create-album.png",
            {
                animations: "disabled"
            }
        );
    });
});
