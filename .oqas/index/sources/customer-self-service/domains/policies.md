# Demandes de devis et polices (`policies`)

Permet de consulter les polices et demandes de devis, d’afficher les demandes archivées et de commencer ou consulter une demande.

- `/policies` est accessible après connexion depuis « My Policies ». Elle présente les demandes de devis (date, type, état), une case pour afficher les demandes archivées, un bouton « New Insurance Quote Request » et les informations de polices (période, franchise, prime, plafond et accord d’assurance). Les lignes de demande sont cliquables pour ouvrir leur détail.
- `/policies/new-insurance-quote-request` s’ouvre depuis le bouton de création. L’assistant affiche les étapes « Personal Data », « Insurance » et « Confirm Request ». Les données personnelles montrent l’adresse de contact et une option pour reprendre cette adresse comme adresse de facturation; l’étape d’assurance permet de choisir une date de début, un type et une franchise. La confirmation offre « Previous » et « Request a Quote ».
- `/policies/insurance-quote-requests/:id` s’ouvre en sélectionnant une ligne. Elle affiche les adresses et options de la demande, puis l’état ou le message associé; le fil d’Ariane « Insurance Quote Requests » revient à la liste.

La liste testée contient de nombreuses lignes dupliquées portant le même jour et le statut « Waiting for Quote »; un élément archivé visible est une demande santé rejetée.

## Observed on the screens

What follows was seen while exploring the application, not read in a specification.

- `/policies`: La case « Show archived Insurance Quote Requests » ajoute une ligne archivée avec le statut « Request was rejected ». Seen: "Show archived Insurance Quote Requests", "Request was rejected".
- `/policies/insurance-quote-requests/:id`: L’ouverture d’une demande existante affiche les adresses, les options d’assurance et le message de rejet le cas échéant. Seen: "Insurance Quote Request Details", "You submitted the following Insurance Quote Request:", "Lakeside Mutual has rejected this Insurance Quote Request.".
- `/policies/insurance-quote-requests/:id`: Un identifiant de demande inexistant affiche une erreur de non-existence. Seen: "Error", "Insurance Quote Request not found.".
- `/policies/new-insurance-quote-request`: L’étape des options propose Life Insurance, Home Insurance, Health Insurance et Car Insurance; les franchises proposées sont 300 CHF, 500 CHF, 1000 CHF, 1500 CHF, 2000 CHF et 2500 CHF.
- `/policies/new-insurance-quote-request`: L’étape de confirmation récapitule les adresses de contact et de facturation, la date de début, le type d’assurance et la franchise.
