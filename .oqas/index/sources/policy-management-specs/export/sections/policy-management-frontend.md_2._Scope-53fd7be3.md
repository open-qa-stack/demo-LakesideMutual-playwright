## 2. Scope

### 2.1 In scope

- Eight screens: policy list, policy detail, quote request list, quote request detail with response form, customer list with search, customer detail with risk factor and policies, policy edit form, policy creation form.
- Deletion of policies from the policy detail and customer detail screens.
- A link to the same customer in the Customer Management frontend.

### 2.2 Out of scope

- Editing customer data (Customer Management frontend).
- Authentication: the application has no login (`PMF-BR-14`).
- Business rules enforced by the backend (status transitions, risk factor formula); they are specified in [SFD-PMB](../policy-management-backend/sfd.md) and only referenced here.

### 2.3 Related specifications

- [STD-PMF](std.md) — technical specification of this component.
- [SFD-PMB](../policy-management-backend/sfd.md) and [STD-PMB](../policy-management-backend/std.md) — the backend providing every operation called here.
- [SFD-CMF](../customer-management-frontend/sfd.md) — target of the "Open in Customer Management" button.
- [System overview](../../system/overview-sfd.md).
