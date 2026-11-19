import { expect, test } from "../../../../shared/fixtures.ts";

test("Configure and review an insurance quote request", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-configuration","@app-customer-self-service","@kind-other","@case-nominal","@data-read"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open the new quote request screen while signed in", async () => {
    await page.getByRole("button", { name: "Log in to access your LM account", exact: true }).click();
    await page.getByRole("textbox", { name: "Email Address", exact: true }).fill(process.env.CUSTOMER_SELF_SERVICE_USERNAME!);
    await page.getByRole("textbox", { name: "Password", exact: true }).fill(process.env.CUSTOMER_SELF_SERVICE_PASSWORD!);
    await page.getByRole("button", { name: "Log in", exact: true }).click();
    await page.goto("/policies/new-insurance-quote-request");
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Continue from the personal data step to the insurance configuration", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 2.1: The insurance configuration screen offers a start date, selectable insurance types and deductible amounts.
    await expect(page.getByText("Start Date", { exact: true })).toBeVisible();
    await expect(page.getByRole("textbox")).toHaveValue("2026-11-19");
    await expect(page.getByText("Insurance TypeLife InsuranceHome InsuranceHealth InsuranceCar Insurance", { exact: true })).toBeVisible();
    await expect(page.getByText("Deductible300 CHF500 CHF1000 CHF1500 CHF2000 CHF2500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("Insurance TypeLife InsuranceHome InsuranceHealth InsuranceCar Insurance", { exact: true })).toBeVisible();
    await expect(page.getByText("Insurance TypeLife InsuranceHome InsuranceHealth InsuranceCar Insurance", { exact: true })).toBeVisible();
    await expect(page.getByText("Insurance TypeLife InsuranceHome InsuranceHealth InsuranceCar Insurance", { exact: true })).toBeVisible();
    await expect(page.getByText("Insurance TypeLife InsuranceHome InsuranceHealth InsuranceCar Insurance", { exact: true })).toBeVisible();
    await expect(page.getByText("Deductible300 CHF500 CHF1000 CHF1500 CHF2000 CHF2500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("Deductible300 CHF500 CHF1000 CHF1500 CHF2000 CHF2500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("Deductible300 CHF500 CHF1000 CHF1500 CHF2000 CHF2500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("Deductible300 CHF500 CHF1000 CHF1500 CHF2000 CHF2500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("Deductible300 CHF500 CHF1000 CHF1500 CHF2000 CHF2500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("Deductible300 CHF500 CHF1000 CHF1500 CHF2000 CHF2500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Contact Address", exact: true })).toBeHidden();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Set the start date and select Home Insurance and 1000 CHF, then advance to confirmation", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.textbox.fill("2027-01-01");
    await customerSelfService.policiesNewInsuranceQuoteRequest.insuranceTypelifeInsurancehomeInsurancehealthInsurancecarText.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.homeInsuranceOption.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.deductible300Chf500Chf1000Chf1500Chf2000Text.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.element1000ChfOption.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 3.1: The confirmation displays the selected start date, insurance type and deductible.
    await expect(page.getByRole("cell", { name: "01.01.2027", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Home Insurance", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("cell", { name: "1000 CHF", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Personal Data", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Insurance", exact: true })).toBeVisible();
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
});
