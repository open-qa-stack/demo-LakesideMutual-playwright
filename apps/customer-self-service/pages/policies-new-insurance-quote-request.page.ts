import type { Locator, Page } from "@playwright/test";

/** The screen /policies/new-insurance-quote-request of Customer Self-Service: where its elements are. What a test expects of them stays in the test. */
export class PoliciesNewInsuranceQuoteRequestPage {
  constructor(readonly page: Page) {}

  get insuranceQuoteRequestsLink(): Locator {
    return this.page.getByRole("link", { name: "Insurance Quote Requests", exact: true });
  }
}
