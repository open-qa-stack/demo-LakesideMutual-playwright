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
