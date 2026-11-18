import { expect, test } from "../../../../shared/fixtures.ts";

test("Render the quote request personal data step", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-wizard","@app-customer-self-service","@kind-visual","@case-nominal","@data-read"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open login, fill demo credentials, sign in, and go to the policies page", async () => {
    await page.goto("/");
    await customerSelfService.home.logInToAccessYourButton.click();
    await customerSelfService.login.fillInButton.click();
    await customerSelfService.login.logInButton.click();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Start a new quote request", async () => {
    await customerSelfService.policies.newInsuranceQuoteRequestButton.click();
    // Expect 2.1: The personal data step is displayed.
    await expect(page.getByRole("heading", { name: "Contact Address", exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
