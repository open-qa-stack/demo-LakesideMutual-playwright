import { expect, test } from "../../../../shared/fixtures.ts";

test("Compare the Policy Management quote request list", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-list","@app-policy-management","@kind-visual","@case-nominal","@data-read"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open the Policy Management quote request list", async () => {
    await page.goto("/");
    await policyManagement.home.insuranceQuoteRequestsLink.click();
    // Expect 1.1: The quote request list screen is displayed.
    await expect(page.getByRole("heading", { name: "Insurance Quote Requests", exact: true })).toBeVisible();
    await expect(page.getByText("Open Insurance Quote Requests").filter({ visible: true })).not.toHaveCount(0);
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
