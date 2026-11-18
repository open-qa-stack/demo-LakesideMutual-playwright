import type { Locator, Page } from "@playwright/test";

/** The screen /customers/:id/edit_profile of Customer Management: where its elements are. What a test expects of them stays in the test. */
export class CustomersItemEditProfilePage {
  constructor(readonly page: Page) {}

  get phoneNumberTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Phone Number", exact: true });
  }

  get saveChangesButton(): Locator {
    return this.page.getByRole("button", { name: "Save Changes", exact: true });
  }
}
