# Gestion des erreurs (`error-handling`)

Regroupe les points d’entrée techniques qui prennent en charge la gestion des erreurs HTTP.

## Gestion des erreurs

Ce domaine regroupe les points d’entrée techniques qui prennent en charge la gestion des erreurs HTTP.

| Opération | Rôle | Paramètres à filtrer | Envoie et reçoit | Réponses |
|---|---|---|---|---|
| `GET /error` | Traite les erreurs via le point d’entrée générique pour la méthode GET. | Aucun paramètre indiqué. | Aucune requête ni propriété de réponse indiquée. | `200` |
| `PUT /error` | Traite les erreurs via le point d’entrée générique pour la méthode PUT. | Aucun paramètre indiqué. | Aucune requête ni propriété de réponse indiquée. | `200` |
| `POST /error` | Traite les erreurs via le point d’entrée générique pour la méthode POST. | Aucun paramètre indiqué. | Aucune requête ni propriété de réponse indiquée. | `200` |
| `DELETE /error` | Traite les erreurs via le point d’entrée générique pour la méthode DELETE. | Aucun paramètre indiqué. | Aucune requête ni propriété de réponse indiquée. | `200` |
| `OPTIONS /error` | Traite les erreurs via le point d’entrée générique pour la méthode OPTIONS. | Aucun paramètre indiqué. | Aucune requête ni propriété de réponse indiquée. | `200` |
| `HEAD /error` | Traite les erreurs via le point d’entrée générique pour la méthode HEAD. | Aucun paramètre indiqué. | Aucune requête ni propriété de réponse indiquée. | `200` |
| `PATCH /error` | Traite les erreurs via le point d’entrée générique pour la méthode PATCH. | Aucun paramètre indiqué. | Aucune requête ni propriété de réponse indiquée. | `200` |

Toutes les opérations sont associées au tag `error-controller`. Aucun schéma ni lien avec d’autres domaines n’est indiqué. Les opérations partagent le chemin `/error` et diffèrent par la méthode HTTP.
