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
