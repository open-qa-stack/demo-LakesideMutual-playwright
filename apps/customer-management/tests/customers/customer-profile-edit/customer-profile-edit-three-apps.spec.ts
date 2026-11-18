import { expect, test } from "../../../../shared/fixtures.ts";

test("Search for a customer, update the email, and check the saved profile across applications", { tag: ["@level-end-to-end","@domain-customers","@feature-customer-profile-edit","@app-customer-management","@app-policy-management","@app-customer-self-service","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerManagement, policyManagement, customerSelfService }, testInfo) => {
  try {
    await test.step("1. Open Customer Management and search for Ado", async () => {
      await page.goto("/");
      await customerManagement.home.searchTextbox.fill("Ado");
      await customerManagement.home.searchButton.click();
      // Expect 1.1: The filtered customer list contains Ado Kinnett and one matching result.
      await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("columnheader", { name: "1 - 1 of 1", exact: true })).toBeVisible();
      await expect(page.getByRole("cell", { name: "Bel Pifford", exact: true })).toBeHidden();
      await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("2. Open Ado Kinnett's profile and verify the current contact details", async () => {
      await customerManagement.home.showButtonInRow("Ado Kinnett").click();
      // Expect 2.1: The profile shows the current email, address, and phone number.
      await expect(page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("link", { name: "akinnetta@example.com", exact: true })).not.toHaveCount(0);
      await expect(page.getByText("28 Cross-Application Avenue, 3000 Bern", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("055 222 41 11", { exact: true })).toBeVisible();
      await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("3. Open the profile editor and save the updated email address", async () => {
      await customerManagement.customersItem.editProfileButton.click();
      await customerManagement.customersItemEditProfile.emailAddressTextbox.fill("ado.kinnett.updated@example.com");
      await customerManagement.customersItemEditProfile.saveChangesButton.click();
      // Expect 3.1: The profile displays the newly saved email address.
      await expect(page.getByRole("link", { name: "ado.kinnett.updated@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("link", { name: "akinnetta@example.com", exact: true }).filter({ visible: true })).toHaveCount(0);
      await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("4. Open Policy Management and verify Ado Kinnett's customer entry", async () => {
      await policyManagement.page.goto(new URL("/customers", process.env.OQAS_BASE_URL_POLICY_MANAGEMENT).href);
      // Expect 4.1: Policy Management displays Ado Kinnett in its customer list.
      await expect(policyManagement.page.getByRole("cell", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("4", { body: await policyManagement.page.screenshot(), contentType: "image/png" });
    });
    await test.step("5. Open Customer Self-Service and view the signed-in customer's profile", async () => {
      await customerSelfService.page.goto(new URL("/", process.env.OQAS_BASE_URL_CUSTOMER_SELF_SERVICE).href);
      await customerSelfService.page.getByRole("button", { name: "Log in to access your LM account", exact: true }).click();
      await customerSelfService.page.getByRole("button", { name: "Fill in", exact: true }).click();
      await customerSelfService.page.getByRole("button", { name: "Log in", exact: true }).click();
      await customerSelfService.policies.myProfileLink.click();
      // Expect 5.1: Customer Self-Service displays the signed-in customer's profile details.
      await expect(customerSelfService.page.getByText("Max Mustermann", { exact: true })).toBeVisible();
      await expect(customerSelfService.page.getByText("Oberseestrasse 11, 8640 Rapperswil", { exact: true })).toBeVisible();
      await expect(customerSelfService.page.getByRole("link", { name: "admin@example.com", exact: true })).toBeVisible();
      await expect(customerSelfService.page.getByText("055 222 41 11", { exact: true })).toBeVisible();
      await testInfo.attach("5", { body: await customerSelfService.page.screenshot(), contentType: "image/png" });
    });
  } finally {
    await test.step("6. Restore Ado Kinnett's original email by reopening the editor and saving it", async () => {
      await page.goto("/customers/bunlo9vk5f/edit_profile");
      await customerManagement.customersItemEditProfile.emailAddressTextbox.fill("akinnetta@example.com");
      await customerManagement.customersItemEditProfile.saveChangesButton.click();
      // Expect 6.1: The profile displays the original email address after restoration.
      await expect(page.getByRole("link", { name: "akinnetta@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("cell", { name: "ado.kinnett.updated@example.com", exact: true }).filter({ visible: true })).toHaveCount(0);
      await testInfo.attach("6", { body: await page.screenshot(), contentType: "image/png" });
    });
  }
});
