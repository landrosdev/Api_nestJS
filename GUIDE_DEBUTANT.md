# Guide Débutant : Comprendre votre API NestJS & Prisma

Ce guide explique les fichiers clés de votre projet et comment ils interagissent. C'est parfait pour prendre des notes.

## 1. La Vue d'Ensemble : Comment ça marche ?

NestJS fonctionne comme un jeu de LEGO (Modules). Tout part d'un fichier principal qui assemble les pièces.

**Le Flux d'une requête :**
1.  L'utilisateur appelle l'API (ex: `GET /tasks`).
2.  **Controller** : Reçoit la demande.
3.  **Service** : Contient la logique (ex: dire à la base de données de chercher).
4.  **PrismaService** : C'est le pont vers la base de données.
5.  **Base de Données** : Renvoie les données.

---

## 2. Analyse des Fichiers Clés

### A. Le Point de Départ : `src/main.ts`
C'est la porte d'entrée de l'application.

*   **Rôle** : Il démarre le serveur.
*   **Ce qu'il fait** :
    *   `NestFactory.create(AppModule)` : Il crée l'application en utilisant le module principal.
    *   `config = new DocumentBuilder()...` : Il génère la documentation Swagger (visible sur `/api`).
    *   `app.listen(2001)` : Il ouvre le port 2001 pour écouter les requêtes.

### B. Le Quartier Général : `src/app.module.ts`
C'est le chef d'orchestre.

*   **Rôle** : Il organise l'application.
*   **Code Clé** : `imports: [PrismaModule, TasksModule]`
*   **Explication** : Il indique à NestJS "J'ai besoin du module de base de données (Prisma) et du module des Tâches (Tasks) pour fonctionner". Si un module n'est pas importé ici (ou dans un sous-module), NestJS ne le connaît pas.

### C. La Carte de la Base de Données : `prisma/schema.prisma`
C'est le plan d'architecte de vos données.

*   **Rôle** : Définit la structure de vos tables et la connexion.
*   **Détails** :
    *   `datasource db { ... }` : Dit "Je me connecte à PostgreSQL via l'URL dans `.env`".
    *   `model Task { ... }` : Définit la table `Task` avec ses colonnes (`id`, `title`, etc.).
*   **Important** : Chaque fois que vous touchez ce fichier, vous devez lancer `npx prisma generate` pour mettre à jour le code qui permet de l'utiliser.

### D. Le Connecteur : `src/database/db.client.ts` (PrismaService)
C'est l'outil que nous avons corrigé.

*   **Rôle** : C'est le "téléphone" qui permet à NestJS de parler à la base de données.
*   **Pourquoi c'est spécial ?** :
    *   Il utilise `@Injectable()` : Cela permet à NestJS de le donner automatiquement (Injection de Dépendance) à n'importe quel fichier qui en a besoin, sans faire `new PrismaClient()` partout.
    *   Il `extends PrismaClient` : Il hérite de tous les pouvoirs de Prisma (chercher, créer, supprimer).

---

## 3. Petit Exercice pour Comprendre

Regardez dans `src/app.module.ts`. Vous voyez `imports: [PrismaModule]`.
Cela signifie que `AppModule` charge `PrismaModule`.
`PrismaModule` fournit probablement `PrismaService` (`db.client.ts`).
Donc, toute l'application peut maintenant utiliser la base de données !

## Commandes Utiles à Noter

*   `npm run start:dev` : Lance le serveur en mode développement (redémarre si vous changez un fichier).
*   `npx prisma generate` : À lancer après avoir modifié `schema.prisma`.
*   `npx prisma db push` : Pour envoyer les modifications de `schema.prisma` vers la vraie base de données (créer les tables).

---
*Généré par votre assistant IA pour vous aider à apprendre NestJS.*
