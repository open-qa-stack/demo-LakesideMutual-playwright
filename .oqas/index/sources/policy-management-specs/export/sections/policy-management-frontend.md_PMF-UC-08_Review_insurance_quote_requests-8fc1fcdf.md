### PMF-UC-08 — Review insurance quote requests

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | None |
| Trigger | "Insurance Quote Requests" menu item |
| Postconditions | None |
| Related | `PMF-SCR-03`, `PMF-BR-09`, `PMB-API-11` |
| Basis | observed |

**Main flow**

1. The screen loads all quote requests and splits them into "Open Insurance Quote Requests" and "Past Insurance Quote Requests".
2. Each row shows date, customer (link), insurance type and status; "Show Details" opens the request.
