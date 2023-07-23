import { test } from "@playwright/test";
const fs = require("fs");

async function loadCookiesFromJSON(context) {
  const cookies = fs.readFileSync("./tests/src/jsonFileForLogin.json", "utf8");
  const deserializedCookies = JSON.parse(cookies);
  await context.addCookies(deserializedCookies);
}

module.exports = { loadCookiesFromJSON };

test("autologin", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.locator("[data-test='password']").fill("secret_sauce");
  await page.locator("#login-button").click();

  // get cookie
  const cookies = await context.cookies();
  const cookieJson = JSON.stringify(cookies);

  fs.writeFileSync("./tests/src/jsonFileForLogin.json", cookieJson);
});
