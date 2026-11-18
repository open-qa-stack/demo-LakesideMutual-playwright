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
