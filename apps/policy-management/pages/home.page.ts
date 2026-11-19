import type { Locator, Page } from "@playwright/test";

/** The screen / of Policy Management: where its elements are. What a test expects of them stays in the test. */
export class HomePage {
  constructor(readonly page: Page) {}

  get showDetailsButton(): Locator {
    return this.page.getByRole("button", { name: "Show Details", exact: true });
  }
}
