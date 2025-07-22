# CoBe Planification

***

**CoBe Planification** est une application de gestion de planning dédiée à l’organisation des livraisons en camion benne. 
Elle couvre tout le processus : de l’encodage des commandes à la planification des livraisons et l’envoi du travail aux transporteurs.

## 🚚 Objectif

Ce logiciel vise à simplifier la gestion du planning des livraisons pour les affréteurs en permettant de :
- Centraliser les commandes.
- Planifier efficacement les livraisons.
- Communiquer le travail aux transporteurs.

## ✨ Fonctionnalités

- Encodage des commandes clients.
- Gestion des transporteurs.
- Envoi des plannings aux transporteurs.
- Visualisation des plannings (calendrier, liste, etc.).
- Historique et suivi des livraisons.

## 🛠️ Technologies utilisées

- **Conteneurisation** : Docker
- **Backend** : Spring Boot (API REST)
- **Frontend** : Angular (Standalone Components)
- **Base de données** : PostgreSQL
- **Cache API** : Redis
- **Versionnalisation DB** : Liquibase (SQL)
- **Documentation API** : Swagger
- **Lucide** : Icons
  Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.

## 🚀 Installation

### Production
**A la racine :** docker compose up --build

### Developpement 
**A la racine :** 
- Démarrer la base de données conteneurisée (port 5432)
- Démarrer le back-end (port 8080)
- Démarrer le front-end (port 4200)