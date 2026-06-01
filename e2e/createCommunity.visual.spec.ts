import {expect, test} from "@playwright/test";

const CREATE_COMMUNITY_URL = "/en/communities/add";

test.describe("CreateCommunity - визуальная проверка блоков", () => {
    test.beforeEach(async ({page}) => {
        await page.goto(CREATE_COMMUNITY_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока CreateCommunity", async ({page}) => {
        await expect(page.locator("main form").first()).toHaveScreenshot("create-community.png", {
            animations: "disabled",
        });
    });
});
