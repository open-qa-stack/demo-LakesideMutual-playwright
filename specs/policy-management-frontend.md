---
id: SFD-PMF
title: Policy Management Frontend — Functional Specification
type: sfd
component: policy-management-frontend
version: 0.1.0
status: draft
sources:
  - policy-management-frontend/src/router/index.js
  - policy-management-frontend/src/api.js
  - policy-management-frontend/src/utils.js
  - policy-management-frontend/src/App.vue
  - policy-management-frontend/src/components/
---

# Policy Management Frontend — Functional Specification

Structure after ISO/IEC/IEEE 29148 (stakeholder and system requirements). Statements are derived from the code, the OpenAPI contracts and the running application. Each requirement, rule, use case and criterion carries a **Basis**: `observed` (read in code, contract or running application) or `inferred` (deduced from observed facts, not directly visible). Anything that could not be established is listed under *Open points* instead.

## 1. Purpose

The Policy Management frontend is the web application used by Lakeside Mutual staff to manage insurance policies. It lists all policies, shows and edits the policies of a customer, shows a customer's risk factor, and lets staff answer insurance quote requests submitted by customers with a quote or a rejection. All data comes from the Policy Management backend.

## 2. Scope

### 2.1 In scope

- Eight screens: policy list, policy detail, quote request list, quote request detail with response form, customer list with search, customer detail with risk factor and policies, policy edit form, policy creation form.
- Deletion of policies from the policy detail and customer detail screens.
- A link to the same customer in the Customer Management frontend.

### 2.2 Out of scope

- Editing customer data (Customer Management frontend).
- Authentication: the application has no login (`PMF-BR-14`).
- Business rules enforced by the backend (status transitions, risk factor formula); they are specified in [SFD-PMB](../policy-management-backend/sfd.md) and only referenced here.

### 2.3 Related specifications

- [STD-PMF](std.md) — technical specification of this component.
- [SFD-PMB](../policy-management-backend/sfd.md) and [STD-PMB](../policy-management-backend/std.md) — the backend providing every operation called here.
- [SFD-CMF](../customer-management-frontend/sfd.md) — target of the "Open in Customer Management" button.
- [System overview](../../system/overview-sfd.md).

## 3. Stakeholders and actors

| Actor | Kind (human / system) | Description | Basis |
|---|---|---|---|
| Lakeside Mutual staff member | human | Uses all screens; no role distinction in the code. | observed |
| Policy Management backend | system | Provides every operation called by the application (`PMB-API-01` to `PMB-API-03`, `PMB-API-11` to `PMB-API-19`). | observed |
| Customer Management frontend | system | Opened at `http://localhost:3020/customers/{customerId}` from the customer detail screen. | observed |

## 4. Functional context

The application talks only to the Policy Management backend, whose URL is given by `VUE_APP_POLICY_MANAGEMENT_BACKEND` (observed value `http://localhost:8090`). Customer data shown here is read by the backend from Customer Core. Quote requests shown here are created by customers in the Customer Self-Service frontend and forwarded by the Customer Self-Service backend; the customer's decision on a quote is made there as well. These flows are described in the [system overview](../../system/overview-sfd.md).

## 5. Use cases

### PMF-UC-01 — Browse all policies

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | Backend reachable |
| Trigger | Opening `/` or clicking the "Policies" menu item |
| Postconditions | None |
| Related | `PMF-SCR-01`, `PMF-BR-01`, `PMB-API-14` |
| Basis | observed |

**Main flow**

1. The screen loads the first page of policies with the customer embedded.
2. The staff member pages forward and backward with the chevron buttons.
3. "Show Details" opens the policy detail screen.

**Alternative and exception flows**

- *A1 — Backend error*: an error message replaces the table (`PMF-BR-10`).

### PMF-UC-02 — View a policy

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | None |
| Trigger | "Show Details" on the policy list, or the "A new policy" link of a quote request |
| Postconditions | None |
| Related | `PMF-SCR-02`, `PMF-BR-12`, `PMB-API-16` |
| Basis | observed |

**Main flow**

1. The screen loads the policy with its customer and shows type, customer, creation date, period, deductible, premium, limit and insuring agreement items.
2. The info buttons next to Deductible, Insurance Premium and Policy Limit open an explanation dialog.

**Alternative and exception flows**

- *A1 — Unknown policy*: "Policy not found." is shown and the breadcrumb reads "Error!".

### PMF-UC-03 — Delete a policy

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | Policy displayed on the policy detail or customer detail screen |
| Trigger | "Delete" button |
| Postconditions | The policy is deleted in the backend |
| Related | `PMF-SCR-02`, `PMF-SCR-06`, `PMF-BR-07`, `PMB-API-18` |
| Basis | observed |

**Main flow**

1. The staff member clicks "Delete"; a confirmation dialog "Delete Policy" appears.
2. The staff member clicks "Delete" in the dialog; the policy is deleted.
3. On the policy detail screen the application returns to `/`; on the customer detail screen the policy list is reloaded.

**Alternative and exception flows**

- *A1 — Cancel*: "Cancel" closes the dialog without deleting.

### PMF-UC-04 — Search customers

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | Backend and Customer Core reachable |
| Trigger | Opening `/customers` |
| Postconditions | None |
| Related | `PMF-SCR-05`, `PMF-BR-02`, `PMF-BR-03`, `PMB-API-01` |
| Basis | observed |

**Main flow**

1. The screen loads the first page of customers without filter.
2. The staff member types a search term and submits; the list is reloaded with the filter and the matching part of each name is shown in bold.
3. The staff member pages with the chevron buttons and opens a customer with "Manage Policy".

### PMF-UC-05 — View a customer, the risk factor and the customer's policies

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | None |
| Trigger | "Manage Policy" on the customer list, a customer link elsewhere |
| Postconditions | None |
| Related | `PMF-SCR-06`, `PMF-BR-04`, `PMB-API-02`, `PMB-API-19`, `PMB-API-03` |
| Basis | observed |

