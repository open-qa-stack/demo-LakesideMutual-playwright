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
