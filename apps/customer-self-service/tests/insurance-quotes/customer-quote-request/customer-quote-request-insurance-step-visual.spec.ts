import { expect, test } from "../../../../shared/fixtures.ts";

test("Compare the quote request insurance configuration screen", { tag: ["@level-functional","@domain-insurance-quotes","@feature-customer-quote-request","@app-customer-self-service","@kind-visual","@case-nominal","@data-write"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open Customer Self-Service login", async () => {
    await page.goto("/login");
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Sign in with the displayed demo credentials and open a new quote request", async () => {
    await customerSelfService.login.fillInButton.click();
    await customerSelfService.login.logInButton.click();
    await customerSelfService.policies.newInsuranceQuoteRequestButton.click();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Advance to insurance configuration", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 3.1: The insurance configuration step is displayed.
    await expect(page.getByText("Start Date", { exact: true })).toBeVisible();
    await expect(page.getByText("Insurance TypeLife InsuranceHome InsuranceHealth InsuranceCar Insurance", { exact: true })).toBeVisible();
    await expect(page.getByText("Deductible300 CHF500 CHF1000 CHF1500 CHF2000 CHF2500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Previous", exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
});
