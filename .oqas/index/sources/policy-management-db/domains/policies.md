# Policies (`policies`)

Stores insurance policies and the agreements and coverage items that define them.

| Élément | Rôle | Colonnes utiles pour rechercher ou filtrer | Liens |
|---|---|---|---|
| `public.insurancepolicies` | Détails des polices émises : dates, client, primes, limites, franchises et accord associé. | `id`, `customer_id`, `name`, `creation_date`, `start_date`, `end_date`, `premium_amount`, `premium_currency`, `limit_amount`, `limit_currency`, `deductible_amount`, `deductible_currency`, `insuring_agreement_id` | `insuring_agreement_id` référence `public.insuringagreements.id`. `customer_id` concerne le domaine `customers` ; aucun lien de clé étrangère n’est indiqué. |
| `public.insuringagreements` | Accord d’assurance associé à une police. | `id` | Référencé par `public.insurancepolicies.insuring_agreement_id`. Lié aux éléments d’accord via `public.insuringagreements_agreement_items`. |
| `public.insuranceagreementitems` | Éléments descriptifs titrés qui font partie d’un accord d’assurance. | `id`, `title`, `description` | Relié aux accords par `public.insuringagreements_agreement_items`. |
| `public.insuringagreements_agreement_items` | Relie les accords d’assurance aux éléments qu’ils comprennent. | `insuring_agreement_entity_id`, `agreement_items_id` | `insuring_agreement_entity_id` référence `public.insuringagreements.id` ; `agreement_items_id` référence `public.insuranceagreementitems.id`. |

- Pour obtenir les éléments d’un accord, partez de `public.insuringagreements`, puis suivez `public.insuringagreements_agreement_items` vers `public.insuranceagreementitems`.
- Chaque `public.insurancepolicies` a au plus un accord associé : `insuring_agreement_id` est unique. La relation entre un accord et ses éléments est également soumise à `UNIQUE (agreement_items_id)`.
- Le domaine `quotes` gère les demandes de devis, les offres et l’historique de statut ; aucun lien de schéma avec les polices n’est indiqué.