**Main flow**

1. The screen loads the customer, then computes the risk factor from the customer's birthday and postal code, then loads the customer's policies.
2. It shows the profile (name, address, email, phone), the risk factor in a colour depending on its value, and one policy panel per policy.
3. "New Policy" opens the creation form; "Edit" on a policy opens the edit form; the info button next to the risk factor explains it.

**Alternative and exception flows**

- *A1 — No policies*: "This customer doesn't have any insurance policies yet." is shown.
- *A2 — Unknown customer*: "Customer not found." is shown and the breadcrumb reads "Error".

### PMF-UC-06 — Create a policy

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | Customer exists |
| Trigger | "New Policy" on the customer detail screen |
| Postconditions | A new policy exists for the customer |
| Related | `PMF-SCR-08`, `PMF-BR-05`, `PMF-BR-06`, `PMF-BR-08`, `PMB-API-02`, `PMB-API-15` |
| Basis | observed |

**Main flow**

1. The staff member enters period, policy type, deductible, premium, limit and optional insuring agreement items, then clicks "Create Policy".
2. On success the application returns to the customer detail screen.

**Alternative and exception flows**

- *A1 — Backend rejects the request*: the form shows the error box "Failed to create policy" (`PMF-BR-08`).

### PMF-UC-07 — Edit a policy

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | Policy exists |
| Trigger | "Edit" on a policy panel |
| Postconditions | The policy is updated |
| Related | `PMF-SCR-07`, `PMF-BR-05`, `PMF-BR-06`, `PMF-BR-08`, `PMB-API-02`, `PMB-API-16`, `PMB-API-17` |
| Basis | observed |

**Main flow**

1. The form opens pre-filled with the current policy values.
2. The staff member changes values and clicks "Save Changes".
3. On success the application returns to the customer detail screen.

**Alternative and exception flows**

- *A1 — Backend rejects the request*: the form shows the error box "Policy Update failed".
- *A2 — Policy cannot be loaded*: the form is shown empty without error message (`PMF-BR-13`).

### PMF-UC-08 — Review insurance quote requests

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | None |
| Trigger | "Insurance Quote Requests" menu item |
| Postconditions | None |
| Related | `PMF-SCR-03`, `PMF-BR-09`, `PMB-API-11` |
| Basis | observed |

**Main flow**

1. The screen loads all quote requests and splits them into "Open Insurance Quote Requests" and "Past Insurance Quote Requests".
2. Each row shows date, customer (link), insurance type and status; "Show Details" opens the request.

### PMF-UC-09 — Follow the history of a quote request

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | None |
| Trigger | "Show Details" on the quote request list |
| Postconditions | None |
| Related | `PMF-SCR-04`, `PMF-BR-11`, `PMB-API-12` |
| Basis | observed |

**Main flow**

1. The screen loads the request and shows one dated block per status history entry, oldest first, with a status-specific text (`PMF-BR-11`).

### PMF-UC-10 — Respond to a quote request

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | Current status of the request is `REQUEST_SUBMITTED` |
| Trigger | "Respond" button in the current status block |
| Postconditions | The request is `QUOTE_RECEIVED` with a quote, or `REQUEST_REJECTED` |
| Related | `PMF-SCR-04`, `PMF-BR-05`, `PMF-BR-15`, `PMF-BR-16`, `PMB-API-13`, `PMB-API-12` |
| Basis | observed |

**Main flow**

1. The dialog "Respond to Insurance Quote Request" opens with "Accept" selected and the expiration date pre-set (`PMF-BR-15`).
2. The staff member enters insurance premium and policy limit and clicks "Send Response" (enabled only when the form is valid, `PMF-BR-16`).
3. The response is sent, the dialog closes and the request is reloaded, now showing the quote.

**Alternative and exception flows**

- *A1 — Reject*: the staff member selects "Reject"; the amount fields disappear and "Send Response" is always enabled; the request is reloaded showing the rejection.
- *A2 — Cancel*: "Cancel" closes the dialog without sending.
- *A3 — Backend rejects the response*: the dialog stays open and shows "Failed to respond to Insurance Quote Request".

### PMF-UC-11 — Open the customer in Customer Management

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | Customer loaded |
| Trigger | "Open in Customer Management" button |
| Postconditions | The browser leaves the application |
| Related | `PMF-SCR-06`, `PMF-BR-17` |
| Basis | observed |

**Main flow**

1. The browser navigates to `http://localhost:3020/customers/{customerId}`, the customer detail screen of the Customer Management frontend (`CMF-SCR-03`).

## 6. Functional requirements

