# README

## Commandes utiles

- **Installer les dépendances pour le Backend :**
- Express – serveur et routage
  ```bash
  npm install express
  ```
- Mongoose – gestion MongoDB avec des modèles
  ```bash
  npm install mongoose
  ```
- Nodemailer – envoi d’e-mails
  ```bash
  npm install nodemailer
  ```
- dotenv – variables d’environnement (ex: mots de passe dans .env)
  ```bash
  npm install dotenv
  ```
- CORS – autoriser les requêtes entre domaines (ex: frontend → backend)
  ```bash
  npm install cors
  ```
- bcrypt – hachage des mots de passe
  ```bash
  npm install bcrypt
  ```
- jsonwebtoken – création et vérification des tokens JWT
  ```bash
  npm install jsonwebtoken
  ```
- express-session – gestion de sessions via cookies
  ```bash
  npm install express-session
  ```
- mongodb – driver natif MongoDB
  ```bash
  npm install mongodb
  ```

- **Si problème lors de l'installation sous PowerShell :**
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```

- **Lancer le serveur :**
  ```bash
  node config/node.js
  ```

- **Installer le rechargement automatique (nodemon) :**
  ```bash
  npm install -g nodemon
  ```

- **Lancer avec rechargement automatique :**
  ```bash
  nodemon config/node.js
  ```

## Endpoints API

- **GET /keyboard**  
  Récupère tous les claviers.

- **GET /keyboard/:id**  
  Récupère un clavier par son id.

- **POST /keyboard**  
  Ajoute un clavier.  
  Exemple de body :
  ```json
  {
    "name": "Epomaker TH80",
    "marque": "Epomaker",
    "type": "Custom",
    "switches": "Gateron Pro Yellow",
    "layout": "75%",
    "wireless": true,
    "rgb": true,
    "hot_swappable": true,
    "price": 99.99,
    "stock": 15
  }
  ```

- **PATCH /keyboard/:id**  
  Modifie un ou plusieurs champs d’un clavier existant.  
  Exemple :
  ```json
  {
    "price": 10.0
  }
  ```

- **DELETE /keyboard/:id**  
  Supprime un clavier par son id.

- **GET /marques**  
  Récupère la liste des marques disponibles.

- **POST /order**  
  Passe une commande.  
  Exemple de body :
  ```json
  {
    "items": [
      { "id": 10, "quantity": 2 },
      { "id": 12, "quantity": 1 }
    ]
  }
  ```
  La commande est enregistrée dans `ressources/orders.json` avec le détail, le prix total, la date et l’état.

---

- **POST /register**  
  Ajoute un utilisateur.

- **POST /login**  
  Connexion d'un utilisateur.

- **POST /forgot-password**  
  Demander la réinitialisation du mot de passe.

- **POST /reset-password**  
   Réinitialiser le mot de passe.

- **GET /profil**  
  Obtenir les informations du profil.

- **PUT /profil**
  Mettre à jour les informations du profil.



