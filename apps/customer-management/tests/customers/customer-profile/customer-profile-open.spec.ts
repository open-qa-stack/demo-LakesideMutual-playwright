import { expect, test } from "../../../../shared/fixtures.ts";

test("Open a customer profile from the search results", { tag: ["@level-functional","@domain-customers","@feature-customer-profile","@app-customer-management","@kind-other","@case-nominal","@data-read"] }, async ({ page, customerManagement }, testInfo) => {
  await test.step("1. Open the customer list and search for Ado", async () => {
    await page.goto("/");
    await customerManagement.home.searchTextbox.fill("Ado");
    await customerManagement.home.searchButton.click();
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open Ado Kinnett's search result and verify profile address and email", async () => {
    await customerManagement.home.showButtonInRow("Ado Kinnett").click();
    // Expect 2.1: The profile for Ado Kinnett shows their address and email address.
    await expect(page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("28 Cross-Application Avenue, 3000 Bern", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("link", { name: "akinnetta@example.com", exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
