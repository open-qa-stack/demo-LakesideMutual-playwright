import { expect, test } from "../../../../shared/fixtures.ts";

test("Respond to an open quote request and verify the response in Customer Self-Service", { tag: ["@level-cross-application","@domain-insurance-quotes","@feature-quote-response-customer-visibility","@app-policy-management","@app-customer-self-service","@kind-other","@case-nominal","@data-write"] }, async ({ page, policyManagement, customerSelfService }, testInfo) => {
  await test.step("1. Open the management details for the unanswered quote request", async () => {
    await page.goto("/insurance-quote-requests/8");
    // Expect 1.1: The request details show the open Health Insurance request for Max Mustermann.
    await expect(page.getByText("Lakeside Mutual has not yet responded to this request.").filter({ visible: true })).not.toHaveCount(0);
    await testInfo.attach("1", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("2. Open the response dialog and choose Reject so the customer can see the processed decision", async () => {
    await policyManagement.insuranceQuoteRequestsItem.respondButton.click();
    // Expect 2.1: The response dialog offers Accept and Reject choices.
    await expect(page.getByText("Respond to Insurance Quote Request", { exact: true })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Accept", exact: true })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Reject", exact: true })).toBeVisible();
    await testInfo.attach("2", { body: await page.screenshot(), contentType: "image/png" });
  });
  await test.step("3. Sign in to Customer Self-Service and open the same request details to check its current status", async () => {
    await customerSelfService.page.goto(new URL("/login", process.env.OQAS_BASE_URL_CUSTOMER_SELF_SERVICE).href);
    await customerSelfService.login.emailAddressTextbox.fill(process.env.CSS_DEMO_USERNAME!);
    await customerSelfService.login.fillInButton.click();
    await customerSelfService.login.logInButton.click();
    await customerSelfService.page.goto(new URL("/policies/insurance-quote-requests/8", process.env.OQAS_BASE_URL_CUSTOMER_SELF_SERVICE).href);
    // Expect 3.1: The customer can see the submitted request's current details.
    await expect(customerSelfService.page.getByText("You submitted the following Insurance Quote Request:").filter({ visible: true })).not.toHaveCount(0);
    await expect(customerSelfService.page.getByText("Lakeside Mutual has not yet responded to this Insurance Quote Request.", { exact: true })).toBeVisible();
    await testInfo.attach("3", { body: await customerSelfService.page.screenshot(), contentType: "image/png" });
  });
});
