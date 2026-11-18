import type { Page } from "@playwright/test";
import { HomePage } from "./home.page.ts";
import { LoginPage } from "./login.page.ts";
import { PoliciesNewInsuranceQuoteRequestPage } from "./policies-new-insurance-quote-request.page.ts";
import { PoliciesPage } from "./policies.page.ts";

/** The screens of Customer Self-Service, on one page. Written by oqas from the page objects of this folder: add nothing here. */
export class CustomerSelfService {
  readonly home: HomePage;
  readonly login: LoginPage;
  readonly policiesNewInsuranceQuoteRequest: PoliciesNewInsuranceQuoteRequestPage;
  readonly policies: PoliciesPage;

  constructor(readonly page: Page) {
    this.home = new HomePage(page);
    this.login = new LoginPage(page);
    this.policiesNewInsuranceQuoteRequest = new PoliciesNewInsuranceQuoteRequestPage(page);
    this.policies = new PoliciesPage(page);
  }
}
