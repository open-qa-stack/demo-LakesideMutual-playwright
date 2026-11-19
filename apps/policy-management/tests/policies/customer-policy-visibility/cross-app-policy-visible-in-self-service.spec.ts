import { expect, test } from "../../../../shared/fixtures.ts";

test("Verify the managed policy is visible to its customer", { tag: ["@level-cross-application","@domain-policies","@feature-customer-policy-visibility","@app-policy-management","@app-customer-self-service","@kind-other","@case-nominal","@data-write"] }, async ({ page, policyManagement, customerSelfService }, testInfo) => {
  await test.step("1. Open the policy detail in Policy Management and confirm its customer and coverage information", async () => {
    await page.goto("/");
    await policyManagement.home.showDetailsButton.click();
    await policyManagement.insuranceQuoteRequestsItem.policiesLink.click();
    await policyManagement.home.showDetailsButton.click();
    // Expect 1.1: The policy detail shows the policy and the listed coverage amounts for Max Mustermann.
    await expect(page.getByRole("heading", { name: "Health Insurance", exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByRole("link", { name: "Max Mustermann", exact: true })).toBeVisible();
    await expect(page.getByText("1500 CHF", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("250 CHF", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await expect(page.getByText("1000000 CHF", { exact: true }).filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Sign in and view the customer's policy list in Customer Self-Service; the sign-in establishes the session without changing the policy data", async () => {
    await customerSelfService.page.goto(new URL("/policies", process.env.OQAS_BASE_URL_CUSTOMER_SELF_SERVICE).href);
    await customerSelfService.login.emailAddressTextbox.fill(process.env.CSS_DEMO_USERNAME!);
    await customerSelfService.login.passwordTextbox.fill(process.env.CSS_DEMO_PASSWORD!);
    await customerSelfService.login.logInButton.click();
    await customerSelfService.page.goto(new URL("/policies", process.env.OQAS_BASE_URL_CUSTOMER_SELF_SERVICE).href);
    // Expect 2.1: Customer Self-Service displays the Health Insurance policy with matching deductible, premium and policy limit.
    await expect(customerSelfService.page.getByRole("heading", { name: "Health Insurance", exact: true, level: 3 })).toBeVisible();
    await expect(customerSelfService.page.getByText("1500 CHF", { exact: true })).toBeVisible();
    await expect(customerSelfService.page.getByText("250 CHF", { exact: true })).toBeVisible();
    await expect(customerSelfService.page.getByText("1000000 CHF", { exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await customerSelfService.page.screenshot(), contentType: "image/png" });
  });
});
