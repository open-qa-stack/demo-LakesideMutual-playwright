# Polices (`policies`)

Création, consultation, mise à jour et suppression des contrats d’assurance, ainsi que leurs périodes et garanties.

Ce domaine couvre la création, la consultation, la mise à jour et la suppression des contrats d’assurance, ainsi que leurs périodes et garanties. Toutes les opérations indiquées répondent avec le statut `200`.

| Opération | Rôle | Paramètres utiles | Envoi et réponse |
|---|---|---|---|
| `GET /policies/{policyId}` | Récupère une police par son identifiant, avec expansion facultative. | `policyId` (path, requis), `expand` (query) | Répond avec `PolicyDto`. |
| `GET /policies` | Récupère les polices de la plus récente à la plus ancienne, avec pagination et expansion facultative. | `limit`, `offset`, `expand` (query) | Répond avec `PaginatedPolicyResponseDto`. |
| `POST /policies` | Crée une police. | — | Envoie `CreatePolicyRequestDto` ; répond avec `PolicyDto`. |
| `PUT /policies/{policyId}` | Met à jour une police existante à partir de données de création. | `policyId` (path, requis) | Envoie `CreatePolicyRequestDto` ; répond avec `PolicyDto`. |
| `DELETE /policies/{policyId}` | Supprime une police existante par son identifiant. | `policyId` (path, requis) | Aucune réponse avec schéma n’est indiquée. |

## Schémas

- `CreatePolicyRequestDto` décrit les données de création ou de mise à jour. `policyType` est requis. Propriétés : `customerId` (string), `policyPeriod` (`PolicyPeriodDto`), `policyType` (string), `deductible`, `policyLimit` et `insurancePremium` (`MoneyAmountDto`), `insuringAgreement` (`InsuringAgreementDto`).
- `PolicyPeriodDto` porte `startDate` et `endDate` (strings), tous deux requis.
- `MoneyAmountDto` porte `amount` (number) et `currency` (string), tous deux requis.
- `InsuringAgreementDto` porte `agreementItems`, un tableau de `InsuringAgreementItemDto`, requis.
- `InsuringAgreementItemDto` porte `title` et `description` (strings), tous deux requis.
- `PolicyDto` représente une police : `policyId` (string), `customer` (object), `creationDate` (string), `policyPeriod` (`PolicyPeriodDto`), `policyType` (string), les trois montants en `MoneyAmountDto`, `insuringAgreement` (`InsuringAgreementDto`), `_links` (`Links`) et `_expandable` (tableau de strings).
- `PaginatedPolicyResponseDto` porte `limit`, `offset` et `size` (integers), `policies` (tableau de `PolicyDto`) et `_links` (`Links`).
- `Links` est le schéma des liens associés ; aucune propriété n’est précisée.
- `Link` décrit un lien hypermédia avec `href`, `hreflang`, `title`, `type`, `deprecation`, `profile` et `name` (strings), et `templated` (boolean).

## Liens et conseils d’appel

`POST /policies` et `PUT /policies/{policyId}` partagent le schéma `CreatePolicyRequestDto`. Pour les lectures, utilisez `expand` lorsqu’une expansion est souhaitée ; la réponse expose `_expandable`. La liste est paginée avec `limit` et `offset`, et renvoie notamment `size`, `policies` et `_links`.

Les polices peuvent être liées aux autres domaines de `policy-management-api` : `customers` pour les clients et leurs informations, `insurance-quote-requests` pour les demandes de devis et leurs réponses, et `risk-computation` pour le calcul des facteurs de risque d’un client. Les contrats décrits ici n’indiquent pas de paramètres ou d’opérations d’intégration avec ces domaines.
