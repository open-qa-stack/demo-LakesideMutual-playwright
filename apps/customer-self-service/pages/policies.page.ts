import type { Locator, Page } from "@playwright/test";

/** The screen /policies of Customer Self-Service: where its elements are. What a test expects of them stays in the test. */
export class PoliciesPage {
  constructor(readonly page: Page) {}

  get myProfileLink(): Locator {
    return this.page.getByRole("link", { name: "My Profile", exact: true });
  }
}
