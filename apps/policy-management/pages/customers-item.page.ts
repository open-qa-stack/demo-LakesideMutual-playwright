import type { Locator, Page } from "@playwright/test";

/** The screen /customers/:id of Policy Management: where its elements are. What a test expects of them stays in the test. */
export class CustomersItemPage {
  constructor(readonly page: Page) {}

  get newPolicyButton(): Locator {
    return this.page.getByRole("button", { name: " New Policy", exact: true });
  }
}
