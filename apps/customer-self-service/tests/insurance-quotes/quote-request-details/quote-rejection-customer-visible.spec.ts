import { expect, test } from "../../../../shared/fixtures.ts";

test("Verify the rejection in the customer's request history", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-details","@app-customer-self-service","@kind-other","@case-nominal","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open the rejected request detail in the customer portal", async () => {
    await page.goto("/policies/insurance-quote-requests/29");
    // Expect 1.1: The customer's request history shows the submitted request and the rejection recorded by staff.
    await expect(page.getByText("18. Nov 2026 21:10:", { exact: true })).toBeVisible();
    await expect(page.getByText("18. Nov 2026 21:12:", { exact: true })).toBeVisible();
    await expect(page.getByText("Lakeside Mutual has rejected this Insurance Quote Request.", { exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
