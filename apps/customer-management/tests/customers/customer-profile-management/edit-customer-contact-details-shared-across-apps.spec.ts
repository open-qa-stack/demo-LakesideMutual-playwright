import { expect, test } from "../../../../shared/fixtures.ts";

test("Search for a customer, update contact details, and verify them across applications", { tag: ["@level-end-to-end","@domain-customers","@feature-customer-profile-management","@app-customer-management","@app-policy-management","@app-customer-self-service","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerManagement, policyManagement, customerSelfService }, testInfo) => {
  try {
    await test.step("1. Open the Customer Management customer list", async () => {
      await page.goto("/");
      // Expect 1.1: The list contains Ado Kinnett and shows the initial customer rows.
      await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("2. Search the list for the last-name fragment Kinnett", async () => {
      await customerManagement.home.searchTextbox.fill("Kinnett");
      await customerManagement.home.searchButton.click();
      // Expect 2.1: The search returns only Ado Kinnett.
      await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("columnheader", { name: "1 - 1 of 1", exact: true })).toBeVisible();
      await expect(page.getByRole("cell", { name: "Bel Pifford", exact: true })).toBeHidden();
      await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("3. Open Ado Kinnett's customer profile", async () => {
      await customerManagement.home.showButtonInRow("Ado Kinnett").click();
      // Expect 3.1: The profile shows the customer's current address, email, and phone number.
      await expect(page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("29 Cross-Application Avenue, 3000 Bern", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("link", { name: "ado.kinnett@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("055 222 41 13", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("4. Open the profile edit form", async () => {
      await customerManagement.customersItem.editProfileButton.click();
      // Expect 4.1: The edit form identifies the customer and offers the contact fields and save control.
      await expect(page.getByRole("link", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("Street Address", { exact: true })).toBeVisible();
      await expect(page.getByText("Email Address", { exact: true })).toBeVisible();
      await expect(page.getByText("Phone Number", { exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Save Changes", exact: true })).toBeVisible();
      await testInfo.attach("4", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("5. Save the customer's contact details", async () => {
      await customerManagement.customersItemEditProfile.streetAddressTextbox.fill("29 Cross-Application Avenue");
      await customerManagement.customersItemEditProfile.emailAddressTextbox.fill("ado.kinnett@example.com");
      await customerManagement.customersItemEditProfile.phoneNumberTextbox.fill("055 222 41 13");
      await customerManagement.customersItemEditProfile.saveChangesButton.click();
      // Expect 5.1: The profile is displayed with the saved address, email address, and phone number.
      await expect(page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("29 Cross-Application Avenue, 3000 Bern", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("link", { name: "ado.kinnett@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("055 222 41 13", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("5", { body: await page.screenshot(), contentType: "image/png" });
    });
    await test.step("6. Open the customer's profile in Policy Management to verify the saved contact details are shared", async () => {
      await policyManagement.page.goto(new URL("/customers/bunlo9vk5f", process.env.OQAS_BASE_URL_POLICY_MANAGEMENT).href);
      // Expect 6.1: Policy Management displays Ado Kinnett with the saved address, email address, and phone number.
      await expect(policyManagement.page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(policyManagement.page.getByText("29 Cross-Application Avenue, 3000 Bern", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(policyManagement.page.getByRole("link", { name: "ado.kinnett@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(policyManagement.page.getByText("055 222 41 13", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("6", { body: await policyManagement.page.screenshot(), contentType: "image/png" });
    });
    await test.step("7. Sign in to Customer Self-Service and view the profile", async () => {
      await customerSelfService.page.goto(new URL("/", process.env.OQAS_BASE_URL_CUSTOMER_SELF_SERVICE).href);
      await customerSelfService.home.logInToAccessYourButton.click();
      await customerSelfService.login.emailAddressTextbox.fill(process.env.CSS_DEMO_USERNAME!);
      await customerSelfService.login.passwordTextbox.fill(process.env.CSS_DEMO_PASSWORD!);
      await customerSelfService.login.logInButton.click();
      await customerSelfService.policies.myProfileLink.click();
      // Expect 7.1: Customer Self-Service displays the signed-in profile for Max Mustermann with its contact details.
      await expect(customerSelfService.page.getByText("Customer Profile").filter({ visible: true })).not.toHaveCount(0);
      await expect(customerSelfService.page.getByText("Max Mustermann", { exact: true })).toBeVisible();
      await expect(customerSelfService.page.getByText("Oberseestrasse 11, 8640 Rapperswil", { exact: true })).toBeVisible();
      await expect(customerSelfService.page.getByRole("link", { name: "admin@example.com", exact: true })).toBeVisible();
      await expect(customerSelfService.page.getByText("055 222 41 11", { exact: true })).toBeVisible();
      await testInfo.attach("7", { body: await customerSelfService.page.screenshot(), contentType: "image/png" });
    });
  } finally {
    await test.step("8. Restore the customer's original contact details in Customer Management", async () => {
      await page.goto("/");
      await customerManagement.home.searchTextbox.fill("Kinnett");
      await customerManagement.home.searchButton.click();
      await customerManagement.home.showButtonInRow("Ado Kinnett").click();
      await customerManagement.customersItem.editProfileButton.click();
      await customerManagement.customersItemEditProfile.streetAddressTextbox.fill("29 Cross-Application Avenue");
      await customerManagement.customersItemEditProfile.emailAddressTextbox.fill("ado.kinnett@example.com");
      await customerManagement.customersItemEditProfile.phoneNumberTextbox.fill("055 222 41 13");
      await customerManagement.customersItemEditProfile.saveChangesButton.click();
      // Expect 8.1: The profile again displays its original address, email address, and phone number.
      await expect(page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("29 Cross-Application Avenue, 3000 Bern", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByRole("link", { name: "ado.kinnett@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await expect(page.getByText("055 222 41 13", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
      await testInfo.attach("8", { body: await page.screenshot(), contentType: "image/png" });
    });
  }
});
