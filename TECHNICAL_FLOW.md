# JobAlert Portal - Full Technical Flow

This document explains how the current application works end to end: architecture, routing, authentication, request flow, data flow, and how each major feature behaves internally.

---

## 1. What the system is

JobAlert Portal is a full-stack job listing application with two different experiences:

1. **Public user experience**
   - Browse jobs
   - Search and filter jobs
   - Open job details
   - Apply using an external link

2. **Admin experience**
   - Log in
   - Open a protected dashboard
   - Create, edit, and delete jobs
   - Mark jobs as featured
   - Change the admin password from the dashboard

Public users do **not** see admin controls in the normal UI. Admin-only actions are protected on both:

- the frontend route level
- the backend API level

---

## 2. Technology stack

### Frontend

| Technology | Purpose |
|---|---|
| React | UI rendering |
| Vite | Frontend build tool |
| React Router | Page routing |
| Axios | HTTP requests to backend |
| Zustand | Authentication state |
| Tailwind CSS | Styling |
| React Toastify | Success/error notifications |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | HTTP server and routing |
| Supabase JS SDK | Database access |
| PostgreSQL via Supabase | Persistent data storage |
| JWT | Admin session token |
| bcryptjs | Password hashing and verification |
| dotenv | Environment variable loading |
| cors | Cross-origin requests from frontend |

---

## 3. High-level architecture

```text
Browser / React UI
        |
        | HTTP requests via Axios
        v
Express API server
        |
        | Supabase client queries
        v
Supabase PostgreSQL database
```

### Deployment shape

```text
Frontend: React app
Backend: Express API
Database: Supabase PostgreSQL
```

### Main layers

1. **Presentation layer**
   - React pages and reusable UI components

2. **Client service layer**
   - `frontend/src/services/api.js`
   - Central place where frontend talks to backend

3. **API layer**
   - Express routes
   - Controllers
   - Auth middleware

4. **Data layer**
   - Supabase tables: `admins`, `jobs`

---

## 4. Project structure

```text
frontend/
  src/
    App.jsx
    components/
    hooks/
    pages/
    services/

backend/
  src/
    server.js
    config/
    controllers/
    middleware/
    routes/
    utils/

database_schema.sql
```

### Important frontend files

| File | Responsibility |
|---|---|
| `App.jsx` | Defines all frontend routes |
| `pages/Home.jsx` | Public landing page |
| `pages/Jobs.jsx` | Search, filter, pagination |
| `pages/JobDetail.jsx` | Single-job view |
| `pages/Login.jsx` | Admin login |
| `pages/Dashboard.jsx` | Admin dashboard |
| `pages/AddJob.jsx` | Admin create form |
| `pages/EditJob.jsx` | Admin edit form |
| `components/ProtectedRoute.jsx` | Blocks protected frontend pages without token |
| `hooks/useAuth.js` | Zustand auth state |
| `services/api.js` | Axios client and service methods |

### Important backend files

| File | Responsibility |
|---|---|
| `server.js` | Starts Express and mounts routes |
| `routes/auth.js` | Auth endpoints |
| `routes/jobs.js` | Job endpoints |
| `controllers/authController.js` | Login, password change, admin seeding |
| `controllers/jobController.js` | Job listing and CRUD |
| `middleware/auth.js` | JWT verification and global error handling |
| `utils/jwt.js` | JWT creation and verification |
| `utils/password.js` | bcrypt hashing and comparison |

---

## 5. Database model

### `admins` table

| Column | Purpose |
|---|---|
| `id` | Primary key |
| `email` | Unique admin email |
| `password` | bcrypt password hash |
| `created_at` | Creation timestamp |

### `jobs` table

| Column | Purpose |
|---|---|
| `id` | Primary key |
| `title` | Job title |
| `company` | Company name |
| `location` | Location text |
| `salary` | Salary text |
| `experience` | Experience level |
| `category` | Job category |
| `description` | Long description |
| `apply_link` | External application URL |
| `company_logo` | Optional logo URL |
| `featured` | Boolean used for featured sections |
| `created_at` | Created timestamp |
| `updated_at` | Updated timestamp |

