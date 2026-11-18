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
