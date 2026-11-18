import { expect, test } from "../../../../shared/fixtures.ts";

test("Render the quote request confirmation step", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-wizard","@app-customer-self-service","@kind-visual","@case-nominal","@data-read"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open the already authenticated policies page and start a quote request", async () => {
    await page.goto("/policies");
    await customerSelfService.policies.newInsuranceQuoteRequestButton.click();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Advance to insurance options", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Choose Home Insurance and 1000 CHF deductible, then continue", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.insuranceTypelifeInsurancehomeInsurancehealthInsurancecarText.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.homeInsuranceOption.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.deductible300Chf500Chf1000Chf1500Chf2000Text.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.element1000ChfOption.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 3.1: The confirmation step is displayed.
    await expect(page.getByRole("heading", { name: "Personal Data", exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
});
