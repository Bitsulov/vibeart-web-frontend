import { expect, test } from "@playwright/test";

const COMMUNITIES_URL = "/communities";

test.describe("Communities - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(COMMUNITIES_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока CommunitiesLists", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot("communities-lists.png", {
            animations: "disabled",
        });
    });
});
