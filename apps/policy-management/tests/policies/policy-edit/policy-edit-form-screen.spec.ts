import { expect, test } from "../../../../shared/fixtures.ts";

test("Edit policy form", { tag: ["@level-functional","@domain-policies","@feature-policy-edit","@app-policy-management","@kind-visual","@case-nominal","@data-read"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open the policy details and choose Edit", async () => {
    await page.goto("/");
    await policyManagement.home.showDetailsButton.click();
    await policyManagement.policiesItem.editButton.click();
    // Expect 1.1: The Edit Policy form is displayed.
    await expect(page.getByText("Edit Policy", { exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
