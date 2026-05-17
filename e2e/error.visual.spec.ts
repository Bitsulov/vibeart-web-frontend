import { expect, test } from "@playwright/test";

test.describe("Error - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/invalidUrl");
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока ErrorInfo", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot("error-info.png", {
            animations: "disabled",
        });
    });
});
