# Interactions client (`customer-interactions`)

Conserve les échanges avec les clients ainsi que leur suivi et leur rattachement aux journaux d’interaction.

## Domaine customer-interactions

| Élément | Rôle | Colonnes à rechercher ou filtrer |
|---|---|---|
| `public.interactionlogs` | Journal d’interaction d’un client, avec l’identifiant du dernier échange acquitté et le nom d’utilisateur associé. | `customer_id` (clé primaire), `last_acknowledged_interaction_id`, `username` |
| `public.interactionlogs_interactions` | Associe les échanges aux journaux d’interaction des clients. | `interaction_log_aggregate_root_customer_id`, `interactions_id` |
| `public.interactions` | Contient les échanges, leur contenu, leur date et indique s’ils ont été envoyés par un opérateur. | `id` (clé primaire), `date`, `sent_by_operator`, `content` |

### Liens et usage

- Pour retrouver les échanges d’un journal, reliez `public.interactionlogs.customer_id` à `public.interactionlogs_interactions.interaction_log_aggregate_root_customer_id`, puis `public.interactionlogs_interactions.interactions_id` à `public.interactions.id`.
- `public.interactionlogs_interactions.interactions_id` est unique : un échange ne peut être associé qu’une seule fois dans cette table.
- Pour examiner le suivi d’un client, consultez `last_acknowledged_interaction_id` dans `public.interactionlogs` et comparez-le aux identifiants des échanges associés. Aucun lien de clé étrangère pour ce champ n’est indiqué.
- `sent_by_operator` permet de distinguer les échanges envoyés par un opérateur. `date` et `content` décrivent respectivement la date et le contenu de l’échange.

Aucun autre domaine n’est indiqué pour cette source.
