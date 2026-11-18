# Utilisateurs (`users`)

Expose les informations du compte utilisateur connecté.

| Opération | Rôle | Paramètres à filtrer | Envoie et retourne | Statuts |
|---|---|---|---|---|
| `GET /user` | Récupère les informations de l’utilisateur actuellement connecté. | Aucun paramètre indiqué. | N’envoie pas de contenu indiqué. Retourne `UserResponseDto`. | `200` |

## Schémas

### `UserResponseDto`

Contient l’adresse e-mail et l’identifiant client de l’utilisateur connecté.

| Propriété | Type |
|---|---|
| `email` | `string` |
| `customerId` | `string` |

## Liens et conseils d’appel

- `GET /user` répond avec `UserResponseDto`.
- Appelez `GET /user` pour obtenir les informations de l’utilisateur actuellement connecté ; aucun mécanisme d’authentification ni paramètre n’est précisé ici.
- `customerId` relie les informations de l’utilisateur au domaine `customers`, qui gère les informations, l’adresse et l’inscription des clients. `authentication` couvre l’authentification et la création de comptes utilisateurs.