| ID | Requirement ("The component shall ...") | Use case | Basis |
|---|---|---|---|
| PMF-FR-01 | The component shall show all policies, newest first, ten per page, with creation date, customer name, premium and limit. | PMF-UC-01 | observed |
| PMF-FR-02 | The component shall let the staff member page through policies and customers using the `prev` and `next` links returned by the backend, and show the range "first-last of total". | PMF-UC-01, PMF-UC-04 | observed |
| PMF-FR-03 | The component shall show a policy's type, customer, creation date, period, deductible, premium, limit and insuring agreement items. | PMF-UC-02, PMF-UC-05 | observed |
| PMF-FR-04 | The component shall explain deductible, insurance premium, policy limit and risk factor in information dialogs. | PMF-UC-02, PMF-UC-05 | observed |
| PMF-FR-05 | The component shall delete a policy only after confirmation. | PMF-UC-03 | observed |
| PMF-FR-06 | The component shall search customers by a free-text term and highlight the first match in each customer's name. | PMF-UC-04 | observed |
| PMF-FR-07 | The component shall show a customer's profile, risk factor and all policies on one screen. | PMF-UC-05 | observed |
| PMF-FR-08 | The component shall create a policy for a customer from period, type, deductible, premium, limit and insuring agreement items, all amounts in CHF. | PMF-UC-06 | observed |
| PMF-FR-09 | The component shall edit an existing policy in a form pre-filled with its current values. | PMF-UC-07 | observed |
| PMF-FR-10 | The component shall separate open quote requests from past ones. | PMF-UC-08 | observed |
| PMF-FR-11 | The component shall show the complete status history of a quote request with a text per status. | PMF-UC-09 | observed |
| PMF-FR-12 | The component shall let the staff member accept a submitted quote request with expiration date, premium and limit (CHF), or reject it. | PMF-UC-10 | observed |
| PMF-FR-13 | The component shall show backend errors as messages: not found, Customer Core unavailable (502), unknown error, backend unreachable. | all | observed |
| PMF-FR-14 | The component shall display the configured backend URL in a debug footer on every screen. | — | observed |
| PMF-FR-15 | The component shall offer navigation through a menu (Policies, Insurance Quote Requests, Customers) and breadcrumbs on detail and form screens. | all | observed |

## 7. Business rules

| ID | Rule | Enforced by | Basis |
|---|---|---|---|
| PMF-BR-01 | The policy list always requests the customer expansion (`expand=customer`) and uses the backend default page size of 10. | `api.js` `getPolicies` | observed |
| PMF-BR-02 | The customer list uses the backend default page size of 10; the initial load uses an empty filter; paging keeps the filter through the backend links. | `api.js` `getCustomers`, `Customers.vue` | observed |
| PMF-BR-03 | Name highlighting is case-insensitive and marks only the first occurrence of the last submitted search term in "firstname lastname". | `Customers.vue` `getCustomerName` | observed |
| PMF-BR-04 | Risk factor colour: no value → grey; ≤ 20 → green; ≤ 40 → olive; ≤ 60 → yellow; ≤ 80 → orange; above 80 → red. The value itself is computed by the backend (`PMB-BR-23`). | `CustomerDetail.vue` `riskFactorColor` | observed |
| PMF-BR-05 | All amounts are sent with currency `CHF`; the currency cannot be chosen. | `api.js` `createPolicy`, `updatePolicy`, `respondToInsuranceQuoteRequest` | observed |
| PMF-BR-06 | The policy forms perform no client-side validation; every check is done by the backend (`PMB-BR-07`, `PMB-BR-08`). Dates are entered as calendar dates and sent as the start of that day in the browser time zone. | `CreatePolicy.vue`, `EditPolicy.vue` | observed |
| PMF-BR-07 | After deleting from the policy detail screen the application goes to `/`; after deleting from the customer detail screen it reloads that customer's policies. A failed deletion is not reported to the user. | `PolicyDetail.vue`, `CustomerDetail.vue`, `Policy.vue`, `api.js` `deletePolicy` | observed |
| PMF-BR-08 | Form error messages are built from the backend's `errors` list as "<field label> <message>", with "null" replaced by "empty"; labels: Start Date, End Date, Policy Type, Deductible, Insurance Premium, Policy Limit (policy forms) and Insurance Premium, Policy Limit, Expiration Date (response form). Errors on other fields are reported once as "Insuring Agreement must not contain empty fields". Without an `errors` list, the backend `message` is shown; otherwise the error box has no message lines. | `utils.js` `extractFormError` | observed |
| PMF-BR-09 | Open quote requests are those whose current status is `REQUEST_SUBMITTED` or `QUOTE_RECEIVED`; past ones are `REQUEST_REJECTED`, `POLICY_CREATED`, `QUOTE_REJECTED`, `QUOTE_EXPIRED`. A request whose current status is `QUOTE_ACCEPTED` appears in neither list. The current status is the last history entry. | `InsuranceQuoteRequests.vue` | observed |
| PMF-BR-10 | Error texts: HTTP 404 → "<resource> not found."; HTTP 502 → "The Customer Self-Service backend is currently not available. Please follow the instructions in the corresponding README to ensure that it is running and listening on the right port."; other HTTP errors → "Unknown error."; network failure → "The Policy Management backend is currently not available. Please follow the instructions in the corresponding README to ensure that it is running and listening on the right port." | `ErrorMessage.vue` | observed |
| PMF-BR-11 | Status labels in lists (`RequestStatus.vue`): `REQUEST_SUBMITTED` "Request open"; `QUOTE_RECEIVED` "Waiting for Customer response"; `REQUEST_REJECTED` "Request rejected" (red); `QUOTE_ACCEPTED` "Quote accepted" (green); `POLICY_CREATED` "Policy created" (green); `QUOTE_REJECTED` "Quote rejected" (red); `QUOTE_EXPIRED` "Quote expired" (red). History texts (`StatusDescription.vue`): see `PMF-SCR-04`. | `RequestStatus.vue`, `StatusDescription.vue` | observed |
| PMF-BR-12 | Dates are displayed as `DD. MMM YYYY HH:mm` (creation dates, request dates, history dates, quote expiration date) or `DD. MMM YYYY` (policy period, requested start date). | `FormattedDate.vue` | observed |
| PMF-BR-13 | On the edit screen, a failure to load the policy is silently ignored and the empty form is displayed; a failure to load the customer on the edit or create screen is not caught and the loader remains (inferred). | `EditPolicy.vue`, `CreatePolicy.vue` | observed |
| PMF-BR-14 | No login, session or authorisation header is used. | `api.js` | observed |
| PMF-BR-15 | The default quote expiration date is today plus one month at 23:59 local time, set each time the response dialog opens; premium and limit are empty at opening. | `StatusDescription.vue` `computeDefaultExpirationDate`, `openResponseModal` | observed |
| PMF-BR-16 | "Send Response" is enabled for "Accept" only when the expiration date is not empty and premium and limit both parse as numbers; for "Reject" it is always enabled. The backend also requires a future expiration date and amounts ≥ 0 and < 1 000 000 000 000 (`PMB-BR-17`, `PMB-BR-08`). | `StatusDescription.vue` `isValid` | observed |
| PMF-BR-17 | The Customer Management link is fixed to `http://localhost:3020`, independent of configuration. | `CustomerDetail.vue` `openCustomerManagement` | observed |

