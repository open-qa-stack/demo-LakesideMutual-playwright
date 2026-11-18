import { expect, test } from "../../../../shared/fixtures.ts";

test("Policy Management home page loads", { tag: ["@level-smoke","@domain-policies","@feature-application-load","@app-policy-management","@kind-other","@case-nominal","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open the Policy Management home page", async () => {
    await page.goto("/");
    // Expect 1.1: The page displays its policies heading.
    await expect(page.getByRole("heading", { name: "Policies", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
