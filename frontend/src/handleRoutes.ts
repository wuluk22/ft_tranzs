import { setupRegisterListeners, setupLoginListeners, validation2FA } from "./handleForm.js";
import { updateUIBasedOnAuth, isLoggedIn } from "./auth.js";
import {setupSettingsForm} from "./userWidget.js";
import { clearCurrentUser, deleteUserByEmail, getAllUsers } from "./localDb.js";
import { BASE_PATH, Route, staticRoute, dynamicRoute, routes, getCurrentGameInstance } from "./types/globals.js";
import { CanvasComponent } from "./components/CanvasComponent.js";
import { game } from "./game.js";
import { renderProfilPage } from "./profil_page.js";

const currentPath = window.location.pathname as staticRoute;

export async function loadView(path: Route) {
  const container = document.getElementById("FormContainer");
  const gameBtn = document.getElementById("gameBtn");
  const navBarPong = document.getElementById("navBarPong");
  const closePong = document.getElementById("closePong");
  
  // localStorage.clear();
  // sessionStorage.clear();
  // clearCurrentUser();
  console.log("ALL USERS: ", getAllUsers());
  
  if (container) container.innerHTML = "";

  if (path === "/profile") {
    if (!isLoggedIn()) {
      returnToIndex("You need to be logged to acces to profile");
      return;
    }
    renderProfilPage();
    updateUIBasedOnAuth();
  }

  if (path === "/settings") {
    if (!isLoggedIn()) {
      returnToIndex("You need to be logged to acces to settings");
      return;
    }
    await setupSettingsForm();
    updateUIBasedOnAuth();
    const loginModalSet = document.getElementById("loginModalSettings");
    if (loginModalSet) {
      loginModalSet.addEventListener("click", (e) => {
        if (e.target === loginModalSet) {
            loginModalSet.remove();
            history.replaceState({}, "", "/");
          }
      })
    }
    return;
  }
  if (path === "/game") {
    if (!isLoggedIn()) {
      returnToIndex("You need to be logged to play");
      return;
    }
    const gameInstance = new CanvasComponent("app");
    if (gameBtn && navBarPong && closePong) {
      gameBtn.addEventListener('click', (e) => {
        e.preventDefault();
        game();
        gameBtn.classList.add("hidden");
        navBarPong.classList.remove("hidden");
      });
      closePong.addEventListener('click', (e) => {
        e.preventDefault();
        gameBtn.classList.remove("hidden");
        navBarPong.classList.add("hidden");
        const instance = getCurrentGameInstance();
        if (instance) instance.destroy();
      });
    }
    updateUIBasedOnAuth();
    return;
  }

  const viewPath = routes[path as staticRoute];
  if (!viewPath) {
    console.error(`View not found for path: ${path}`);
    return;
  }
  try {
    const response = await fetch(viewPath);
    const html = await response.text();
    
	container!.innerHTML = html;
	setupNavLinks();
	if (path === "/login") setupLoginListeners();
	if (path === "/register") setupRegisterListeners();
	if (path === "/login/2FA") validation2FA();
	updateUIBasedOnAuth();
  } catch (err) {
    container!.innerHTML = "<p>View not found</p>";
  }
}

function navigateTo(path: Route) {
  history.pushState({}, "", path);
  loadView(path);
  updateUIBasedOnAuth();
}

function setupNavLinks() {
  const buttons = document.querySelectorAll("[data-route]:not([data-initialized])");
  buttons.forEach((btn) => {
	btn.setAttribute("data-initialized", "true");
    btn.addEventListener("click", () => {
      const route = (btn as HTMLButtonElement).dataset.route as Route;
      navigateTo(route);
    });
  });
}

function returnToIndex(message: string) {
  alert(message);
  history.replaceState({}, "", "/");
  loadView("/");
  updateUIBasedOnAuth();
}

window.addEventListener("popstate", () => {
  const path = window.location.pathname as Route;
  loadView(path);
});

document.addEventListener("DOMContentLoaded", () => {
  setupNavLinks();
  if(routes[currentPath])
    loadView(currentPath);
  else {
    history.replaceState({}, "", "/");
    loadView("/");
  }
});
