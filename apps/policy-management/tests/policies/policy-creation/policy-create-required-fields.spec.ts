import { expect, test } from "../../../../shared/fixtures.ts";

test("Show create-policy failure for empty required fields", { tag: ["@level-functional","@domain-policies","@feature-policy-creation","@app-policy-management","@kind-other","@case-negative","@data-write"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open the new-policy form for the customer", async () => {
    await page.goto("/customers/rgpp0wkpec/policies/new");
    // Expect 1.1: The new policy form is initially empty and has no agreement items.
    await expect(page.getByText("New Policy", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Policy Type", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Create Policy", exact: true })).toBeVisible();
    await expect(page.getByText("Add Item", { exact: true })).toBeVisible();
    await expect(page.getByText("Failed to create policy", { exact: true })).toBeHidden();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Submit the form without required values", async () => {
    await policyManagement.customersItemPoliciesNew.createPolicyButton.click();
    // Expect 2.1: The form remains available and shows its create failure message.
    await expect(page.getByText("Failed to create policy", { exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
