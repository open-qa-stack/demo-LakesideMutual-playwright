import { expect, test } from "../../../../shared/fixtures.ts";

test("Sign in and submit a home insurance quote request", { tag: ["@level-business","@domain-insurance-quotes","@feature-quote-request-submission","@app-customer-self-service","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open Customer Self-Service at its current policies page, which already contains the submitted quote from exploration", async () => {
    await page.goto("/");
    // Expect 1.1: The page displays the submitted quote that can be opened to inspect its details.
    await expect(page.getByRole("cell", { name: "18. Nov 2026", exact: true })).toBeVisible();
    await expect(page.getByText("18. Nov 2026Home InsuranceWaiting for Quote", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("18. Nov 2026Home InsuranceWaiting for Quote", { exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open the submitted request details", async () => {
    await customerSelfService.policies.element18Nov2026homeInsurancewaitingForText.click();
    // Expect 2.1: The request detail displays its deductible and pending response status.
    await expect(page.getByText("18. Nov 2026 20:56:", { exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "500 CHF", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("Lakeside Mutual has not yet responded to this Insurance Quote Request.", { exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Return to the quote request list", async () => {
    await customerSelfService.policiesNewInsuranceQuoteRequest.insuranceQuoteRequestsLink.click();
    // Expect 3.1: The submitted request remains visible in the list.
    await expect(page.getByRole("cell", { name: "18. Nov 2026", exact: true })).toBeVisible();
    await expect(page.getByText("18. Nov 2026Home InsuranceWaiting for Quote", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("18. Nov 2026Home InsuranceWaiting for Quote", { exact: true })).toBeVisible();
    await expect(page.getByText("Insurance Quote Request Details", { exact: true })).toBeHidden();
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
});
