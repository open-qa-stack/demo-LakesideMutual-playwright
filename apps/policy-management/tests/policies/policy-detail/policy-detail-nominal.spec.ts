import { expect, test } from "../../../../shared/fixtures.ts";

test("View a policy's details", { tag: ["@level-functional","@domain-policies","@feature-policy-detail","@app-policy-management","@kind-other","@case-nominal","@data-read"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open the seeded policy detail from the list", async () => {
    await page.goto("/");
    await policyManagement.home.showDetailsButton.click();
    // Expect 1.1: The detail shows the policy information and empty insuring agreement.
    await expect(page.getByRole("heading", { name: "Health Insurance", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Max Mustermann", exact: true })).toBeVisible();
    await expect(page.getByText("12. Nov 2026 21:04", { exact: true })).toBeVisible();
    await expect(page.getByText("05. Feb 2018 – 10. Feb 2018", { exact: true })).toBeVisible();
    await expect(page.getByText("1500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("250 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("1000000 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("N/A", { exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
