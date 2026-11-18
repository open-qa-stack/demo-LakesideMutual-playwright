# Gestion des clients (`customers`)

Les utilisateurs consultent, recherchent, créent et mettent à jour les profils clients, et échangent des messages depuis leur fiche.

## Éléments
- `/`: Page d’accueil et liste des clients. Les utilisateurs parcourent les clients paginés (nom, email, adresse), lancent une recherche avec Search et ouvrent une fiche avec Show. New Customer mène au formulaire de création.
- `/customers/new`: Formulaire de création accessible par New Customer; champs Email Address et Password sous Login Credentials, puis First Name, Last Name, Date of Birth, Street Address, Postal Code, City et Phone Number sous Customer Profile. Create Customer est désactivé quand le formulaire est vide. Ne pas le soumettre durant l’exploration.
- `/customers/:id`: Fiche atteinte via Show depuis la liste. Elle présente le profil (nom, adresse, anciennes adresses dépliables, date de naissance, email, téléphone), un lien Open in Policy Management, Edit Profile et un chat avec zone Enter a Message et bouton Send.
- `/customers/:id/edit_profile`: Formulaire accessible via Edit Profile. Les champs préremplis sont First Name, Last Name, Date of Birth, Street Address, Postal Code, City, Email Address et Phone Number; Save Changes permet l’enregistrement. Ne pas soumettre durant l’exploration.

## Repères de test
- La liste initiale présente Ado Kinnett (akinnetta@example.com), Bel Pifford et d’autres, 10 lignes par page pour 50 enregistrements; la pagination est indiquée par 1 - 10 of 50.
- Ado Kinnett est consultable via `/customers/bunlo9vk5f`; date de naissance affichée June 14th 1975 et téléphone 055 222 41 11.
- Les champs Date of Birth n’ont pas de nom accessible exploitable dans le snapshot; ils ont le placeholder Date of Birth.
- La navigation vers une fiche a affiché une erreur de backend indisponible pour `/customers/1` et `/customers/999999`; la fiche d’Ado obtenue par la liste s’est toutefois chargée.

## Observed on the screens

What follows was seen while exploring the application, not read in a specification.

- `/`: La liste initiale affiche les 10 premiers clients sur 50 et la recherche « Ado » renvoie un seul client. Seen: "1 - 10 of 50", "1 - 1 of 1".
- `/`: La zone Notifications indique qu’aucune notification nouvelle n’est disponible. Seen: "There are currently no new notifications.".
- `/customers/:id`: Pour l’enregistrement Ado Kinnett, ouvrir Old Addresses développe une longue liste d’anciennes adresses, avec plusieurs entrées répétées. Seen: "Old Addresses", "2 Autumn Leaf Lane, 6500 Bellinzona", "28 Cross-Application Avenue, 3000 Bern".
- `/customers/:id`: La fiche d’Ado affiche l’absence de messages dans le chat avant tout échange. Seen: "There are no messages yet. Send a message to start a conversation.".
- `/customers/:id`: Une adresse de fiche client non récupérable affiche une erreur indiquant que le backend Customer Management n’est pas disponible. Seen: "Error!", "The Customer Management backend http://localhost:8100 is currently not available. Please follow the instructions in the corresponding README to ensure that it is running and listening on the right port.".
