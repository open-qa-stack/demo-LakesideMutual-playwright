import { expect, test } from "../../../../shared/fixtures.ts";

test("Compare the customer profile edit form", { tag: ["@level-functional","@domain-customers","@feature-customer-profile-edit","@app-customer-management","@kind-visual","@case-nominal","@data-read"] }, async ({ page, customerManagement }, testInfo) => {
  await test.step("1. Search for Ado, open Ado Kinnett's profile, and open Edit Profile", async () => {
    await page.goto("/");
    await customerManagement.home.searchTextbox.fill("Ado");
    await customerManagement.home.searchButton.click();
    await customerManagement.home.showButtonInRow("Ado Kinnett").click();
    await customerManagement.customersItem.editProfileButton.click();
    // Expect 1.1: The customer profile edit form is displayed.
    await expect(page.getByRole("button", { name: "Save Changes", exact: true })).toBeVisible();
    // When the screen differs from one run to the next, add mask: [a locator of the zone that changes], as precise as can be; never raise the tolerance.
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.01 });
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
});
