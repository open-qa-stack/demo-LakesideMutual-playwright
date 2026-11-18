### PMF-SCR-01 — Policies (`/`)

Table of all policies, newest first, with pagination. Header "Policies".

| Field / element | Type | Required | Validation and constraints | Basis |
|---|---|---|---|---|
| Creation Date | text | — | `DD. MMM YYYY HH:mm` | observed |
| Customer | text | — | "firstname lastname" of the embedded customer | observed |
| Insurance Premium | text | — | "amount currency" | observed |
| Policy Limit | text | — | "amount currency" | observed |
| Range | text | — | "{offset+1}-{offset+count} of {size}" | observed |

| Action | Effect | Operation called | Basis |
|---|---|---|---|
| Open screen | Loads page 1 with customers | `PMB-API-14` (`expand=customer`) | observed |
| Left / right chevron | Loads the previous / next page; disabled when the link is absent | `PMB-API-14` (link `href`) | observed |
| "Show Details" | Opens `PMF-SCR-02` | — | observed |

Messages: "Loading..." while loading; errors per `PMF-BR-10` with resource "Policy".
