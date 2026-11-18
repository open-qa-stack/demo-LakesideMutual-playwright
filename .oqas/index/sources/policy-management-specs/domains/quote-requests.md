# Demandes de devis d’assurance (`quote-requests`)

Consulter l’historique des demandes de devis et répondre par une offre ou un rejet.

- `policy-management-frontend.md § PMF-UC-08 — Review insurance quote requests` : charge les demandes et les sépare en « Open Insurance Quote Requests » et « Past Insurance Quote Requests »; chaque ligne donne date, client, type d’assurance et statut, avec accès au détail.
- `policy-management-frontend.md § PMF-UC-09 — Follow the history of a quote request` : présente un bloc daté par entrée d’historique, du plus ancien au plus récent, avec texte propre au statut.
- `policy-management-frontend.md § PMF-UC-10 — Respond to a quote request` : une demande au statut `REQUEST_SUBMITTED` peut recevoir une offre avec date d’expiration, prime et limite, ou être rejetée. Le dialogue commence sur Accept avec date préremplie; envoi valide puis rechargement, annulation sans envoi; erreur backend conservant le dialogue et affichant un message.
- `policy-management-frontend.md § PMF-SCR-03 — Insurance quote requests (`/insurance-quote-requests`)` : deux tableaux en ordre backend décroissant par date; date, lien client, type et libellé de statut. Textes exacts d’état vide et messages d’erreur selon la règle d’erreurs.
- `policy-management-frontend.md § PMF-SCR-04 — Insurance quote request detail (`/insurance-quote-requests/:requestid`)` : historique et texte par statut; seul l’historique courant `REQUEST_SUBMITTED` expose « Respond ». Le dialogue Accept/Reject définit champs, valeurs par défaut, contraintes, actions, transitions affichées, erreurs et liens vers client/police.
