# 🚀 Auth App

A modern authentication web app built with **React** and **Chakra UI**, featuring multiple login/registration flows like email PIN verification, anonymous access, and Google OAuth. This project showcases clean UI/UX, scalable state management, and robust testing.

---

## ✨ Features

- 📧 **Email Registration** — Users sign up via email and verify with a 6-digit PIN.
- 🔢 **PIN Code Login** — Secure login with a PIN sent to the registered email.
- 👤 **Anonymous Access** — Instant access via a 16-digit anonymous code.
- 🔐 **Google OAuth** — Authenticate using Google accounts seamlessly.
- 📦 **Centralized State Management** — Powered by Zustand.
- 📝 **Form Handling** — Built with React Hook Form + Zod for validation.
- 🔄 **API Interaction** — Managed with TanStack Query (`react-query`).
- 🧪 **Mocking Layer** — API mocking via MSW for reliable development/testing.
- 🧬 **API Client Generation** — Uses Orval and OpenAPI for type-safe clients and mocks.
- ✅ **Comprehensive Testing** — Unit (Vitest), integration, and end-to-end (Playwright) tests.

---

## 🛠️ Tech Stack

### 🧱 Frontend Framework

- **React 19** – Core UI library
- **Vite** – Lightning-fast dev/build tooling

### 🎨 Styling & UI

- **Chakra UI** – Accessible, themeable component library
- **Emotion** – Styling engine used under Chakra
- **Framer Motion** – Smooth, powerful animations

### ⚙️ State & Forms

- **Zustand** – Lightweight global state management
- **React Hook Form** – Minimal, performant forms
- **Zod** – Type-safe schema validation

### 🌐 API & Data

- **Axios** – Promise-based HTTP client
- **TanStack Query** – Server state management
- **Orval** – OpenAPI-based API client and mock generator

### 🧭 Routing

- **React Router** – Declarative page routing

### 🧰 Utilities

- **@faker-js/faker** – Mock data for tests
- **react-error-boundary** – UI fallback on errors

### 🧪 Testing

- **TypeScript** – Static typing
- **Vitest** – Unit testing framework
- **React Testing Library** – User-centric component testing
- **MSW** – API mocking for tests/dev
- **Playwright** – End-to-end testing
- **Husky** – Git hooks for formatting/linting
- **@testing-library/jest-dom** – Custom DOM assertions

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js **v18+**
- npm / yarn / pnpm

## 📂 Project Structure

```text
.
├── src/
│   ├── api/            # Orval-generated API clients
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom business logic hooks
│   ├── lib/            # Utilities/helpers
│   ├── mocks/          # MSW setup and handlers
│   ├── pages/          # Page-level components
│   ├── providers/      # App-wide providers (Query, Auth, etc.)
│   ├── router/         # Routes and navigation
│   ├── store/          # Zustand state management
│   └── main.tsx        # App entry point
├── public/             # Static assets (e.g., MSW service worker)
├── e2e-tests/          # Playwright tests
├── openapi.yml         # OpenAPI spec for Orval
├── orval.config.ts     # Orval configuration
├── playwright.config.ts# Playwright configuration
├── vite.config.ts      # Vite build setup
└── README.md           # This documentation
```

### 📦 Installation

```bash
git clone [your-repo-url]
cd app

# Install dependencies
npm install     # or yarn or pnpm

# Install Playwright browsers
npx playwright install

# Generate API clients and mocks
npm run generate

# Prepare Git hooks (optional)
npm run prepare


