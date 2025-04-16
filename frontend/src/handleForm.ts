import { loadView } from "./handleRoutes.js"
import { renderUserWidget, displaySettingsFirstConnexion } from "./userWidget.js"
import { DEFAULTAVATAR, Route } from "./types/globals.js";
import { updateUIBasedOnAuth } from "./auth.js";
import { getUserByEmail, saveUser, setCurrentUser } from "./localDb.js";

export function setupRegisterListeners(): void{
    const signInForm = document.getElementById("signInForm") as HTMLFormElement;
    const closeform = document.getElementById("closeForm") as HTMLButtonElement;
    
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const validation2FA = document.getElementById("validation2FA") as HTMLInputElement;

    signInForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const validation = validation2FA.checked;

        const User = {
            userName: username,
            email: email,
            password: password,
            avatar: DEFAULTAVATAR,
			validation2FA: validation,
            firstConnexion: true,
        };
        const foundUser = await getUserByEmail(email);
        if (foundUser !== undefined) {
            emailInput.classList.add("border-red-500");
            emailInput.value = "";
            emailInput.placeholder = "Email already used";
            emailInput.focus();
        }
        else {
            if (username === "" || email === "" || password === "") {
                if (username === "") {
                    usernameInput.value = "";
                    usernameInput.placeholder = "Firstname required";
                    usernameInput.focus();
                }
                if (email === "") {
                    emailInput.value = "";
                    emailInput.placeholder = "Email required";
                    emailInput.focus();
                }
                if (password === "") {
                    passwordInput.value = "";
                    passwordInput.placeholder = "Password required";
                    passwordInput.focus();
                }
            } else {
                await saveUser(User);
                if (validation === true) {
                    history.replaceState({}, "", "/login/2FA");
                    loadView("/login/2FA");
                }
                else {
                    history.replaceState({}, "", "/");
                    loadView("/");
                }
				updateUIBasedOnAuth();
				return;
            }
        }
    })
    closeform.addEventListener("click", () => {
        signInForm.classList.add("hidden");
        history.replaceState({}, "", "/");
    });
}

export function validation2FA() {
    const container2FA = document.getElementById("2FAForm") as HTMLFormElement;
    const closeForm = document.getElementById("close2FAform") as HTMLButtonElement;

    // WHAT HAPPEND IF  THE USER CLICK ON RESEND EMAIL ??

    closeForm.addEventListener("click", () => {
        container2FA.classList.add("hidden");
        history.replaceState({}, "", "/");
    })
}

export function removeErrorStyleLogIn(input: HTMLInputElement, style: string): void{
    input.classList.remove(style);
}

export function setupLoginListeners(): void{
    const loginForm = document.getElementById("logInForm") as HTMLFormElement;
    const loginModal = document.getElementById("loginModal") as HTMLDivElement;
    
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
	
    emailInput.addEventListener("click", () => removeErrorStyleLogIn(emailInput, "border-red-500"));
    passwordInput.addEventListener("click", () => removeErrorStyleLogIn(passwordInput, "border-red-500"));
	
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        const foundUser = await getUserByEmail(email);
        if (foundUser?.email === email && foundUser?.password === password) {
            history.replaceState({}, "", "/");
            loadView("/");
            renderUserWidget(foundUser);
            if (foundUser.firstConnexion === true) {
                await displaySettingsFirstConnexion(foundUser);
                foundUser.firstConnexion = false;
            }
            setCurrentUser(email);
            return;
        }
        else {
            alert("User doesn't exist, please register first");
            // add a link to register
            emailInput.value = "";
        }
    })
    loginModal.addEventListener("click", (e) => {
        if (e.target === loginModal) {
            loginModal.remove();
            history.replaceState({}, "", "/");
        }
    })
}