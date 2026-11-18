# Demandes de devis d’assurance (`insurance-quote-requests`)

Consultation et traitement des demandes de devis d’assurance et des réponses associées.

## Opérations

| Opération | Rôle | Paramètres à filtrer | Corps envoyé | Réponse et propriétés utiles | Statut |
|---|---|---|---|---|---|
| `GET /insurance-quote-requests/{id}` | Récupère une demande de devis par son identifiant. | `id` (path, obligatoire) | — | `InsuranceQuoteRequestDto` | `200` |
| `PATCH /insurance-quote-requests/{id}` | Met à jour l’état d’une demande avec la réponse fournie. | `id` (path, obligatoire) | `InsuranceQuoteResponseDto` | `InsuranceQuoteRequestDto` | `200` |
| `GET /insurance-quote-requests` | Récupère les demandes de devis. | — | — | `InsuranceQuoteRequestDto` | `200` |

## Schémas

- `InsuranceQuoteRequestDto` : propriétés `id` (integer), `date` (string), `statusHistory` (array of `RequestStatusChangeDto`), `customerInfo` (`CustomerInfoDto`), `insuranceOptions` (`InsuranceOptionsDto`), `insuranceQuote` (`InsuranceQuoteDto`) et `policyId` (string). Obligatoires : `customerInfo`, `insuranceOptions`.
- `RequestStatusChangeDto` : propriétés `date` (string) et `status` (string). Obligatoire : `status`.
- `InsuranceOptionsDto` : propriétés `startDate` (string), `insuranceType` (string) et `deductible` (`MoneyAmountDto`).
- `InsuranceQuoteDto` : propriétés `expirationDate` (string), `insurancePremium` (`MoneyAmountDto`) et `policyLimit` (`MoneyAmountDto`). Toutes sont obligatoires.
- `InsuranceQuoteResponseDto` : propriétés `status` (string), `expirationDate` (string), `insurancePremium` (`MoneyAmountDto`) et `policyLimit` (`MoneyAmountDto`). Obligatoire : `status`.

## Liens et indications d’appel

`GET /insurance-quote-requests/{id}` et `GET /insurance-quote-requests` renvoient `InsuranceQuoteRequestDto`. Pour tester une mise à jour, envoyer à `PATCH /insurance-quote-requests/{id}` un `InsuranceQuoteResponseDto` et vérifier la demande renvoyée.

`InsuranceQuoteRequestDto.customerInfo` est de type `CustomerInfoDto`, lié au domaine `customers`. Son champ `policyId` relie la demande au domaine `policies`. Le domaine `risk-computation` concerne le calcul des facteurs de risque à partir des informations transmises ; aucun lien d’opération ou de schéma plus précis n’est indiqué ici.
