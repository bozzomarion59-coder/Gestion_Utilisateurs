# Projet Gestion des Utilisateurs :

## Description :
Application web full-stack de gestion des utilisateurs. Elle permet de créer, modifier, supprimer et afficher des utilisateurs via une interface moderne.  
Le backend est construit avec Node.js + Express + MySQL, et le frontend avec React, Bootstrap et Axios. 
Le mot de passe est haché avec bcrypt, les variables sensibles sont gérées via dotenv, et le stockage local est partiellement assuré par le localStorage.

🧰 Technologies utilisées :

### Backend
- Node.js  
- Express  
- MySQL / mysql2  
- bcrypt (hachage des mots de passe)  
- cors (pour les requêtes cross-origin)  
- dotenv (gestion des variables d’environnement)  
- nodemon (pour le rechargement automatique en mode dev)  

### Frontend
- React  
- Axios (pour les requêtes HTTP vers le backend)  
- Bootstrap (pour le style et la mise en page responsive)  
- localStorage (gestion locale des données utilisateur)  

## Structure de la base de données
- Base de données : `GestionUtilisateurs`  
- Table : `users`
- CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(100),
  prenom VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  mot_de_passe VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user'
  );

⚙️ Installation et exécution

### 1. Cloner le dépôt
git clone https://github.com/bozzomarion59-coder/Gestion_Utilisateurs.git
cd Gestion_Utilisateurs

### 2. Configuration BackEnd 
cd le_dossier_ou_se_trouve_ton_back
npm install

### Crée un fichier .env à la racine du dossier backend avec les variables suivantes
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ton_mot_de_passe
DB_NAME=GestionUtilisateurs
PORT=5000

### Lancer le serveur:
npm start ou nodemon selon votre configuration

### 3. Configuration du FrontEnd 
cd le_dossier_ou_se_trouve_votre_front
npm install
npm run dev ou npm start selon votre setup

✅ Fonctionnalités principales :
- Création d’un utilisateur via formulaire
- Affichage de la liste des utilisateurs
- Modification et suppression d’un utilisateur
- Mot de passe haché (sécurité)
- Stockage local via localStorage
- Interface responsive avec Bootstrap
- Communication backend et frontend via API REST (Axios)

🔁 Requêtes API (POSTMAN) :
- POST	/api/users/Connexion	(Connexion)
- POST	/api/users	(Création utilisateur)
- GET	/api/users	(Liste des utilisateurs (admin))
- PUT	/api/users/:id	(Modifier un utilisateur)
- DELETE	/api/users/:id	(Supprimer un utilisateur)

👤 Auteur
Marion Bozzo





