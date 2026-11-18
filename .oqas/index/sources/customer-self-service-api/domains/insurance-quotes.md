# Demandes de devis d’assurance (`insurance-quotes`)

Gère les demandes de devis d’assurance, leur suivi et les réponses associées.

## Opérations

| Opération | Rôle | Paramètres utiles | Envoie | Retourne et statuts |
|---|---|---|---|---|
| `GET /insurance-quote-requests` | Récupère l’ensemble des demandes de devis d’assurance. | — | — | `InsuranceQuoteRequestDto` — `200` |
| `POST /insurance-quote-requests` | Crée une demande de devis d’assurance. | — | `InsuranceQuoteRequestDto` | `InsuranceQuoteRequestDto` — `200` |
| `PATCH /insurance-quote-requests/{id}` | Met à jour le statut d’une demande existante. | `id` (path, required) | `InsuranceQuoteResponseDto` | `InsuranceQuoteRequestDto` — `200` |
| `GET /insurance-quote-requests/{insuranceQuoteRequestId}` | Récupère une demande précise. | `insuranceQuoteRequestId` (path, required) | — | `InsuranceQuoteRequestDto` — `200` |
| `GET /customers/{customerId}/insurance-quote-requests` | Récupère les demandes associées à un client. | `customerId` (path, required) | — | `InsuranceQuoteRequestDto` — `200` |

## Schémas

- `InsuranceQuoteRequestDto` représente une demande. Ses propriétés sont `id` (integer), `date` (string), `statusHistory` (array of `RequestStatusChangeDto`), `customerInfo` (`CustomerInfoDto`), `insuranceOptions` (`InsuranceOptionsDto`), `insuranceQuote` (`InsuranceQuoteDto`) et `policyId` (string). `customerInfo` et `insuranceOptions` sont requis.
- `InsuranceOptionsDto` décrit les options : `startDate` (string), `insuranceType` (string) et `deductible` (`MoneyAmountDto`). Les trois sont requis.
- `InsuranceQuoteDto` décrit le devis : `expirationDate` (string), `insurancePremium` (`MoneyAmountDto`) et `policyLimit` (`MoneyAmountDto`). Les trois sont requis.
- `InsuranceQuoteResponseDto` décrit la réponse au devis : `status` (string), `expirationDate` (string), `insurancePremium` (`MoneyAmountDto`) et `policyLimit` (`MoneyAmountDto`). Seul `status` est requis.
- `RequestStatusChangeDto` enregistre `date` (string) et `status` (string); seul `status` est requis.
- `MoneyAmountDto` contient `amount` (number) et `currency` (string), tous deux requis.

## Liens et indications d’appel

Les opérations de liste, création et lecture individuelle utilisent `InsuranceQuoteRequestDto`; `PATCH /insurance-quote-requests/{id}` envoie `InsuranceQuoteResponseDto` et retourne `InsuranceQuoteRequestDto`. La variante par client utilise le chemin `/customers/{customerId}/insurance-quote-requests`. Pour la lecture individuelle, le paramètre de chemin s’appelle `insuranceQuoteRequestId`, tandis que celui du `PATCH` s’appelle `id`.

Les montants des franchises, primes et plafonds utilisent `MoneyAmountDto`. Les demandes peuvent inclure des informations client via `CustomerInfoDto`, également utilisé dans le domaine `customers`. Les autres domaines de la source sont `authentication`, `users`, `city-reference-data` et `error-handling`.

Les définitions fournies indiquent uniquement le statut `200` pour ces opérations; elles ne précisent pas d’autres statuts ni de paramètres de filtrage.
