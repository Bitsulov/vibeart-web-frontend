import { expect, test } from "@playwright/test";

test.describe("Policy - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/en/policy");
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока PolicyText", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot("policy-text.png", {
            animations: "disabled",
            maxDiffPixelRatio: 0.02,
            mask: [
                page.locator("main section li, main section p").filter({ hasText: /https?:\/\// }),
                page.locator("main section li, main section p").filter({ hasText: /[\w.+-]+@[\w-]+\.\w+/ }),
            ],
        });
    });
});
