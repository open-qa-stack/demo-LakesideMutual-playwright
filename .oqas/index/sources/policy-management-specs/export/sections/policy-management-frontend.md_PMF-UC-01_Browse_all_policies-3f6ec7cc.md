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
