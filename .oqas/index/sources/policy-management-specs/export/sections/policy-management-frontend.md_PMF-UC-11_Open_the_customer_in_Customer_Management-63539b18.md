### PMF-UC-11 — Open the customer in Customer Management

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | Customer loaded |
| Trigger | "Open in Customer Management" button |
| Postconditions | The browser leaves the application |
| Related | `PMF-SCR-06`, `PMF-BR-17` |
| Basis | observed |

**Main flow**

1. The browser navigates to `http://localhost:3020/customers/{customerId}`, the customer detail screen of the Customer Management frontend (`CMF-SCR-03`).
