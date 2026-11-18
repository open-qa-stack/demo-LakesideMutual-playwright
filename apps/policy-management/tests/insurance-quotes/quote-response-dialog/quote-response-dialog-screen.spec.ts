import { expect, test } from "../../../../shared/fixtures.ts";

test("Quote response dialog", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-response-dialog","@app-policy-management","@kind-visual","@case-nominal","@data-write"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open the open quote request detail and choose Respond; opening the dialog changes no stored data", async () => {
    await page.goto("/insurance-quote-requests");
    await policyManagement.insuranceQuoteRequests.showDetailsButtonInRow("15. Nov 2026 19:59").click();
    await policyManagement.insuranceQuoteRequestsItem.respondButton.click();
    // Expect 1.1: The response dialog is displayed.
    await expect(page.getByText("Respond to Insurance Quote Request", { exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
