# tirelire_darna

## Technologies et Dépendances

Ce projet utilise une architecture micro-services avec les technologies suivantes :

### Backend (Node.js & Express)

Les services backend (`auth-service`, `darna-service`, `tirelire-service`, `api-gateway`) partagent un socle commun :
- **Express** : Framework web rapide et minimaliste pour Node.js.
- **Mongoose** : ODM (Object Data Modeling) pour MongoDB et Node.js.
- **Dotenv** : Module sans dépendance pour charger les variables d'environnement.
- **Cors** : Middleware pour activer le partage de ressources entre origines multiples (CORS).
- **Bcryptjs** : Bibliothèque pour hacher les mots de passe.
- **Jsonwebtoken** : Implémentation des JSON Web Tokens (JWT) pour l'authentification.
- **Express-validator** : Middleware de validation pour Express.
- **Nodemailer** : Module pour l'envoi d'emails.

#### Spécificités par service :

**Auth Service & API Gateway**
- **Passport** : Middleware d'authentification pour Node.js.
- **Passport-google-oauth20** : Stratégie d'authentification Google pour Passport.

**Darna Service**
- **Minio** : Client JavaScript pour le stockage d'objets compatible S3 (MinIO).
- **Socket.io** : Bibliothèque pour la communication temps réel bidirectionnelle.
- **Swagger-jsdoc** & **Swagger-ui-express** : Outils pour générer et afficher la documentation de l'API via Swagger.

**Tirelire Service**
- **Face-api.js** : API de reconnaissance faciale pour le navigateur et Node.js.
- **Multer** : Middleware pour gérer les données `multipart/form-data`, utilisé pour l'upload de fichiers.
- **Helmet** : Middleware de sécurité pour définir divers en-têtes HTTP.
- **Morgan** : Middleware de journalisation des requêtes HTTP.
- **Node-fetch** : Module léger pour effectuer des requêtes HTTP (implémentation de window.fetch pour Node.js).
- **MongoDB** : Driver officiel MongoDB pour Node.js.

### Frontend (React)

- **React** : Bibliothèque JavaScript pour créer des interfaces utilisateur.
- **Vite** : Outil de construction (build tool) rapide pour le développement web moderne.
- **Router-kit** : Solution de routage pour l'application.
