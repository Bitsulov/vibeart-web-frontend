import { expect, test } from "@playwright/test";

const CHAT_URL = "/en/chats/00000000-0000-4000-8000-00000000000b";

test.describe("Chat - визуальная проверка блоков", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(CHAT_URL);
        await page.waitForSelector("nav");
        await expect(page.getByRole("main")).toBeVisible();
        await page.addStyleTag({
            content: "*::-webkit-scrollbar { display: none !important; }"
        });
        await page.evaluate(() => document.fonts.ready);
    });

    test("снимок блока ChatWindow", async ({ page }) => {
        await expect(page.locator("main section").first()).toHaveScreenshot(
            "chat-window.png",
            {
                animations: "disabled"
            }
        );
    });
});
