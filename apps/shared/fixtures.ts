import { test as base, expect } from "@playwright/test";
import { PolicyManagement } from "../policy-management/pages/index.ts";
import { CustomerManagement } from "../customer-management/pages/index.ts";
import { CustomerSelfService } from "../customer-self-service/pages/index.ts";

/** Each application, with the page objects of its screens. */
interface Applications {
  policyManagement: PolicyManagement;
  customerManagement: CustomerManagement;
  customerSelfService: CustomerSelfService;
}

/**
 * The test every test file imports: that of Playwright, with the fixtures of this repository. The application
 * of a test is on its page; another one has a tab of its own in the same browser context.
 */
export const test = base.extend<Applications>({
  policyManagement: async ({ page, context }, use, testInfo) => {
    await use(new PolicyManagement(testInfo.project.name === "policy-management" ? page : await context.newPage()));
  },
  customerManagement: async ({ page, context }, use, testInfo) => {
    await use(new CustomerManagement(testInfo.project.name === "customer-management" ? page : await context.newPage()));
  },
  customerSelfService: async ({ page, context }, use, testInfo) => {
    await use(new CustomerSelfService(testInfo.project.name === "customer-self-service" ? page : await context.newPage()));
  },
});

export { expect };
