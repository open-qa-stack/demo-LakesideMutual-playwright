## 12. Open points

| ID | Question | Why it matters | Where to look |
|---|---|---|---|
| PMF-OP-01 | The backend error body has no `errors` list nor `message` (observed on 404 responses), so form errors are probably shown as an empty "Failed to ..." box without field highlighting. Is this the intended behaviour? | Field-level error tests would fail. | `src/utils.js`, [STD-PMB](../policy-management-backend/std.md) error handling |
| PMF-OP-02 | The 502 message names the Customer Self-Service backend, while the Policy Management backend returns 502 when Customer Core is unavailable. Which text is correct? | Misleading message. | `src/components/ErrorMessage.vue` |
| PMF-OP-03 | Quote requests whose current status is `QUOTE_ACCEPTED` are listed nowhere. The backend normally moves on to `POLICY_CREATED` or `QUOTE_EXPIRED` in the same processing step; can the state persist? | A request could disappear from the screen. | `InsuranceQuoteRequests.vue`, backend decision processing |
| PMF-OP-04 | Policy deletion ignores the HTTP result; is a failure meant to be reported? | Silent data inconsistency for the user. | `src/api.js` `deletePolicy` |
| PMF-OP-05 | The Customer Management URL is hard-coded to `localhost:3020`. Should it be configurable like the backend URL? | Breaks outside the local setup. | `src/components/CustomerDetail.vue` |
| PMF-OP-06 | No route catches unknown paths; an unknown URL shows an empty content area. Is a "not found" screen expected? | Navigation tests. | `src/router/index.js` |
