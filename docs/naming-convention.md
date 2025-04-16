# Naming Convention Guide

Consistent naming conventions improve code readability, maintainability, and collaboration. This guide outlines the standard naming conventions used in the **Transcendence** project.

## General Naming Conventions

| Type          | Convention  | Example            |
|--------------|------------|--------------------|
| **Functions** | camelCase  | `fetchUserData()`  |
| **Variables** | camelCase  | `userProfile`      |
| **Constants** | PascalCase with underscores | `MAX_CONNECTIONS` |
| **Classes**   | PascalCase | `UserService`      |
| **Directories & Files** | kebab-case | `user-profile.ts` |

## Detailed Guidelines

### Functions
- Function names should be written in **camelCase**.
- They should start with a verb describing their action.
- Example:
  ```typescript
  function getUserData() {
      // Function logic
  }
  ```

### Variables
- Variables should use **camelCase**.
- Should be descriptive and concise.
- Example:
  ```typescript
  let userToken = "abc123";
  let isLoggedIn = false;
  ```

### Constants
- Constants should be written in **PascalCase with underscores**.
- They should be in all uppercase with words separated by underscores.
- Example:
  ```typescript
  const MAX_USERS_ALLOWED = 100;
  const API_BASE_URL = "https://api.example.com";
  ```

### Classes
- Class names should be in **PascalCase**.
- Should be descriptive of the entity they represent.
- Example:
  ```typescript
  class UserProfile {
      constructor(public name: string, public age: number) {}
  }
  ```

### Directories & Files
- Directories and file names should be in **kebab-case** (lowercase words separated by hyphens).
- Example:
  ```
  /services/user-auth.ts
  /components/nav-bar.tsx
  ```