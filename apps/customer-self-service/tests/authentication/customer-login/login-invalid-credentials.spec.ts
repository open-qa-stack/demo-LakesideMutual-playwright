import { expect, test } from "../../../../shared/fixtures.ts";

test("Reject invalid login credentials", { tag: ["@level-functional","@domain-authentication","@feature-customer-login","@app-customer-self-service","@kind-other","@case-negative","@data-write"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open the login screen", async () => {
    await page.goto("/login");
    // Expect 1.1: The sign-in form is available.
    await expect(page.getByRole("heading", { name: "Log in to your LM account", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Log in", exact: true })).toBeVisible();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Enter the demo email and an incorrect password, then submit", async () => {
    await customerSelfService.login.emailAddressTextbox.fill("admin@example.com");
    await customerSelfService.login.passwordTextbox.fill("wrong-password");
    await customerSelfService.login.logInButton.click();
    // Expect 2.1: The login form displays its authentication failure message.
    await expect(page.getByText("Log in failed", { exact: true })).toBeVisible();
    await expect(page.getByText("Invalid email address or password", { exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
