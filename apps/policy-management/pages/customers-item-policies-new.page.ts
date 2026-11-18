import type { Locator, Page } from "@playwright/test";

/** The screen /customers/:id/policies/new of Policy Management: where its elements are. What a test expects of them stays in the test. */
export class CustomersItemPoliciesNewPage {
  constructor(readonly page: Page) {}

  get createPolicyButton(): Locator {
    return this.page.getByRole("button", { name: "Create Policy", exact: true });
  }
}
