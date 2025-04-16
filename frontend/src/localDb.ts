// localDb.ts — Simule une "base de données" locale avec localStorage

export interface User {
  password: string;
  userName: string;
  email: string;
  avatar: string;
  validation2FA: boolean;
  firstConnexion: boolean;
}

const API_BASE_URL = "http://localhost:3000";
const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUserEmail";

export async function saveUser(user: User): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error(`Failed to register user: ${await response.text()}`);
  }
}

// Fetches all users from the backend
export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${await response.text()}`);
  }
  return response.json();
}

// Fetches a single user by email from the backend
export async function getUserByEmail(email: string): Promise<User | undefined> {
  const response = await fetch(`${API_BASE_URL}/users/${email}`, {
    method: "GET",
  });
  if (!response.ok) {
    if (response.status === 404) {
      return undefined; // User not found
    }
    throw new Error(`Failed to fetch user: ${await response.text()}`);
  }
  return response.json();
}

// Updates user data by sending a PUT request to the backend
export async function updateUser(updatedUser: User): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${updatedUser.email}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  if (!response.ok) {
    throw new Error(`Failed to update user: ${await response.text()}`);
  }
}

// Deletes a user by sending a DELETE request to the backend
export async function deleteUserByEmail(email: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${email}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete user: ${await response.text()}`);
  }
}

// Sets the current user by saving their email to localStorage (optional)
export function setCurrentUser(email: string): void {
  localStorage.setItem("currentUserEmail", email);
}

// Fetches the current user by retrieving their email from localStorage and then calling the backend
export async function getCurrentUser(): Promise<User | null> {
  const email = localStorage.getItem("currentUserEmail");
  if (!email) {
    return null;
  }
  const user = await getUserByEmail(email);
  return user || null;
}

// Clears the current user's email from localStorage
export function clearCurrentUser(): void {
  localStorage.removeItem("currentUserEmail");
}