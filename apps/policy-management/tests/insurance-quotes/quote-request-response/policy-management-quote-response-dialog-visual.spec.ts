import { expect, test } from "../../../../shared/fixtures.ts";

test("Compare the quote response dialog", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-response","@app-policy-management","@kind-visual","@case-nominal","@data-read"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open Policy Management, navigate to the quote request list, and show details for the unanswered request", async () => {
    await page.goto("/");
    await policyManagement.home.insuranceQuoteRequestsLink.click();
    await policyManagement.insuranceQuoteRequests.showDetailsButtonInRow("19. Nov 2026 02:10").click();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open Respond to Insurance Quote Request", async () => {
    await policyManagement.insuranceQuoteRequestsItem.respondButton.click();
    // Expect 2.1: The response dialog is open with Accept and Reject choices and its date and amount fields.
    await expect(page.getByText("Respond to Insurance Quote Request", { exact: true })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Accept", exact: true })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Reject", exact: true })).toBeVisible();
    await expect(page.getByText("Expiration Date", { exact: true })).toBeVisible();
    await expect(page.getByText("Insurance Premium", { exact: true })).toBeVisible();
    await expect(page.getByText("Policy Limit", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Cancel", exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
