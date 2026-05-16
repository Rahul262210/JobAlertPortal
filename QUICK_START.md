# Quick Start Guide - JobAlert Portal

Get your JobAlert Portal running in 10 minutes!

## ⚡ Super Quick Setup (Local Development)

### Step 1: Clone/Download the Project

```bash
# Make sure you're in the project folder
cd "c:\Users\neela\Downloads\JOB NOTYFY"
```

### Step 2: Create Supabase Project (5 minutes)

1. Go to https://supabase.com → Click **"Start Your Project"**
2. Sign up → Create new project
3. Wait for project to initialize
4. Open SQL Editor → New Query → Copy-paste `database_schema.sql` → Run
5. Go to Settings → API → Copy **Project URL** and **Anon Key**

### Step 3: Setup Backend (2 minutes)

```bash
# Navigate to backend
cd backend

# Create .env file
copy .env.example .env

# Edit .env (open in any text editor):
# - PORT=5000
# - JWT_SECRET=put_any_random_long_string_here
# - SUPABASE_URL=paste_your_url_here
# - SUPABASE_KEY=paste_your_key_here

# Install dependencies
npm install

# Start backend
npm run dev
```

**✅ Backend running at:** `http://localhost:5000`

### Step 4: Setup Frontend (2 minutes)

```bash
# In new terminal, navigate to frontend
cd frontend

# Create .env file
copy .env.example .env

# Edit .env:
# - VITE_API_URL=http://localhost:5000/api

# Install dependencies
npm install

# Start frontend
npm run dev
```

**✅ Frontend running at:** `http://localhost:5173`

## 🎯 You're Done! Test It:

1. Open: **http://localhost:5173**
2. Click **"Admin Login"**
3. Use credentials:
   - Email: `admin@gmail.com`
   - Password: `admin123`
4. Click **"Fill Demo Credentials"** (auto-fills)
5. Click **"Login"**
6. **Welcome to Admin Dashboard!** 🎉

## ✨ Next Steps

### Create a New Job
1. Click **"+ Add Job"** button
2. Fill in all fields:
   - Title, Company, Location, Salary
   - Category, Experience Level
   - Job description (detailed)
   - Apply link
   - Optional: Company logo URL
3. Check **"Featured"** if you want
4. Click **"Create Job"**

### Browse Public Jobs
1. Open http://localhost:5173/jobs in new tab
2. See all jobs listed
3. Search for jobs
4. Filter by category, location, etc.
5. Click any job to see full details

### Logout & Test
1. Click **"Logout"** button
2. See home page
3. Try browsing jobs as a regular user

## 🚀 Deploy to Production

### Backend to Render (Free)

```bash
# Push to GitHub
git add .
git commit -m "Deploy backend"
git push origin main

# Go to Render.com
# 1. Click "New Web Service"
# 2. Select your repo
# 3. Set Start Command: npm start
# 4. Add environment variables (SUPABASE_URL, SUPABASE_KEY, JWT_SECRET)
# 5. Deploy
```

### Frontend to Vercel (Free)

```bash
# Update frontend .env with Render URL
VITE_API_URL=https://your-render-url/api

# Push to GitHub
git add .
git commit -m "Deploy frontend"
git push origin main

# Go to Vercel.com
# 1. Click "Add New Project"
# 2. Select your repo
# 3. Set Build: npm run build
# 4. Add VITE_API_URL env variable
# 5. Deploy
```

## 📁 File Structure Quick Reference

```
Frontend Files:
- pages/Home.jsx              ← Landing page
- pages/Jobs.jsx             ← Job listing page
- pages/JobDetail.jsx        ← Single job page
- pages/Dashboard.jsx        ← Admin dashboard
- pages/AddJob.jsx          ← Create job form
- pages/EditJob.jsx         ← Edit job form
- pages/Login.jsx           ← Admin login

Backend Files:
- src/server.js             ← Server entry point
- src/controllers/jobController.js        ← Job logic
- src/controllers/authController.js       ← Auth logic
- src/routes/jobs.js        ← Job endpoints
- src/routes/auth.js        ← Auth endpoints
```

## 🔑 API Endpoints Quick Reference

```bash
# Public Endpoints (No auth needed)

# Get all jobs
GET /api/jobs?search=react&category=frontend&page=1

# Get single job
GET /api/jobs/123

# Login (returns token)
POST /api/auth/login
{
  "email": "admin@gmail.com",
  "password": "admin123"
}

# Protected Endpoints (Need Authorization header)

# Create job
POST /api/jobs
Header: Authorization: Bearer <token>

# Update job
PUT /api/jobs/123
Header: Authorization: Bearer <token>

# Delete job
DELETE /api/jobs/123
Header: Authorization: Bearer <token>
```

## 🎨 Key Features

✅ **Public Features**
- Browse job listings
- Search by title/company
- Filter by category, location, experience
- View job details
- Responsive design
- Featured jobs section
- Latest jobs section

✅ **Admin Features**
- Secure login with JWT
- Create jobs
- Edit jobs
- Delete jobs
- Mark as featured
- View dashboard
- Add company logos

## 🛠️ Common Commands

```bash
# Backend
npm run dev              # Development mode (auto-reload)
npm start              # Production mode
npm install            # Install dependencies

# Frontend
npm run dev            # Development mode
npm run build          # Build for production
npm run preview        # Preview production build
npm install            # Install dependencies
```

## 🐛 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` |
| "Port 5000 in use" | Change PORT in .env |
| "API not found" | Ensure backend is running |
| "Database error" | Check Supabase URL and KEY in .env |
| "Login fails" | Check admin table in Supabase has data |
| "CORS error" | Backend CORS is enabled by default |

## 📞 Need Help?

1. Check **README.md** for detailed guide
2. Check **DEPLOYMENT.md** for deployment steps
3. Check error messages in browser console (F12)
4. Check backend console for error logs
5. Verify `.env` files have correct values

## 🎉 Success!

You now have a fully functional job notification website running locally!

**Next:** Deploy to production using DEPLOYMENT.md

---

**Happy coding! 🚀**
