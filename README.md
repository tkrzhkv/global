🚀 Auth App
This project is a modern web application demonstrating various user authentication and registration flows. It features email-based registration with PIN verification, anonymous login via a generated code, and integration with Google OAuth. Built with React and Chakra UI, it emphasizes a clean user interface and robust state management.

✨ Features
Email Registration: Users can register using their email, triggering a PIN verification process.
PIN Code Login: Secure login using a 6-digit PIN sent to the registered email.
Anonymous Registration/Login: Get a unique 16-digit access code for anonymous login, ideal for quick access without personal information.
Google OAuth Integration: Seamless registration and login using Google accounts.
Centralized State Management: Utilizes Zustand for efficient and scalable application state.
Form Management: Leverages React Hook Form with Zod for robust form validation and submission handling.
API Interaction: Integrates react-query (TanStack Query) for declarative and efficient data fetching and mutation.
Mock Service Worker (MSW): Provides a powerful mocking layer for API interactions, enabling reliable frontend development and testing without a live backend.
Code Generation for API Client: Uses Orval to generate API clients and MSW handlers directly from an OpenAPI specification, ensuring type safety and consistency.
Comprehensive Testing: Includes unit tests with Vitest and React Testing Library, and end-to-end tests with Playwright.
🛠️ Technologies & Tools
This project is built using a modern React stack, focusing on developer experience and performance.

Frontend Framework:
React 19: For building dynamic user interfaces.
Vite: A fast and lightweight build tool for modern web projects.
Styling & UI Components:
Chakra UI: A simple, modular, and accessible component library for React.
Emotion (@emotion/react, @emotion/styled): For powerful styling capabilities under the hood of Chakra UI.
Framer Motion: For fluid and engaging animations.
State Management:
Zustand: A small, fast, and scalable state-management solution.
Form Handling & Validation:
React Hook Form: For flexible and performant form management.
Zod: A TypeScript-first schema declaration and validation library, integrated with React Hook Form for robust input validation.
API Client & Data Fetching:
Axios: A promise-based HTTP client for making API requests.
TanStack Query (@tanstack/react-query): For managing server state, caching, and synchronizing data with the UI.
Orval: Code generator that creates TypeScript clients and MSW handlers from an OpenAPI specification (openapi.yml).
Routing:
React Router: For declarative routing within the application.
Utilities:
@faker-js/faker: Used for generating realistic mock data in tests and MSW handlers.
react-error-boundary: For gracefully handling UI errors.
Development & Testing Tools:
TypeScript: For type-safe development.
Biome: A fast formatter and linter for code quality.
Vitest: A blazing fast unit test framework powered by Vite.
React Testing Library: For testing React components in a user-centric way.
MSW (Mock Service Worker): For API mocking in development and testing environments.
Playwright: An end-to-end testing framework for reliable browser automation.
Husky: For Git hooks (e.g., running linting/formatting pre-commit).
@testing-library/jest-dom: Custom matchers for better DOM assertions in tests.
🚀 Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
Node.js (v18 or higher recommended)
npm (or yarn/pnpm)
Installation
Clone the repository:
Bash

git clone [your-repo-url]
cd app
Install dependencies:
Bash

npm install
# or yarn install
# or pnpm install
Install Playwright browsers:
Bash

npx playwright install
Generate API clients and mocks: This step uses Orval to create the necessary API types, hooks (for react-query), and MSW handlers from your openapi.yml.
Bash

npm run generate
Prepare Git hooks (optional but recommended):
Bash

npm run prepare
Running the Application
Start the development server:
Bash

npm run dev
The application will typically be accessible at http://localhost:5173/.
🧪 Testing
The project includes unit tests with Vitest and end-to-end tests with Playwright.

Unit Tests (Vitest & React Testing Library)
Run all unit tests:
Bash

npm test
Run tests with coverage report:
Bash

npm run test:coverage
View HTML coverage report:
Bash

npm run test:coverage:view
End-to-End Tests (Playwright)
Prerequisites: Ensure your development server is running (npm run dev).
Run all E2E tests:
Bash

npm run e2e
View E2E test report (after running tests):
Bash

npm run e2e:view
📏 Code Quality
The project uses Biome for consistent code formatting and linting.

Check code quality:
Bash

npm run check
Fix formatting and linting issues:
Bash

npm run check:fix
📦 Project Structure (High-Level)
.
├── src/
│   ├── api/                  # Auto-generated API clients and models (Orval)
│   ├── components/           # Reusable UI components (forms, layouts, etc.)
│   ├── hooks/                # Custom React hooks for business logic
│   ├── lib/                  # Utility functions
│   ├── mocks/                # MSW setup and custom handlers
│   ├── pages/                # Application pages (Authentication, Home)
│   ├── providers/            # React Context providers (e.g., TanStack Query Provider)
│   ├── router/               # React Router configuration and route definitions
│   ├── store/                # Zustand stores for global state
│   └── main.tsx              # Application entry point
├── public/                   # Static assets, including MSW service worker
├── e2e-tests/                # Playwright End-to-End tests
├── openapi.yml               # OpenAPI specification for API generation
├── orval.config.ts           # Orval configuration for API client generation
├── playwright.config.ts      # Playwright test configuration
├── vite.config.ts            # Vite build configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This documentation