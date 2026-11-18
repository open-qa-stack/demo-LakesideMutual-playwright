import { expect, test } from "../../../../shared/fixtures.ts";

test("Render an existing quote request details page", { tag: ["@level-functional","@domain-insurance-quotes","@feature-quote-request-details","@app-customer-self-service","@kind-visual","@case-nominal","@data-read"] }, async ({ page }, testInfo) => {
  await test.step("1. Open an existing quote request details page", async () => {
    await page.goto("/policies/insurance-quote-requests/1");
    await page.getByRole("textbox", { name: "Email Address", exact: true }).fill(process.env.CSS_DEMO_USERNAME!);
    await page.getByRole("textbox", { name: "Password", exact: true }).fill(process.env.CSS_DEMO_PASSWORD!);
    await page.getByRole("button", { name: "Log in", exact: true }).click();
    // Expect 1.1: The quote request details screen is displayed.
    await expect(page.getByText("Insurance Quote Request Details", { exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
