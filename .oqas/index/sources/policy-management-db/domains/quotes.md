# Quotes (`quotes`)

Manages insurance quote requests, quote offers, and their lifecycle status history.

## Quotes

Ce domaine gère les demandes de devis d’assurance, les offres de devis et l’historique des statuts de leur cycle de vie.

| Élément | Rôle et champs utiles |
|---|---|
| `public.insuranceoptions` | Options d’assurance nommées, avec `name`, `start_date` et franchise (`deductible_amount`, `deductible_currency`). Identifiant : `id`. |
| `public.insurancequoterequests` | Demande de devis datée : `date`, référence client `customer_info_id`, option liée `insurance_options_id`, devis lié `insurance_quote_id` et référence de police `policy_id`. Identifiant : `id`. Chacune des colonnes `customer_info_id`, `insurance_options_id` et `insurance_quote_id` est soumise à une contrainte `UNIQUE`. |
| `public.insurancequotes` | Offre de devis avec prime (`insurance_premium_amount`, `insurance_premium_currency`), limite de police (`policy_limit_amount`, `policy_limit_currency`) et expiration (`expiration_date`). Identifiant : `id`. |
| `public.insurancequoterequests_status_history` | Associe une demande à ses entrées d’historique : `insurance_quote_request_aggregate_root_id` référence la demande et `status_history_id` référence un changement de statut. `status_history_id` est unique. |
| `public.requeststatuschanges` | Changements de statut datés, avec `date` et `status`. Les valeurs autorisées sont `REQUEST_SUBMITTED`, `REQUEST_REJECTED`, `QUOTE_RECEIVED`, `QUOTE_ACCEPTED`, `QUOTE_REJECTED`, `QUOTE_EXPIRED` et `POLICY_CREATED`. Identifiant : `id`. |

### Liens et pistes de recherche

- Joindre `public.insurancequoterequests.insurance_options_id` à `public.insuranceoptions.id`, et `public.insurancequoterequests.insurance_quote_id` à `public.insurancequotes.id`.
- Pour retrouver l’historique d’une demande, joindre `public.insurancequoterequests.id` à `public.insurancequoterequests_status_history.insurance_quote_request_aggregate_root_id`, puis `status_history_id` à `public.requeststatuschanges.id`. Filtrer les changements par `status` et les ordonner par `date` pour examiner leur chronologie.
- `customer_info_id` référence `public.customerinfos`, dans le domaine customers. `policy_id` est la référence de police de la demande ; le domaine policies contient les polices et leurs accords et éléments de couverture.
- Les identifiants des options, devis et clients sont uniques par demande selon les contraintes déclarées ; ne pas supposer qu’ils peuvent être réutilisés par plusieurs demandes.
