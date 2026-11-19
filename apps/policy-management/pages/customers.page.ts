import type { Locator, Page } from "@playwright/test";

/** The screen /customers of Policy Management: where its elements are. What a test expects of them stays in the test. */
export class CustomersPage {
  constructor(readonly page: Page) {}

  managePolicyButtonInRow(row: string): Locator {
    return this.page.getByRole("row", { name: row }).getByRole("button", { name: "Manage Policy", exact: true });
  }
}
