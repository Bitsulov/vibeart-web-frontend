import { expect, test } from "@playwright/test";

const SETTINGS_URL = "/en/settings";

test.describe("Settings - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(SETTINGS_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока SettingsForm", async ({ page }) => {
        await expect(page.locator("main form").nth(0)).toHaveScreenshot("settings-form.png", {
            animations: "disabled",
        });
    });

    test("снимок блока EmailChangeForm", async ({ page }) => {
        await expect(page.locator("main form").nth(1)).toHaveScreenshot("settings-email-form.png", {
            animations: "disabled",
        });
    });

    test("снимок блока PasswordChangeForm", async ({ page }) => {
        await expect(page.locator("main form").nth(2)).toHaveScreenshot("settings-password-form.png", {
            animations: "disabled",
        });
    });
});
