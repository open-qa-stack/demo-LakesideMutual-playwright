### PMF-UC-09 — Follow the history of a quote request

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | None |
| Trigger | "Show Details" on the quote request list |
| Postconditions | None |
| Related | `PMF-SCR-04`, `PMF-BR-11`, `PMB-API-12` |
| Basis | observed |

**Main flow**

1. The screen loads the request and shows one dated block per status history entry, oldest first, with a status-specific text (`PMF-BR-11`).
