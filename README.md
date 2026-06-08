<div align="center">

# 🎨 Cestou — Frontend

**Single-Page Application for the Cestou internal marketplace**

<br/>

![Vue 3](https://img.shields.io/badge/Vue_3-42B883?style=flat-square&logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=flat-square&logo=pinia&logoColor=black)
![Vue Router](https://img.shields.io/badge/Vue_Router_4-42B883?style=flat-square&logo=vuedotjs&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Vee-Validate](https://img.shields.io/badge/VeeValidate-4B6BFF?style=flat-square)

[← Back to main README](./README.md)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Tech Stack In Depth](#-tech-stack-in-depth)
- [Project Structure](#-project-structure)
- [Application Architecture](#-application-architecture)
- [Routing & Navigation Guards](#-routing--navigation-guards)
- [State Management with Pinia](#-state-management-with-pinia)
- [API Integration & Axios](#-api-integration--axios)
- [Component Design](#-component-design)
- [Forms & Validation](#-forms--validation)
- [Styling with Tailwind CSS](#-styling-with-tailwind-css)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Building for Production](#-building-for-production)
- [Linting & Formatting](#-linting--formatting)

---

## 🎯 Overview

The Cestou frontend is a **Vue 3 Single-Page Application (SPA)** written entirely in TypeScript. It provides Pado employees with a clean, fast, and responsive interface to interact with the Cestou marketplace.

The application handles:

- **Authentication** — Login, registration, and transparent JWT token refresh
- **Marketplace** — Browsing active listings with pagination and filters
- **My Listings** — Creating, editing, and cancelling your own voucher offers
- **Purchases** — Buying vouchers and viewing your transaction history
- **Admin Panel** — User management, transaction oversight, and platform stats (ADMIN role only)

It communicates with the Spring Boot backend via a typed Axios HTTP client. All API calls are strongly typed end-to-end using TypeScript interfaces that mirror the backend's response DTOs.

---

## 🛠️ Tech Stack In Depth

### Core Framework

**Vue 3** with the **Composition API** (`<script setup>` syntax) is used throughout the entire application. There are no Options API components — everything uses `setup()`, `ref()`, `computed()`, `watch()`, and composables for logic reuse.

**TypeScript 5** is the language. All components, composables, stores, and API service files are `.ts` or `.vue` with `<script setup lang="ts">`. Strict mode is enabled in `tsconfig.json`.

### Build Tool

**Vite 5** serves as the development server and production bundler. It provides near-instant HMR (Hot Module Replacement) during development and produces optimized, code-split bundles for production via Rollup under the hood.

Key Vite features used:
- Path aliases (`@/` resolves to `src/`) configured in `vite.config.ts`
- Dev proxy to forward `/api/*` requests to `http://localhost:8080` (avoids CORS during local development)
- Environment variable injection via `import.meta.env`

### Routing

**Vue Router 4** manages client-side navigation. Routes are defined with **lazy-loading** (`() => import(...)`) so each page's JavaScript is only fetched when the user navigates to it, keeping the initial bundle small.

**Navigation guards** run before every route change to enforce authentication and role-based access:
- `beforeEach` global guard checks if the target route requires authentication
- If no valid token exists, the user is redirected to `/login`
- If a `ROLE_USER` tries to access an `/admin/*` route, they are redirected to `/`

### State Management

**Pinia** is the state management library. It replaces Vuex with a much cleaner, type-safe API. Each domain has its own store (`useAuthStore`, `useListingStore`, `useTransactionStore`) defined with `defineStore`.

Pinia stores are typed with TypeScript interfaces, use `ref()` and `computed()` internally (Composition API style stores), and their actions handle all async operations (API calls, error catching).

### HTTP Client

**Axios** handles all communication with the backend. A single configured instance lives in `src/api/axios.ts` with:
- `baseURL` set from `import.meta.env.VITE_API_BASE_URL`
- A **request interceptor** that automatically attaches the JWT Bearer token to every outgoing request by reading from the auth store
- A **response interceptor** that catches `401 Unauthorized` responses, attempts a silent token refresh via `POST /api/auth/refresh`, and retries the original request — completely transparently to the rest of the app

### Form Handling & Validation

**VeeValidate** with **Yup** schema validation handles all forms (login, register, create listing, etc.). Validation rules are defined as Yup schemas and bind directly to `<input>` fields via VeeValidate's `useForm` and `useField` composables. Errors appear inline below each field in real-time.

### UI & Styling

**Tailwind CSS 3** handles all styling with a utility-first approach. No component library is used — all UI elements (cards, buttons, modals, tables, badges) are built as custom reusable Vue components styled with Tailwind classes. This keeps the bundle lean and the design fully under control.

A minimal Tailwind config in `tailwind.config.ts` extends the default theme with Pado's brand colors.

---

## 📁 Project Structure

```
cestou-frontend/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── api/
│   │   ├── axios.ts              # Configured Axios instance + interceptors
│   │   ├── auth.api.ts           # login(), register(), refresh() calls
│   │   ├── listing.api.ts        # getListings(), getListing(), createListing(), etc.
│   │   ├── transaction.api.ts    # purchase(), getMyTransactions(), etc.
│   │   └── admin.api.ts          # getDashboard(), getUsers(), updateTxStatus(), etc.
│   │
│   ├── assets/
│   │   └── main.css              # Tailwind @base, @components, @utilities directives
│   │
│   ├── components/
│   │   ├── common/               # Truly generic, reused everywhere
│   │   │   ├── AppButton.vue
│   │   │   ├── AppInput.vue
│   │   │   ├── AppModal.vue
│   │   │   ├── AppBadge.vue
│   │   │   ├── AppPagination.vue
│   │   │   ├── AppSpinner.vue
│   │   │   └── AppAlert.vue
│   │   │
│   │   ├── layout/               # App shell components
│   │   │   ├── AppHeader.vue     # Top navbar with user menu
│   │   │   ├── AppSidebar.vue    # Navigation sidebar (desktop)
│   │   │   └── AppFooter.vue
│   │   │
│   │   ├── listings/             # Listing-specific components
│   │   │   ├── ListingCard.vue   # Card shown in the marketplace grid
│   │   │   ├── ListingForm.vue   # Create / edit form
│   │   │   └── ListingStatusBadge.vue
│   │   │
│   │   └── transactions/
│   │       ├── TransactionRow.vue
│   │       └── TransactionStatusBadge.vue
│   │
│   ├── composables/              # Reusable Composition API logic
│   │   ├── useAuth.ts            # login/logout helpers, token parsing
│   │   ├── usePagination.ts      # Generic pagination state + handlers
│   │   ├── useNotification.ts    # Toast notification queue
│   │   └── useConfirmDialog.ts   # Reusable confirm modal trigger
│   │
│   ├── router/
│   │   └── index.ts              # Route definitions + navigation guards
│   │
│   ├── stores/
│   │   ├── auth.store.ts         # Token, user profile, login/logout actions
│   │   ├── listing.store.ts      # Active listings, my listings, pagination
│   │   └── transaction.store.ts  # My purchases, all transactions (admin)
│   │
│   ├── types/
│   │   ├── auth.types.ts         # LoginRequest, RegisterRequest, AuthResponse
│   │   ├── user.types.ts         # User, UserResponse
│   │   ├── listing.types.ts      # Listing, ListingRequest, ListingStatus
│   │   └── transaction.types.ts  # Transaction, TransactionRequest, TransactionStatus
│   │
│   ├── views/
│   │   ├── auth/
│   │   │   ├── LoginView.vue
│   │   │   └── RegisterView.vue
│   │   │
│   │   ├── marketplace/
│   │   │   ├── MarketplaceView.vue    # Browse active listings
│   │   │   └── ListingDetailView.vue  # Single listing + buy button
│   │   │
│   │   ├── my-listings/
│   │   │   ├── MyListingsView.vue     # User's own listings
│   │   │   └── CreateListingView.vue  # New listing form
│   │   │
│   │   ├── transactions/
│   │   │   └── MyTransactionsView.vue # Purchase history
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminDashboardView.vue # Stats overview
│   │   │   ├── AdminUsersView.vue     # User management table
│   │   │   └── AdminTransactionsView.vue
│   │   │
│   │   └── NotFoundView.vue
│   │
│   ├── App.vue                   # Root component + RouterView
│   └── main.ts                   # App bootstrap — createApp, use(router, pinia)
│
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README-frontend.md
```

---

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser / DOM                     │
└──────────────────────────┬──────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────┐
│                    Vue 3 App                         │
│                                                      │
│  ┌─────────────┐    ┌──────────────┐                │
│  │  Vue Router │    │    Pinia     │                │
│  │  (routing)  │    │   (state)    │                │
│  └──────┬──────┘    └──────┬───────┘                │
│         │                  │                        │
│  ┌──────▼──────────────────▼───────────────┐       │
│  │              Views (Pages)               │       │
│  │  MarketplaceView · LoginView · Admin...  │       │
│  └──────────────────┬───────────────────────┘       │
│                     │  uses                         │
│  ┌──────────────────▼───────────────────────┐       │
│  │           Components (UI Layer)           │       │
│  │  ListingCard · AppModal · AppButton ...  │       │
│  └──────────────────┬───────────────────────┘       │
│                     │  uses                         │
│  ┌──────────────────▼───────────────────────┐       │
│  │       Composables (Reusable Logic)        │       │
│  │  usePagination · useNotification ...     │       │
│  └───────────────────────────────────────────┘       │
└─────────────────────────────┬───────────────────────┘
                              │  Axios HTTP
              ┌───────────────▼───────────────┐
              │     API Service Layer          │
              │  auth.api · listing.api ...   │
              └───────────────────────────────┘
                              │
              Spring Boot REST API (port 8080)
```

---

## 🗺️ Routing & Navigation Guards

Routes are defined in `src/router/index.ts`. Each route that requires authentication carries `meta: { requiresAuth: true }`, and admin-only routes also carry `meta: { requiresAdmin: true }`.

```
/                     → redirect to /marketplace
/login                → LoginView         (public)
/register             → RegisterView      (public)
/marketplace          → MarketplaceView   (auth required)
/marketplace/:id      → ListingDetailView (auth required)
/my-listings          → MyListingsView    (auth required)
/my-listings/new      → CreateListingView (auth required)
/my-transactions      → MyTransactionsView (auth required)
/admin                → AdminDashboardView (admin only)
/admin/users          → AdminUsersView    (admin only)
/admin/transactions   → AdminTransactionsView (admin only)
/:pathMatch(.*)*      → NotFoundView
```

All route components are **lazy-loaded**:
```typescript
{
  path: '/marketplace',
  component: () => import('@/views/marketplace/MarketplaceView.vue'),
  meta: { requiresAuth: true }
}
```

The global guard in `beforeEach`:
```typescript
router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return next('/login')
  if (to.meta.requiresAdmin && !auth.isAdmin) return next('/')
  next()
})
```

---

## 🗄️ State Management with Pinia

### Auth Store (`auth.store.ts`)

Holds the JWT access token, refresh token, and the decoded user profile. Persists tokens to `localStorage` so the session survives page refreshes.

Key state: `accessToken`, `refreshToken`, `user`  
Key actions: `login()`, `logout()`, `refreshToken()`, `loadUserFromToken()`  
Key getters: `isAuthenticated` (computed from token + expiry), `isAdmin` (checks role)

### Listing Store (`listing.store.ts`)

Manages the marketplace listing data: the paginated list of active listings for the browse view, and the current user's own listings for the "My Listings" view.

Key state: `listings[]`, `myListings[]`, `currentListing`, `pagination`  
Key actions: `fetchListings()`, `fetchMyListings()`, `createListing()`, `deleteListing()`

### Transaction Store (`transaction.store.ts`)

Handles the current user's purchase history and, for admins, all platform transactions.

Key state: `myTransactions[]`, `allTransactions[]`  
Key actions: `purchase()`, `fetchMyTransactions()`, `fetchAllTransactions()`, `updateStatus()`

---

## 🔗 API Integration & Axios

The Axios instance in `src/api/axios.ts` is the single point of communication with the backend.

### Request Interceptor

Automatically injects the Authorization header on every outgoing request:

```typescript
axiosInstance.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})
```

### Response Interceptor (Silent Token Refresh)

When the API returns `401`, the interceptor attempts a token refresh before failing:

```typescript
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      await useAuthStore().refreshToken()
      return axiosInstance(original)  // retry original request
    }
    return Promise.reject(error)
  }
)
```

This means token expiry is completely invisible to the user — the request simply retries with a fresh token.

---

## 🧩 Component Design

Components follow a clear responsibility separation:

**Common components** (`src/components/common/`) are fully generic and accept props for customization. `AppButton` accepts `variant` (`primary` | `secondary` | `danger`), `size`, `loading`, and `disabled`. `AppModal` is a teleport-based overlay that emits `close` events. `AppPagination` emits `page-change` events and reads total/current from props.

**Domain components** (`listings/`, `transactions/`) are tightly coupled to their domain types. `ListingCard` receives a `Listing` typed prop and emits `buy` and `view-detail` events. It does not make any API calls itself — it only displays data and communicates via events to its parent view.

**Views** are the only place where store actions are called and API data is fetched. They compose domain components, pass data down as props, and handle emitted events.

---

## 📋 Forms & Validation

All forms use `VeeValidate` + `Yup`. Example from the Create Listing form:

```typescript
const schema = yup.object({
  title: yup.string().required('Title is required').min(3),
  description: yup.string().required('Description is required'),
  price: yup.number().required().positive('Price must be greater than 0'),
  quantityAvailable: yup.number().required().integer().min(1),
})

const { handleSubmit, isSubmitting } = useForm({ validationSchema: schema })
const { value: title, errorMessage: titleError } = useField<string>('title')
```

Validation fires on blur and on submit. The `isSubmitting` boolean is passed to `AppButton`'s `loading` prop to disable the button and show a spinner during the API call.

---

## 🎨 Styling with Tailwind CSS

Tailwind's configuration extends the default theme with Pado's brand palette:

```typescript
// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        pado: {
          green: '#1a7c3e',
          dark:  '#0f4f27',
        }
      }
    }
  }
}
```

Common patterns used across the app:

- **Cards:** `bg-white rounded-xl shadow-sm border border-gray-100 p-6`
- **Primary buttons:** `bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg px-4 py-2 transition-colors`
- **Status badges:** `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium` with conditional color classes driven by the listing/transaction status value
- **Responsive grid:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` for the marketplace listing grid

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ (or pnpm / yarn)
- The backend running at `http://localhost:8080`

