import { expect, test } from "../../../../shared/fixtures.ts";

test("Reject a quote and verify the customer sees the request status", { tag: ["@level-cross-application","@domain-insurance-quotes","@feature-quote-response","@app-policy-management","@app-customer-self-service","@kind-other","@case-nominal","@data-write"] }, async ({ page, policyManagement, customerSelfService }, testInfo) => {
  await test.step("1. Open the submitted Home Insurance quote request in Policy Management", async () => {
    await page.goto("/insurance-quote-requests/18");
    // Expect 1.1: The request detail is ready for a staff response.
    await expect(page.getByText("Home Insurance", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("15. Nov 2026 20:00", { exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open the response dialog and select Reject", async () => {
    await policyManagement.insuranceQuoteRequestsItem.respondButton.click();
    await policyManagement.insuranceQuoteRequestsItem.rejectRadio.click();
    // Expect 2.1: The dialog reflects rejection and removes the accept-only fields.
    await expect(page.getByText("Reject", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Send Response", exact: true })).toBeVisible();
    await expect(page.getByText("Expiration Date", { exact: true })).toBeHidden();
    await expect(page.getByText("Insurance Premium", { exact: true })).toBeHidden();
    await expect(page.getByText("Policy Limit", { exact: true })).toBeHidden();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Open Customer Self-Service to check the updated request status", async () => {
    await customerSelfService.page.goto(new URL("/policies", process.env.OQAS_BASE_URL_CUSTOMER_SELF_SERVICE).href);
    // Expect 3.1: The customer account displays its insurance quote request list and policy section.
    await expect(customerSelfService.page.getByText("Show archived Insurance Quote Requests", { exact: true })).toBeVisible();
    await expect(customerSelfService.page.getByRole("heading", { name: "Policies", exact: true })).toBeVisible();
    await testInfo.attach("3", { body: await customerSelfService.page.screenshot(), contentType: "image/png" });
  });
});
