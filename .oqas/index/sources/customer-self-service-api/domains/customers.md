# Customers (`customers`)

Gère les informations, l’adresse et l’inscription des clients.

The instructions include a tool to persist useful domain facts for later agents. The key shared observation is that this contract’s customer domain has only three endpoints, all on the `customer-information-holder` tag, with narrow response/status coverage. I’ll record that before writing the file.# Customers

Gère les informations, l’adresse et l’inscription des clients.

## Opérations

| Opération | Rôle | Paramètres à filtrer | Envoi | Réponse et propriétés utiles | Statuts |
|---|---|---|---|---|---|
| `GET /customers/{customerId}` | Récupère un client à partir de son identifiant. | `customerId` — path, required | Aucun body indiqué. | `200 CustomerDto` : `customerId`, `_links`. | `200` |
| `POST /customers` | Finalise l’inscription d’un nouveau client. | Aucun paramètre indiqué. | `CustomerRegistrationRequestDto` : `firstname`, `lastname`, `birthday`, `city`, `streetAddress`, `postalCode`, `phoneNumber`. Champs requis : `birthday`, `city`, `firstname`, `lastname`, `postalCode`, `streetAddress`. | `200 CustomerDto` : `customerId`, `_links`. | `200` |
| `PUT /customers/{customerId}/address` | Met à jour l’adresse d’un client et renvoie l’adresse enregistrée. | `customerId` — path, required | `AddressDto` : `streetAddress`, `postalCode`, `city` (tous requis). | `200 AddressDto` : `streetAddress`, `postalCode`, `city`. | `200` |

## Schémas et liens

- `AddressDto` structure une adresse avec `streetAddress`, `postalCode` et `city`. Ces trois propriétés sont requises.
- `CustomerRegistrationRequestDto` porte les informations nécessaires à l’inscription. `phoneNumber` est la seule propriété listée qui n’est pas indiquée comme requise.
- `CustomerDto` expose `customerId` et `_links`, de type `Links`. Le contenu de `Links` n’est pas précisé.
- `CustomerInfoDto` regroupe `customerId`, `firstname`, `lastname`, `contactAddress` et `billingAddress`. Les deux adresses sont de type `AddressDto` et toutes les propriétés sont requises. Ce schéma n’est pas indiqué comme réponse des opérations ci-dessus.
- Les trois opérations sont taguées `customer-information-holder`. `POST /customers` et `GET /customers/{customerId}` renvoient `CustomerDto`; `PUT /customers/{customerId}/address` reçoit et renvoie `AddressDto`.
- Les autres domaines de la source sont `insurance-quotes`, `authentication`, `users`, `city-reference-data` et `error-handling`. Le contrat fourni ne précise pas de lien opérationnel entre eux et ces opérations.

## À retenir pour les tests

Utiliser un `customerId` dans le chemin pour lire un client ou mettre à jour son adresse. Pour l’inscription, envoyer les champs requis de `CustomerRegistrationRequestDto`; `phoneNumber` est documenté mais facultatif. Vérifier uniquement les propriétés et le statut `200` indiqués : aucun autre statut ni contenu de `_links` n’est précisé.
