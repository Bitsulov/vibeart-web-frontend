import { expect, test } from "@playwright/test";

test.describe("Agreement - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/agreement");
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока AgreementText", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot("agreement-text.png", {
            animations: "disabled",
        });
    });
});
