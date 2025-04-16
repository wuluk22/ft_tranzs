# File Structure Documentation

This document provides an organized overview of the file structure for the **Transcendence** project.

## Project Root

The root directory contains the main components of the project, including backend, frontend, documentation, and deployment configurations.

```
/transcendence
├── /backend            # Backend codebase (Fastify-based API)
├── /frontend           # Frontend codebase (TypeScript and Tailwind CSS)
├── /docs               # Project documentation
├── docker-compose.yml  # Docker Compose configuration for managing containers
└── README.md           # Project overview and setup instructions
```

## Backend

The backend directory houses the server-side logic, including API endpoints, database models, and utility functions.

```
/backend
├── /config             # Configuration files (environment variables, database setup)
├── /controllers        # API controllers handling client requests
├── /models             # Database models and schema definitions
├── /routes             # API route definitions
├── /services           # Business logic and utility services
├── /utils              # Helper functions and validation logic
├── app.js              # Main application file configuring Fastify
├── server.js           # Entry point to start the backend server
├── package.json        # Backend dependencies and scripts
└── Dockerfile          # Docker configuration for the backend service
```

## Frontend

The frontend directory contains the client-side application, built with TypeScript, and Tailwind CSS.

```
/frontend
├── /public             # Static files, including the main HTML file
├── /src                # Source code for the application
│   ├── /components     # Reusable UI components
│   ├── /services       # API interaction and authentication services
│   ├── /styles         # CSS and Tailwind stylesheets
│   ├── App.tsx         # Main application component
│   └── index.tsx       # Entry point for rendering the app
├── tsconfig.json       # TypeScript configuration file
├── package.json        # Frontend dependencies and scripts
└── Dockerfile          # Docker configuration for the frontend service
```