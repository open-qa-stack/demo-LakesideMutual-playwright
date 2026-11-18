import { expect, test } from "../../../../shared/fixtures.ts";

test("Edit and save a customer's phone number", { tag: ["@level-functional","@domain-customers","@feature-customer-profile-edit","@app-customer-management","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerManagement }, testInfo) => {
  try {
    await test.step("1. Open the customer's profile editor", async () => {
      await page.goto("/customers/bunlo9vk5f/edit_profile");
      await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("2. Save a changed phone number and verify the profile shows it", async () => {
      await customerManagement.customersItemEditProfile.phoneNumberTextbox.fill("055 222 41 12");
      await customerManagement.customersItemEditProfile.saveChangesButton.click();
      // Expect 2.1: The profile displays the phone number entered.
      await expect(page.getByText("055 222 41 12", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
    });
  } finally {
    await test.step("3. Restore the original number by reopening the editor and saving it", async () => {
      await customerManagement.customersItem.editProfileButton.click();
      await customerManagement.customersItemEditProfile.phoneNumberTextbox.fill("055 222 41 11");
      await customerManagement.customersItemEditProfile.saveChangesButton.click();
      // Expect 3.1: The profile displays the restored phone number.
      await expect(page.getByText("055 222 41 11", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
    });
  }
});
