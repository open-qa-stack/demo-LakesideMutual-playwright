import type { Page } from "@playwright/test";
import { CustomersItemEditProfilePage } from "./customers-item-edit-profile.page.ts";
import { CustomersItemPage } from "./customers-item.page.ts";
import { HomePage } from "./home.page.ts";

/** The screens of Customer Management, on one page. Written by oqas from the page objects of this folder: add nothing here. */
export class CustomerManagement {
  readonly customersItemEditProfile: CustomersItemEditProfilePage;
  readonly customersItem: CustomersItemPage;
  readonly home: HomePage;

  constructor(readonly page: Page) {
    this.customersItemEditProfile = new CustomersItemEditProfilePage(page);
    this.customersItem = new CustomersItemPage(page);
    this.home = new HomePage(page);
  }
}
