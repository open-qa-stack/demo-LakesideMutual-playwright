# Référentiel des villes (`city-reference-data`)

Fournit les villes correspondant à un code postal.

## Référentiel des villes

Fournit les villes correspondant à un code postal.

| Opération | Rôle | Paramètres à filtrer | Envoi et réponse | Statuts |
|---|---|---|---|---|
| `GET /cities/{postalCode}` | Récupère les villes correspondant à un code postal. | `postalCode` (chemin, requis) | Répond avec `CitiesResponseDto`, qui contient `cities`, un tableau de chaînes. | `200` |

### Schéma

**`CitiesResponseDto`** — Contient la liste des villes correspondant à une recherche du référentiel.

- `cities`: tableau de chaînes.

### Utilisation

Fournissez le `postalCode` requis dans le chemin de `GET /cities/{postalCode}`. La réponse `200` utilise `CitiesResponseDto`.

Ce domaine fournit les villes du référentiel postal ; il peut servir de référence lors des opérations sur l’adresse des clients dans le domaine `customers`.
