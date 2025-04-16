# Git Commit Message Convention

A well-structured Git commit message helps improve collaboration, readability, and project history tracking. This convention follows a structured format to ensure clarity and consistency.

## Commit Message Format

Each commit message should be structured as follows:

```
<TYPE>: <SHORT DESCRIPTION>

<OPTIONAL LONGER DESCRIPTION>
```

### Types

- **feat**: A new feature implementation.
- **fix**: A bug fix or patch.
- **docs**: Documentation updates or improvements.
- **style**: Code formatting, whitespace, or stylistic changes (no logic changes).
- **refactor**: Code restructuring without modifying existing functionality.

### Examples

#### Adding a new feature
```
feat: Implement user authentication

Added JWT-based authentication to secure user logins and API access.
```

#### Fixing a bug
```
fix: Resolve crash on login page

Fixed an issue causing a crash when users entered invalid credentials.
```

#### Updating documentation
```
docs: Update README with installation steps

Added missing installation steps for setting up the project.
```

#### Code styling improvements
```
style: Fix indentation in app.js

Reformatted the codebase for better readability and consistency.
```

#### Refactoring code
```
refactor: Optimize database query performance

Rewrote SQL queries to improve execution time and reduce load on the database.
```