## 8. Screens

All screens share a header (logo, "Policy Management", "Lakeside Mutual"; click returns to `/`), a menu with "Policies" (`/`), "Insurance Quote Requests" (`/insurance-quote-requests`) and "Customers" (`/customers`), and a footer "Environment Variable Debug Information" showing `VUE_APP_POLICY_MANAGEMENT_BACKEND: <url>`. Page title: "Lakeside Mutual - Policy Management". No screen requires a login. Basis: observed.

### PMF-SCR-01 — Policies (`/`)

Table of all policies, newest first, with pagination. Header "Policies".

| Field / element | Type | Required | Validation and constraints | Basis |
|---|---|---|---|---|
| Creation Date | text | — | `DD. MMM YYYY HH:mm` | observed |
| Customer | text | — | "firstname lastname" of the embedded customer | observed |
| Insurance Premium | text | — | "amount currency" | observed |
| Policy Limit | text | — | "amount currency" | observed |
| Range | text | — | "{offset+1}-{offset+count} of {size}" | observed |

| Action | Effect | Operation called | Basis |
|---|---|---|---|
| Open screen | Loads page 1 with customers | `PMB-API-14` (`expand=customer`) | observed |
| Left / right chevron | Loads the previous / next page; disabled when the link is absent | `PMB-API-14` (link `href`) | observed |
| "Show Details" | Opens `PMF-SCR-02` | — | observed |

Messages: "Loading..." while loading; errors per `PMF-BR-10` with resource "Policy".

### PMF-SCR-02 — Policy detail (`/policies/:policyid`)

Breadcrumb "Policies › {policyType} Policy ({firstname} {lastname})", then a policy panel.

| Field / element | Type | Required | Validation and constraints | Basis |
|---|---|---|---|---|
| Policy type | heading | — | | observed |
| Customer | link | — | to `/customers/{customerId}` | observed |
| Creation Date | text | — | `DD. MMM YYYY HH:mm` | observed |
| Period | text | — | "start – end", `DD. MMM YYYY` | observed |
| Deductible, Insurance Premium, Policy Limit | text with info button | — | "amount currency" | observed |
| Insuring Agreement | list | — | title and description per item; "N/A" when empty | observed |

| Action | Effect | Operation called | Basis |
|---|---|---|---|
| Open screen | Loads the policy with its customer | `PMB-API-16` (`expand=customer`) | observed |
| "Edit" | Opens `PMF-SCR-07` for this customer and policy | — | observed |
| "Delete", then "Delete" in the dialog | Deletes the policy, then goes to `/` | `PMB-API-18` | observed |
| Info buttons | Open the explanation dialog; "OK" closes it | — | observed |

Messages (verbatim): dialog "Delete Policy" — "Do you really want to delete this insurance policy? This action cannot be undone." with buttons "Cancel" and "Delete". Info dialogs: "Deductible" — "The deductible is the amount paid out of pocket by the policy holder (i.e., the customer) before an insurance provider (i.e., Lakeside Mutual) will pay any expenses."; "Insurance Premium" — "An insurance premium is the amount of money that the policy holder (i.e., the customer) must pay every month for an insurance policy."; "Policy Limit" — "A policy limit refers to the maximum monetary amount that an insurance provider (i.e., Lakeside Mutual) will pay out in relation to an insurance policy claim." Errors per `PMF-BR-10` with resource "Policy"; breadcrumb "Error!".

### PMF-SCR-03 — Insurance quote requests (`/insurance-quote-requests`)

Header "Insurance Quote Requests", two sections "Open Insurance Quote Requests" and "Past Insurance Quote Requests" (`PMF-BR-09`), each a table, in backend order (newest request date first).

| Field / element | Type | Required | Validation and constraints | Basis |
|---|---|---|---|---|
| Date | text | — | request date, `DD. MMM YYYY HH:mm` | observed |
| Customer | link | — | "firstname lastname" from the request, to `/customers/{customerId}` | observed |
| Insurance Type | text | — | requested insurance type | observed |
| Status | text | — | label of the current status (`PMF-BR-11`) | observed |

| Action | Effect | Operation called | Basis |
|---|---|---|---|
| Open screen | Loads all requests | `PMB-API-11` | observed |
| "Show Details" | Opens `PMF-SCR-04` | — | observed |
| Customer link | Opens `PMF-SCR-06` | — | observed |

Messages (verbatim): "No open Insurance Quote Requests available.", "No past Insurance Quote Requests available."; errors per `PMF-BR-10` with resource "Insurance Quote Request".

### PMF-SCR-04 — Insurance quote request detail (`/insurance-quote-requests/:requestid`)

Breadcrumb "Insurance Quote Requests › {insuranceType}", then one block per status history entry, headed by the entry date (`DD. MMM YYYY HH:mm`). Block content per status (`StatusDescription.vue`):

