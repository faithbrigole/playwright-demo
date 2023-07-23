import { test, expect, chromium } from "@playwright/test";
const { loadCookiesFromJSON } = require("./src/autologin.spec");

test("Add a product to the cart", async ({ browser }) => {
  /* Given user is on the homepage
  When user select a product named "Sauce Labs Backpack"
  And add the product to the cart
  Then the product should be displayed in the cart with the correct name and price*/

  // autologin
  const context = await browser.newContext();
  await loadCookiesFromJSON(context);

  const page = await context.newPage();
  await page.goto("https://www.saucedemo.com/inventory.html");

  //actions
  await page.locator("#add-to-cart-sauce-labs-backpack").click();

  const productName = await page.locator(".inventory_item_name").first();
  const getProductName = await productName.innerText();

  const productPrice = await page.locator(".inventory_item_price").first();
  const getProductPrice = await productPrice.innerText();

  await page.locator(".shopping_cart_link").click();
  await expect(page.locator(".inventory_item_name")).toContainText(
    getProductName
  );
  await expect(page.locator(".inventory_item_price")).toContainText(
    getProductPrice
  );
});
