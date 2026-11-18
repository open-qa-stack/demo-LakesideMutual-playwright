## 10. Acceptance criteria

| ID | Criterion (Given / When / Then) | Verifies | Basis |
|---|---|---|---|
| PMF-AC-01 | Given the seed data, when `/` is opened, then one row shows the customer "Max Mustermann", premium "250 CHF", limit "1000000 CHF" and the range "1-1 of 1", and both chevrons are disabled. | `PMF-SCR-01`, `PMF-UC-01` | inferred |
| PMF-AC-02 | Given the seed policy, when "Show Details" is clicked, then the breadcrumb reads "Health Insurance Policy (Max Mustermann)", the period reads "05. Feb 2018 – 10. Feb 2018" and the insuring agreement shows "N/A". | `PMF-SCR-02`, `PMF-BR-12` | inferred |
| PMF-AC-03 | Given an unknown policy identifier, when `/policies/xyz` is opened, then "Policy not found." is shown. | `PMF-SCR-02`, `PMF-BR-10` | inferred |
| PMF-AC-04 | Given a policy detail, when "Delete" then "Cancel" is clicked, then no deletion request is sent; when "Delete" then "Delete" is clicked, then `PMB-API-18` is called and `/` is shown. | `PMF-UC-03`, `PMF-BR-07` | inferred |
| PMF-AC-05 | Given 50 customers in Customer Core, when `/customers` is opened, then 10 customers and "1-10 of 50" are shown, the left chevron is disabled and the right chevron loads "11-20 of 50". | `PMF-SCR-05`, `PMF-BR-02` | inferred |
| PMF-AC-06 | Given the customer list, when "max" is searched, then the list is filtered and "Max" is bold in "Max Mustermann". | `PMF-SCR-05`, `PMF-BR-03` | inferred |
| PMF-AC-07 | Given customer `rgpp0wkpec` (born 1990-01-01, postal code 8640), when `/customers/rgpp0wkpec` is opened on 2026-11-12, then the risk factor is 50 in yellow and the seed policy panel is shown. | `PMF-SCR-06`, `PMF-BR-04` | inferred |
| PMF-AC-08 | Given a customer without policies, when the customer detail is opened, then "This customer doesn't have any insurance policies yet." is shown. | `PMF-SCR-06`, `PMF-UC-05` | inferred |
| PMF-AC-09 | Given the customer detail, when "Open in Customer Management" is clicked, then the browser goes to `http://localhost:3020/customers/{customerId}`. | `PMF-UC-11`, `PMF-BR-17` | observed |
| PMF-AC-10 | Given the new policy form filled with valid values and two agreement items, when "Create Policy" is clicked, then `PMB-API-15` receives all amounts with currency `CHF` and the customer detail shows the new policy first. | `PMF-SCR-08`, `PMF-UC-06`, `PMF-BR-05` | inferred |
| PMF-AC-11 | Given the new policy form without a policy type, when "Create Policy" is clicked, then the backend refuses the request and the box "Failed to create policy" is shown. | `PMF-SCR-08`, `PMF-BR-06`, `PMF-BR-08` | inferred |
| PMF-AC-12 | Given an existing policy, when the edit form is opened, then all fields hold the current values; when the premium is changed and "Save Changes" is clicked, then `PMB-API-17` is called and the customer detail shows the new premium. | `PMF-SCR-07`, `PMF-UC-07` | inferred |
| PMF-AC-13 | Given quote requests in every status, when `/insurance-quote-requests` is opened, then `REQUEST_SUBMITTED` and `QUOTE_RECEIVED` requests are under "Open Insurance Quote Requests", the four final statuses under "Past Insurance Quote Requests", each with its label. | `PMF-SCR-03`, `PMF-BR-09`, `PMF-BR-11` | inferred |
| PMF-AC-14 | Given no quote requests, when `/insurance-quote-requests` is opened, then "No open Insurance Quote Requests available." and "No past Insurance Quote Requests available." are shown. | `PMF-SCR-03` | inferred |
| PMF-AC-15 | Given a request in `REQUEST_SUBMITTED`, when "Respond" is clicked, then "Accept" is selected, the expiration date is one month ahead at 23:59 and "Send Response" is disabled until premium and limit are numbers. | `PMF-SCR-04`, `PMF-BR-15`, `PMF-BR-16` | inferred |
| PMF-AC-16 | Given the response dialog with valid values, when "Send Response" is clicked, then the dialog closes and a new block "Lakeside Mutual has submitted the following Insurance Quote:" shows the expiration date, premium and limit in CHF. | `PMF-UC-10`, `PMF-SCR-04` | inferred |
| PMF-AC-17 | Given the response dialog, when "Reject" is selected and "Send Response" clicked, then the history ends with "Lakeside Mutual has rejected this Insurance Quote Request." | `PMF-UC-10`, `PMF-BR-11` | inferred |
| PMF-AC-18 | Given a request whose history ends with `POLICY_CREATED`, when the detail is opened, then "A new policy has been created." links to the policy detail. | `PMF-SCR-04`, `PMF-UC-09` | inferred |
| PMF-AC-19 | Given the backend is stopped, when any screen is opened, then "The Policy Management backend is currently not available. ..." is shown. | `PMF-BR-10`, `PMF-FR-13` | inferred |
| PMF-AC-20 | Given any screen, when it is displayed, then the footer shows "VUE_APP_POLICY_MANAGEMENT_BACKEND: http://localhost:8090". | `PMF-FR-14` | observed |
