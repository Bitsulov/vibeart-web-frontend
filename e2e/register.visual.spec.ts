import { expect, test } from "@playwright/test";

const REGISTER_URL = "/register";

test.describe("Register - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(REGISTER_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока RegisterForm", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot("register-form.png", {
            animations: "disabled",
        });
    });
});
