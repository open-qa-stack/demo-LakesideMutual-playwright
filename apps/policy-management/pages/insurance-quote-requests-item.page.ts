import type { Locator, Page } from "@playwright/test";

/** The screen /insurance-quote-requests/:id of Policy Management: where its elements are. What a test expects of them stays in the test. */
export class InsuranceQuoteRequestsItemPage {
  constructor(readonly page: Page) {}

  get respondButton(): Locator {
    return this.page.getByRole("button", { name: "Respond", exact: true });
  }

  get rejectRadio(): Locator {
    return this.page.getByRole("radio", { name: "Reject", exact: true });
  }

  get cancelButton(): Locator {
    return this.page.getByRole("button", { name: "Cancel", exact: true });
  }

  get policiesLink(): Locator {
    return this.page.getByRole("link", { name: " Policies", exact: true });
  }
}
