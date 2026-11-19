import { expect, test } from "../../../../shared/fixtures.ts";

test("Navigate from a customer profile to the new-policy form", { tag: ["@level-business","@domain-policies","@feature-policy-create","@app-policy-management","@kind-other","@case-nominal","@data-write"] }, async ({ page, policyManagement }, testInfo) => {
  await test.step("1. Open the customer list", async () => {
    await page.goto("/customers");
    // Expect 1.1: The customer list shows the selected customer.
    await expect(page.getByRole("heading", { name: "Customers", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open the selected customer's profile; this navigation has no data-changing effect", async () => {
    await policyManagement.customers.managePolicyButtonInRow("Ado Kinnett").click();
    // Expect 2.1: The profile offers the New Policy journey and shows that the customer has no policies.
    await expect(page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("Insurance Policies").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("button", { name: " New Policy", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("This customer doesn't have any insurance policies yet.", { exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Open the new-policy form", async () => {
    await policyManagement.customersItem.newPolicyButton.click();
    // Expect 3.1: The new-policy form is displayed with its policy type selector and create action.
    await expect(page.getByText("New Policy", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Policy Type", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("button", { name: "Create Policy", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
});
