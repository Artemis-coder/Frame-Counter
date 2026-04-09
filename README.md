# Layers Counter – V1 Release Notes & Description Plateforme

Un outil simple pour les designers qui ne veulent pas perdre de temps sur ce qui devrait être automatique. Scanne ton plan Figma, compte tes frames par page ou par section, et génère un résumé en un clic.

Voici les descriptions détaillées des éléments et fonctionnalités clés développés pour cette Version 1.0. Vous pouvez copier/coller ces sections directement sur la plateforme Figma Community pour présenter votre outil !

---

## 🎯 À propos du Plugin
**Layers Counter** est un outil de vélocité et d’audit pensé de A à Z pour les Product Designers. Que vous ayez besoin de compter le nombre exact d’écrans livrés dans une section, de quantifier la taille d'un sprint, ou simplement de documenter vos plans de travail, le plugin agit comme un automate chirurgical pour comptabiliser instantanément vos calques sans bloquer Figma.

## ✨ Fonctionnalités Principales (Features)

**🔢 Comptage Tolérant au Bruit (Haute Précision)**
Dans Figma, tout est une "Frame", d'un grand écran de mobile jusqu'à l'Auto-Layout d'un petit bouton. *Layers Counter* est doté d'une barricade sémantique : dès qu'il repère une Frame maîtresse (votre écran), il la valide et l'isole techniquement pour ignorer ce qu'elle contient. Il ne compte donc pas la structure Flexbox de vos boutons par erreur. Votre compte final est réel et correspond à 100% de ce que vous voyez !

**🎯 Focus Contextuel (Sélection Ciblé ou Page Entière)**
L'outil s'adapte à vos actions en direct :
- Rien n'est sélectionné ? Il analyse tous les plans de la page courante de haut en bas de votre document.
- Une Section ou un amas d'écrans est encadré par votre souris ? Il enferme son comptage *uniquement* autour de cette restriction.

**🚀 Moteur Haute-Performance Anti-Gel**
Sur des Design Systems contenant des dizaines de milliers d'instances d'icônes, les plugins basiques crashent le navigateur à cause du fameux "Maximum Call Stack". *Layers Counter* inclut une technologie de respiration asynchrone (*Yield Loops*) et un coupe-circuit. Il ne fera **jamais** freeze (bloquer) votre application Figma, même sur un fichier herculéen de deux millions de nœuds !

**⏱ Chronomètre & Interface Transparente (Real-Time Feedback)**
Un timer interactif de haute fidélité (`00:00`) est centré dans l'interface flottante de notre plugin. Finies les minutes d'attente à se demander si l'ordinateur fait son travail : vous observez la progression s'animer à la seconde, et l'interface HTML fluide se redimensionne elle-même pour épouser les messages textuels qu'elle vous envoie.

**🎉 Célébration Native (Wow Effect !)**
La réussite de la lecture totale des calques s'accompagne d'une pluie physique de confettis en surimpression qui reprennent les couleurs de lumière vives (Gradients Magenta et Orange). Un bonheur pour les yeux à chaque gros inventaire d'écran réussi.

**🖨 Génération Autonome de Status-Label**
L'outil ne vous livre pas simplement un nombre à l'oral. Il dessine, contruit et pose au cœur de votre projet Figma un `Component` encapsulé et stylisé (Auto-layout, fond grisé, typo importée) contenant le résultat : *"Frames on [Nom du plan]: X"*. Indispensable pour laisser des étiquettes d'attestation de version sur le Canvas.

---
*Conçu et optimisé pour la stabilité de production.*
