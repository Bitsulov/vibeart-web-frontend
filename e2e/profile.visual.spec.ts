import { expect, test } from "@playwright/test";

const PROFILE_URL = "/profile/01ARZ3NDEKTSV4RRFFQ69G5FAV";

test.describe("Profile - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(PROFILE_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока ProfileInfo", async ({ page }) => {
        await expect(page.locator("main section").nth(0)).toHaveScreenshot("profile-info.png", {
            animations: "disabled",
            mask: [page.getByText("Created at:", { exact: true }).locator("..")],
        });
    });

    test("снимок блока AlbumSlider", async ({ page }) => {
        await expect(page.locator("main section").nth(1)).toHaveScreenshot("profile-album-slider.png", {
            animations: "disabled",
        });
    });

    test("снимок блока PostList", async ({ page }) => {
        await expect(page.locator("main section").nth(2)).toHaveScreenshot("profile-post-list.png", {
            animations: "disabled",
        });
    });
});
