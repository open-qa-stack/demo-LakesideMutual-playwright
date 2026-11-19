import { expect, test } from "../../../../shared/fixtures.ts";

test("Submit a quote request and verify it appears for Policy Management review", { tag: ["@level-cross-application","@domain-insurance-quotes","@feature-quote-request-review","@app-customer-self-service","@app-policy-management","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerSelfService, policyManagement }, testInfo) => {
  await test.step("1. Sign in to Customer Self-Service and open the policies and quote-request page", async () => {
    await page.goto("/policies");
    await customerSelfService.login.emailAddressTextbox.fill(process.env.CSS_DEMO_USERNAME!);
    await customerSelfService.login.passwordTextbox.fill(process.env.CSS_DEMO_PASSWORD!);
    await customerSelfService.login.logInButton.click();
    // Expect 1.1: The customer policies and quote requests page is displayed.
    await expect(page.getByText("Show archived Insurance Quote Requests", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Policies", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Start a new insurance quote request and advance to the insurance step", async () => {
    await customerSelfService.policies.newInsuranceQuoteRequestButton.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 2.1: The insurance configuration step is displayed.
    await expect(page.getByText("Start Date", { exact: true })).toBeVisible();
    await expect(page.getByText("Insurance Type", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("Deductible", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Select Home Insurance and a deductible of 1000 CHF, then advance to confirmation", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.insuranceTypelifeInsurancehomeInsurancehealthInsurancecarText.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.homeInsuranceOption.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.deductible300Chf500Chf1000Chf1500Chf2000Text.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.element1000ChfOption.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 3.1: The confirmation summarizes the request for Home Insurance with a 1000 CHF deductible and the selected start date.
    await expect(page.getByRole("cell", { name: "Home Insurance", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("cell", { name: "1000 CHF", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("cell", { name: "19.11.2026", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("4. Submit the quote request and verify its new row in Policy Management", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.requestAQuoteButton.click();
    await policyManagement.page.goto(new URL("/insurance-quote-requests", process.env.OQAS_BASE_URL_POLICY_MANAGEMENT).href);
    // Expect 4.1: Policy Management lists the submitted Home Insurance request as open.
    await expect(policyManagement.page.getByRole("heading", { name: "Insurance Quote Requests", exact: true })).toBeVisible();
    await expect(policyManagement.page.getByRole("cell", { name: "Home Insurance", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(policyManagement.page.getByRole("cell", { name: "Request open", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("4", { body: await policyManagement.page.screenshot(), contentType: "image/png" });
  });
});
