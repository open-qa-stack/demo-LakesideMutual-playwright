import { expect, test } from "../../../../shared/fixtures.ts";

test("Show an error for an unknown quote request", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-history","@app-policy-management","@kind-functional","@case-negative","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open the details page for an unknown quote request", async () => {
    await page.goto("/insurance-quote-requests/999999");
    // Expect 1.1: The details page indicates an error and that the request was not found.
    await expect(page.getByText("Error!", { exact: true })).toBeVisible();
    await expect(page.getByText("Insurance Quote Request not found.", { exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
