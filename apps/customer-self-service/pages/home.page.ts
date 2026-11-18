import type { Locator, Page } from "@playwright/test";

/** The screen / of Customer Self-Service: where its elements are. What a test expects of them stays in the test. */
export class HomePage {
  constructor(readonly page: Page) {}

  get logInToAccessYourButton(): Locator {
    return this.page.getByRole("button", { name: "Log in to access your LM account", exact: true });
  }
}
