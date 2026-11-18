import { expect, test } from "../../../../shared/fixtures.ts";

test("Review open insurance quote requests", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-list","@app-policy-management","@kind-other","@case-nominal","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open the insurance quote requests page and inspect the open requests table", async () => {
    await page.goto("/insurance-quote-requests");
    // Expect 1.1: The screen lists open requests with their dates, customer, insurance type and status.
    await expect(page.getByRole("heading", { name: "Insurance Quote Requests", exact: true })).toBeVisible();
    await expect(page.getByText("Open Insurance Quote Requests", { exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "15. Nov 2026 20:03", exact: true })).toBeVisible();
    await expect(page.getByRole("row", { name: "15. Nov 2026 08:39" }).getByRole("link", { name: "Max Mustermann", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Home Insurance", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("cell", { name: "Request open", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("row", { name: "15. Nov 2026 08:39" }).getByRole("button", { name: "Show Details", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
