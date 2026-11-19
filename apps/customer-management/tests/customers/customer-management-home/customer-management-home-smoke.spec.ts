import { expect, test } from "../../../../shared/fixtures.ts";

test("Open the Customer Management home screen", { tag: ["@level-smoke","@domain-customers","@feature-customer-management-home","@app-customer-management","@kind-other","@case-nominal","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open the Customer Management home page", async () => {
    await page.goto("/");
    // Expect 1.1: The customer management home screen is displayed.
    await expect(page.getByRole("heading", { name: "Customers", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
