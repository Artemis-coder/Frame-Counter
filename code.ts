"use strict";

figma.showUI(__html__, { width: 320, height: 260, themeColors: true });

let isCancelled = false;

figma.ui.onmessage = async (msg: { type: string, height?: number }) => {
  if (msg.type === 'resize' && msg.height) {
    figma.ui.resize(320, msg.height);
    return;
  }

  if (msg.type === 'cancel-count') {
    isCancelled = true;
    return;
  }

  if (msg.type === 'count-layers') {
    isCancelled = false;

    try {
      figma.ui.postMessage({ type: 'debug', msg: 'Analyse en cours...' });

      let layersCount = 0;
      
      // Feature: if user has a specific layer selection, count inside it, otherwise count the whole page!
      let startingNodes: readonly SceneNode[] = figma.currentPage.selection;
      if (startingNodes.length === 0) {
        startingNodes = figma.currentPage.children;
      }
      
      const stack: any[] = [...startingNodes];
      let guard = 0;
      
      while (stack.length > 0) {
        guard++;
        
        // Yield to the event loop every 2000 nodes to update the UI Timer and catch Cancellation clicks
        if (guard % 2000 === 0) {
           await new Promise(resolve => setTimeout(resolve, 1));
           if (isCancelled) {
               return; // Exit completely, UI has already been reset by stopCounting()
           }
        }

        if (guard > 2000000) {
           throw new Error("L'arborescence est trop massive pour être comptée.");
        }

        const node = stack.pop();

        // 1. Si on trouve une "FRAME" de premier niveau, on la compte.
        if (node.type === 'FRAME' && node.visible !== false) {
           layersCount++;
           // CRITIQUE : Une fois "l'écran" trouvé, on ne rentre PAS à l'intérieur !
           // Cela empêche de compter les dizaines de sous-frames (boutons, auto-layouts)
           continue;
        }

        // 2. On explore uniquement les conteneurs (Sections, Groupes) pour trouver des Frames.
        // On exclut les Composants et les Instances pour ne pas compter leurs calques internes.
        if (node && 'children' in node && node.type !== 'INSTANCE' && node.type !== 'COMPONENT' && node.type !== 'COMPONENT_SET') {
          for (const child of node.children) {
            if (child.visible !== false) {
              stack.push(child);
            }
          }
        }
      }

      if (isCancelled) return;
      figma.ui.postMessage({ type: 'debug', msg: 'Chargement des polices de texte...' });

      try {
         await figma.loadFontAsync({ family: "Inter", style: "Regular" });
         await figma.loadFontAsync({ family: "Inter", style: "Medium" });
      } catch(e) { }

      if (isCancelled) return;
      figma.ui.postMessage({ type: 'debug', msg: 'Génération de la pastille...' });

      const component = figma.createComponent();
      component.name = "Layers Count Result";
      component.layoutMode = "HORIZONTAL";
      component.paddingLeft = 24;
      component.paddingRight = 24;
      component.paddingTop = 16;
      component.paddingBottom = 16;
      component.primaryAxisSizingMode = "AUTO";
      component.counterAxisSizingMode = "AUTO";
      component.cornerRadius = 8;
      component.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.96 } }];
      component.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
      component.strokeWeight = 1;

      const text = figma.createText();
      text.fontName = { family: "Inter", style: "Medium" };
      text.characters = `Frames on "${figma.currentPage.name}": ${layersCount}`;
      text.fontSize = 20;
      text.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 } }];

      component.appendChild(text);
      component.x = figma.viewport.center.x - component.width / 2;
      component.y = figma.viewport.center.y - component.height / 2;

      figma.currentPage.appendChild(component);
      figma.currentPage.selection = [component];
      figma.viewport.scrollAndZoomIntoView([component]);

      figma.notify(`Counted ${layersCount} frames! Component created.`);
      figma.ui.postMessage({ type: 'count-finished', count: layersCount });
    } catch (error: any) {
      figma.notify(`Error counting frames: ${error.message || error}`);
      figma.ui.postMessage({ type: 'count-error', error: error.message || String(error) });
    }
  }

  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
