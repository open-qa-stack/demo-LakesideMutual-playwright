### PMF-UC-10 — Respond to a quote request

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | Current status of the request is `REQUEST_SUBMITTED` |
| Trigger | "Respond" button in the current status block |
| Postconditions | The request is `QUOTE_RECEIVED` with a quote, or `REQUEST_REJECTED` |
| Related | `PMF-SCR-04`, `PMF-BR-05`, `PMF-BR-15`, `PMF-BR-16`, `PMB-API-13`, `PMB-API-12` |
| Basis | observed |

**Main flow**

1. The dialog "Respond to Insurance Quote Request" opens with "Accept" selected and the expiration date pre-set (`PMF-BR-15`).
2. The staff member enters insurance premium and policy limit and clicks "Send Response" (enabled only when the form is valid, `PMF-BR-16`).
3. The response is sent, the dialog closes and the request is reloaded, now showing the quote.

**Alternative and exception flows**

- *A1 — Reject*: the staff member selects "Reject"; the amount fields disappear and "Send Response" is always enabled; the request is reloaded showing the rejection.
- *A2 — Cancel*: "Cancel" closes the dialog without sending.
- *A3 — Backend rejects the response*: the dialog stays open and shows "Failed to respond to Insurance Quote Request".
