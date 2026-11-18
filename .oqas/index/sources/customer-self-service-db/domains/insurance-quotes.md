# Insurance quotes (`insurance-quotes`)

Insurance quote requests, available options, generated quotes, and request status history.

## Domaine `insurance-quotes` — source `customer-self-service-db`

Ce domaine couvre les options d’assurance, les demandes de devis, les devis générés et l’historique des changements de statut.

| Élément | Rôle | Colonnes utiles pour rechercher ou filtrer |
|---|---|---|
| `public.insuranceoptions` | Options d’assurance offertes. | `id`, `name`, `start_date`, `deductible_amount`, `deductible_currency` |
| `public.insurancequoterequests` | Demande d’un client, avec l’option choisie, la date, le devis associé et l’identifiant de police. | `id`, `customer_info_id`, `date`, `insurance_options_id`, `insurance_quote_id`, `policy_id` |
| `public.insurancequotes` | Montants de prime et de plafond de garantie, ainsi que la date d’expiration du devis. | `id`, `insurance_premium_amount`, `insurance_premium_currency`, `policy_limit_amount`, `policy_limit_currency`, `expiration_date` |
| `public.insurancequoterequests_status_history` | Association entre une demande de devis et ses entrées d’historique de statut. | `insurance_quote_request_aggregate_root_id`, `status_history_id` |
| `public.requeststatuschanges` | Changements de statut datés associés au cycle de vie des demandes et des devis. | `id`, `date`, `status` |

### Liens entre les éléments

- `public.insurancequoterequests.insurance_options_id` référence `public.insuranceoptions.id`.
- `public.insurancequoterequests.insurance_quote_id` référence `public.insurancequotes.id`.
- `public.insurancequoterequests.customer_info_id` référence `public.customerinfos.id`, dans le domaine `customers`.
- `public.insurancequoterequests_status_history.insurance_quote_request_aggregate_root_id` référence `public.insurancequoterequests.id`.
- `public.insurancequoterequests_status_history.status_history_id` référence `public.requeststatuschanges.id`.

### Indications d’utilisation

- Pour examiner les statuts d’une demande, relier `public.insurancequoterequests` à `public.insurancequoterequests_status_history`, puis à `public.requeststatuschanges`. Les entrées de statut sont datées dans `public.requeststatuschanges.date`.
- `public.requeststatuschanges.status` est limité à `REQUEST_SUBMITTED`, `REQUEST_REJECTED`, `QUOTE_RECEIVED`, `QUOTE_ACCEPTED`, `QUOTE_REJECTED`, `QUOTE_EXPIRED` et `POLICY_CREATED`.
- Les montants de prime, de plafond de garantie et de franchise ont chacun une colonne de devise distincte. Ne pas traiter ces montants comme ayant une devise implicite.
- `public.insurancequoterequests` impose l’unicité de `customer_info_id`, `insurance_options_id` et `insurance_quote_id` : chacun ne peut apparaître que dans une seule ligne de demande.
- `public.insurancequoterequests_status_history.status_history_id` est également unique : une entrée d’historique ne peut être associée qu’une fois dans cette table.
