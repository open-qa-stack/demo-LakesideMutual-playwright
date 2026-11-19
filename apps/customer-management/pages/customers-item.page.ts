import type { Locator, Page } from "@playwright/test";

/** The screen /customers/:id of Customer Management: where its elements are. What a test expects of them stays in the test. */
export class CustomersItemPage {
  constructor(readonly page: Page) {}

  get editProfileButton(): Locator {
    return this.page.getByRole("button", { name: "Edit Profile", exact: true });
  }
}
