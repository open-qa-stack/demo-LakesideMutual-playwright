import { expect, test } from "../../../../shared/fixtures.ts";

test("Review selected insurance options in the quote wizard", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-wizard","@app-customer-self-service","@kind-other","@case-nominal","@data-read"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Sign in and open the quote request wizard from the policies page", async () => {
    await page.goto("/");
    await customerSelfService.home.logInToAccessYourButton.click();
    await customerSelfService.login.emailAddressTextbox.fill(process.env.CSS_DEMO_USERNAME!);
    await customerSelfService.login.passwordTextbox.fill(process.env.CSS_DEMO_PASSWORD!);
    await customerSelfService.login.logInButton.click();
    await customerSelfService.policies.newInsuranceQuoteRequestButton.click();
    // Expect 1.1: The request list offers the action to start a new request.
    await expect(page.getByRole("link", { name: "Insurance Quote Requests", exact: true })).toBeVisible();
    await expect(page.getByText("New Insurance Quote Request", { exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Advance to the insurance options, then choose Home Insurance and 1000 CHF", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.insuranceTypelifeInsurancehomeInsurancehealthInsurancecarText.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.homeInsuranceOption.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.deductible300Chf500Chf1000Chf1500Chf2000Text.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.element1000ChfOption.click();
    // Expect 2.1: The insurance options screen reflects the chosen type and deductible.
    await expect(page.getByText("Home InsuranceLife InsuranceHome InsuranceHealth InsuranceCar Insurance", { exact: true })).toBeVisible();
    await expect(page.getByText("1000 CHF300 CHF500 CHF1000 CHF1500 CHF2000 CHF2500 CHF", { exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Continue to the confirmation step", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 3.1: Confirmation shows the selected options and the request submission action.
    await expect(page.getByRole("heading", { name: "Personal Data", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Insurance", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Start Date", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "18.11.2026", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Home Insurance", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("cell", { name: "1000 CHF", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Request a Quote", exact: true })).toBeVisible();
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
});