| Status | Text and content | Basis |
|---|---|---|
| `REQUEST_SUBMITTED` | "{customer link} requested a quote for a new {insuranceType} policy:" followed by a table: Customer (link), Address (Contact Address and Billing Address, street, postal code, city), Insurance Type, Start Date (`DD. MMM YYYY`), Deductible ("amount currency"). If current: "Lakeside Mutual has not yet responded to this request." and the "Respond" button. | observed |
| `REQUEST_REJECTED` | "Lakeside Mutual has rejected this Insurance Quote Request." ("rejected" in red) | observed |
| `QUOTE_RECEIVED` | "Lakeside Mutual has submitted the following Insurance Quote:" followed by Expiration Date (`DD. MMM YYYY HH:mm`), Insurance Premium, Policy Limit. If current: "{customer link} has not yet accepted or rejected this Insurance Quote." | observed |
| `QUOTE_ACCEPTED` | "{customer link} has accepted this Insurance Quote." ("accepted" in green) | observed |
| `POLICY_CREATED` | "A new policy has been created." ("A new policy" links to `/policies/{policyId}`) | observed |
| `QUOTE_REJECTED` | "{customer link} has rejected this Insurance Quote." ("rejected" in red) | observed |
| `QUOTE_EXPIRED` | "This Insurance Quote has expired." ("expired" in red) | observed |

Response dialog "Respond to Insurance Quote Request" (only for a current `REQUEST_SUBMITTED` entry):

| Field / element | Type | Required | Validation and constraints | Basis |
|---|---|---|---|---|
| Accept / Reject | radio buttons | yes | default "Accept"; choosing "Reject" clears premium, limit and errors | observed |
| Expiration Date | `datetime-local` input | yes (Accept) | must not be empty (client); default today + 1 month at 23:59 (`PMF-BR-15`); backend requires a future date | observed |
| Insurance Premium | number input, placeholder "Amount in CHF" | yes (Accept) | must parse as a number (client); backend: ≥ 0 and < 1 000 000 000 000; marked in error when the backend reports `insurancePremium.amount` | observed |
| Policy Limit | number input, placeholder "Amount in CHF" | yes (Accept) | as Insurance Premium; error field `policyLimit.amount` | observed |

| Action | Effect | Operation called | Basis |
|---|---|---|---|
| Open screen | Loads the request | `PMB-API-12` | observed |
| "Respond" | Opens the dialog with defaults | — | observed |
| "Send Response" (Accept) | Sends `QUOTE_RECEIVED` with expiration date, premium and limit in CHF; closes and reloads | `PMB-API-13`, then `PMB-API-12` | observed |
| "Send Response" (Reject) | Sends `REQUEST_REJECTED`; closes and reloads | `PMB-API-13`, then `PMB-API-12` | observed |
| "Cancel" | Closes the dialog | — | observed |
| Customer link | Opens `PMF-SCR-06` | — | observed |
| "A new policy" link | Opens `PMF-SCR-02` | — | observed |

Messages: error box "Failed to respond to Insurance Quote Request" with messages per `PMF-BR-08`; errors per `PMF-BR-10` with resource "Insurance Quote Request"; breadcrumb "Error!".

### PMF-SCR-05 — Customers (`/customers`)

Header "Customers", search form, table, pagination.

| Field / element | Type | Required | Validation and constraints | Basis |
|---|---|---|---|---|
| Search | text input, placeholder "Search..." | no | free text, sent as `filter`; no client validation | observed |
| Name | text | — | "firstname lastname", match in bold (`PMF-BR-03`) | observed |
| Email | mailto link | — | | observed |
| Address | text | — | "street, postal code city" | observed |
| Range | text | — | "{offset+1}-{offset+count} of {size}" | observed |

| Action | Effect | Operation called | Basis |
|---|---|---|---|
| Open screen | Loads page 1 without filter | `PMB-API-01` | observed |
| "Search" (or Enter) | Reloads with the filter | `PMB-API-01` (`filter`) | observed |
| Left / right chevron | Previous / next page | `PMB-API-01` (link `href`) | observed |
| "Manage Policy" | Opens `PMF-SCR-06` | — | observed |

Messages: errors per `PMF-BR-10` with resource "Customer".

### PMF-SCR-06 — Customer detail (`/customers/:customerid`)

Breadcrumb "Customers › {firstname} {lastname}", button "Open in Customer Management", "Customer Profile" (name, address, email link, phone), "Risk Factor" statistic with info button, section "Insurance Policies" with "New Policy" and one policy panel per policy (same panel as `PMF-SCR-02`).

| Field / element | Type | Required | Validation and constraints | Basis |
|---|---|---|---|---|
| Customer Profile | list | — | name; "street, postal code city"; email (mailto); phone number | observed |
| Risk Factor | number | — | 0–100, colour per `PMF-BR-04` | observed |
| Policy panels | panels | — | as `PMF-SCR-02`, newest first | observed |

| Action | Effect | Operation called | Basis |
|---|---|---|---|
| Open screen | Loads the customer, then the risk factor (birthday, postal code), then the policies | `PMB-API-02`, `PMB-API-19`, `PMB-API-03` | observed |
| "Open in Customer Management" | Navigates to `http://localhost:3020/customers/{customerId}` | — | observed |
| Risk factor info button | Opens the "Risk Factor" dialog | — | observed |
| "New Policy" | Opens `PMF-SCR-08` | — | observed |
| "Edit" on a policy | Opens `PMF-SCR-07` | — | observed |
| "Delete" on a policy, confirmed | Deletes and reloads the policies | `PMB-API-18`, `PMB-API-03` | observed |

Messages (verbatim): "Risk Factor" dialog — "The risk factor can be used as a measure to assess whether a specific customer will likely issue a lot of insurance claims. It is a number between 0 and 100 where 0 means "low risk" and 100 means "high risk"."; "This customer doesn't have any insurance policies yet."; errors per `PMF-BR-10` with resource "Customer"; breadcrumb "Error".

### PMF-SCR-07 — Edit policy (`/customers/:customerid/policies/:policyid/edit`)

Breadcrumb "Customers › {customer name} › Edit Policy", form pre-filled from the policy, button "Save Changes".