### Running the Dev Server

```bash
# Clone
git clone https://github.com/JulioRobocop/cestou-frontend.git
cd cestou-frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local — at minimum set VITE_API_BASE_URL

# Start dev server with HMR
npm run dev
```

The app will be available at `http://localhost:5173`.  
API requests to `/api/*` are proxied to `http://localhost:8080` via the Vite dev proxy.

---

## 🔧 Environment Variables

```env
# Backend API base URL
VITE_API_BASE_URL=http://localhost:8080

# App name (displayed in the header and browser tab)
VITE_APP_NAME=Cestou
```

In production, set `VITE_API_BASE_URL` to the deployed backend URL. All `import.meta.env.VITE_*` variables are inlined at build time by Vite — they are not secrets and will be visible in the built bundle.

---

## 🏭 Building for Production

```bash
# Type-check + build optimized bundle
npm run build

# Preview the production build locally
npm run preview
```

The build output goes to `dist/`. It contains static files (HTML, JS chunks, CSS, assets) that can be served by any static hosting provider (Nginx, Apache, Vercel, Netlify, GCP Cloud Storage + CDN).

For deployment inside Pado's infrastructure, the `dist/` folder is typically copied into an Nginx container that also proxies `/api/*` to the backend service.

**Approximate production bundle sizes** (after tree-shaking and minification):

| Chunk | Size (gzipped) |
|---|---|
| `index.html` | < 1 KB |
| `vendor` (Vue, Pinia, Router) | ~40 KB |
| `app` (application code) | ~25 KB |
| CSS (Tailwind purged) | ~8 KB |

---

## 🧹 Linting & Formatting

```bash
# Lint all files
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format with Prettier
npm run format
```

The project uses:
- **ESLint** with `eslint-plugin-vue` and `@typescript-eslint` for Vue + TypeScript linting
- **Prettier** for consistent code formatting (integrated with ESLint via `eslint-config-prettier`)
- **TypeScript strict mode** for maximum type safety

---

<div align="center">

[← Back to main README](./README.md) · [→ Backend README](./README-backend.md)

Built with 💚 by **Julio César Gonçalves** — Pado S/A

</div>
