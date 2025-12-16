Copilot said: ### **Cahier des Charges : Application de
Cahier des Charges : Application de Détection du Regard pour Contrôle de Pages Web
Contexte du Projet
L'objectif est de développer une application fonctionnant dans les navigateurs web sur PC, qui utilise une caméra pour détecter les mouvements des yeux et propose les fonctionnalités suivantes :

Contrôle du défilement automatique d'une page web en fonction de la direction du regard.
Simulation des clics (gauche/droit) via les clignements des yeux.
Fournir une interface utilisateur simple pour démarrer/arrêter la détection et configurer les options essentielles.
Le projet vise à exploiter des solutions open-source et directement utilisables, sans nécessiter de matériel supplémentaire ou de dépendances complexes.

Objectifs Fonctionnels
Défilement Automatique :

La page web doit défiler automatiquement lorsque l'utilisateur regarde vers le haut ou vers le bas de l'écran.
La vitesse de défilement doit être constante et configurable.
Simulation de Clics :

Le clic gauche sera déclenché par un clignement de l'œil gauche.
Le clic droit sera déclenché par un clignement de l'œil droit.
Possibilité d’ajuster la "durée" minimale d’un clignement pour éviter les faux positifs.
Interface Utilisateur :

Boutons "Démarrer" et "Arrêter" pour activer/désactiver la détection de la caméra.
Zone d’affichage visible montrant l’état des actions (détection des mouvements, validation des clics, etc.).
Option supplémentaire pour activer/désactiver la simulation de clics.
Compatibilité et Accessibilité :

L'application doit fonctionner dans les navigateurs modernes (Chrome, Firefox, Edge).
Aucune installation de logiciel ou matériel tiers n’est nécessaire, à part une webcam fonctionnelle.
Fonctionnalités Étendues (Optionnelles)
Calibrage Automatique :

Au lancement, demander à l'utilisateur de regarder dans différentes zones de l’écran pour calibrer les points de référence (haut, bas, gauche, droite).
Détection Multizone :

Offrir un défilement latéral (gauche/droite) pour naviguer entre des onglets ou des sections web larges.
Personnalisation :

Permettre à l'utilisateur de configurer les commandes (ex. : clignement long pour "clic gauche", regarder à droite pour "scroll rapide", etc.).
Ajouter un curseur pour régler la sensibilité de la détection.
Mode "Pause" Automatique :

Si aucun mouvement des yeux ou clignement n'est détecté pendant un certain temps, arrêter temporairement les actions pour éviter les erreurs.
Mode Debug :

Afficher une visualisation des points détectés (mouvements des yeux et clignements) pour ajuster la précision.
Contraintes Techniques
Technologies Utilisées :

JavaScript, HTML, CSS pour l'ensemble des fonctionnalités.
Utilisation de bibliothèques open-source comme :
FaceMesh (MediaPipe) : Pour analyser les flux de caméra et détecter les points faciaux (œil gauche, œil droit).
TensorFlow.js : Pour le traitement d’intelligence artificielle lié au suivi et clignement des yeux.
Performance :

Le traitement doit être performant pour être exécuté en temps réel sans ralentissements significatifs sur les ordinateurs grand public.
Réduire l’utilisation du processeur et de la mémoire, particulièrement avec des flux vidéo.
Compatibilité :

Fonctionner proprement avec des navigateurs modernes.
Nécessite une webcam fonctionnelle.
Ergonomie :

Application minimaliste, facile à utiliser même pour des utilisateurs non techniques.
Aucune sauvegarde de données ou transmission de vidéos sur des serveurs (respect de la vie privée).
Architecture et Flots
Flux Principal :

Démarrage :
Activer la caméra via l’API getUserMedia et initialiser le modèle d’intelligence artificielle pour la détection des visages.
Décisions basées sur les données faciales :
Identifier si les yeux regardent vers une direction spécifique (haut, bas, gauche, droite).
Détecter des clignements pour simuler les clics.
Exécuter les actions :
Défilement de la page.
Déclenchement d'événements de clic.
Interface Utilisateur :

Zone de contrôle visible avec des états en temps réel ("Détection activée", "Clic gauche détecté", etc.).
Gestion de la Caméra :

Afficher un aperçu du flux vidéo réduit (en option pour la calibration visuelle).
Demander des permissions utilisateur pour accéder à la caméra, avec des notifications en cas de refus.
Visualisation des Points Faciaux (Mode Debug) :

Sur le flux vidéo, afficher des points indiquant la position des yeux, ainsi que la fermeture/détection des clignements.
Livrables du Projet
Prototype Fonctionnel :

Une application web pouvant être testée localement via un simple serveur (ou directement via un fichier HTML sur navigateur).
Structure des Fichiers :

index.html : Structure de l’interface utilisateur.
styles.css : Stylisation de l’interface.
script.js : Contient toute la logique JavaScript.
Dépendances (si nécessaires) :
Bibliothèques externes chargées via CDN (MediaPipe, TensorFlow.js).
Documentation :

Instructions pour lancer et utiliser l'application.
Explications sur les paramètres configurables.
Plan de Développement (Étapes)
Étape 1 : Mise en place de la caméra avec JavaScript

Capturer le flux vidéo à l’aide de getUserMedia et l’afficher dans une <video>.
Étape 2 : Intégration du modèle de détection faciale

Charger MediaPipe (ou TensorFlow.js).
Identifier les points clés des yeux (œil gauche, œil droit).
Étape 3 : Défilement basé sur le regard

Implémenter une fonction qui calcule la direction basée sur la position relative des yeux.
Déclencher le défilement avec window.scrollBy.
Étape 4 : Détection des clignements

Détecter les transitions entre "œil ouvert" et "œil fermé", et déclencher des clics.
Étape 5 : Création de l’interface utilisateur

Ajouter des boutons de contrôle (Démarrer/Arrêter, etc.).
Afficher des messages de statut.
Étape 6 : Test et optimisations

Tester sur plusieurs navigateurs et configurations matériels.
Optimiser la fluidité (éviter les surcharges CPU).
Contraintes Non Fonctionnelles
Performance : Temps réel (~30 fps pour la vidéo).
Vie privée : Aucun enregistrement ou envoi des flux vidéo.
Compatibilité : Fonctionner sans dépendances matérielles spécifiques.
