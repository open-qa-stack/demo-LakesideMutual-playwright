## 6. Functional requirements

| ID | Requirement ("The component shall ...") | Use case | Basis |
|---|---|---|---|
| PMF-FR-01 | The component shall show all policies, newest first, ten per page, with creation date, customer name, premium and limit. | PMF-UC-01 | observed |
| PMF-FR-02 | The component shall let the staff member page through policies and customers using the `prev` and `next` links returned by the backend, and show the range "first-last of total". | PMF-UC-01, PMF-UC-04 | observed |
| PMF-FR-03 | The component shall show a policy's type, customer, creation date, period, deductible, premium, limit and insuring agreement items. | PMF-UC-02, PMF-UC-05 | observed |
| PMF-FR-04 | The component shall explain deductible, insurance premium, policy limit and risk factor in information dialogs. | PMF-UC-02, PMF-UC-05 | observed |
| PMF-FR-05 | The component shall delete a policy only after confirmation. | PMF-UC-03 | observed |
| PMF-FR-06 | The component shall search customers by a free-text term and highlight the first match in each customer's name. | PMF-UC-04 | observed |
| PMF-FR-07 | The component shall show a customer's profile, risk factor and all policies on one screen. | PMF-UC-05 | observed |
| PMF-FR-08 | The component shall create a policy for a customer from period, type, deductible, premium, limit and insuring agreement items, all amounts in CHF. | PMF-UC-06 | observed |
| PMF-FR-09 | The component shall edit an existing policy in a form pre-filled with its current values. | PMF-UC-07 | observed |
| PMF-FR-10 | The component shall separate open quote requests from past ones. | PMF-UC-08 | observed |
| PMF-FR-11 | The component shall show the complete status history of a quote request with a text per status. | PMF-UC-09 | observed |
| PMF-FR-12 | The component shall let the staff member accept a submitted quote request with expiration date, premium and limit (CHF), or reject it. | PMF-UC-10 | observed |
| PMF-FR-13 | The component shall show backend errors as messages: not found, Customer Core unavailable (502), unknown error, backend unreachable. | all | observed |
| PMF-FR-14 | The component shall display the configured backend URL in a debug footer on every screen. | — | observed |
| PMF-FR-15 | The component shall offer navigation through a menu (Policies, Insurance Quote Requests, Customers) and breadcrumbs on detail and form screens. | all | observed |
