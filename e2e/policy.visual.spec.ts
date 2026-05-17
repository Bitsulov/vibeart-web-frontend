import { expect, test } from "@playwright/test";

test.describe("Policy - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/policy");
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока PolicyText", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot("policy-text.png", {
            animations: "disabled",
        });
    });
});