### Indexes

The schema creates indexes for fields used often in filtering and sorting:

- category
- location
- featured
- created_at
- title

These help list/search queries perform better as job count grows.

---

## 6. Environment variables

### Backend

```env
PORT=5000
JWT_SECRET=...
SUPABASE_URL=...
SUPABASE_KEY=...
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

### How the first admin is created

When the backend starts:

1. `server.js` calls `seedAdmin()`
2. `seedAdmin()` checks whether any admin already exists
3. If none exists:
   - reads `ADMIN_EMAIL`
   - reads `ADMIN_PASSWORD`
   - hashes the password with bcrypt
   - inserts the first row into `admins`

If an admin already exists, no new admin is inserted.

---

## 7. Frontend routing

Defined in `frontend/src/App.jsx`.

### Public routes

| Route | Page |
|---|---|
| `/` | Home |
| `/jobs` | Jobs list |
| `/jobs/:id` | Job detail |
| `/login` | Admin login |

### Protected admin routes

| Route | Page |
|---|---|
| `/admin/dashboard` | Dashboard |
| `/admin/add-job` | Add job |
| `/admin/edit-job/:id` | Edit job |

Protected routes are wrapped in `ProtectedRoute`.

### How `ProtectedRoute` works

```text
If localStorage has token:
  render admin page
Else:
  redirect to /login
```

This improves frontend UX, but it is **not** the real security boundary. The real security boundary is on the backend, where protected endpoints require a valid JWT.

---

## 8. Frontend-to-backend API client flow

The frontend uses one Axios instance from `frontend/src/services/api.js`.

### Request interceptor

Before every request:

1. Read `token` from `localStorage`
2. If present, attach:

```http
Authorization: Bearer <token>
```

This is how admin-only requests are authenticated automatically.

### Service modules

`authService`

- `login(email, password)`
- `changePassword(currentPassword, newPassword)`
- token helpers

`jobService`

- `getAllJobs(params)`
- `getJobById(id)`
- `createJob(jobData)`
- `updateJob(id, jobData)`
- `deleteJob(id)`
- `getFeaturedJobs()`
- `getLatestJobs(limit)`

---

## 9. Public user flows

## 9.1 Home page flow

### UI composition

`Home.jsx` renders:

1. Hero section
2. Statistics section
3. `FeaturedJobs`
4. `LatestJobs`
5. CTA section

### Featured jobs data flow

```text
FeaturedJobs component mounts
  -> jobService.getFeaturedJobs()
  -> GET /api/jobs?featured=true
  -> backend filters featured jobs
  -> component keeps first 3
  -> cards render
```

### Latest jobs data flow

```text
LatestJobs component mounts
  -> jobService.getLatestJobs(6)
  -> GET /api/jobs?limit=6
  -> backend sorts by created_at descending
  -> latest 6 jobs returned
  -> cards render
```

---

## 9.2 Jobs listing flow

### Main frontend state in `Jobs.jsx`

| State | Meaning |
|---|---|
| `jobs` | Current visible jobs |
| `loading` | Whether jobs are being fetched |
| `searchInput` | What user typed |
| `searchTerm` | Search actually sent to backend |
| `currentPage` | Current pagination page |
| `totalPages` | Total pages from backend |
| `filters` | category/location/experience/featured |

### Search behavior

Current behavior is intentional:

1. User types into the field
2. No backend call is made while typing
3. Search runs only when:
   - user presses Enter
   - user clicks the Search button
4. One-character searches are ignored
5. Clear button resets the search

This keeps the UI calmer and prevents low-quality one-letter searches.

### Full jobs list flow

```text
User opens /jobs
  -> Jobs page loads
  -> fetchJobs()
  -> jobService.getAllJobs(params)
  -> GET /api/jobs?search=&category=&location=&experience=&featured=&page=&limit=
  -> backend builds Supabase query
  -> database returns rows + exact count
  -> backend adds pagination metadata
  -> frontend stores jobs and totalPages
  -> JobCard grid renders
