# Interaction logs (`interaction-logs`)

Customer interaction histories and acknowledgement of interactions.

.functions.remember({"text":"Le domaine interaction-logs récupère les historiques par customerId et acquitte les interactions jusqu’à lastAcknowledgedInteractionId. Les deux opérations renvoient InteractionLogAggregateRoot; interactions contient des InteractionEntity. Le compte non acquitté exposé est numberOfUnacknowledgedInteractions; domaine adjacent notifications pour les comptes de notifications, et customers pour profils/consultation clients.","tags":["interaction-logs","customers","notifications"],"source":"customer-management-api"}) Houd
?
## interaction-logs

Historique des interactions d’un client et acquittement des interactions. Les deux opérations sont sous le tag `interaction-log-information-holder` et renvoient `InteractionLogAggregateRoot`.

| Opération | Rôle | Paramètres à filtrer | Envoie | Retour et statuts |
|---|---|---|---|---|
| `GET /interaction-logs/{customerId}` | Récupère l’historique d’interactions du client indiqué. | `customerId` (path, required) | — | `200`: `InteractionLogAggregateRoot` |
| `PATCH /interaction-logs/{customerId}` | Acquitte les interactions du client jusqu’à l’ID fourni. | `customerId` (path, required) | `InteractionAcknowledgementDto` | `200`: `InteractionLogAggregateRoot` |

### Schémas

- `InteractionAcknowledgementDto` porte l’ID de la dernière interaction à acquitter. `lastAcknowledgedInteractionId` est une chaîne et est obligatoire.
- `InteractionLogAggregateRoot` contient `customerId` (string), `username` (string), `lastAcknowledgedInteractionId` (string), `interactions` (array de `InteractionEntity`) et `numberOfUnacknowledgedInteractions` (integer).
- `InteractionEntity` représente une interaction avec `id` (string), `date` (string), `content` (string) et `sentByOperator` (boolean).

### Liens et conseils d’appel

Utilisez `customerId` pour cibler un client. Pour acquitter des interactions, envoyez `lastAcknowledgedInteractionId` dans le corps de `PATCH /interaction-logs/{customerId}`; la réponse expose la position d’acquittement et le compte restant via `numberOfUnacknowledgedInteractions`. Le domaine `customers` couvre la consultation, la liste et les profils des clients. Le domaine `notifications` concerne les comptes de notifications non acquittées associés aux clients.
