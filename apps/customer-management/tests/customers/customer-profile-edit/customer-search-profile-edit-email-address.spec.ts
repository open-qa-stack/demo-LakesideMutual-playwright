import { expect, test } from "../../../../shared/fixtures.ts";

test("Search for a customer, open the profile, and update the email address", { tag: ["@level-business","@domain-customers","@feature-customer-profile-edit","@app-customer-management","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerManagement }, testInfo) => {
  try {
    await test.step("1. Open the customer list", async () => {
      await page.goto("/");
      // Expect 1.1: The customer list shows Ado Kinnett and the current email address.
      await expect(page.getByRole("heading", { name: "Customers", exact: true })).toBeVisible();
      await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("cell", { name: "akinnetta@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("2. Search by the customer's first-name fragment and submit the search", async () => {
      await customerManagement.home.searchTextbox.fill("Ado");
      await customerManagement.home.searchButton.click();
      // Expect 2.1: Only the matching customer is returned.
      await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("columnheader", { name: "1 - 1 of 1", exact: true })).toBeVisible();
      await expect(page.getByRole("cell", { name: "Bel Pifford", exact: true })).toBeHidden();
      await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("3. Open the matching customer profile and verify its current email", async () => {
      await customerManagement.home.showButtonInRow("Ado Kinnett").click();
      // Expect 3.1: The profile shows the current email address.
      await expect(page.getByRole("link", { name: "akinnetta@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("4. Open the editor, enter the made-up updated email, and save the profile", async () => {
      await customerManagement.customersItem.editProfileButton.click();
      await customerManagement.customersItemEditProfile.emailAddressTextbox.fill("ado.kinnett.updated@example.com");
      await customerManagement.customersItemEditProfile.saveChangesButton.click();
      // Expect 4.1: The profile displays the saved changed email address.
      await expect(page.getByRole("link", { name: "ado.kinnett.updated@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("link", { name: "akinnetta@example.com", exact: true }).filter({ visible: true })).toHaveCount(0);
      await testInfo.attach("4", { body: await page.screenshot(), contentType: "image/png" });
    });
  } finally {
    await test.step("5. Start restoration by opening the editor route, enter the original email, and save it to restore the record", async () => {
      await page.goto("/customers/bunlo9vk5f/edit_profile");
      await customerManagement.customersItemEditProfile.emailAddressTextbox.fill("akinnetta@example.com");
      await customerManagement.customersItemEditProfile.saveChangesButton.click();
      // Expect 5.1: The profile displays the restored original email address.
      await expect(page.getByRole("link", { name: "akinnetta@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("link", { name: "ado.kinnett.updated@example.com", exact: true }).filter({ visible: true })).toHaveCount(0);
      await testInfo.attach("5", { body: await page.screenshot(), contentType: "image/png" });
    });
  }
});
