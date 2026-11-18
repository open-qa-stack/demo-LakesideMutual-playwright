# Authentification (`authentication`)

Gère l’authentification et la création de comptes utilisateurs.

## Périmètre

`authentication` gère l’authentification et la création de comptes utilisateurs. Les deux opérations sont exposées par `authentication-controller`.

| Opération | Rôle | Corps de requête | Réponse documentée |
|---|---|---|---|
| `POST /auth` | Authentifie un utilisateur à partir de son adresse e-mail et de son mot de passe. | `AuthenticationRequestDto` : `email`, `password` (chaînes de caractères). | `200` : `AuthenticationResponseDto`, avec `email` et `token` (chaînes de caractères). |
| `POST /auth/signup` | Crée un nouvel utilisateur. | `SignupRequestDto` : `email`, `password` (chaînes de caractères, tous deux requis). | `200` : `UserResponseDto`. |

### Liens entre les schémas et opérations

- `POST /auth` reçoit `AuthenticationRequestDto` et renvoie `AuthenticationResponseDto`.
- `POST /auth/signup` reçoit `SignupRequestDto` et renvoie `UserResponseDto`. La définition de `UserResponseDto` n’est pas fournie ici.
- `AuthenticationRequestDto` et `SignupRequestDto` contiennent tous deux `email` et `password`. Seuls `email` et `password` de `SignupRequestDto` sont explicitement indiqués comme requis.
- `AuthenticationResponseDto` contient `email` et `token`.

### À noter pour les tests

Les seules réponses documentées pour ces opérations sont `200`. Aucune contrainte de format ou règle de validation des valeurs de `email`, `password` ou `token` n’est précisée ici.

Les domaines associés de la source comprennent `customers` (informations, adresse et inscription des clients), `users` (informations du compte utilisateur connecté) et `error-handling` (gestion des erreurs HTTP). Le contrat fourni ne précise pas de lien d’appel entre ces domaines et les opérations d’authentification.
