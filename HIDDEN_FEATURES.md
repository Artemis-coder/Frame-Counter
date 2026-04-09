# Fonctionnalités Masquées (Archive de Développement)

Ce fichier garde la trace des fonctionnalités avancées qui ont été développées, testées, puis temporairement mises en pause ou masquées pour stabiliser la version 1.0 (V1) du plugin. Nous pourrons y revenir plus tard pour des versions futures (V2).

## 1. Export d'Image et Miniature de Prévisualisation (`preview-image`)
- **Description :** Le plugin générait une miniature PNG (`exportAsync`) de la page ciblée (ou de sa première frame de manière itérative) et l'affichait dans une box Image HTML via un `Blob` URL avant le démarrage du comptage.
- **Raison du retrait :** La génération asynchrone d'une miniature sur des pages très lourdes contenant des milliers d'instances pouvait bloquer le moteur graphique principal de Figma et provoquer un écran gelé silencieux.
- **Code concerné :** Fonction asynchrone itérant `page.children` et renvoyant le resolve `exportAsync({ format: 'PNG' ... })`.

## 2. Sélection multi-pages dynamiques (`init-pages` & Menu déroulant)
- **Description :** Le plugin analysait `figma.root.children` à l'ouverture pour réunir la liste complète de l'arborescence du fichier Figma affichée dans un menu `<select>`. Lors du clic déclencheur, le système forçait le changement de vue avec `figma.currentPage = pageToCount`.
- **Raison du retrait :** Stratégie de débogage ("élagage par cause croisée"). Pour garantir que le plugin V1 reste extrêmement net, robuste et ne subisse aucune friction de compatibilité ou d'état fantôme sur des fichiers distants, nous limitons maintenant le plugin à s'exécuter à la demande instantanée dès le clic sur la **page courante immédiate** (`figma.currentPage`).
