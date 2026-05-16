# Architecture Overview - JobAlert Portal

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                         INTERNET                                │
└────────────────────────────────────────────────────────────────┘
           ↓
┌────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                          │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  React + Vite Frontend (Vercel)                                │
│  ├── Home Page          ├── Job Details                        │
│  ├── Jobs Listing       ├── Admin Dashboard                    │
│  ├── Search & Filter    ├── Add/Edit Job                       │
│  └── Login              └── Featured Jobs                      │
│                                                                  │
│  Key Libraries:                                                 │
│  ├── React Router (Routing)                                    │
│  ├── Axios (API Calls)                                         │
│  ├── Tailwind CSS (Styling)                                    │
│  ├── Zustand (State Management)                                │
│  └── React Toastify (Notifications)                            │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
           ↓ HTTP/HTTPS (CORS Enabled)
           ↓
┌────────────────────────────────────────────────────────────────┐
│                     API LAYER (Render)                          │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Express.js Server (Node.js)                                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ Routes                                               │      │
│  ├──────────────────────────────────────────────────────┤      │
│  │ /api/auth/login          - POST (Authenticate)      │      │
│  │ /api/jobs                - GET  (List all jobs)     │      │
│  │ /api/jobs/:id            - GET  (Get single job)    │      │
│  │ /api/jobs                - POST (Create) [Protected]│      │
│  │ /api/jobs/:id            - PUT  (Update) [Protected]│      │
│  │ /api/jobs/:id            - DELETE (Delete) [Protected]      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ Middleware                                           │      │
│  ├──────────────────────────────────────────────────────┤      │
│  │ ├── CORS Handler        - Allow cross-origin        │      │
│  │ ├── Auth Middleware     - JWT verification          │      │
│  │ ├── Error Handler       - Global error handling     │      │
│  │ └── Body Parser         - JSON parsing              │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ Controllers                                          │      │
│  ├──────────────────────────────────────────────────────┤      │
│  │ authController.js       - Login logic               │      │
│  │ jobController.js        - Job CRUD operations       │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ Utilities                                            │      │
│  ├──────────────────────────────────────────────────────┤      │
│  │ jwt.js          - Generate & verify JWT tokens      │      │
│  │ password.js     - Hash & compare passwords          │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
           ↓ Supabase Client SDK
           ↓
┌────────────────────────────────────────────────────────────────┐
│                 DATA LAYER (Supabase)                           │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PostgreSQL Database (Supabase Cloud)                          │
│                                                                  │
│  ┌──────────────────┐    ┌──────────────────┐                 │
│  │   ADMINS TABLE   │    │    JOBS TABLE    │                 │
│  ├──────────────────┤    ├──────────────────┤                 │
│  │ id (PK)          │    │ id (PK)          │                 │
│  │ email            │    │ title            │                 │
│  │ password (hash)  │    │ company          │                 │
│  │ created_at       │    │ location         │                 │
│  └──────────────────┘    │ salary           │                 │
│                          │ experience       │                 │
│                          │ category         │                 │
│                          │ description      │                 │
│                          │ apply_link       │                 │
│                          │ company_logo     │                 │
│                          │ featured         │                 │
│                          │ created_at       │                 │
│                          │ updated_at       │                 │
│                          │                  │                 │
│                          │ INDEXES:         │                 │
│                          │ - idx_category   │                 │
│                          │ - idx_location   │                 │
│                          │ - idx_featured   │                 │
│                          │ - idx_created_at │                 │
│                          └──────────────────┘                 │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

## 🔄 Request/Response Flow

### Public Job Browse Flow
```
User                Frontend          Backend           Database
 │                    │                  │                │
 ├─ Browse jobs      │                  │                │
 │─────────────────→ │                  │                │
 │                    │ GET /api/jobs    │                │
 │                    ├─────────────────→│                │
 │                    │                  │ SELECT * FROM jobs
 │                    │                  ├───────────────→│
 │                    │                  │←─ Job list ────┤
 │                    │←─ JSON response ─┤                │
 │←─ Jobs displayed ─┤                  │                │
```

### Admin Login Flow
```
Admin               Frontend          Backend           Database
 │                    │                  │                │
 ├─ Enter credentials │                  │                │
 │─────────────────→ │                  │                │
 │                    │ POST /auth/login │                │
 │                    ├─────────────────→│                │
 │                    │                  │ SELECT * FROM admins
 │                    │                  │ WHERE email = ?
 │                    │                  ├───────────────→│
 │                    │                  │←─ Admin data ──┤
 │                    │                  │ (if exists)    │
 │                    │                  │ Verify password│
 │                    │                  │ Create JWT     │
 │                    │←─ JWT token ─────┤                │
 │←─ Redirect to dashboard               │                │
 │                    │ Store token in localStorage       │
```

### Create Job Flow (Protected)
```
Admin               Frontend          Backend           Database
 │                    │                  │                │
 ├─ Fill job form    │                  │                │
 │─────────────────→ │                  │                │
 │                    │ POST /api/jobs   │                │
 │                    │ + Authorization header (JWT)      │
 │                    ├─────────────────→│                │
 │                    │                  │ Verify token   │
 │                    │                  │ Validate data  │
 │                    │                  │ INSERT INTO jobs
 │                    │                  ├───────────────→│
 │                    │                  │←─ Success ─────┤
 │                    │←─ Job created ───┤                │
 │←─ Redirect dashboard                  │                │
```

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────┐
│          AUTHENTICATION PROCESS                  │
└─────────────────────────────────────────────────┘

