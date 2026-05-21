import {expect, test} from "@playwright/test";

const CONTACTS_URL = "/contacts";

test.describe("Contacts - визуальная проверка блоков", () => {
    test.beforeEach(async ({page}) => {
        await page.goto(CONTACTS_URL);
        await expect(page.getByRole("main")).toBeVisible();
    });

    test("снимок блока ContactsForm", async ({page}) => {
        await expect(page.locator("main section").first()).toHaveScreenshot("contacts.png", {
            animations: "disabled",
        });
    });
});
