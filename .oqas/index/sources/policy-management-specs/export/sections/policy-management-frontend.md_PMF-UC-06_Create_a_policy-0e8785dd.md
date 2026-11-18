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
