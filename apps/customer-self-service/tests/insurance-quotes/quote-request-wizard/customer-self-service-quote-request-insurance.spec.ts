import { expect, test } from "../../../../shared/fixtures.ts";

test("Render the quote request insurance options step", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-wizard","@app-customer-self-service","@kind-visual","@case-nominal","@data-read"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open the already authenticated policies page", async () => {
    await page.goto("/policies");
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Start a new quote request and advance to insurance options", async () => {
    await customerSelfService.policies.newInsuranceQuoteRequestButton.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 2.1: The insurance options step is displayed.
    await expect(page.getByText("Start Date", { exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
