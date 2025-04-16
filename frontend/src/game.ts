import { CanvasComponent } from "./components/CanvasComponent.js";
import { setCurrentGameInstance} from "./types/globals.js";
// // Make game function globally available
declare global {
  interface Window {
      game: () => void;
  }
}

export function game(): void {
  const appContainer = document.getElementById("app");
  if (appContainer) {
    // Clear the div and add the Babylon.js canvas
    appContainer.innerHTML = "";
    appContainer.className = "w-full h-full";
    const Instance = new CanvasComponent("app");
    setCurrentGameInstance(Instance);
  }  
}

// Assign to window object
(window as any).game = game;