# Api_Badminton
Projet API de Réservation de Terrains de Badminton

# Table des matières

- [Api\_Badminton](#api_badminton)
- [Table des matières](#table-des-matières)
  - [Lancer le Projet](#lancer-le-projet)
    - [Lancer la Base de Données](#lancer-la-base-de-données)
    - [Installer les Dépendances](#installer-les-dépendances)
    - [Lancer l'API](#lancer-lapi)
  - [Conception](#conception)
    - [Routes](#routes)
      - [Terrains](#terrains)
      - [Créneaux](#créneaux)
      - [Adhérents](#adhérents)
      - [Réservations](#réservations)
    - [Dictionnaire des Données](#dictionnaire-des-données)
  - [Tableau Récapitulatif des Ressources](#tableau-récapitulatif-des-ressources)
  - [Modèle Conceptuel des Données (MCD)](#modèle-conceptuel-des-données-mcd)
  - [Remarques](#remarques)
  - [Références](#références)
## Lancer le Projet

### Lancer la Base de Données

Installer [Xampp](https://www.apachefriends.org/fr/index.html), puis lancer **apache** et **mysql**

Créer une base sous le nom `reservation_badminton`,
Puis executer la requête de création de la table qui se trouve dans `init/bdd.sql`.

### Installer les Dépendances

Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

Ensuite, dans le répertoire Api_Badminton :

`cd .\api\`

Puis:

`npm install`

### Lancer l'API

Enfin, toujours depuis le dossier **api** :
`node .\app.js`

## Conception

### Routes

#### Terrains

- **Ressource :** `/terrains`
- **URL :** `/terrains`
- **Méthodes HTTP :** GET
- **Paramètres d'URL/Variations :** disponible = 1|0
- **Commentaires :** Liste des terrains

#### Créneaux

- **Ressource :** `/creneaux`
- **URL :** `/creneaux`
- **Méthodes HTTP :** GET
- **Paramètres d'URL/Variations :** disponible = 1|0, pseudo
- **Commentaires :** Liste des créneaux

#### Adhérents

- **Ressource :** `/adherents`
- **URL :** `/adherents`
- **Méthodes HTTP :** GET
- **Paramètres d'URL/Variations :** disponible = 1|0, pseudo
- **Commentaires :** Liste des adhérents

#### Réservations

- **Ressource :** `/login/reservations`
- **URL :** `/login/reservations`
- **Méthodes HTTP :** GET, POST, DELETE
- **Paramètres d'URL/Variations :** username,password
- **Commentaires :** Liste des réservations

- **Ressource :** `/terrains/:nom/creneaux/:id/reservation`
- **URL :** `/terrains/:nom/creneaux/:id/reservation/:idreservation`
- **Méthodes HTTP :**  POST, DELETE
- **Paramètres d'URL/Variations :** pseudo
- **Commentaires :** Ajout et suppression des réservations

### Dictionnaire des Données

| Ressource          | Code            | Type | Obligatoire ? | Taille | Commentaires                                   |
| ------------------ | --------------- | ---- | ------------- | ------ | ---------------------------------------------- |
| Terrains           | id_terrain      | N    | Oui           |        | Identifiant unique du terrain                  |
| Nom                | nom             | A    | Oui           | 1      | A, B, C, D                                     |
| Disponibilité      | disponible      | B    | Oui           |        | true, false                                    |

| Ressource          | Code            | Type | Obligatoire ? | Taille | Commentaires                                   |
| ------------------ | --------------- | ---- | ------------- | ------ | ---------------------------------------------- |
| Créneaux           | id_creneau      | N    | Oui           |        | Identifiant unique du créneau                  |
| Date de début      | debut           | D    | Oui           |        | Date de début(ex: 2023-12-25 20:00:00)         |
| Date de fin        | fin             | D    | Oui           |        | Date de fin(ex: 2023-12-25 20:45:00)           |
| Jour               | jour            | A    | Oui           |        | lundi, mardi, mercredi, jeudi, vendredi, samedi|
| Id du terrain      | id_terrain      | N    | Oui           |        | Identifiant unique du terrain                  |

| Ressource          | Code            | Type | Obligatoire ? | Taille | Commentaires                                   |
| ------------------ | --------------- | ---- | ------------- | ------ | ---------------------------------------------- |
| Adhérents          | id_adherent     | N    | Oui           |        | Identifiant unique de l'adhérent               |
| Pseudo             | pseudo          | A    | Oui           | 50     | Pseudo unique par adhérent                     |
| Role               | administrateur  | B    | Oui           |        | true, false                                    |

| Ressource          | Code            | Type | Obligatoire ? | Taille | Commentaires                                   |
| ------------------ | --------------- | ---- | ------------- | ------ | ---------------------------------------------- |
| Réservations       | id_reservation  | N    | Oui           |        | Identifiant unique de la réservation           |
| Id du créneau      | id_creneau      | N    | Oui           |        | Identifiant unique du créneau                  |
| Id de l'adhérent   | id_adherent     | N    | Oui           |        | Identifiant unique de l'adhérent               |



## Tableau Récapitulatif des Ressources

Nom de la ressource | URL | Méthodes HTTP | Paramètres d’URL/Variations | Commentaires |
------------------- | --- | ------------- | --------------------------- | ------------ |
Liste des Terrains | `/terrains` | GET | disponible, pseudo | Liste des terrains disponibles |
Détails d'un Terrain | `/terrains/{id-terrain}` | GET | pseudo | Informations détaillées sur un terrain spécifique |
Liste des Créneaux | `/terrains/{id-terrain}/creneaux` | GET | disponible, pseudo | Liste des créneaux pour un terrain spécifique
Détails d'un créneau | `/terrains/{id-terrain}/creneaux` | GET | pseudo | Informations détaillées sur un créneau spécifique
Faire une réservation | `/terrains/{id-terrain}/creneaux/{id_creneau}/reservation` | POST | pseudo | Effectuer une réservation pour un créneau et un terrain spécifique
Annuler une Réservation | `/terrains/{id-terrain}/creneaux/{id_creneau}/reservation/{id-reservation}` | DELETE | N/A | Annuler une réservation pour un créneau et un terrain spécifique

Nom de la ressource | URL | Méthodes HTTP | Paramètres d’URL/Variations | Commentaires |
------------------- | --- | ------------- | --------------------------- | ------------ |
Liste des Adhérents | `/adherents` | GET | pseudo, disponible | Liste des adhérents |
Détails d'un Adhérent | `/adherents/{id}` | GET | pseudo | Informations détaillées sur un adhérent |

Nom de la ressource | URL | Méthodes HTTP | Paramètres d’URL/Variations | Commentaires |
------------------- | --- | ------------- | --------------------------- | ------------ |
Liste des Créneaux | `/creneaux` | GET | pseudo, disponible | Liste des Créneaux |
Détails d'un Créneau | `/creneaux/{id}` | GET | pseudo | Informations détaillées sur un créneau |

Nom de la ressource | URL | Méthodes HTTP | Paramètres d’URL/Variations | Commentaires |
------------------- | --- | ------------- | --------------------------- | ------------ |
Connexion à l'espace admin | `/admin` | POST | username, password | Liste des Réservations |
Liste des Réservations | `/admin/reservations` | GET | username, password | Liste des Réservations |
Liste des Terrains | `/admin/terrains` | GET | username, password | Liste des Terrains |
Changer la disponibilité d'un Terrain | `/admin/terrains/{name}/disponible` | POST | username, password | Liste des Terrains |


## Modèle Conceptuel des Données (MCD)

![Modèle Conceptuel des Données (MCD)](MCD_BADMINTON.png)

## Remarques

- On ne peut pas ajouter de terrains, d'adhérents ou de créneaux.
- Effectuer une réservation ne supprime pas celle de la semaine d'avant puisqu'il n'y a pas de notion de semaines proprement établi.
- L'utilisation d'un JwT pourrait aider pour avoir une connexion plus securisée, mais par manque de temps je ne l'ai pas implémenté.
- Avec plus de temps et de pratique, il est possible de faire une API de gestion de réservations de terrains de badminton sécurisée et simple d'utilisation.

## Références

- Cours UML de Mr. Barry
- Cours REST de Mr. Schuhmacher