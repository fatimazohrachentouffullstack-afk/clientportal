TP 10 - Portail de gestion des clients

1) Copier le dossier Portail_Clients_SonarQube dans :
   C:\xampp\htdocs\

2) Démarrer Apache depuis XAMPP.

3) Ouvrir dans le navigateur :
   http://localhost/Portail_Clients_SonarQube/

4) Tester :
   - Afficher les clients
   - Ajouter un client
   - Modifier un client
   - Supprimer un client

5) SonarQube :
   - Démarrer SonarQube sur http://localhost:9000
   - Créer le projet DevWebClients
   - Générer un token
   - Remplacer REMPlACER_PAR_VOTRE_TOKEN dans sonar-project.properties
   - Ouvrir PowerShell dans le dossier du projet
   - Exécuter : sonar-scanner

Défauts volontaires pour le TP :
- Variable unusedCounter non utilisée dans js/app.js
- Fonction add/edit côté PHP avec traitements répétitifs
- Validation simple côté JavaScript et contrôles serveur incomplets
- Quelques traitements regroupés dans des fonctions longues

Important :
Ces défauts sont destinés à l'exercice d'analyse. Ne pas utiliser ce projet tel quel en production.
Après la première analyse, corriger les défauts puis relancer l'analyse pour comparer les résultats.
