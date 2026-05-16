# JobAlert Portal - Complete Setup Guide

A modern, full-stack job notification website built with React, Node.js, and Supabase. Browse job listings, filter by various criteria, and manage job postings through a secure admin dashboard.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **React Router v6** - Routing
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Zustand** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework
- **Supabase PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

### Hosting
- **Frontend**: Vercel (FREE)
- **Backend**: Render (FREE)
- **Database**: Supabase (FREE)

## 📁 Project Structure

```
JOB NOTYFY/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Route pages
│   │   ├── services/        # API calls
│   │   ├── hooks/           # Custom hooks & state
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── public/              # Static files
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.example         # Environment variables example
│   └── index.html
│
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth & error handling
│   │   ├── config/          # Configuration
│   │   ├── utils/           # Utilities
│   │   └── server.js        # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── database_schema.sql      # SQL schema
└── README.md               # This file
```

## 🔧 Local Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- A Supabase account (free)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"** or sign in
3. Fill in project details:
   - **Project Name**: job-alert-portal
   - **Database Password**: Create a strong password
   - **Region**: Choose your region
4. Click **"Create new project"** (wait 2-3 minutes for setup)

### Step 2: Setup Database

1. After project is created, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Copy and paste the entire SQL from `database_schema.sql`
4. Click **"Run"** to execute

**Verify tables created:**
- Go to **"Table Editor"** → You should see `admins` and `jobs` tables

### Step 3: Get Supabase Credentials

1. Go to **Settings** (bottom of left sidebar)
2. Click **"API"**
3. Copy these values:
   - **Project URL** → `SUPABASE_URL`
   - **Anon Key** → `SUPABASE_KEY`

## 🔑 Environment Variables Setup

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Edit `.env` and fill in:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here_at_least_32_chars_long
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
```

4. Install dependencies:
```bash
npm install
```

5. Start backend (development):
```bash
npm run dev
```

Backend will run at: **http://localhost:5000**

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Install dependencies:
```bash
npm install
```

5. Start frontend (development):
```bash
npm run dev
```

Frontend will run at: **http://localhost:5173**

## 🧪 Testing the Application

### Test Admin Login
1. Open frontend: http://localhost:5173/login
2. Use credentials:
   - **Email**: admin@gmail.com
   - **Password**: admin123
3. Click "Fill Demo Credentials" button (auto-fills)
4. Login → redirects to dashboard

### Test Admin Dashboard
After login, you can:
- ✅ View all jobs (dashboard page)
- ✅ Add new job (click "+ Add Job" button)
- ✅ Edit job (click edit icon)
- ✅ Delete job (click delete icon)
- ✅ Mark as featured

### Test Public Features
- 🔍 Browse jobs at http://localhost:5173/jobs
- 🔎 Search jobs
- 📊 Filter by category, location, experience
- 👁️ View job details
- ⭐ See featured jobs
- 📰 See latest jobs

## 🚀 Deployment

### Step 1: Deploy Backend on Render

**Create Account:**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub or email
3. Connect your GitHub account

**Deploy Backend:**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repo (or paste URL)
3. Fill in details:
   - **Name**: job-alert-portal-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. Add environment variables:
   - Go to **"Environment"** tab
   - Add these variables:
     ```
     PORT=5000
     JWT_SECRET=your_secret_key_here
     SUPABASE_URL=your_supabase_url
     SUPABASE_KEY=your_supabase_key
     ```

5. Click **"Create Web Service"**
6. Wait for deployment (2-5 minutes)
7. Get your backend URL: https://your-service.render.com

**Important:** Add this URL to frontend `.env` before deploying frontend.

### Step 2: Deploy Frontend on Vercel

**Create Account:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Connect your GitHub account

**Deploy Frontend:**
1. Click **"New Project"**
2. Import your frontend repository
3. Fill in configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Add environment variables:
   - **VITE_API_URL**: https://your-service.render.com/api

5. Click **"Deploy"**
6. Wait for deployment (2-5 minutes)
7. Your frontend is live! 🎉

**Frontend URL:** https://your-project.vercel.app

### Step 3: Verify Deployment

1. Visit your frontend URL
2. Try login with admin credentials
3. Create a new job
4. Verify it appears in jobs list
5. Test all features

## 📝 API Endpoints

### Authentication
```
POST /api/auth/login
Body: { email, password }
Response: { token, admin }
```

### Jobs (Public)
```
GET /api/jobs
Query: ?search=&category=&location=&experience=&featured=&page=1&limit=12
Response: { data: [], pagination: {} }

