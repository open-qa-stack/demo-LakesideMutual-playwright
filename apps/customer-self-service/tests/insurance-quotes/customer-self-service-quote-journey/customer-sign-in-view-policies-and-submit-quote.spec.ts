import { expect, test } from "../../../../shared/fixtures.ts";

test("Sign in, review policies, submit a quote request, and verify it in the management applications", { tag: ["@level-end-to-end","@domain-insurance-quotes","@feature-customer-self-service-quote-journey","@app-customer-self-service","@app-policy-management","@app-customer-management","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerSelfService, policyManagement, customerManagement }, testInfo) => {
  await test.step("1. Open Customer Self-Service login", async () => {
    await page.goto("/login");
    // Expect 1.1: The login form and demo login option are displayed.
    await expect(page.getByRole("heading", { name: "Log in to your LM account", exact: true })).toBeVisible();
    await expect(page.getByText("Email Address").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("Password").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("button", { name: "Fill in", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Fill the displayed demo credentials and sign in", async () => {
    await customerSelfService.login.fillInButton.click();
    await customerSelfService.login.logInButton.click();
    // Expect 2.1: The authenticated overview displays quote requests and the customer's policy information.
    await expect(page.getByText("Show archived Insurance Quote Requests", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "New Insurance Quote Request", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Policies", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Health Insurance", exact: true })).toBeVisible();
    await expect(page.getByText("1500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("250 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("1000000 CHF", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Log in to your LM account", exact: true })).toBeHidden();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Open the quote request form to review the prefilled personal data", async () => {
    await customerSelfService.policies.newInsuranceQuoteRequestButton.click();
    // Expect 3.1: The personal data step shows the customer's prefilled contact address and billing address option.
    await expect(page.getByRole("heading", { name: "Contact Address", exact: true })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Street Address", exact: true })).toHaveValue("Oberseestrasse 11");
    await expect(page.getByText("8640").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("textbox", { name: "City", exact: true })).toHaveValue("Rapperswil");
    await expect(page.getByRole("heading", { name: "Billing Address", exact: true })).toBeVisible();
    await expect(page.getByText("Same as Contact Address", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Next", exact: true })).toBeVisible();
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("4. Advance to insurance configuration, enter the start date, choose Home Insurance and a 1000 CHF deductible, then advance to confirmation", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.textbox.fill("2026-12-01");
    await customerSelfService.policiesNewInsuranceQuoteRequest.insuranceTypelifeInsurancehomeInsurancehealthInsurancecarText.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.homeInsuranceOption.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.deductible300Chf500Chf1000Chf1500Chf2000Text.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.element1000ChfOption.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 4.1: The confirmation summarizes the chosen date, insurance type and deductible.
    await expect(page.getByRole("heading", { name: "Personal Data", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Insurance", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "01.12.2026", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Home Insurance", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("cell", { name: "1000 CHF", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("button", { name: "Request a Quote", exact: true })).toBeVisible();
    await testInfo.attach("4", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("5. Submit the quote request and verify the created request in Policy Management", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.requestAQuoteButton.click();
    await policyManagement.page.goto(new URL("/", process.env.OQAS_BASE_URL_POLICY_MANAGEMENT).href);
    await policyManagement.home.insuranceQuoteRequestsLink.click();
    // Expect 5.1: The request appears in Policy Management as an open Home Insurance request for Max Mustermann.
    await expect(policyManagement.page.getByRole("heading", { name: "Insurance Quote Requests", exact: true })).toBeVisible();
    await expect(policyManagement.page.getByRole("cell", { name: "19. Nov 2026 01:55", exact: true })).toBeVisible();
    await expect(policyManagement.page.getByRole("row", { name: "15. Nov 2026 19:44" }).getByRole("link", { name: "Max Mustermann", exact: true })).toBeVisible();
    await expect(policyManagement.page.getByRole("cell", { name: "Home Insurance", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(policyManagement.page.getByRole("cell", { name: "Request open", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("5", { body: await policyManagement.page.screenshot(), contentType: "image/png" });
  });
  await test.step("6. Verify the customer directory in Customer Management", async () => {
    await customerManagement.page.goto(new URL("/", process.env.OQAS_BASE_URL_CUSTOMER_MANAGEMENT).href);
    // Expect 6.1: Customer Management displays the customer directory.
    await expect(customerManagement.page.getByRole("heading", { name: "Customers", exact: true })).toBeVisible();
    await expect(customerManagement.page.getByRole("cell", { name: "Ado Kinnett", exact: true })).toBeVisible();
    await expect(customerManagement.page.getByRole("columnheader", { name: "Email", exact: true })).toBeVisible();
    await expect(customerManagement.page.getByRole("columnheader", { name: "Address", exact: true })).toBeVisible();
    await testInfo.attach("6", { body: await customerManagement.page.screenshot(), contentType: "image/png" });
  });
});
