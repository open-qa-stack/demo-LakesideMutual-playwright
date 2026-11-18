import { expect, test } from "../../../../shared/fixtures.ts";

test("Accept a quote and verify the customer can see the offer", { tag: ["@level-cross-application","@domain-insurance-quotes","@feature-quote-response","@app-policy-management","@app-customer-self-service","@kind-other","@case-nominal","@data-write"] }, async ({ page, policyManagement, customerSelfService }, testInfo) => {
  await test.step("1. Open the submitted Home Insurance quote request in Policy Management", async () => {
    await page.goto("/insurance-quote-requests/18");
    // Expect 1.1: The request detail shows a current quote request ready for response.
    await expect(page.getByText("Home Insurance", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("15. Nov 2026 20:00", { exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open the response dialog and accept the request with the provided quote values", async () => {
    await policyManagement.insuranceQuoteRequestsItem.respondButton.click();
    // Expect 2.1: The response dialog defaults to acceptance and has a prefilled expiration date.
    await expect(page.getByText("Respond to Insurance Quote Request", { exact: true })).toBeVisible();
    await expect(page.getByText("Accept", { exact: true })).toBeVisible();
    await expect(page.getByRole("textbox")).toHaveValue("2026-12-18T23:59");
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Open Customer Self-Service to verify the quote outcome in the customer's account", async () => {
    await customerSelfService.page.goto(new URL("/policies", process.env.OQAS_BASE_URL_CUSTOMER_SELF_SERVICE).href);
    // Expect 3.1: Customer Self-Service loads its customer policies screen after login.
    await expect(customerSelfService.page.getByText("Show archived Insurance Quote Requests", { exact: true })).toBeVisible();
    await expect(customerSelfService.page.getByRole("heading", { name: "Policies", exact: true })).toBeVisible();
    await expect(customerSelfService.page.getByText("250 CHF", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(customerSelfService.page.getByText("1000000 CHF", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("3", { body: await customerSelfService.page.screenshot(), contentType: "image/png" });
  });
});
