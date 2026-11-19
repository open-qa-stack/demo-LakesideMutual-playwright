import { expect, test } from "../../../../shared/fixtures.ts";

test("Open Customer Self-Service", { tag: ["@level-smoke","@domain-authentication","@feature-customer-self-service-home-response","@app-customer-self-service","@kind-other","@case-nominal","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open the Customer Self-Service home page", async () => {
    await page.goto("/");
    // Expect 1.1: The Customer Self-Service home welcome message is displayed.
    await expect(page.getByRole("heading", { name: "Lakeside Mutual - Customer Self-Service", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
