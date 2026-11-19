import { expect, test } from "../../../../shared/fixtures.ts";

test("Open a policy from the policies list and review its details", { tag: ["@level-business","@domain-policies","@feature-policy-view","@app-policy-management","@kind-other","@case-nominal","@data-read"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open the policies list", async () => {
    await page.goto("/");
    // Expect 1.1: The policies list displays its existing record and the details action.
    await expect(page.getByRole("heading", { name: "Policies", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "12. Nov 2026 21:04", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Max Mustermann", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "250 CHF", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "1000000 CHF", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Show Details", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open the listed policy details", async () => {
    await policyManagement.home.showDetailsButton.click();
    // Expect 2.1: The policy detail displays its identifying and coverage information.
    await expect(page.getByRole("heading", { name: "Health Insurance", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Max Mustermann", exact: true })).toBeVisible();
    await expect(page.getByText("12. Nov 2026 21:04", { exact: true })).toBeVisible();
    await expect(page.getByText("05. Feb 2018 – 10. Feb 2018", { exact: true })).toBeVisible();
    await expect(page.getByText("1500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("250 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("1000000 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("N/A", { exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
