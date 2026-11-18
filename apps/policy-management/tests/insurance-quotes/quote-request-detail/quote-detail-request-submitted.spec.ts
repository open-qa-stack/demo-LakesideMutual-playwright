import { expect, test } from "../../../../shared/fixtures.ts";

test("View a submitted quote request", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-detail","@app-policy-management","@kind-other","@case-nominal","@data-read"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open the request submitted on 15 Nov 2026 at 20:03 from the requests list", async () => {
    await page.goto("/insurance-quote-requests");
    await policyManagement.insuranceQuoteRequests.showDetailsButtonInRow("15. Nov 2026 20:03").click();
    // Expect 1.1: The submitted request shows its customer, address, requested coverage details, and response affordance.
    await expect(page.getByText("Home Insurance", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("15. Nov 2026 20:03", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Max Mustermann", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("Contact Address Oberseestrasse 11 8640 Rapperswil", { exact: true })).toBeVisible();
    await expect(page.getByText("Billing Address Oberseestrasse 11 8640 Rapperswil", { exact: true })).toBeVisible();
    await expect(page.getByText("15. Nov 2026", { exact: true })).toBeVisible();
    await expect(page.getByText("500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Respond", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
