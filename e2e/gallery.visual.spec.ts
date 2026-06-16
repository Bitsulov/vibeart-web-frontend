import { expect, test } from "@playwright/test";

const GALLERY_URL = "/en/gallery";

test.describe("Gallery - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(GALLERY_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока GalleryPostList", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "gallery-post-list.png",
            {
                animations: "disabled"
            }
        );
    });
});
