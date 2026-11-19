import type { Locator, Page } from "@playwright/test";

/** The screen /policies/:id of Policy Management: where its elements are. What a test expects of them stays in the test. */
export class PoliciesItemPage {
  constructor(readonly page: Page) {}

  get editButton(): Locator {
    return this.page.getByRole("button", { name: " Edit", exact: true });
  }
}
