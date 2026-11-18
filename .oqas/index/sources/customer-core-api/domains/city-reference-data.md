# Référentiel des villes (`city-reference-data`)

Consultation des villes associées à un code postal.

## Référentiel des villes

`city-reference-data` expose la consultation des villes associées à un code postal.

| Opération | Rôle | Paramètres utiles | Envoi et réponse | Statut |
|---|---|---|---|---|
| `GET /cities/{postalCode}` | Renvoie les villes correspondant au code postal indiqué. | `postalCode` : obligatoire, dans le chemin. | La réponse est un `CitiesResponseDto` avec `cities`, un tableau de chaînes. | `200` |

### Schéma

`CitiesResponseDto` contient la liste des villes renvoyée pour un code postal :

- `cities` : tableau de chaînes.

### Utilisation

Fournir le `postalCode` dans le chemin de la requête, puis lire les villes dans `cities` de la réponse `200`.

Ce domaine ne documente que la consultation des villes. Le domaine `customers` traite les profils clients et leurs coordonnées ; le domaine `error-handling` concerne la gestion des erreurs.