```

### Filters

| Filter | Backend behavior |
|---|---|
| `search` | `title`, `company`, or `description` contains text |
| `category` | exact match |
| `location` | partial match |
| `experience` | exact match |
| `featured` | exact true match |

### Pagination

Backend computes:

```text
offset = (page - 1) * limit
range = offset to offset + limit - 1
```

Frontend uses returned pagination metadata to render page controls.

---

## 9.3 Job detail flow

```text
User clicks a JobCard
  -> navigates to /jobs/:id
  -> JobDetail page reads id from route
  -> jobService.getJobById(id)
  -> GET /api/jobs/:id
  -> backend fetches one row
  -> if found, return job
  -> if not found, return 404
  -> frontend shows job data or empty state
```

The apply button uses `apply_link` and opens the employer site in a new tab.

---

## 10. Admin authentication flow

## 10.1 Login flow

```text
Admin opens /login
  -> enters email/password
  -> Login.jsx calls authService.login()
  -> POST /api/auth/login
  -> backend finds admin by email
  -> bcrypt compares submitted password with stored hash
  -> if valid, backend signs JWT with adminId
  -> frontend stores token in localStorage
  -> Zustand auth state becomes authenticated
  -> redirect to /admin/dashboard
```

### Token content

The JWT contains:

```json
{
  "adminId": 123
}
```

It expires after 7 days.

---

## 10.2 Protected request flow

For protected endpoints:

1. Axios interceptor attaches the token
2. `authMiddleware` reads the Bearer token
3. `verifyToken()` checks validity
4. If valid:
   - decoded payload is attached to `req.admin`
   - request continues
5. If invalid or missing:
   - backend returns `401`

Protected endpoints include:

- `POST /api/jobs`
- `PUT /api/jobs/:id`
- `DELETE /api/jobs/:id`
- `PUT /api/auth/password`

---

## 10.3 Change password flow

```text
Admin enters current password + new password + confirmation
  -> Dashboard validates confirmation match
  -> authService.changePassword()
  -> PUT /api/auth/password
  -> authMiddleware verifies JWT
  -> controller loads admin by adminId
  -> bcrypt compares current password
  -> new password length checked
  -> bcrypt hashes new password
  -> admins.password updated
  -> success toast shown
```

Validation rules:

- current password required
- new password required
- new password must be at least 8 characters
- confirmation must match on frontend

---

## 11. Admin job-management flows

## 11.1 Dashboard load

```text
Admin opens /admin/dashboard
  -> ProtectedRoute allows access if token exists
  -> Dashboard fetches up to 100 jobs
  -> GET /api/jobs?limit=100
  -> jobs table rendered
  -> total and featured counts computed on frontend
```

## 11.2 Create job

```text
Admin clicks Add Job
  -> /admin/add-job
  -> submits form
  -> jobService.createJob()
  -> POST /api/jobs with Bearer token
  -> authMiddleware verifies token
  -> backend validates required fields
  -> inserts job into database
  -> frontend shows success toast
  -> redirect to dashboard
```

## 11.3 Edit job

```text
Admin clicks edit icon
  -> /admin/edit-job/:id
  -> page loads current job
  -> admin changes fields
  -> PUT /api/jobs/:id
  -> backend updates matching row
  -> frontend shows success toast
```

## 11.4 Delete job

```text
Admin clicks delete icon
  -> confirmation dialog
  -> DELETE /api/jobs/:id
  -> backend removes row
  -> frontend refreshes dashboard list
