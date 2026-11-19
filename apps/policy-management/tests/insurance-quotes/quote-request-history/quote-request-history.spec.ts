import { expect, test } from "../../../../shared/fixtures.ts";

test("Compare the quote request history screen", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-history","@app-policy-management","@kind-visual","@case-nominal","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open a submitted quote request detail page", async () => {
    await page.goto("/insurance-quote-requests/1");
    // Expect 1.1: The quote request history screen is displayed.
    await expect(page.getByRole("link", { name: "Insurance Quote Requests", exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
  });
});
