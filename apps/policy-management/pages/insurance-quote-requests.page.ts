import type { Locator, Page } from "@playwright/test";

/** The screen /insurance-quote-requests of Policy Management: where its elements are. What a test expects of them stays in the test. */
export class InsuranceQuoteRequestsPage {
  constructor(readonly page: Page) {}

  showDetailsButtonInRow(row: string): Locator {
    return this.page.getByRole("row", { name: row }).getByRole("button", { name: "Show Details", exact: true });
  }
}
