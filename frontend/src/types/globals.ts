import { CanvasComponent } from "../components/CanvasComponent.js";

export const BASE_PATH = window.location.origin + window.location.pathname.split("/").slice(0, -1).join("/");
export type staticRoute = "/login" | "/register" | "/login/2FA" | "/";
export type dynamicRoute = "/settings" | "/scores" | "/game" | "/profile";
export type Route = staticRoute | dynamicRoute;

export const routes: Record<staticRoute, string> = {
  "/": `${BASE_PATH}/views/home.html`,
  "/register": `${BASE_PATH}/views/signInForm.html`,
  "/login": `${BASE_PATH}/views/logInForm.html`,
  "/login/2FA": `${BASE_PATH}/views/logIn2FA.html`,
};

export const DEFAULTAVATAR = `${BASE_PATH}/img/defaultAvatar.png`;


// GAME //
declare global {
  interface Window {
      game: () => void;
  }
}

export let currentGameInstance: CanvasComponent | null = null;

export function setCurrentGameInstance(instance: CanvasComponent): void {
  currentGameInstance = instance;
}

export function getCurrentGameInstance(): CanvasComponent | null {
  return currentGameInstance;
}