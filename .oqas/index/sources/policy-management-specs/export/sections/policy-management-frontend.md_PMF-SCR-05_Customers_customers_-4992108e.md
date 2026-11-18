### PMF-SCR-05 — Customers (`/customers`)

Header "Customers", search form, table, pagination.

| Field / element | Type | Required | Validation and constraints | Basis |
|---|---|---|---|---|
| Search | text input, placeholder "Search..." | no | free text, sent as `filter`; no client validation | observed |
| Name | text | — | "firstname lastname", match in bold (`PMF-BR-03`) | observed |
| Email | mailto link | — | | observed |
| Address | text | — | "street, postal code city" | observed |
| Range | text | — | "{offset+1}-{offset+count} of {size}" | observed |

| Action | Effect | Operation called | Basis |
|---|---|---|---|
| Open screen | Loads page 1 without filter | `PMB-API-01` | observed |
| "Search" (or Enter) | Reloads with the filter | `PMB-API-01` (`filter`) | observed |
| Left / right chevron | Previous / next page | `PMB-API-01` (link `href`) | observed |
| "Manage Policy" | Opens `PMF-SCR-06` | — | observed |

Messages: errors per `PMF-BR-10` with resource "Customer".
