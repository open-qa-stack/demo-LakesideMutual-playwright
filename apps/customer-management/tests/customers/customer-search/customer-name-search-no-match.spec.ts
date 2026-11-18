import { expect, test } from "../../../../shared/fixtures.ts";

test("Search customers with a name that matches no records", { tag: ["@level-functional","@domain-customers","@feature-customer-search","@app-customer-management","@kind-other","@case-negative","@data-read"] }, async ({ page, customerManagement }, testInfo) => {
  await test.step("1. Open the customer list and enter a name that has no match", async () => {
    await page.goto("/");
    await customerManagement.home.searchTextbox.fill("no-such-customer-xyz");
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Submit the query and verify the empty result count and absence of customers", async () => {
    await customerManagement.home.searchButton.click();
    // Expect 2.1: The search has no matching customer records.
    await expect(page.getByRole("columnheader", { name: "1 - 0 of 0", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true })).toBeHidden();
    await expect(page.getByRole("cell", { name: "Bel Pifford", exact: true })).toBeHidden();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
});
