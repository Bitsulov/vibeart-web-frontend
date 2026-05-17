import { expect, test } from "@playwright/test";

const CHAT_URL = "/chats/01ARZ3NDEKTSV4RRFFQ69G5FAV";

test.describe("Chat - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(CHAT_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока ChatWindow", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot("chat-window.png", {
            animations: "disabled",
        });
    });
});
