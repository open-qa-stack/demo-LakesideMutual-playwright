# Notifications (`notifications`)

Unacknowledged notification counts associated with customers.

Les notifications représentent les nombres de notifications non acquittées associés aux clients.

| Opération | Rôle | Réponse |
|---|---|---|
| `GET /notifications` | Liste toutes les notifications non acquittées. | `200` : `NotificationDto` |

### Schéma

`NotificationDto` représente le nombre de notifications non acquittées pour un client. Ses propriétés sont `customerId` (chaîne), `username` (chaîne) et `count` (entier).

### Liens avec les autres domaines

`customerId` identifie le client associé à la notification et relie ce domaine à `customers`. Les acquittements des interactions relèvent de `interaction-logs` ; cette opération liste les notifications non acquittées.
