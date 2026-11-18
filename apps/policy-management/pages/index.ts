import type { Page } from "@playwright/test";
import { CustomersItemPoliciesNewPage } from "./customers-item-policies-new.page.ts";
import { HomePage } from "./home.page.ts";
import { InsuranceQuoteRequestsItemPage } from "./insurance-quote-requests-item.page.ts";
import { InsuranceQuoteRequestsPage } from "./insurance-quote-requests.page.ts";

/** The screens of Policy Management, on one page. Written by oqas from the page objects of this folder: add nothing here. */
export class PolicyManagement {
  readonly customersItemPoliciesNew: CustomersItemPoliciesNewPage;
  readonly home: HomePage;
  readonly insuranceQuoteRequestsItem: InsuranceQuoteRequestsItemPage;
  readonly insuranceQuoteRequests: InsuranceQuoteRequestsPage;

  constructor(readonly page: Page) {
    this.customersItemPoliciesNew = new CustomersItemPoliciesNewPage(page);
    this.home = new HomePage(page);
    this.insuranceQuoteRequestsItem = new InsuranceQuoteRequestsItemPage(page);
    this.insuranceQuoteRequests = new InsuranceQuoteRequestsPage(page);
  }
}
