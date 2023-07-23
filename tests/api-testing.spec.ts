import { test, expect, request } from "@playwright/test";

test("Get response from API- List of data", async ({ page }) => {
  const response = await page.request.get("https://reqres.in/api/users?page=2");

  await expect(response.status()).toBe(200);
  const res = JSON.parse(await response.text());

  console.log(res.data[0]);
  await expect(res.data[0].email).toContain("michael.lawson@reqres.in");
});

test("Post API- Create user", async ({ page }) => {
  const userData = {
    name: "teast",
    job: "test",
  };

  const response = await page.request.post("https://reqres.in/api/users", {
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(userData),
  });

  await expect(response.status()).toBe(201);
  console.log(await response.json());
});
