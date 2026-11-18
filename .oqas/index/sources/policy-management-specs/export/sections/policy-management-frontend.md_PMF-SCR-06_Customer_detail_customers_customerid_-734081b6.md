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
