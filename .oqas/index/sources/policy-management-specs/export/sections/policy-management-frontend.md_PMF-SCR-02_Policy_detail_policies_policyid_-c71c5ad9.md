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
