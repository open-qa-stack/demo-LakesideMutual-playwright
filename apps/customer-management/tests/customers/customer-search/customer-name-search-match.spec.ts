import { expect, test } from "../../../../shared/fixtures.ts";

test("Search customers by a matching name fragment", { tag: ["@level-functional","@domain-customers","@feature-customer-search","@app-customer-management","@kind-other","@case-nominal","@data-read"] }, async ({ page, customerManagement }, testInfo) => {
  await test.step("1. Open the customer list and enter a first-name fragment in Search", async () => {
    await page.goto("/");
    await customerManagement.home.searchTextbox.fill("Ado");
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Submit the search and verify the matching customer and result count", async () => {
    await customerManagement.home.searchButton.click();
    // Expect 2.1: Only Ado Kinnett matches the search.
    await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "1 - 1 of 1", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Bel Pifford", exact: true })).toBeHidden();
    await expect(page.getByRole("cell", { name: "Blondy Langman", exact: true })).toBeHidden();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
