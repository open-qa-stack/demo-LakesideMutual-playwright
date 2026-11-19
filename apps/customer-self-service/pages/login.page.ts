import type { Locator, Page } from "@playwright/test";

/** The screen /login of Customer Self-Service: where its elements are. What a test expects of them stays in the test. */
export class LoginPage {
  constructor(readonly page: Page) {}

  get emailAddressTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Email Address", exact: true });
  }

  get passwordTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Password", exact: true });
  }

  get logInButton(): Locator {
    return this.page.getByRole("button", { name: "Log in", exact: true });
  }

  get fillInButton(): Locator {
    return this.page.getByRole("button", { name: "Fill in", exact: true });
  }
}
