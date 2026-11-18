# Customers (`customers`)

Stores customer identity details and their postal and billing contact addresses.

Le domaine `customers` stocke l’identité des clients ainsi que leurs adresses de contact et de facturation.

| Élément | Rôle | Colonnes utiles pour rechercher ou filtrer |
|---|---|---|
| `public.addresses` | Stocke l’adresse postale d’un client. | `id` (clé primaire), `city`, `postal_code`, `street_address` |
| `public.customerinfos` | Stocke l’identité du client et référence ses adresses de contact et de facturation. | `id` (clé primaire), `customer_id`, `firstname`, `lastname`, `contact_address_id`, `billing_address_id` |

## Liens et utilisation

- `public.customerinfos.contact_address_id` référence `public.addresses.id` pour l’adresse de contact.
- `public.customerinfos.billing_address_id` référence `public.addresses.id` pour l’adresse de facturation.
- Chaque colonne de référence est soumise à une contrainte `UNIQUE` : une même adresse ne peut donc être référencée plusieurs fois dans la même colonne.
- Pour obtenir les coordonnées postales d’un client, reliez `public.customerinfos` à `public.addresses` séparément par `contact_address_id` et `billing_address_id`.
- `policies` concerne les polices d’assurance et leurs couvertures ; `quotes` concerne les demandes de devis et leur historique de statut. Aucun lien entre ces domaines et les tables clients n’est indiqué ici.
