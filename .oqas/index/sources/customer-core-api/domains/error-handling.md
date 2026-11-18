# Gestion des erreurs (`error-handling`)

Points d’entrée techniques associés à la gestion des erreurs.

Les sept opérations exposent le point d’entrée technique `/error`. Toutes sont associées au tag `error-controller` et indiquent uniquement une réponse `200`. Aucune information n’est fournie sur les paramètres, les corps de requête, les corps de réponse ou les schémas.

| Opération | Rôle | Paramètres à filtrer | Envoie et retourne | Statut |
|---|---|---|---|---|
| `GET /error` | Point d’entrée GET de gestion des erreurs. | Non précisés. | Non précisés. | `200` |
| `PUT /error` | Point d’entrée PUT de gestion des erreurs. | Non précisés. | Non précisés. | `200` |
| `POST /error` | Point d’entrée POST de gestion des erreurs. | Non précisés. | Non précisés. | `200` |
| `DELETE /error` | Point d’entrée DELETE de gestion des erreurs. | Non précisés. | Non précisés. | `200` |
| `OPTIONS /error` | Point d’entrée OPTIONS de gestion des erreurs. | Non précisés. | Non précisés. | `200` |
| `HEAD /error` | Point d’entrée HEAD de gestion des erreurs. | Non précisés. | Non précisés. | `200` |
| `PATCH /error` | Point d’entrée PATCH de gestion des erreurs. | Non précisés. | Non précisés. | `200` |

Identifiants d’opération : `GET /error` → `handleError`, `PUT /error` → `handleError_3`, `POST /error` → `handleError_2`, `DELETE /error` → `handleError_5`, `OPTIONS /error` → `handleError_6`, `HEAD /error` → `handleError_1`, `PATCH /error` → `handleError_4`.

Aucun lien avec des schémas ou d’autres domaines n’est précisé. Les autres domaines de `customer-core-api` sont `customers` (profils clients et coordonnées) et `city-reference-data` (villes associées à un code postal) ; aucun lien d’opération avec eux n’est indiqué.
