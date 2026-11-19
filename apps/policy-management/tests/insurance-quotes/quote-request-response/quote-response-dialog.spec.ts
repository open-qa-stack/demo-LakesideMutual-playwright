import { expect, test } from "../../../../shared/fixtures.ts";

test("Compare the accept response dialog", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-response","@app-policy-management","@kind-visual","@case-nominal","@data-read"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open an unanswered request and open Respond", async () => {
    await page.goto("/insurance-quote-requests/35");
    await policyManagement.insuranceQuoteRequestsItem.respondButton.click();
    // Expect 1.1: The quote response dialog in its default Accept state is displayed.
    await expect(page.getByText("Respond to Insurance Quote Request", { exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
