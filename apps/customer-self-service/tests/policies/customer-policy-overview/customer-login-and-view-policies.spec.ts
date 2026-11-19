import { expect, test } from "../../../../shared/fixtures.ts";

test("Sign in and review the customer’s insurance policies", { tag: ["@level-business","@domain-policies","@feature-customer-policy-overview","@app-customer-self-service","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open Customer Self-Service and enter the login screen", async () => {
    await page.goto("/");
    await customerSelfService.home.logInToAccessYourButton.click();
    // Expect 1.1: The login screen provides the demo credentials and sign-in controls.
    await expect(page.getByRole("heading", { name: "Log in to your LM account", exact: true })).toBeVisible();
    await expect(page.getByText("Email Address").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("Password").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("admin@example.com1password", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Fill the demo credentials and sign in", async () => {
    await customerSelfService.login.fillInButton.click();
    await customerSelfService.login.logInButton.click();
    // Expect 2.1: The signed-in portal displays the quote requests and the customer’s policy coverage.
    await expect(page.getByText("Show archived Insurance Quote Requests", { exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "19. Nov 2026", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("cell", { name: "Home Insurance", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("cell", { name: "Waiting for Quote", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Policies", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Health Insurance", exact: true })).toBeVisible();
    await expect(page.getByText("05. Feb 2018 – 10. Feb 2018", { exact: true })).toBeVisible();
    await expect(page.getByText("1500 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("250 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("1000000 CHF", { exact: true })).toBeVisible();
    await expect(page.getByText("N/A").filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
