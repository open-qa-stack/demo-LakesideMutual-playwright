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
