// localDb.ts — Simule une "base de données" locale avec localStorage

export interface User {
  password: string;
  userName: string;
  email: string;
  avatar: string;
  validation2FA: boolean;
  firstConnexion: boolean;
}

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUserEmail";

// Enregistre un nouvel utilisateur dans la "base"
export function saveUser(user: User): void {
  const users: User[] = getAllUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Récupère tous les utilisateurs
export function getAllUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

// Récupère un utilisateur par email
export function getUserByEmail(email: string): User | undefined {
  return getAllUsers().find(user => user.email === email);
}

// Met à jour les données d'un utilisateur
export function updateUser(updatedUser: User): void {
  const users = getAllUsers().map(user =>
    user.email === updatedUser.email ? updatedUser : user
  );
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Supprime un utilisateur
export function deleteUserByEmail(email: string): void {
  const users = getAllUsers().filter(user => user.email !== email);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Définit l'utilisateur actuellement connecté
export function setCurrentUser(email: string): void {
  localStorage.setItem(CURRENT_USER_KEY, email);
}

// Récupère l'utilisateur actuellement connecté
export function getCurrentUser(): User | null {
  const email = localStorage.getItem(CURRENT_USER_KEY);
  return email ? getUserByEmail(email) || null : null;
}

export function clearCurrentUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}