GET /api/jobs/:id
Response: { data: { ... } }
```

### Jobs (Protected - Admin Only)
```
POST /api/jobs
Headers: Authorization: Bearer <token>
Body: { title, company, location, salary, experience, category, description, apply_link, company_logo, featured }
Response: { data: { ... } }

PUT /api/jobs/:id
Headers: Authorization: Bearer <token>
Body: { ...job fields }
Response: { data: { ... } }

DELETE /api/jobs/:id
Headers: Authorization: Bearer <token>
Response: { message: "Job deleted successfully" }
```

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected admin routes
- ✅ CORS enabled
- ✅ Environment variables for secrets
- ✅ Token expiry (7 days)
- ✅ Input validation

## 📦 Database Schema

### admins table
```sql
- id: BIGSERIAL PRIMARY KEY
- email: VARCHAR(255) UNIQUE
- password: VARCHAR(255) (hashed)
- created_at: TIMESTAMP
```

### jobs table
```sql
- id: BIGSERIAL PRIMARY KEY
- title: VARCHAR(255)
- company: VARCHAR(255)
- location: VARCHAR(255)
- salary: VARCHAR(100)
- experience: VARCHAR(100)
- category: VARCHAR(100)
- description: TEXT
- apply_link: VARCHAR(500)
- company_logo: VARCHAR(500) (optional)
- featured: BOOLEAN (default: false)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## 🎨 Features

### Public Features
- 📋 Browse all job listings
- 🔍 Search jobs by title, company, description
- 📊 Filter by category, location, experience level
- ⭐ See featured jobs section
- 📰 See latest job postings
- 👁️ View detailed job information
- 📱 Fully responsive mobile design
- 🎯 Modern, clean UI

### Admin Features
- 🔐 Secure login with JWT
- ➕ Create new job listings
- ✏️ Edit existing listings
- 🗑️ Delete listings
- ⭐ Mark jobs as featured
- 📊 View dashboard with stats
- 🖼️ Upload company logos
- 👤 Secure logout

## 🛠️ Troubleshooting

### Backend won't start
```
Error: PORT already in use
Solution: Kill the process on port 5000
Windows: netstat -ano | findstr :5000 -> taskkill /PID <PID> /F
Mac/Linux: lsof -i :5000 -> kill -9 <PID>
```

### Database connection error
```
Error: Missing Supabase URL or Key
Solution: Check .env file has correct SUPABASE_URL and SUPABASE_KEY
```

### Login fails
```
Error: Invalid credentials
Solution: Verify admin account exists in database
- Go to Supabase → Table Editor → admins
- Check if email exists and password is hashed
```

### Frontend can't connect to backend
```
Error: CORS error or failed requests
Solution: 
1. Check backend is running (http://localhost:5000/api/health)
2. Verify VITE_API_URL is correct in .env
3. Check backend has CORS enabled
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)

## 👨‍💻 Default Admin Credentials

```
Email: admin@gmail.com
Password: admin123
```

**⚠️ IMPORTANT**: Change these credentials after first login in production!

## 📄 License

This project is free to use and modify.

## 🤝 Support

For issues or questions:
1. Check this README first
2. Check error messages in console
3. Verify .env files are correct
4. Ensure all dependencies are installed

---

**Happy Coding! 🚀**

Built with ❤️ for job seekers and employers.
