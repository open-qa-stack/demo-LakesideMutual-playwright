# Clients (`customers`)

Consultation des clients et de leurs informations associées.

Clients : consultation des clients et de leurs informations associées.

## Opérations

| Opération | Rôle | Paramètres utiles pour filtrer | Réponse et propriétés à tester | Statut |
|---|---|---|---|---|
| `GET /customers` | Récupère les clients avec filtrage et pagination. | `filter`, `limit` et `offset` (query). | `PaginatedCustomerResponseDto` : `filter`, `limit`, `offset`, `size`, `customers` (tableau de `CustomerDto`) et `_links`. | `200` |
| `GET /customers/{customerIdDto}` | Récupère un client par son identifiant. | `customerIdDto` (path, obligatoire). | `CustomerDto` : `customerId` et `_links`. | `200` |
| `GET /customers/{customerIdDto}/policies` | Récupère les polices associées à un client, avec expansion facultative. | `customerIdDto` (path, obligatoire) et `expand` (query). | `PolicyDto`. | `200` |

## Schémas

- `AddressDto` : adresse postale avec `streetAddress`, `postalCode` et `city` (tous de type `string`).
- `CustomerInfoDto` : informations d’identité et adresses de contact et de facturation : `customerId`, `firstname` et `lastname` (`string`), `contactAddress` et `billingAddress` (`AddressDto`).
- `CustomerDto` : `customerId` (`string`) et `_links` (`Links`).
- `PaginatedCustomerResponseDto` : `filter` (`string`), `limit`, `offset` et `size` (`integer`), `customers` (tableau de `CustomerDto`) et `_links` (`Links`).

## Liens et remarques pour les tests

`GET /customers` retourne des clients sous forme de `CustomerDto`. `GET /customers/{customerIdDto}` retourne également un `CustomerDto`. Le paramètre de chemin `customerIdDto` relie la consultation d’un client à la récupération de ses polices avec `GET /customers/{customerIdDto}/policies`, dont la réponse est `PolicyDto`. Le détail fourni ne précise pas le lien entre `CustomerDto` et `CustomerInfoDto` ; ne pas supposer que ce dernier est la réponse de `GET /customers/{customerIdDto}`.

Le domaine `policies` couvre les contrats d’assurance, leurs périodes et garanties. Les domaines associés comprennent aussi `risk-computation` (calcul des facteurs de risque à partir des informations transmises) et `insurance-quote-requests` (consultation et traitement des demandes de devis et des réponses associées).

Pour tester la pagination, vérifier les valeurs de `filter`, `limit`, `offset` et `size`, ainsi que les éléments de `customers`. Pour les autres opérations, fournir `customerIdDto` dans le chemin ; `expand` est facultatif selon les paramètres indiqués. Les réponses mentionnées ici ne spécifient que le statut `200`.
