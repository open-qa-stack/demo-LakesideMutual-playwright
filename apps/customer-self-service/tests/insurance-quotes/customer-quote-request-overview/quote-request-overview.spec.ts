import { expect, test } from "../../../../shared/fixtures.ts";

test("Review quote requests and policies on the overview", { tag: ["@level-functional","@domain-insurance-quotes","@feature-customer-quote-request-overview","@app-customer-self-service","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open the login screen", async () => {
    await page.goto("/login");
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Sign in with the displayed demo credentials", async () => {
    await customerSelfService.login.fillInButton.click();
    await customerSelfService.login.logInButton.click();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Review the quote-request list on the policies overview", async () => {
    await customerSelfService.login.logInButton.click();
    // Expect 3.1: The overview displays quote-request entries for Home Insurance, with a visible request status.
    await expect(page.getByText("Show archived Insurance Quote Requests", { exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Home Insurance", exact: true })).toBeVisible();
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
});
