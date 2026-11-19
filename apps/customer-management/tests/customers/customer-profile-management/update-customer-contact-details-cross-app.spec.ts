import { expect, test } from "../../../../shared/fixtures.ts";

test("Update customer contact details and verify them in Policy Management", { tag: ["@level-cross-application","@domain-customers","@feature-customer-profile-management","@app-customer-management","@app-policy-management","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerManagement, policyManagement }, testInfo) => {
  try {
    await test.step("1. Open the Customer Management home page and locate the Customers list", async () => {
      await page.goto("/");
      // Expect 1.1: The Customer Management customer list is shown with Ado Kinnett.
      await expect(page.getByRole("heading", { name: "Customers", exact: true })).toBeVisible();
      await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("2. Search for Ado Kinnett by the last-name fragment Kinnett", async () => {
      await customerManagement.home.searchTextbox.fill("Kinnett");
      await customerManagement.home.searchButton.click();
      // Expect 2.1: The search narrows the list to Ado Kinnett.
      await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("columnheader", { name: "1 - 1 of 1", exact: true })).toBeVisible();
      await expect(page.getByRole("cell", { name: "Bel Pifford", exact: true })).toBeHidden();
      await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("3. Open Ado Kinnett's customer profile", async () => {
      await customerManagement.home.showButtonInRow("Ado Kinnett").click();
      // Expect 3.1: The customer profile shows the existing contact details before editing.
      await expect(page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("29 Cross-Application Avenue, 3000 Bern", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("link", { name: "ado.kinnett@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("055 222 41 13", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("4. Open the profile edit form", async () => {
      await customerManagement.customersItem.editProfileButton.click();
      // Expect 4.1: The edit form is displayed with the customer's identity and profile fields.
      await expect(page.getByRole("link", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("Street Address", { exact: true })).toBeVisible();
      await expect(page.getByText("Email Address", { exact: true })).toBeVisible();
      await expect(page.getByText("Phone Number", { exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Save Changes", exact: true })).toBeVisible();
      await testInfo.attach("4", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("5. Replace the street address, email address, and phone number, then save the profile", async () => {
      await customerManagement.customersItemEditProfile.streetAddressTextbox.fill("29 Cross-Application Avenue");
      await customerManagement.customersItemEditProfile.emailAddressTextbox.fill("ado.kinnett@example.com");
      await customerManagement.customersItemEditProfile.phoneNumberTextbox.fill("055 222 41 13");
      await customerManagement.customersItemEditProfile.saveChangesButton.click();
      // Expect 5.1: The edit form closes after saving the contact changes.
      await expect(page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("Customer Profile").filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("button", { name: "Edit Profile", exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Save Changes", exact: true })).toBeHidden();
      await testInfo.attach("5", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("6. Open Ado Kinnett's profile in Policy Management and verify the changed details are shared there", async () => {
      await policyManagement.page.goto(new URL("/customers/bunlo9vk5f", process.env.OQAS_BASE_URL_POLICY_MANAGEMENT).href);
      // Expect 6.1: Policy Management shows the contact values saved in Customer Management.
      await expect(policyManagement.page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(policyManagement.page.getByText("29 Cross-Application Avenue, 3000 Bern", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(policyManagement.page.getByRole("link", { name: "ado.kinnett@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(policyManagement.page.getByText("055 222 41 13", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("6", { body: await policyManagement.page.screenshot(), contentType: "image/png" });
    });
  } finally {
    await test.step("7. Restore Ado Kinnett's original contact details in Customer Management", async () => {
      await page.goto("/");
      await customerManagement.home.searchTextbox.fill("Kinnett");
      await customerManagement.home.searchButton.click();
      await customerManagement.home.showButtonInRow("Ado Kinnett").click();
      await customerManagement.customersItem.editProfileButton.click();
      await customerManagement.customersItemEditProfile.streetAddressTextbox.fill("29 Cross-Application Avenue");
      await customerManagement.customersItemEditProfile.emailAddressTextbox.fill("ado.kinnett@example.com");
      await customerManagement.customersItemEditProfile.phoneNumberTextbox.fill("055 222 41 13");
      await customerManagement.customersItemEditProfile.saveChangesButton.click();
      // Expect 7.1: The original profile is saved and the edit form closes.
      await expect(page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("Customer Profile").filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("button", { name: "Edit Profile", exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Save Changes", exact: true })).toBeHidden();
      await testInfo.attach("7", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("8. Open the restored customer profile in Policy Management and verify the original details are shared there too", async () => {
      await policyManagement.page.goto(new URL("/customers/bunlo9vk5f", process.env.OQAS_BASE_URL_POLICY_MANAGEMENT).href);
      // Expect 8.1: Policy Management displays the restored customer contact details.
      await expect(policyManagement.page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(policyManagement.page.getByText("29 Cross-Application Avenue, 3000 Bern", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(policyManagement.page.getByRole("link", { name: "ado.kinnett@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(policyManagement.page.getByText("055 222 41 13", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("8", { body: await policyManagement.page.screenshot(), contentType: "image/png" });
    });
  }
});
