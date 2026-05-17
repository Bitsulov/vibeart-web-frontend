import { expect, test } from "@playwright/test";

const AUTH_URL = "/auth";

test.describe("Auth - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(AUTH_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока AuthForm", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot("auth-form.png", {
            animations: "disabled",
        });
    });
});
