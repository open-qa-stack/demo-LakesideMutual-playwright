import { expect, test } from "../../../../shared/fixtures.ts";

test("Render the Customer Self-Service login screen", { tag: ["@level-functional","@domain-authentication","@feature-login-screen","@app-customer-self-service","@kind-visual","@case-nominal","@data-read"] }, async ({ page, customerSelfService }, testInfo) => {
  await test.step("1. Open the Customer Self-Service home page and navigate to login", async () => {
    await page.goto("/");
    await customerSelfService.home.logInToAccessYourButton.click();
    // Expect 1.1: The login screen is displayed.
    await expect(page.getByRole("heading", { name: "Log in to your LM account", exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
