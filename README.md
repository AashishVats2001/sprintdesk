# SprintDesk

SprintDesk is a React-based sprint and task management dashboard being developed as a frontend development assignment.

This README describes the **current implementation** of the project and provides instructions for running and reviewing the application.

---

## Tech Stack

The current implementation uses:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- Axios
- DummyJSON

---

# Getting Started

## 1. Clone the repository

```bash
git clone <repository-url>
cd sprintdesk
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the development server

```bash
npm run dev
```

Vite will provide a local URL, typically:

```text
http://localhost:5173
```

Open the URL in your browser.

---

# Authentication

The current application includes a login flow using the DummyJSON authentication API.

## Demo Credentials

Use the following DummyJSON credentials:

```text
Username: emilys
Password: emilyspass
```

## Login Flow

1. Open the application.
2. Navigate to `/login` if you are not already there.
3. Enter the demo credentials.
4. Click **Sign In**.
5. On successful authentication, the user is redirected to the protected application.

---

# Session Management

Authentication state is managed using Zustand.

The application handles:

- Current authenticated user
- Access token
- Refresh token
- Authentication status
- Session initialization
- Login
- Logout

The access token is maintained in application state.

The refresh token is persisted in `localStorage` so that the application can attempt to restore the user's session after a browser refresh.

The refresh token is stored under:

```text
sprintdesk_refresh_token
```

---

# Protected Routes

The application separates public and protected routes.

### Public Route

```text
/login
```

Authenticated users attempting to access the login page are redirected into the authenticated application.

### Protected Routes

The authenticated application routes are protected so that unauthenticated users cannot access them directly.

If there is no valid authentication state, the user is redirected to:

```text
/login
```

---

# Session Restoration

When the application starts, it checks whether a refresh token exists in local storage.

If one exists, the application attempts to restore the session before rendering the authenticated application.

The general flow is:

```text
Application Start
       ↓
Check refresh token
       ↓
Refresh session
       ↓
Restore authentication state
       ↓
Render application
```

If session restoration fails, the authentication state is cleared and the user is returned to the login flow.

---

# Axios Client

API communication is centralized through a shared Axios client.

The Axios request interceptor attaches the current access token to authenticated requests.

The authentication header follows the standard format:

```text
Authorization: Bearer <access-token>
```

The response interceptor also handles unauthorized responses and attempts to refresh the session when required.

This keeps authentication-related request handling outside individual UI components.

---

# Project Structure

The current project is organized approximately as follows:

```text
src/
│
├── api/
│   ├── authApi.ts
│   ├── client.ts
│   └── usersApi.ts
│
├── components/
│   └── layout/
│       ├── AppInitializer.tsx
│       ├── AppLayout.tsx
│       ├── ProtectedRoute.tsx
│       └── PublicRoute.tsx
│
├── pages/
│   ├── Dashboard.tsx
│   └── Login.tsx
│
├── stores/
│   └── authStore.ts
│
├── types/
│   └── auth.ts
│
└── App.tsx
```

The exact structure may evolve as additional assignment requirements are implemented.

---

# Recommended Review Flow

If reviewing the project for the first time, the recommended order is:

## 1. Install and run

```bash
npm install
npm run dev
```

Open the URL provided by Vite.

## 2. Test Login

Navigate to:

```text
/login
```

Use:

```text
Username: emilys
Password: emilyspass
```

After successful authentication, the application should enter the protected application.

## 3. Test Protected Routing

After logging in, try opening:

```text
/login
```

The authenticated user should not remain on the login page.

Then refresh the browser and verify that the session is restored.

## 4. Test Logout

Use the application's logout functionality.

After logging out, attempting to access a protected route should redirect back to:

```text
/login
```

## 5. Review Authentication Implementation

The main files to inspect are:

```text
src/stores/authStore.ts
src/api/authApi.ts
src/api/client.ts
src/components/layout/ProtectedRoute.tsx
src/components/layout/PublicRoute.tsx
src/components/layout/AppInitializer.tsx
```

These contain the main authentication, session restoration, routing, and Axios interceptor logic.

---

# Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

# Current Scope

The current implementation focuses on establishing the application's foundation and authentication architecture.

Implemented so far:

- React/Vite application setup
- TypeScript configuration
- Tailwind CSS
- Routing
- Login UI
- DummyJSON authentication
- Zustand authentication state
- Public/protected routing
- Session persistence
- Session restoration
- Axios API client
- Axios authentication interceptor
- Token refresh handling

Additional assignment requirements such as the Kanban board, TanStack Query integration, drag-and-drop, task management, analytics, and automated testing have not yet been included in this version.

---

# Demo Credentials

```text
Username: emilys
Password: emilyspass
```

These credentials are provided for testing the DummyJSON authentication API.

---

# Notes

This project was developed as a frontend development assignment.

The README intentionally documents the **current state of the implementation** rather than listing features that are planned but not yet implemented.
