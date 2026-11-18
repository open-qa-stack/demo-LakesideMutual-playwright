import type { Page } from "@playwright/test";
import { PoliciesPage } from "./policies.page.ts";

/** The screens of Customer Self-Service, on one page. Written by oqas from the page objects of this folder: add nothing here. */
export class CustomerSelfService {
  readonly policies: PoliciesPage;

  constructor(readonly page: Page) {
    this.policies = new PoliciesPage(page);
  }
}
