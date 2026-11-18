import { expect, test } from "../../../../shared/fixtures.ts";

test("Inspect the prefilled edit-policy form", { tag: ["@level-functional","@domain-policies","@feature-policy-edit","@app-policy-management","@kind-other","@case-nominal","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open the edit form for the seeded policy and inspect its visible initial fields", async () => {
    await page.goto("/customers/rgpp0wkpec/policies/fvo5pkqerr/edit");
    // Expect 1.1: The policy edit form shows its dates, type and save action.
    await expect(page.getByText("Edit Policy", { exact: true })).toBeVisible();
    await expect(page.getByText("2018-02-05").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("2018-02-10").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("Health Insurance", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("button", { name: "Save Changes", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
