import {logout} from "./auth.js"
import { loadView } from "./handleRoutes.js";
import { updateUIBasedOnAuth } from "./auth.js";
import { loadTemplate } from "./utils/handleTemplate.js";
import { BASE_PATH, DEFAULTAVATAR } from "./types/globals.js";
import { getCurrentUser, updateUser, User } from "./localDb.js";

let isOpen = false;

export async function displaySettingsFirstConnexion(user: User) {
  const template = await loadTemplate(`${BASE_PATH}/views/templates/settings_first_connexion.tpl.html`);
  if (!template) {
    console.error("Template settingsFisrtConnexion not found");
    return;
  }
  const clone = template.content.cloneNode(true) as HTMLElement;
  const container = document.getElementById("settingsContainer");
  if (!container) {
    console.error("settingsContainer not found");
    return;
  }
  container.innerHTML = "";
  container.appendChild(clone);

  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const avatarInput = document.getElementById("avatar") as HTMLInputElement;

  const closeFirstConnexionForm = document.getElementById("closeFirstConnexionForm") as HTMLButtonElement;
  const settingsFirstConnexionForm = document.getElementById("settingsFirstConnexionForm") as HTMLFormElement;
  if (!settingsFirstConnexionForm) {
    console.error("settingsFirstConnexionForm not found");
    return;
  }
  settingsFirstConnexionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    if (username !== "") user.userName = username;
    if (avatarInput.files && avatarInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        user.avatar = reader.result as string;
        updateUser(user);
        resetContainerAndRenderUserWidget(container, user);
      };
      reader.readAsDataURL(avatarInput.files[0]);
    } else {
      updateUser(user);
      resetContainerAndRenderUserWidget(container, user);
    }
  });
  closeFirstConnexionForm.addEventListener("click", () => {
    resetContainerAndRenderUserWidget(container, user);
  });
}

export async function renderUserWidget(user: User) {
  const template = await loadTemplate(`${BASE_PATH}/views/templates/userWidgetMenu.tpl.html`);
  if (!template) {
    console.error("Template userWidgetMenu not found");
    return;
  }
  const clone = template.content.cloneNode(true) as HTMLElement;
  const userName = user.userName ? user.userName : user.email;

  try { 
    // clone.querySelector("#userName")!.textContent = userName;
    clone.querySelector(".avatar")!.setAttribute("src", user.avatar || DEFAULTAVATAR);
  } catch (error) {
    console.error("Error setting user name or avatar:", error);
  }
  
  const container = document.getElementById("userWidgetContainer");
  if (!container) {
    console.error("userWidgetContainer not found");
    return;
  }
  container.innerHTML = "";
  container.appendChild(clone);

  const dropDownBtn = document.querySelector("#userWidget button");
  const dropDownMenu = document.getElementById("dropDownMenu");
  if (dropDownBtn && dropDownMenu) {
      dropDownBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (isOpen)
              closeMenu();
          else
              openMenu();
      });

      document.addEventListener("click", (e) => {
        const dynamicMenu = document.getElementById("dropDownMenu");
        const dynamicBtn = document.querySelector("#userWidget button");

        if (isOpen && dynamicMenu && !dynamicMenu.contains(e.target as Node) && !dynamicBtn?.contains(e.target as Node)) {
          closeMenu();
        }
      })
  }

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
      logout();
  });

  document.getElementById("settingsBtn")?.addEventListener("click", () => {
    closeMenu();
    history.pushState({}, "", "/settings");
    loadView("/settings");
  });

  document.getElementById("scoresBtn")?.addEventListener("click", () => {
      alert("redirection to scores");
  });
}

function closeMenu() {
  const dropDownMenu = document.getElementById("dropDownMenu");
  const dropDownBtn = document.querySelector("#userWidget button");

  if (!dropDownMenu || !dropDownBtn) return;
  dropDownMenu.classList.remove("show");
  dropDownBtn.classList.remove("show");
  isOpen = false;
}

function openMenu() {
  const dropDownMenu = document.getElementById("dropDownMenu");
  const dropDownBtn = document.querySelector("#userWidget button");
  if (dropDownBtn && dropDownMenu) {
      dropDownMenu.classList.add("show");
      dropDownBtn.classList.add("show");
      isOpen = true;
  }
}

export async function setupSettingsForm() {
  const template = await loadTemplate(`${BASE_PATH}/views/templates/settingsUserWidgetMenu.tpl.html`);
  if (!template) {
    console.error("settingsUserWidgetMenu template not found");
    return;
  }
  const clone = template.content.cloneNode(true) as HTMLElement;
  
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  const userName = currentUser.userName ? currentUser.userName : currentUser.email;
  try { 
    clone.querySelector("#userName")!.textContent = userName;
    clone.querySelector(".avatar")!.setAttribute("src", currentUser.avatar);
  } catch (error) {
    console.error("Error setting user name or avatar:", error);
  }
  
  const container = document.getElementById("settingsContainer");
  if (!container) {
    console.error("Container not found");
    return;
  }
  container.innerHTML = "";
  container.appendChild(clone);
  

  const settingsForm = document.getElementById("settingsForm");
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const avatarInput = document.getElementById("avatar") as HTMLInputElement;

  settingsForm!.addEventListener("submit", (e) => {
    e.preventDefault();

    const enteredEmail = emailInput.value.trim();
    const storageEmail = currentUser.email;

    if (enteredEmail.toLowerCase() !== storageEmail.toLowerCase()) {
      emailInput.classList.add("border", "border-red-500", "focus:border-red-500");
      emailInput.value = "";
      emailInput.placeholder = "Email incorrect";
      emailInput.focus();
      return;
    }
    
    currentUser.userName = usernameInput.value.trim();
    if (avatarInput.files && avatarInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        currentUser.avatar = reader.result as string;
        updateUser(currentUser);
        resetContainerAndRenderUserWidget(container, currentUser);
      };
      reader.readAsDataURL(avatarInput.files[0]);
    } else {
      updateUser(currentUser);
      resetContainerAndRenderUserWidget(container, currentUser);
    }
  });
  
  
  emailInput.addEventListener("input", () => {
    emailInput.classList.remove("border-red-500", "focus:border-red-500");
    emailInput.placeholder = "";
  });
}

export function resetContainerAndRenderUserWidget(container: HTMLElement, user: User) {
  if (container)
    container.innerHTML = "";
  history.replaceState({}, "", "/");
  loadView("/");
  renderUserWidget(user!);
  updateUIBasedOnAuth();
}