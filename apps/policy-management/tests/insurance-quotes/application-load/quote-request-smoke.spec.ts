import { expect, test } from "../../../../shared/fixtures.ts";

test("Insurance quote requests page loads", { tag: ["@level-smoke","@domain-insurance-quotes","@feature-application-load","@app-policy-management","@kind-other","@case-nominal","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open the Policy Management home page", async () => {
    await page.goto("/");
    // Expect 1.1: The home page presents the Insurance Quote Requests navigation entry.
    await expect(page.getByRole("link", { name: " Insurance Quote Requests", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
