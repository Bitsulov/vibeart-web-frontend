import { expect, test } from "@playwright/test";

const COMMUNITY_URL = "/en/communities/00000000-0000-4000-8000-00000000001d";

test.describe("Community - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(COMMUNITY_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока CommunityInfo", async ({ page }) => {
        await expect(page.locator("main section").nth(0)).toHaveScreenshot("community-info.png", {
            animations: "disabled",
        });
    });

    test("снимок блока AlbumSlider", async ({ page }) => {
        await expect(page.locator("main section").nth(1)).toHaveScreenshot("community-album-slider.png", {
            animations: "disabled",
        });
    });

    test("снимок блока PostList", async ({ page }) => {
        await expect(page.locator("main section").nth(2)).toHaveScreenshot("community-post-list.png", {
            animations: "disabled",
        });
    });
});
