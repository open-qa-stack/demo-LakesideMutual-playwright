import type { Page } from "@playwright/test";
import { CustomersItemPage } from "./customers-item.page.ts";
import { CustomersPage } from "./customers.page.ts";
import { HomePage } from "./home.page.ts";
import { InsuranceQuoteRequestsItemPage } from "./insurance-quote-requests-item.page.ts";
import { InsuranceQuoteRequestsPage } from "./insurance-quote-requests.page.ts";
import { PoliciesItemPage } from "./policies-item.page.ts";

/** The screens of Policy Management, on one page. Written by oqas from the page objects of this folder: add nothing here. */
export class PolicyManagement {
  readonly customersItem: CustomersItemPage;
  readonly customers: CustomersPage;
  readonly home: HomePage;
  readonly insuranceQuoteRequestsItem: InsuranceQuoteRequestsItemPage;
  readonly insuranceQuoteRequests: InsuranceQuoteRequestsPage;
  readonly policiesItem: PoliciesItemPage;

  constructor(readonly page: Page) {
    this.customersItem = new CustomersItemPage(page);
    this.customers = new CustomersPage(page);
    this.home = new HomePage(page);
    this.insuranceQuoteRequestsItem = new InsuranceQuoteRequestsItemPage(page);
    this.insuranceQuoteRequests = new InsuranceQuoteRequestsPage(page);
    this.policiesItem = new PoliciesItemPage(page);
  }
}
