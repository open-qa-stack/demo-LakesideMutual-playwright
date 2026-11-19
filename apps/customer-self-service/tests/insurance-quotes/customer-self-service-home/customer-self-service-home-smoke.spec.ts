import { expect, test } from "../../../../shared/fixtures.ts";

test("Open the Customer Self-Service welcome screen", { tag: ["@level-smoke","@domain-insurance-quotes","@feature-customer-self-service-home","@app-customer-self-service","@kind-other","@case-nominal","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open the Customer Self-Service home page", async () => {
    await page.goto("/");
    // Expect 1.1: The welcome screen is displayed.
    await expect(page.getByRole("heading", { name: "Welcome to LM Customer Self-Service", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
