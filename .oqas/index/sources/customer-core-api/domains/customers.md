# Clients (`customers`)

Gestion des profils clients, de leur consultation et de leurs coordonnées.

## Périmètre

`customer-core-api` couvre la gestion des profils clients, leur consultation et leurs coordonnées. Les opérations portent le tag `customer-information-holder`, sauf l’ancien point d’entrée `GET /getCustomers/{ids}`, tagué `old-customer-information-holder`.

## Opérations

| Opération | Rôle | Paramètres à considérer | Corps envoyé | Réponse documentée |
|---|---|---|---|---|
| `PUT /customers/{customerId}` | Met à jour le profil du client identifié et renvoie sa fiche. | `customerId` (path, requis) | `CustomerProfileUpdateRequestDto` | 200 `CustomerResponseDto` |
| `PUT /customers/{customerId}/address` | Modifie l’adresse du client identifié. | `customerId` (path, requis) | `AddressDto` | 200 `AddressDto` |
| `GET /customers` | Liste les clients, décrits comme des pages de 10 entrées. | `filter`, `limit`, `offset`, `fields` (query) | — | 200 `PaginatedCustomerResponseDto` |
| `POST /customers` | Crée un client à partir des informations de profil fournies. | — | `CustomerProfileUpdateRequestDto` | 200 `CustomerResponseDto` |
| `GET /getCustomers/{ids}` | Récupère des clients par identifiants via l’ancien point d’entrée. | `ids` (path, requis), `fields` (query) | — | 200, sans schéma de réponse précisé |
| `GET /customers/{ids}` | Récupère un ensemble de clients à partir de leurs identifiants. | `ids` (path, requis), `fields` (query) | — | 200 `CustomersResponseDto` |

## Schémas et liens

- `CustomerProfileUpdateRequestDto` sert de corps à `POST /customers` et `PUT /customers/{customerId}`. Il contient `firstname`, `lastname`, `birthday`, `streetAddress`, `postalCode`, `city`, `email` et `phoneNumber`. Les champs requis sont `city`, `email`, `firstname`, `lastname`, `postalCode` et `streetAddress`.
- `AddressDto` décrit l’adresse envoyée à `PUT /customers/{customerId}/address` et sa réponse. Ses champs `streetAddress`, `postalCode` et `city` sont requis.
- `CustomerResponseDto` contient `customerId`, `firstname`, `lastname`, `birthday`, `streetAddress`, `postalCode`, `city`, `email`, `phoneNumber`, `moveHistory` (tableau de `Address`) et `_links` (`Links`).
- `Address` décrit une adresse de l’historique des déménagements : `streetAddress`, `postalCode`, `city`.
- `PaginatedCustomerResponseDto`, réponse de `GET /customers`, contient `filter`, `limit`, `offset`, `size`, `customers` (tableau de `CustomerResponseDto`) et `_links` (`Links`).
- `CustomersResponseDto`, réponse de `GET /customers/{ids}`, contient `customers` (tableau de `CustomerResponseDto`) et `_links` (`Links`).
- `Links` regroupe les liens associés aux réponses client ; ses propriétés ne sont pas précisées. `Link` décrit un lien individuel avec `href`, `hreflang`, `title`, `type`, `deprecation`, `profile`, `name` et `templated`. Le contenu de `Links` n’est pas détaillé.
- Aucun schéma de réponse n’est indiqué pour `GET /getCustomers/{ids}`.

## Conseils de test

- Pour les profils, tester les champs requis de `CustomerProfileUpdateRequestDto` sur la création et la mise à jour ; les deux opérations documentent une réponse 200 `CustomerResponseDto`.
- Pour la pagination, lire `filter`, `limit`, `offset`, `size` et `customers` dans `PaginatedCustomerResponseDto`. `fields` est aussi un paramètre query documenté, sans précision sur ses valeurs.
- Pour les consultations par identifiants, distinguer `GET /customers/{ids}` et son schéma `CustomersResponseDto` de l’ancien `GET /getCustomers/{ids}`, dont seul le statut 200 est précisé.
- Le domaine voisin `city-reference-data` concerne la consultation des villes associées à un code postal ; `error-handling` couvre les points d’entrée techniques associés à la gestion des erreurs.
