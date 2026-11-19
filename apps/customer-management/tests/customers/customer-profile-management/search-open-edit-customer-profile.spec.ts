import { expect, test } from "../../../../shared/fixtures.ts";

test("Search for a customer, open the profile, and update contact details", { tag: ["@level-business","@domain-customers","@feature-customer-profile-management","@app-customer-management","@kind-other","@case-nominal","@data-write"] }, async ({ page, customerManagement }, testInfo) => {
  await test.step("1. Open the Customer Management customer list", async () => {
    await page.goto("/");
    // Expect 1.1: The customer list is displayed with the customer records.
    await expect(page.getByRole("heading", { name: "Customers", exact: true })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Search for the customer by the last-name fragment Kinnett", async () => {
    await customerManagement.home.searchTextbox.fill("Kinnett");
    await customerManagement.home.searchButton.click();
    // Expect 2.1: The matching customer appears in the results.
    await expect(page.getByRole("cell", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("columnheader", { name: "1 - 1 of 1", exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Open Ado Kinnett's customer profile", async () => {
    await customerManagement.home.showButtonInRow("Ado Kinnett").click();
    // Expect 3.1: The customer's profile displays their current profile and contact information.
    await expect(page.getByText("Ado Kinnett", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("Customer Profile").filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("28 Cross-Application Avenue, 3000 Bern", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("link", { name: "akinnetta@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("055 222 41 12", { exact: true })).toBeVisible();
    await testInfo.attach("3", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("4. Open the profile edit form", async () => {
    await customerManagement.customersItem.editProfileButton.click();
    // Expect 4.1: The edit form is prefilled with customer profile details and offers saving changes.
    await expect(page.getByText("First Name", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Ado Kinnett", exact: true })).toBeVisible();
    await expect(page.getByText("Last Name", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Ado Kinnett", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("Street Address", { exact: true })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Street Address", exact: true })).toHaveValue("28 Cross-Application Avenue");
    await expect(page.getByText("Email Address", { exact: true })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Email Address", exact: true })).toHaveValue("akinnetta@example.com");
    await expect(page.getByText("Phone Number", { exact: true })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Phone Number", exact: true })).toHaveValue("055 222 41 12");
    await expect(page.getByRole("button", { name: "Save Changes", exact: true })).toBeVisible();
    await testInfo.attach("4", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("5. Change the street address, email address, and phone number, then save the profile", async () => {
    await customerManagement.customersItemEditProfile.streetAddressTextbox.fill("29 Cross-Application Avenue");
    await customerManagement.customersItemEditProfile.emailAddressTextbox.fill("ado.kinnett@example.com");
    await customerManagement.customersItemEditProfile.phoneNumberTextbox.fill("055 222 41 13");
    await customerManagement.customersItemEditProfile.saveChangesButton.click();
    // Expect 5.1: The profile returns and displays the updated contact details.
    await expect(page.getByText("29 Cross-Application Avenue, 3000 Bern", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("link", { name: "ado.kinnett@example.com", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("055 222 41 13", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("5", { body: await page.screenshot(), contentType: "image/png" });
  });
});
