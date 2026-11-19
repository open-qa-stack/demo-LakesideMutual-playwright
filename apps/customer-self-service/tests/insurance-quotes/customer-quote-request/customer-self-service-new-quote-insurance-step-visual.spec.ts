import { expect, test } from "../../../../shared/fixtures.ts";

test("Compare the quote insurance configuration step", { tag: ["@level-functional","@domain-insurance-quotes","@feature-customer-quote-request","@app-customer-self-service","@kind-visual","@case-nominal","@data-write"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open the login screen and sign in to reach the overview", async () => {
    await page.goto("/login");
    await customerSelfService.login.emailAddressTextbox.fill(process.env.CSS_DEMO_USERNAME!);
    await customerSelfService.login.passwordTextbox.fill(process.env.CSS_DEMO_PASSWORD!);
    await customerSelfService.login.logInButton.click();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open a new insurance quote request and advance to Insurance", async () => {
    await customerSelfService.policies.newInsuranceQuoteRequestButton.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 2.1: The Insurance configuration step with its type selector is displayed.
    await expect(page.getByText("Start Date", { exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Expand the insurance-type selector and select Home Insurance", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.insuranceTypelifeInsurancehomeInsurancehealthInsurancecarText.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.homeInsuranceOption.click();
    // Expect 3.1: Home Insurance is shown as the selected insurance type.
    await expect(page.getByText("Home InsuranceLife InsuranceHome InsuranceHealth InsuranceCar Insurance", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
});
