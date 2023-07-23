import { test, expect } from "@playwright/test";
const fs = require("fs");

test.describe("Login", () => {
  test("Successful account login using correct credentials", async ({
    browser,
  }) => {
    /* Given user access the login page
  When user enters the valid account credentials
  And click the login button
  Then user should be redirected to dashboard */

    //actions
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.locator("[data-test='password']").fill("secret_sauce");
    await page.locator("#login-button").click();

    // assertion
    await expect(page.getByText("Swag Labs")).toBeVisible();
    await expect(page.locator("#inventory_container").first()).toBeVisible();
  });

  test("User clicks login button without entering credentials", async ({
    page,
  }) => {
    /* Given user is on the login page
  When user attempts to login without entering any credentials
  And user clicks the login button
  Then user should see an error message prompt
   */

    //actions
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#login-button").click();

    // assertion
    await expect(page.locator("[data-test='error']")).toBeVisible();
    // or
    await expect(page.locator("[data-test='error']")).toContainText(
      "Epic sadface: Username is required"
    );
  });
});
