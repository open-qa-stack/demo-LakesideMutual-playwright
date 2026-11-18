### PMF-UC-03 — Delete a policy

| Item | Value |
|---|---|
| Primary actor | Staff member |
| Preconditions | Policy displayed on the policy detail or customer detail screen |
| Trigger | "Delete" button |
| Postconditions | The policy is deleted in the backend |
| Related | `PMF-SCR-02`, `PMF-SCR-06`, `PMF-BR-07`, `PMB-API-18` |
| Basis | observed |

**Main flow**

1. The staff member clicks "Delete"; a confirmation dialog "Delete Policy" appears.
2. The staff member clicks "Delete" in the dialog; the policy is deleted.
3. On the policy detail screen the application returns to `/`; on the customer detail screen the policy list is reloaded.

**Alternative and exception flows**

- *A1 — Cancel*: "Cancel" closes the dialog without deleting.