1. REGISTRATION (First time setup)
   - Admin email/password stored in database
   - Password hashed with bcryptjs (10 rounds)
   - Hashed password stored in database

2. LOGIN
   - Admin sends email + password
   - Backend retrieves admin from database
   - Compares password with bcrypt.compare()
   - If valid: Generates JWT token (7 days expiry)
   - JWT token returned to frontend

3. TOKEN STORAGE
   - Frontend stores JWT in localStorage
   - localStorage.setItem('token', token)

4. AUTHENTICATED REQUESTS
   - Frontend adds Authorization header
   - Authorization: Bearer <JWT_TOKEN>
   - Backend middleware verifies token
   - If valid: Request proceeds
   - If invalid/expired: Returns 401 Unauthorized

5. TOKEN VERIFICATION
   - JWT decoded using secret key
   - Payload contains adminId
   - Token expiry checked
   - Secure operations granted
```

## 🗄️ Database Schema

### Tables Relationship

```
┌─────────────────────┐
│     ADMINS          │
├─────────────────────┤
│ id (PRIMARY KEY)    │
│ email (UNIQUE)      │
│ password (hashed)   │
│ created_at          │
└─────────────────────┘

┌─────────────────────┐
│      JOBS           │
├─────────────────────┤
│ id (PRIMARY KEY)    │
│ title               │
│ company             │
│ location            │
│ salary              │
│ experience          │
│ category            │
│ description         │
│ apply_link          │
│ company_logo        │
│ featured (BOOLEAN)  │
│ created_at          │
│ updated_at          │
└─────────────────────┘

NOTE: Jobs table doesn't have foreign key to admins
      All admins share the same jobs database
```

## 📊 Component Hierarchy

```
App
├── Navbar
│   ├── Navigation Links
│   ├── Mobile Menu
│   └── Auth Button
│
├── Main Routes
│   ├── Home
│   │   ├── Hero Section
│   │   ├── Stats Section
│   │   ├── FeaturedJobs
│   │   └── LatestJobs
│   │
│   ├── Jobs
│   │   ├── SearchBar
│   │   ├── FilterBar
│   │   ├── JobCard (multiple)
│   │   └── Pagination
│   │
│   ├── JobDetail
│   │   ├── Job Header
│   │   ├── Job Info Grid
│   │   ├── Job Description
│   │   └── Apply Button
│   │
│   ├── Login
│   │   ├── Email Input
│   │   ├── Password Input
│   │   └── Demo Credentials
│   │
│   ├── Dashboard (Protected)
│   │   ├── Stats Cards
│   │   ├── Jobs Table
│   │   ├── Edit Button
│   │   └── Delete Button
│   │
│   ├── AddJob (Protected)
│   │   └── Job Form
│   │
│   └── EditJob (Protected)
│       └── Job Form (pre-filled)
│
├── Footer
│   ├── Links
│   ├── Social
│   └── Copyright
│
└── ToastNotification
```

## 🔄 State Management (Zustand)

```javascript
// Auth Store
useAuthStore = {
  isAuthenticated,    // Boolean
  token,             // JWT token string
  setAuthenticated,  // Function
  setToken,          // Function
  logout,            // Function
}

// Usage in components:
const { isAuthenticated, token, logout } = useAuthStore()
```

## 🚀 Deployment Architecture

```
┌──────────────────────────────────────────────────────┐
│              PRODUCTION ENVIRONMENT                  │
└──────────────────────────────────────────────────────┘

┌─────────────────────┐
│  Vercel             │
│  ├─ CDN             │  React App
│  ├─ Auto Deploy     │  - Static files
│  ├─ SSL/TLS         │  - Code splitting
│  └─ GitHub sync     │  - Caching
└─────────────────────┘
         ↓ HTTPS
┌─────────────────────┐
│  Render             │
│  ├─ Container       │  Express Server
│  ├─ Auto Deploy     │  - Auto-reload
│  ├─ SSL/TLS         │  - Load balanced
│  └─ GitHub sync     │  - Logging
└─────────────────────┘
         ↓ HTTPS
┌─────────────────────┐
│  Supabase           │
│  ├─ PostgreSQL      │  Database
│  ├─ Backups         │  - Replicated
│  ├─ SSL/TLS         │  - Secured
│  └─ API             │  - Indexed
└─────────────────────┘
```

## 📈 Scalability Considerations

1. **Database**
   - Indexes on frequently queried columns
   - Pagination for large datasets
   - Query optimization

2. **Backend**
   - Stateless design (Render can scale)
   - Connection pooling
   - Rate limiting (can add)
   - Caching (can implement)

3. **Frontend**
   - Code splitting with Vite
   - Image optimization
   - Lazy loading
   - Service workers (can add)

4. **Security**
   - JWT token expiration
   - Password hashing
   - CORS protection
   - Input validation
   - SQL injection prevention (Supabase SDK)

---

This architecture is production-ready and follows modern web development best practices.
