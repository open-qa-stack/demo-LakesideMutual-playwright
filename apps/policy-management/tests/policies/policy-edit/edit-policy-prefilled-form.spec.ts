import { expect, test } from "../../../../shared/fixtures.ts";

test("Navigate from a policy detail to its prefilled edit form", { tag: ["@level-business","@domain-policies","@feature-policy-edit","@app-policy-management","@kind-other","@case-nominal","@data-read"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open the policy detail from the policies list", async () => {
    await page.goto("/");
    await policyManagement.home.showDetailsButton.click();
    // Expect 1.1: The policy detail offers editing.
    await expect(page.getByRole("heading", { name: "Health Insurance", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: " Edit", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open the edit form", async () => {
    await policyManagement.policiesItem.editButton.click();
    // Expect 2.1: The form is prefilled with the current policy values and offers Save Changes.
    await expect(page.getByText("Edit Policy", { exact: true })).toBeVisible();
    await expect(page.getByRole("textbox").filter({ hasValue: "2018-02-05" })).toHaveValue("2018-02-05");
    await expect(page.getByRole("textbox").filter({ hasValue: "2018-02-10" })).toHaveValue("2018-02-10");
    await expect(page.getByRole("alert")).toHaveText("Health Insurance");
    await expect(page.getByRole("spinbutton", { name: "Amount in CHF", exact: true }).filter({ hasValue: "1500" })).toHaveValue("1500");
    await expect(page.getByRole("spinbutton", { name: "Amount in CHF", exact: true }).filter({ hasValue: "250" })).toHaveValue("250");
    await expect(page.getByRole("spinbutton", { name: "Amount in CHF", exact: true }).filter({ hasValue: "1000000" })).toHaveValue("1000000");
    await expect(page.getByRole("button", { name: "Save Changes", exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
