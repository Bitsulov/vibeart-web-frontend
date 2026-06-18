import { expect, test } from "@playwright/test";

const CHATS_URL = "/en/chats";

test.describe("Chats - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(CHATS_URL);
        await expect(page.getByRole("main")).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
    });

    test("снимок блока ChatsList", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "chats-list.png",
            {
                animations: "disabled",
                mask: [page.locator("[class*='date']")]
            }
        );
    });
});