| Field / element | Type | Required | Validation and constraints | Basis |
|---|---|---|---|---|
| Period — From | `date` input | yes (backend) | backend `@NotNull` on `policyPeriod.startDate`; error label "Start Date" | observed |
| Period — to | `date` input | yes (backend) | backend `@NotNull` on `policyPeriod.endDate`; no order check; error label "End Date" | observed |
| Policy Type | dropdown, placeholder "Policy Type" | yes (backend) | options "Life Insurance", "Home Insurance", "Health Insurance", "Car Insurance"; backend `@NotNull`; error label "Policy Type" | observed |
| Deductible | number input, placeholder "Amount in CHF" | yes (backend) | backend: not null, ≥ 0, < 1 000 000 000 000; error field `deductible.amount` | observed |
| Insurance Premium | number input, placeholder "Amount in CHF" | yes (backend) | same; error field `insurancePremium.amount` | observed |
| Policy Limit | number input, placeholder "Amount in CHF" | yes (backend) | same; error field `policyLimit.amount` | observed |
| Insuring Agreement item — Title | text input, placeholder "Title" | yes per item (backend) | backend `@NotEmpty`; error field `insuringAgreement.agreementItems[i].title` | observed |
| Insuring Agreement item — Description | textarea (4 rows), placeholder "Description" | yes per item (backend) | backend `@NotEmpty`; error field `insuringAgreement.agreementItems[i].description` | observed |

| Action | Effect | Operation called | Basis |
|---|---|---|---|
| Open screen | Loads the customer, then the policy (without expansion) and fills the form | `PMB-API-02`, `PMB-API-16` | observed |
| "Add Item" | Adds an empty agreement item | — | observed |
| Trash button of an item | Removes the item | — | observed |
| "Save Changes" | Sends the policy with the route's customer identifier; on success goes to `PMF-SCR-06` | `PMB-API-17` | observed |

Messages: error box "Policy Update failed" with messages per `PMF-BR-08`.

### PMF-SCR-08 — New policy (`/customers/:customerid/policies/new`)

Breadcrumb "Customers › {customer name} › New Policy", empty form, button "Create Policy". Fields, validations and item actions are identical to `PMF-SCR-07`; all fields start empty, no policy type is selected and there are no agreement items.

| Field / element | Type | Required | Validation and constraints | Basis |
|---|---|---|---|---|
| Period — From, to | `date` inputs | yes (backend) | as `PMF-SCR-07` | observed |
| Policy Type | dropdown | yes (backend) | as `PMF-SCR-07` | observed |
| Deductible, Insurance Premium, Policy Limit | number inputs | yes (backend) | as `PMF-SCR-07` | observed |
| Insuring Agreement items | title input, description textarea | yes per item (backend) | as `PMF-SCR-07` | observed |

| Action | Effect | Operation called | Basis |
|---|---|---|---|
| Open screen | Loads the customer for the breadcrumb | `PMB-API-02` | observed |
| "Add Item" / trash | Adds / removes an agreement item | — | observed |
| "Create Policy" | Creates the policy; on success goes to `PMF-SCR-06` | `PMB-API-15` | observed |

Messages: error box "Failed to create policy" with messages per `PMF-BR-08`.

## 9. Data handled

The application stores nothing; it displays and submits data owned by the Policy Management backend.

| Entity | Attributes used | Origin |
|---|---|---|
| Policy | policyId, customer (identifier or embedded customer), creationDate, policyPeriod, policyType, deductible, insurancePremium, policyLimit, insuringAgreement.agreementItems | `PMB-API-03`, `PMB-API-14`, `PMB-API-16`; written by `PMB-API-15`, `PMB-API-17` |
| Customer | customerId, firstname, lastname, birthday, streetAddress, postalCode, city, email, phoneNumber | `PMB-API-01`, `PMB-API-02` |
| Insurance quote request | id, date, statusHistory, customerInfo (names, contact and billing address), insuranceOptions (startDate, insuranceType, deductible), insuranceQuote, policyId | `PMB-API-11`, `PMB-API-12`; answered by `PMB-API-13` |
| Risk factor | riskFactor | `PMB-API-19` |

## 10. Acceptance criteria

