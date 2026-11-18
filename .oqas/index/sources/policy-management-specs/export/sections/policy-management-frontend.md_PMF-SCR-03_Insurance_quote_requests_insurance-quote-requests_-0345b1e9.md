### PMF-SCR-03 — Insurance quote requests (`/insurance-quote-requests`)

Header "Insurance Quote Requests", two sections "Open Insurance Quote Requests" and "Past Insurance Quote Requests" (`PMF-BR-09`), each a table, in backend order (newest request date first).

| Field / element | Type | Required | Validation and constraints | Basis |
|---|---|---|---|---|
| Date | text | — | request date, `DD. MMM YYYY HH:mm` | observed |
| Customer | link | — | "firstname lastname" from the request, to `/customers/{customerId}` | observed |
| Insurance Type | text | — | requested insurance type | observed |
| Status | text | — | label of the current status (`PMF-BR-11`) | observed |

| Action | Effect | Operation called | Basis |
|---|---|---|---|
| Open screen | Loads all requests | `PMB-API-11` | observed |
| "Show Details" | Opens `PMF-SCR-04` | — | observed |
| Customer link | Opens `PMF-SCR-06` | — | observed |

Messages (verbatim): "No open Insurance Quote Requests available.", "No past Insurance Quote Requests available."; errors per `PMF-BR-10` with resource "Insurance Quote Request".
