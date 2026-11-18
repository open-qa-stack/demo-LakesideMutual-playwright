# Customers (`customers`)

Customer identity, contact details, profile information, and associated address records.

## Domaine clients

| Élément | Rôle | Colonnes utiles pour rechercher ou filtrer |
|---|---|---|
| `public.customers` | Identifiants des clients liés à leurs profils. | `id` (clé primaire), `customer_profile_id` |
| `public.customer_profile_entity` | Informations personnelles et de contact, date de naissance et adresse actuelle du client. | `id` (clé primaire), `firstname`, `lastname`, `email`, `phone_number`, `birthday`, `current_address_id` |
| `public.addresses` | Détails d’une adresse : rue, code postal et ville. | `id` (clé primaire), `street_address`, `postal_code`, `city` |
| `public.customer_profile_entity_move_history` | Associe des profils clients aux adresses de leur historique de déménagements. | `customer_profile_entity_id`, `move_history_id` |

### Liens et contraintes

- `public.customers.customer_profile_id` référence `public.customer_profile_entity.id`. `customer_profile_id` est unique.
- `public.customer_profile_entity.current_address_id` référence `public.addresses.id` et est unique.
- `public.customer_profile_entity_move_history.customer_profile_entity_id` référence `public.customer_profile_entity.id`.
- `public.customer_profile_entity_move_history.move_history_id` référence `public.addresses.id` et est unique.
- Les deux colonnes de `public.customer_profile_entity_move_history` sont `NOT NULL`; aucune clé primaire n’est indiquée pour cette table.

### Repères d’utilisation

Pour partir d’un identifiant client, recherchez `public.customers.id`, puis suivez `customer_profile_id` vers le profil. L’adresse actuelle se récupère par `current_address_id`; les adresses de l’historique se trouvent via `customer_profile_entity_move_history`, où `move_history_id` désigne une ligne de `public.addresses`.