| ID | Criterion (Given / When / Then) | Verifies | Basis |
|---|---|---|---|
| PMF-AC-01 | Given the seed data, when `/` is opened, then one row shows the customer "Max Mustermann", premium "250 CHF", limit "1000000 CHF" and the range "1-1 of 1", and both chevrons are disabled. | `PMF-SCR-01`, `PMF-UC-01` | inferred |
| PMF-AC-02 | Given the seed policy, when "Show Details" is clicked, then the breadcrumb reads "Health Insurance Policy (Max Mustermann)", the period reads "05. Feb 2018 – 10. Feb 2018" and the insuring agreement shows "N/A". | `PMF-SCR-02`, `PMF-BR-12` | inferred |
| PMF-AC-03 | Given an unknown policy identifier, when `/policies/xyz` is opened, then "Policy not found." is shown. | `PMF-SCR-02`, `PMF-BR-10` | inferred |
| PMF-AC-04 | Given a policy detail, when "Delete" then "Cancel" is clicked, then no deletion request is sent; when "Delete" then "Delete" is clicked, then `PMB-API-18` is called and `/` is shown. | `PMF-UC-03`, `PMF-BR-07` | inferred |
| PMF-AC-05 | Given 50 customers in Customer Core, when `/customers` is opened, then 10 customers and "1-10 of 50" are shown, the left chevron is disabled and the right chevron loads "11-20 of 50". | `PMF-SCR-05`, `PMF-BR-02` | inferred |
| PMF-AC-06 | Given the customer list, when "max" is searched, then the list is filtered and "Max" is bold in "Max Mustermann". | `PMF-SCR-05`, `PMF-BR-03` | inferred |
| PMF-AC-07 | Given customer `rgpp0wkpec` (born 1990-01-01, postal code 8640), when `/customers/rgpp0wkpec` is opened on 2026-11-12, then the risk factor is 50 in yellow and the seed policy panel is shown. | `PMF-SCR-06`, `PMF-BR-04` | inferred |
| PMF-AC-08 | Given a customer without policies, when the customer detail is opened, then "This customer doesn't have any insurance policies yet." is shown. | `PMF-SCR-06`, `PMF-UC-05` | inferred |
| PMF-AC-09 | Given the customer detail, when "Open in Customer Management" is clicked, then the browser goes to `http://localhost:3020/customers/{customerId}`. | `PMF-UC-11`, `PMF-BR-17` | observed |
| PMF-AC-10 | Given the new policy form filled with valid values and two agreement items, when "Create Policy" is clicked, then `PMB-API-15` receives all amounts with currency `CHF` and the customer detail shows the new policy first. | `PMF-SCR-08`, `PMF-UC-06`, `PMF-BR-05` | inferred |
| PMF-AC-11 | Given the new policy form without a policy type, when "Create Policy" is clicked, then the backend refuses the request and the box "Failed to create policy" is shown. | `PMF-SCR-08`, `PMF-BR-06`, `PMF-BR-08` | inferred |
| PMF-AC-12 | Given an existing policy, when the edit form is opened, then all fields hold the current values; when the premium is changed and "Save Changes" is clicked, then `PMB-API-17` is called and the customer detail shows the new premium. | `PMF-SCR-07`, `PMF-UC-07` | inferred |
| PMF-AC-13 | Given quote requests in every status, when `/insurance-quote-requests` is opened, then `REQUEST_SUBMITTED` and `QUOTE_RECEIVED` requests are under "Open Insurance Quote Requests", the four final statuses under "Past Insurance Quote Requests", each with its label. | `PMF-SCR-03`, `PMF-BR-09`, `PMF-BR-11` | inferred |
| PMF-AC-14 | Given no quote requests, when `/insurance-quote-requests` is opened, then "No open Insurance Quote Requests available." and "No past Insurance Quote Requests available." are shown. | `PMF-SCR-03` | inferred |
| PMF-AC-15 | Given a request in `REQUEST_SUBMITTED`, when "Respond" is clicked, then "Accept" is selected, the expiration date is one month ahead at 23:59 and "Send Response" is disabled until premium and limit are numbers. | `PMF-SCR-04`, `PMF-BR-15`, `PMF-BR-16` | inferred |
| PMF-AC-16 | Given the response dialog with valid values, when "Send Response" is clicked, then the dialog closes and a new block "Lakeside Mutual has submitted the following Insurance Quote:" shows the expiration date, premium and limit in CHF. | `PMF-UC-10`, `PMF-SCR-04` | inferred |
| PMF-AC-17 | Given the response dialog, when "Reject" is selected and "Send Response" clicked, then the history ends with "Lakeside Mutual has rejected this Insurance Quote Request." | `PMF-UC-10`, `PMF-BR-11` | inferred |
| PMF-AC-18 | Given a request whose history ends with `POLICY_CREATED`, when the detail is opened, then "A new policy has been created." links to the policy detail. | `PMF-SCR-04`, `PMF-UC-09` | inferred |
| PMF-AC-19 | Given the backend is stopped, when any screen is opened, then "The Policy Management backend is currently not available. ..." is shown. | `PMF-BR-10`, `PMF-FR-13` | inferred |
| PMF-AC-20 | Given any screen, when it is displayed, then the footer shows "VUE_APP_POLICY_MANAGEMENT_BACKEND: http://localhost:8090". | `PMF-FR-14` | observed |

## 11. Traceability

