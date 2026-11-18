# Navigation et présentation globale (`application-navigation`)

Comportements partagés de navigation, contexte d’application et informations générales communes aux écrans.

- `policy-management-frontend.md § 1. Purpose` : l’application web sert au personnel de Lakeside Mutual à gérer les polices, consulter le risque client et répondre aux demandes de devis; les données viennent du backend Policy Management.
- `policy-management-frontend.md § 2. Scope` : périmètre comprenant huit écrans, suppression de polices et lien vers Customer Management. La modification des données client, l’authentification et les règles backend sont hors périmètre.
- `policy-management-frontend.md § 3. Stakeholders and actors` : acteur humain (personnel, sans distinction de rôle), backend Policy Management et frontend Customer Management accessible sur une URL locale fixe.
- `policy-management-frontend.md § 4. Functional context` : le backend est configuré via `VUE_APP_POLICY_MANAGEMENT_BACKEND` (valeur observée `http://localhost:8090`); les données client sont lues par ce backend auprès de Customer Core. Les demandes proviennent du parcours Customer Self-Service.
