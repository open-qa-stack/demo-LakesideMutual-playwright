### PMF-UC-07 — Edit a policy

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | Policy exists |
| Trigger | "Edit" on a policy panel |
| Postconditions | The policy is updated |
| Related | `PMF-SCR-07`, `PMF-BR-05`, `PMF-BR-06`, `PMF-BR-08`, `PMB-API-02`, `PMB-API-16`, `PMB-API-17` |
| Basis | observed |

**Main flow**

1. The form opens pre-filled with the current policy values.
2. The staff member changes values and clicks "Save Changes".
3. On success the application returns to the customer detail screen.

**Alternative and exception flows**

- *A1 — Backend rejects the request*: the form shows the error box "Policy Update failed".
- *A2 — Policy cannot be loaded*: the form is shown empty without error message (`PMF-BR-13`).
