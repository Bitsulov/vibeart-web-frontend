import { expect, test } from "@playwright/test";

const ALBUM_URL = "/en/album/01ARZ3NDEKTSV4RRFFQ69G5FAV";

test.describe("Album - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(ALBUM_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока AlbumCard", async ({ page }) => {
        await expect(page.locator("main section").nth(0)).toHaveScreenshot("album-card.png", {
            animations: "disabled",
        });
    });
});
