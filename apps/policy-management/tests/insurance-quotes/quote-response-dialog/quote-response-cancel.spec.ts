import { expect, test } from "../../../../shared/fixtures.ts";

test("Cancel a quote response", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-response-dialog","@app-policy-management","@kind-other","@case-nominal","@data-write"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open a submitted quote request from the request list", async () => {
    await page.goto("/insurance-quote-requests");
    await policyManagement.insuranceQuoteRequests.showDetailsButtonInRow("15. Nov 2026 20:03").click();
    // Expect 1.1: The submitted request detail is visible and allows a response.
    await expect(page.getByRole("button", { name: "Respond", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open the response dialog and inspect its default selection and fields", async () => {
    await policyManagement.insuranceQuoteRequestsItem.respondButton.click();
    // Expect 2.1: Accept is selected and the dialog provides expiration date and amount fields.
    await expect(page.getByText("Respond to Insurance Quote Request", { exact: true })).toBeVisible();
    await expect(page.getByText("Accept", { exact: true })).toBeVisible();
    await expect(page.getByText("Reject", { exact: true })).toBeVisible();
    await expect(page.getByText("Expiration Date", { exact: true })).toBeVisible();
    await expect(page.getByRole("textbox")).toHaveValue("2026-12-18T23:59");
    await expect(page.getByText("Insurance Premium", { exact: true })).toBeVisible();
    await expect(page.getByText("Policy Limit", { exact: true })).toBeVisible();
    await expect(page.getByText("Amount in CHF").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("button", { name: "Cancel", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Send Response", exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
