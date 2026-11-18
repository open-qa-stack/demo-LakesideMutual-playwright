import { expect, test } from "../../../../shared/fixtures.ts";

test("Customer Management home page loads", { tag: ["@level-smoke","@domain-customers","@feature-application-load","@app-customer-management","@kind-other","@case-nominal","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open the Customer Management home page", async () => {
    await page.goto("/");
    // Expect 1.1: The page displays its customer list heading.
    await expect(page.getByRole("heading", { name: "Customers", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
