import { expect, test } from "../../../../shared/fixtures.ts";

test("Submit a quote request and verify it appears in Customer Management", { tag: ["@level-cross-application","@domain-insurance-quotes","@feature-quote-request-submission","@app-customer-self-service","@app-customer-management","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerSelfService, customerManagement }, testInfo) => {
  await test.step("1. Open the already signed-in Customer Self-Service page", async () => {
    await page.goto("/");
    await page.getByRole("button", { name: "Log in to access your LM account", exact: true }).click();
    await page.getByRole("textbox", { name: "Email Address", exact: true }).fill("admin@example.com");
    await page.getByRole("textbox", { name: "Password", exact: true }).fill("1password");
    await page.getByRole("button", { name: "Log in", exact: true }).click();
    // Expect 1.1: The signed-in customer’s policies page displays quote requests and policy details.
    await expect(page.getByText("Show archived Insurance Quote Requests", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Policies", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Health Insurance", exact: true })).toBeVisible();
    await expect(page.getByText("05. Feb 2018 – 10. Feb 2018", { exact: true })).toBeVisible();
    await expect(page.getByText("1500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("250 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("1000000 CHF", { exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Start a quote request, select Home Insurance and a 1000 CHF deductible, then review it", async () => {
    await customerSelfService.policies.newInsuranceQuoteRequestButton.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.insuranceTypelifeInsurancehomeInsurancehealthInsurancecarText.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.homeInsuranceOption.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.deductible300Chf500Chf1000Chf1500Chf2000Text.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.element1000ChfOption.click();
    await customerSelfService.policiesNewInsuranceQuoteRequest.nextButton.click();
    // Expect 2.1: The review shows the selected insurance options and entered customer address.
    await expect(page.getByRole("cell", { name: "18.11.2026", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "1000 CHF", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Submit the request", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.requestAQuoteButton.click();
    // Expect 3.1: The submitted request appears in the quote request list.
    await expect(page.getByRole("cell", { name: "Home Insurance", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("cell", { name: "Waiting for Quote", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("4. Open Customer Management to observe its customer listing after the request submission", async () => {
    await customerManagement.page.goto(new URL("/", process.env.OQAS_BASE_URL_CUSTOMER_MANAGEMENT).href);
    // Expect 4.1: Customer Management displays its customer list.
    await expect(customerManagement.page.getByRole("heading", { name: "Customers", exact: true })).toBeVisible();
    await expect(customerManagement.page.getByRole("cell", { name: "Ado Kinnett", exact: true })).toBeVisible();
    await testInfo.attach("4", { body: await customerManagement.page.screenshot(), contentType: "image/png" });
  });
});