| Requirement | Source file(s) | API operation(s) |
|---|---|---|
| PMF-UC-01, PMF-SCR-01 | `src/components/Policies.vue`, `src/api.js` | `PMB-API-14` |
| PMF-UC-02, PMF-SCR-02 | `src/components/PolicyDetail.vue`, `src/components/Policy.vue` | `PMB-API-16` |
| PMF-UC-03 | `src/components/Policy.vue`, `src/components/PolicyDetail.vue`, `src/components/CustomerDetail.vue` | `PMB-API-18`, `PMB-API-03` |
| PMF-UC-04, PMF-SCR-05 | `src/components/Customers.vue` | `PMB-API-01` |
| PMF-UC-05, PMF-SCR-06 | `src/components/CustomerDetail.vue`, `src/components/CustomerProfile.vue` | `PMB-API-02`, `PMB-API-19`, `PMB-API-03` |
| PMF-UC-06, PMF-SCR-08 | `src/components/CreatePolicy.vue` | `PMB-API-02`, `PMB-API-15` |
| PMF-UC-07, PMF-SCR-07 | `src/components/EditPolicy.vue` | `PMB-API-02`, `PMB-API-16`, `PMB-API-17` |
| PMF-UC-08, PMF-SCR-03 | `src/components/InsuranceQuoteRequests.vue`, `src/components/InsuranceQuoteRequestsTable.vue` | `PMB-API-11` |
| PMF-UC-09, PMF-SCR-04 | `src/components/InsuranceQuoteRequestDetail.vue`, `StatusDescription.vue`, `InsuranceQuoteRequest.vue`, `InsuranceQuote.vue` | `PMB-API-12` |
| PMF-UC-10 | `src/components/StatusDescription.vue`, `src/api.js` | `PMB-API-13`, `PMB-API-12` |
| PMF-UC-11 | `src/components/CustomerDetail.vue` | — |
| PMF-FR-01, PMF-FR-02 | `src/components/Policies.vue`, `src/components/Customers.vue` | `PMB-API-14`, `PMB-API-01` |
| PMF-FR-03, PMF-FR-04 | `src/components/Policy.vue`, `src/components/CustomerDetail.vue` | `PMB-API-16`, `PMB-API-03` |
| PMF-FR-05 | `src/components/Policy.vue` | `PMB-API-18` |
| PMF-FR-06 | `src/components/Customers.vue` | `PMB-API-01` |
| PMF-FR-07 | `src/components/CustomerDetail.vue` | `PMB-API-02`, `PMB-API-19`, `PMB-API-03` |
| PMF-FR-08 | `src/components/CreatePolicy.vue`, `src/api.js` | `PMB-API-15` |
| PMF-FR-09 | `src/components/EditPolicy.vue`, `src/api.js` | `PMB-API-16`, `PMB-API-17` |
| PMF-FR-10 | `src/components/InsuranceQuoteRequests.vue` | `PMB-API-11` |
| PMF-FR-11 | `src/components/StatusDescription.vue` | `PMB-API-12` |
| PMF-FR-12 | `src/components/StatusDescription.vue`, `src/api.js` | `PMB-API-13` |
| PMF-FR-13 | `src/components/ErrorMessage.vue`, `src/api.js` | all |
| PMF-FR-14 | `src/App.vue` | — |
| PMF-FR-15 | `src/components/Menu.vue`, `src/App.vue` | — |
| PMF-BR-01 | `src/api.js` | `PMB-API-14` |
| PMF-BR-02, PMF-BR-03 | `src/api.js`, `src/components/Customers.vue` | `PMB-API-01` |
| PMF-BR-04 | `src/components/CustomerDetail.vue` | `PMB-API-19` |
| PMF-BR-05 | `src/api.js` | `PMB-API-13`, `PMB-API-15`, `PMB-API-17` |
| PMF-BR-06 | `src/components/CreatePolicy.vue`, `src/components/EditPolicy.vue` | `PMB-API-15`, `PMB-API-17` |
| PMF-BR-07 | `src/components/Policy.vue`, `src/api.js` | `PMB-API-18` |
| PMF-BR-08 | `src/utils.js` | `PMB-API-13`, `PMB-API-15`, `PMB-API-17` |
| PMF-BR-09 | `src/components/InsuranceQuoteRequests.vue` | `PMB-API-11` |
| PMF-BR-10 | `src/components/ErrorMessage.vue` | all |
| PMF-BR-11 | `src/components/RequestStatus.vue`, `src/components/StatusDescription.vue` | `PMB-API-11`, `PMB-API-12` |
| PMF-BR-12 | `src/components/FormattedDate.vue` | — |
| PMF-BR-13 | `src/components/EditPolicy.vue`, `src/components/CreatePolicy.vue` | `PMB-API-02`, `PMB-API-16` |
| PMF-BR-14 | `src/api.js` | all |
| PMF-BR-15, PMF-BR-16 | `src/components/StatusDescription.vue` | `PMB-API-13` |
| PMF-BR-17 | `src/components/CustomerDetail.vue` | — |
| PMF-AC-01, PMF-AC-02, PMF-AC-03, PMF-AC-04 | `src/components/Policies.vue`, `PolicyDetail.vue`, `Policy.vue`, `ErrorMessage.vue` | `PMB-API-14`, `PMB-API-16`, `PMB-API-18` |
| PMF-AC-05, PMF-AC-06 | `src/components/Customers.vue` | `PMB-API-01` |
| PMF-AC-07, PMF-AC-08, PMF-AC-09 | `src/components/CustomerDetail.vue` | `PMB-API-02`, `PMB-API-19`, `PMB-API-03` |
| PMF-AC-10, PMF-AC-11 | `src/components/CreatePolicy.vue`, `src/utils.js` | `PMB-API-15` |
| PMF-AC-12 | `src/components/EditPolicy.vue` | `PMB-API-16`, `PMB-API-17` |
| PMF-AC-13, PMF-AC-14 | `src/components/InsuranceQuoteRequests.vue`, `RequestStatus.vue` | `PMB-API-11` |
| PMF-AC-15, PMF-AC-16, PMF-AC-17, PMF-AC-18 | `src/components/StatusDescription.vue` | `PMB-API-12`, `PMB-API-13` |
| PMF-AC-19 | `src/components/ErrorMessage.vue` | all |
| PMF-AC-20 | `src/App.vue` | — |

Paths are relative to `policy-management-frontend/`.

## 12. Open points

| ID | Question | Why it matters | Where to look |
|---|---|---|---|
| PMF-OP-01 | The backend error body has no `errors` list nor `message` (observed on 404 responses), so form errors are probably shown as an empty "Failed to ..." box without field highlighting. Is this the intended behaviour? | Field-level error tests would fail. | `src/utils.js`, [STD-PMB](../policy-management-backend/std.md) error handling |
| PMF-OP-02 | The 502 message names the Customer Self-Service backend, while the Policy Management backend returns 502 when Customer Core is unavailable. Which text is correct? | Misleading message. | `src/components/ErrorMessage.vue` |
| PMF-OP-03 | Quote requests whose current status is `QUOTE_ACCEPTED` are listed nowhere. The backend normally moves on to `POLICY_CREATED` or `QUOTE_EXPIRED` in the same processing step; can the state persist? | A request could disappear from the screen. | `InsuranceQuoteRequests.vue`, backend decision processing |
| PMF-OP-04 | Policy deletion ignores the HTTP result; is a failure meant to be reported? | Silent data inconsistency for the user. | `src/api.js` `deletePolicy` |
| PMF-OP-05 | The Customer Management URL is hard-coded to `localhost:3020`. Should it be configurable like the backend URL? | Breaks outside the local setup. | `src/components/CustomerDetail.vue` |
| PMF-OP-06 | No route catches unknown paths; an unknown URL shows an empty content area. Is a "not found" screen expected? | Navigation tests. | `src/router/index.js` |
