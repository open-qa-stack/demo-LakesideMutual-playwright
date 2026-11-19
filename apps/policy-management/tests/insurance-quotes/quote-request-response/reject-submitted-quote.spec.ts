import { expect, test } from "../../../../shared/fixtures.ts";

test("Reject a submitted quote request", { tag: ["@level-business","@domain-insurance-quotes","@feature-quote-request-response","@app-policy-management","@kind-other","@case-nominal","@data-read"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open the quote-request list", async () => {
    await page.goto("/insurance-quote-requests");
    // Expect 1.1: The open requests table identifies a pending request.
    await expect(page.getByRole("heading", { name: "Insurance Quote Requests", exact: true })).toBeVisible();
    await expect(page.getByText("Open Insurance Quote Requests").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("cell", { name: "18. Nov 2026 21:03", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Home Insurance", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("cell", { name: "Request open", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open the request details", async () => {
    await policyManagement.insuranceQuoteRequests.showDetailsButtonInRow("18. Nov 2026 21:03").click();
    // Expect 2.1: The request details show its customer, insurance type, deductible and pending status.
    await expect(page.getByText("Home Insurance", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("link", { name: "Max Mustermann", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("1000 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("Lakeside Mutual has not yet responded to this request.").filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Open the response dialog and select Reject", async () => {
    await policyManagement.insuranceQuoteRequestsItem.respondButton.click();
    await policyManagement.insuranceQuoteRequestsItem.rejectRadio.check();
    // Expect 3.1: Reject is selected and the acceptance-specific amount/date controls disappear.
    await expect(page.getByRole("radio", { name: "Reject", exact: true })).toBeVisible();
    await expect(page.getByText("Expiration Date", { exact: true })).toBeHidden();
    await expect(page.getByText("Insurance Premium", { exact: true })).toBeHidden();
    await expect(page.getByText("Policy Limit", { exact: true })).toBeHidden();
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("4. Cancel to leave the request unchanged", async () => {
    await policyManagement.insuranceQuoteRequestsItem.cancelButton.click();
    // Expect 4.1: The dialog closes and the request remains unanswered.
    await expect(page.getByText("Lakeside Mutual has not yet responded to this request.").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("button", { name: "Respond", exact: true })).toBeVisible();
    await expect(page.getByText("Respond to Insurance Quote Request", { exact: true })).toBeHidden();
    await testInfo.attach("4", { body: await page.screenshot(), contentType: "image/png" });
  });
});
