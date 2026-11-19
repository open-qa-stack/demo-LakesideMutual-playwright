import { expect, test } from "../../../../shared/fixtures.ts";

test("Compare the quote request confirmation screen", { tag: ["@level-functional","@domain-insurance-quotes","@feature-customer-quote-request","@app-customer-self-service","@kind-visual","@case-nominal","@data-write"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open Customer Self-Service login", async () => {
    await page.goto("/login");
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Sign in and open a new quote request to its personal-data step", async () => {
    await customerSelfService.login.fillInButton.click();
    await customerSelfService.login.logInButton.click();
    await customerSelfService.policies.newInsuranceQuoteRequestButton.click();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Advance through insurance configuration to confirmation without submitting", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 3.1: The confirmation screen summarizes the request and offers submission.
    await expect(page.getByRole("heading", { name: "Personal Data", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Insurance", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Request a Quote", exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
});
