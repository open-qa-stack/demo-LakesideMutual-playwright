import type { Locator, Page } from "@playwright/test";

/** The screen /policies/new-insurance-quote-request of Customer Self-Service: where its elements are. What a test expects of them stays in the test. */
export class PoliciesNewInsuranceQuoteRequestPage {
  constructor(readonly page: Page) {}

  get nextButton(): Locator {
    return this.page.getByRole("button", { name: "Next", exact: true });
  }

  get insuranceTypelifeInsurancehomeInsurancehealthInsurancecarText(): Locator {
    return this.page.getByText("Insurance TypeLife InsuranceHome InsuranceHealth InsuranceCar Insurance", { exact: true });
  }

  get homeInsuranceOption(): Locator {
    return this.page.getByRole("option", { name: "Home Insurance", exact: true });
  }

  get deductible300Chf500Chf1000Chf1500Chf2000Text(): Locator {
    return this.page.getByText("Deductible300 CHF500 CHF1000 CHF1500 CHF2000 CHF2500 CHF", { exact: true });
  }

  get element1000ChfOption(): Locator {
    return this.page.getByRole("option", { name: "1000 CHF", exact: true });
  }

  get requestAQuoteButton(): Locator {
    return this.page.getByRole("button", { name: "Request a Quote", exact: true });
  }
}
