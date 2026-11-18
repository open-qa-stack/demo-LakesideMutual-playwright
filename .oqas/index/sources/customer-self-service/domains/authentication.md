# Authentification et inscription (`authentication`)

Permet de se connecter ou de créer un compte client et de consulter les conditions affichées.

- `/` est la page d’accueil publique : elle propose les boutons de connexion et d’inscription.
- `/login` permet de saisir « Email Address » et « Password », puis d’ouvrir une session. La page présente aussi le bouton « Fill in » pour renseigner l’accès de démonstration et le lien d’inscription.
- `/signup` permet de saisir « Email Address » et « Password » et de cocher l’accord aux conditions; « Back to the homepage » revient à `/`. Le lien « terms and conditions » mène à l’ancre `#toc` et révèle le panneau « Terms and Conditions ».

Le compte de démonstration affiché est admin@example.com / 1password. « Fill in » renseigne ces deux champs.

## Observed on the screens

What follows was seen while exploring the application, not read in a specification.

- `/login`: Une soumission de connexion sans identifiants affiche l’échec de connexion et un message d’identifiants invalides. Seen: "Log in failed", "Invalid email address or password".
- `/signup`: Le bouton d’inscription reste désactivé tant que l’accord aux conditions n’est pas coché.
- `/signup`: Le lien « terms and conditions » ouvre l’ancre des conditions sur la même page. Seen: "Terms and Conditions", "Thank you for your interest in our example application.", "The software is provided \"as is\" without warranty of any kind. The authors specifically disclaim all other warranties, expressed or implied, including without limitation the implied warranties of merchantability or fitness for a particular use.".
