import { expect, test } from "../../../../shared/fixtures.ts";

test("Compare the new quote request personal-data step", { tag: ["@level-functional","@domain-insurance-quotes","@feature-customer-quote-request","@app-customer-self-service","@kind-visual","@case-nominal","@data-write"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Sign in and reach the overview", async () => {
    await page.goto("/login");
    await customerSelfService.login.emailAddressTextbox.fill(process.env.CSS_DEMO_USERNAME!);
    await customerSelfService.login.passwordTextbox.fill(process.env.CSS_DEMO_PASSWORD!);
    await customerSelfService.login.logInButton.click();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Display the personal-data step of the quote request", async () => {
    await customerSelfService.policies.newInsuranceQuoteRequestButton.click();
    // Expect 2.1: The personal-data step of the quote request form is displayed.
    await expect(page.getByRole("heading", { name: "Contact Address", exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
