# Customers (`customers`)

Customer profile, contact and billing details, addresses, and customer login accounts.

## Périmètre

Le domaine `customers` de `customer-self-service-db` couvre les profils clients, leurs adresses de contact et de facturation, ainsi que leurs comptes de connexion.

| Élément | Rôle | Colonnes utiles pour rechercher ou filtrer |
|---|---|---|
| `public.addresses` | Stocke les adresses postales des clients. | `id`, `city`, `postal_code`, `street_address` |
| `public.customerinfos` | Stocke l’identité du client et relie séparément ses adresses de contact et de facturation. | `id`, `customer_id`, `firstname`, `lastname`, `contact_address_id`, `billing_address_id` |
| `public.user_logins` | Stocke les identifiants de connexion, l’adresse e-mail et les autorités du compte client. | `id`, `customer_id`, `email`, `authorities`, `password` |

## Liens et usage

- `public.customerinfos.contact_address_id` et `public.customerinfos.billing_address_id` référencent chacun `public.addresses.id`. Pour examiner le profil avec ses adresses, joindre `public.customerinfos` à `public.addresses` sur ces clés étrangères, en distinguant l’adresse de contact de l’adresse de facturation.
- `public.customerinfos` et `public.user_logins` contiennent tous deux `customer_id`. Cette colonne permet de rechercher leurs enregistrements associés ; aucune contrainte de clé étrangère entre ces tables n’est indiquée.
- Chaque table a une clé primaire `id`. `public.customerinfos` impose aussi l’unicité de `billing_address_id` et de `contact_address_id`.
- `customer_id` est une chaîne de caractères dans les deux tables qui la contiennent. Ne pas le confondre avec leurs identifiants de ligne `id`.
- Les demandes de devis, options disponibles, devis générés et historiques de statut relèvent du domaine `insurance-quotes`, et non de ces tables de profil client.
