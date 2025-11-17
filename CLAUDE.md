# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

User Management Dashboard built with React + TypeScript + Vite, implementing infinite scroll, search functionality, and a multi-step form with conditional fields. This project follows Feature-Sliced Design (FSD) architecture.

**Tech Stack:**
- React 18 + TypeScript
- Vite (build tool)
- Effector (state management)
- Axios (HTTP client)
- Mantine v8 (UI components)
- DummyJSON API (mock backend)

## Common Commands

```bash
# Development
npm run dev          # Start dev server (usually on http://localhost:5173)

# Build
npm run build        # TypeScript check + production build
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint on .ts and .tsx files
```

## Architecture: Feature-Sliced Design (FSD)

The project uses FSD methodology with the following layer hierarchy (from top to bottom):

```
src/
├── app/           # Application initialization layer
│   ├── providers/ # Global providers (Mantine)
│   └── App.tsx    # Root component
├── pages/         # Full pages (route-level components)
│   └── users-list/
├── widgets/       # Complex UI blocks (future: header, sidebar, etc.)
├── features/      # User interactions and business logic
│   ├── user-list/ # Infinite scroll list with search
│   └── user-form/ # Multi-step form (create/edit)
├── entities/      # Business entities
│   └── user/      # User entity with API and types
└── shared/        # Reusable infrastructure
    ├── api/       # Axios client configuration
    ├── lib/       # Utilities (debounce, etc.)
    └── config/    # App configuration
```

**Import Rules:**
- Layers can only import from layers below them (app → pages → widgets → features → entities → shared)
- Use path aliases: `@/app/*`, `@/pages/*`, `@/features/*`, `@/entities/*`, `@/shared/*`
- Each slice exports through `index.ts` (public API)

## State Management: Effector

All application state is managed with Effector stores, events, and effects.

**Key Stores:**

1. **User List** (`@/features/user-list/model`):
   - `$users` - array of users
   - `$isLoading` - loading state
   - `$hasMore` - pagination state
   - `$searchQuery` - current search query
   - Events: `loadMoreUsers`, `setSearchQuery`, `resetUsersList`
   - Effects: `fetchUsersFx`, `searchUsersFx`

2. **User Form** (`@/features/user-form/model`):
   - `$currentStep` - form step (0-2)
   - `$formData` - all form fields
   - `$formErrors` - validation errors
   - `$formMode` - 'create' | 'edit'
   - `$isSubmitting` - submission state
   - `$editUserId` - ID when editing
   - Events: `nextStep`, `prevStep`, `setFormData`, `submitForm`, `loadUserForEdit`, `resetForm`
   - Effects: `createUserFx`, `updateUserFx`, `fetchUserForEditFx`

**Effector Pattern:**
- Define events for user actions
- Define effects for async operations (API calls)
- Use `sample` to connect events to effects
- Update stores with `.on()` for event/effect reactions

## API Integration

Base API client: `@/shared/api/base.ts` (Axios instance)
User API methods: `@/entities/user/api/userApi.ts`

**DummyJSON Endpoints:**
```
GET  /users?limit=10&skip=0     # Paginated users
GET  /users/search?q=<query>    # Search users
GET  /users/<id>                # Single user
POST /users/add                 # Create user
PUT  /users/<id>                # Update user
```

Note: DummyJSON is a mock API - POST/PUT return responses but don't persist data.

## Multi-Step Form Requirements

The user form has 3 steps with validation:

**Step 1: Personal Info**
- firstName, lastName (min 2 chars)
- age (18-100)
- gender (male/female/other)
- email (valid format)
- phone

**Step 2: Address**
- address, city, postalCode (required)
- state (optional)
- **Conditional**: `isInternational` checkbox → shows `country` field (required if checked)

**Step 3: Company Info**
- companyName, jobTitle (optional)
- **Conditional**: `isCurrentlyWorking` checkbox → shows `department` (dropdown) and `salary` fields

The final step should show a summary/review before submission.

## Search & Infinite Scroll

- Search must be debounced (300ms minimum) - use `@/shared/lib/debounce`
- Initial load: 10 users
- Load more: 10 users per scroll
- Show loading indicator during fetch
- Handle "no more data" state
- Search clears on empty query

## Configuration

- API base URL: `https://dummyjson.com`
- Pagination: 10 users per page
- Search debounce: 300ms

These are defined in `@/shared/config/index.ts`.

## Type Definitions

All User-related types are in `@/entities/user/model/types.ts`:
- `User` - full user object
- `UsersResponse` - paginated API response
- `CreateUserDto` - payload for creating user
- `UpdateUserDto` - payload for updating user

Form types are in `@/features/user-form/model/types.ts`:
- `UserFormData` - all form fields
- `FormErrors` - validation error map
- `FormMode` - 'create' | 'edit'
- `DEPARTMENTS`, `GENDERS` - enum constants

## Development Notes

- Path aliases are configured in both `tsconfig.json` and `vite.config.ts`
- Mantine v8 requires importing styles: `@mantine/core/styles.css`
- The project uses React 18 with StrictMode
- ESLint is configured but warnings are allowed (--max-warnings 0)
