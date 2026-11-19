import type { Locator, Page } from "@playwright/test";

/** The screen / of Customer Management: where its elements are. What a test expects of them stays in the test. */
export class HomePage {
  constructor(readonly page: Page) {}

  get searchTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Search...", exact: true });
  }

  get searchButton(): Locator {
    return this.page.getByRole("button", { name: "Search", exact: true });
  }

  showButtonInRow(row: string): Locator {
    return this.page.getByRole("row", { name: row }).getByRole("button", { name: "Show", exact: true });
  }
}
