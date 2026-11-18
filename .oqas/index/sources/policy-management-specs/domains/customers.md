# Clients (`customers`)

Rechercher et consulter les clients, leur facteur de risque et leurs polices, avec accès au frontend Customer Management.

- `policy-management-frontend.md § PMF-UC-04 — Search customers` : chargement initial sans filtre, recherche texte soumise avec mise en évidence du nom correspondant, pagination et accès au détail par « Manage Policy ».
- `policy-management-frontend.md § PMF-UC-05 — View a customer, the risk factor and the customer's policies` : chargement du client, calcul backend du facteur de risque à partir de la date de naissance et du code postal, puis chargement des polices. Le profil présente nom, adresse, email et téléphone; les couleurs du risque varient avec la valeur. Un état vide affiche « This customer doesn't have any insurance policies yet. »; client inconnu : « Customer not found. ».
- `policy-management-frontend.md § PMF-UC-11 — Open the customer in Customer Management` : le bouton externe navigue vers `http://localhost:3020/customers/{customerId}`.
- `policy-management-frontend.md § PMF-SCR-05 — Customers (`/customers`)` : champ de recherche libre, tableau nom/email/adresse, plage de résultats et pagination par liens backend. Le nom affiche en gras la correspondance; l’email est un lien mailto.
- `policy-management-frontend.md § PMF-SCR-06 — Customer detail (`/customers/:customerid`)` : profil avec adresse, email et téléphone, facteur de risque 0–100 et couleur, panneaux de polices; détails et actions de police décrits dans le domaine Polices. Le lien Customer Management est fixe à localhost:3020.