```

---

## 12. Backend route map

### Auth routes

| Method | Endpoint | Protected | Purpose |
|---|---|---:|---|
| POST | `/api/auth/login` | No | Admin login |
| PUT | `/api/auth/password` | Yes | Change admin password |

### Job routes

| Method | Endpoint | Protected | Purpose |
|---|---|---:|---|
| GET | `/api/jobs` | No | List jobs |
| GET | `/api/jobs/:id` | No | Get one job |
| POST | `/api/jobs` | Yes | Create job |
| PUT | `/api/jobs/:id` | Yes | Update job |
| DELETE | `/api/jobs/:id` | Yes | Delete job |

### Utility route

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Backend health check |

---

## 13. Backend query behavior

### `getAllJobs`

Starts with:

```text
select all jobs
count exact total
sort created_at descending
```

Then conditionally applies:

- OR search over title/company/description
- category exact match
- location partial match
- experience exact match
- featured exact match
- pagination range

Returns:

```json
{
  "data": [],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 0,
    "itemsPerPage": 12
  }
}
```

### `createJob`

Validates required fields before insert.

### `updateJob`

Updates by ID and returns 404 if no row matched.

### `deleteJob`

Deletes by ID and returns success if Supabase deletion succeeds.

---

## 14. State management

### Local component state

Most data is local to pages:

- Jobs page owns search/filter/page state
- Dashboard owns job table and password form state
- Add/Edit pages own form state

### Global auth state

`useAuthStore` manages:

- `isAuthenticated`
- `token`
- `setToken()`
- `logout()`

`localStorage` is used so login survives refreshes.

---

## 15. Security model

### What is protected

- Admin job mutation endpoints
- Password-change endpoint
- Admin pages in the frontend

### How passwords are stored

Passwords are never stored in plain text.

They are hashed with bcrypt before being inserted or updated.

### Important distinction

Frontend route protection is mainly for navigation and UX.

Actual security comes from backend authorization:

- without a valid token, protected API calls fail
- hiding buttons alone is not considered security

---

## 16. Error handling

### Frontend

- loading spinners during requests
- toast notifications on success/failure
- empty states for no results or missing job

### Backend

- controller-level validation errors
- auth errors return `401`
- missing rows return `404`
- unexpected errors fall through to global error handler

---

## 17. Important current design decisions

### Public/admin separation

The public UI intentionally avoids showing:

- admin login button
- post-job CTA
- dashboard controls

Admin access still exists through `/login`.

### Search UX

Search is explicit rather than live:

- better control for users
- fewer unnecessary requests
- avoids one-letter search noise

### Single admin model

The current project assumes one or more rows in `admins`, but the UI is built around a simple single-admin workflow.

---

## 18. End-to-end example flows

## Example A: public user finds a job

```text
Home page
  -> Browse Jobs
  -> user enters "react"
  -> clicks Search
  -> GET /api/jobs?search=react&page=1&limit=12
  -> backend queries Supabase
  -> matching jobs shown
  -> user opens one job
  -> GET /api/jobs/:id
  -> detail page renders
  -> user clicks Apply Now
  -> employer website opens
```

## Example B: admin creates a job

```text
Admin visits /login
  -> POST /api/auth/login
  -> receives JWT
  -> navigates to dashboard
  -> clicks Add Job
  -> submits form
  -> POST /api/jobs with Authorization header
  -> backend verifies token
  -> database inserts job
  -> dashboard later shows new row
```

## Example C: admin changes password

```text
Dashboard
  -> enters current and new password
  -> PUT /api/auth/password
  -> auth middleware validates token
  -> backend verifies current password
  -> hashes new password
  -> database updates password hash
  -> success toast appears
```

---

## 19. What to update if you extend the project later

If you add:

- admin email change
- multiple admin roles
- saved jobs
- user accounts
- resumes
- employer accounts

then you will likely need to update:

1. database schema
2. backend auth model
3. route protection rules
4. frontend navigation
5. API documentation
6. this technical flow document

---

## 20. Summary

The application is a classic React + Express + PostgreSQL system:

- React handles presentation and client-side state
- Express exposes public and protected APIs
- Supabase stores admins and jobs
- JWT + bcrypt secure the admin path
- public users browse and apply
- admins manage job data and their own password

The most important data-flow idea is:

```text
UI event
  -> frontend service call
  -> API route
  -> controller logic
  -> database operation
  -> JSON response
  -> UI state update
```

That pattern is repeated throughout the whole project.
