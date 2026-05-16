# Deployment Guide - JobAlert Portal

Complete step-by-step guide to deploy your JobAlert Portal to production (FREE hosting).

## 🎯 Deployment Overview

```
┌─────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Frontend          Backend           Database          │
│  ────────          ───────           ────────          │
│  Vercel            Render            Supabase         │
│  (React/Vite)      (Node/Express)    (PostgreSQL)     │
│  vercel.app        render.com        supabase.co      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 📋 Pre-Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database tables and sample data inserted
- [ ] Backend `.env` file configured
- [ ] Frontend `.env` file configured
- [ ] GitHub account created
- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Vercel account created

## 🔗 Step 1: Setup GitHub Repository

### If you don't have Git set up:

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: JobAlert Portal"

# Add remote repository (replace USERNAME and REPO)
git remote add origin https://github.com/USERNAME/job-alert-portal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### If you already have a repo:

```bash
git add .
git commit -m "Add JobAlert Portal code"
git push origin main
```

## 🖥️ Step 2: Deploy Backend on Render

### 2.1 Create Render Account

1. Go to **[render.com](https://render.com)**
2. Click **"Sign up"** → Choose **"GitHub"**
3. Authorize Render to access your GitHub
4. Complete profile setup

### 2.2 Create Backend Service

1. Click **"New +"** → **"Web Service"**
2. Select your GitHub repository
3. Fill in configuration:

```
Name:                    job-alert-portal-backend
Environment:            Node
Build Command:          npm install
Start Command:          npm start
Plan:                   Free
```

### 2.3 Add Environment Variables

1. Scroll to **"Environment"** section
2. Add these variables:

```
PORT                    5000
JWT_SECRET             (Generate a long random string)
SUPABASE_URL           (Copy from Supabase settings)
SUPABASE_KEY           (Copy from Supabase settings)
```

**How to generate JWT_SECRET:**
- Use an online tool: https://www.uuidgenerator.net/
- Or run in terminal: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (2-5 minutes)
3. Once deployed, you'll see a URL like: `https://job-alert-portal-backend-xxxx.render.com`
4. **Copy this URL** - you'll need it for frontend

### 2.5 Test Backend

```bash
curl https://job-alert-portal-backend-xxxx.render.com/api/health
```

Expected response: `{"message":"Backend is running"}`

## 🌐 Step 3: Deploy Frontend on Vercel

### 3.1 Create Vercel Account

1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign up"** → Choose **"GitHub"**
3. Authorize Vercel and complete setup

### 3.2 Add Backend URL to Frontend

Before deploying, update frontend `.env`:

```
VITE_API_URL=https://your-backend-url.render.com/api
```

Push this change:

```bash
git add frontend/.env
git commit -m "Update API URL for production"
git push origin main
```

### 3.3 Create Frontend Project

1. Click **"Add New"** → **"Project"**
2. Import your GitHub repository
3. Configure project:

```
Framework Preset:      Vite
Build Command:         npm run build
Output Directory:      dist
Root Directory:        ./frontend
```

### 3.4 Add Environment Variables

1. Click **"Environment Variables"**
2. Add variable:

```
VITE_API_URL    https://your-backend-url.render.com/api
```

### 3.5 Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Get your frontend URL: `https://your-project.vercel.app`

## ✅ Step 4: Verify Deployment

### Test Frontend

1. Open: **https://your-project.vercel.app**
2. You should see the home page
3. Try logging in:
   - Email: `admin@gmail.com`
   - Password: `admin123`
4. Test admin features:
   - Create a new job
   - Edit a job
   - Delete a job
5. Browse public features:
   - Search jobs
   - Filter jobs
   - View job details

### Test Backend API

```bash
# Test health check
curl https://your-backend.render.com/api/health

# Test get jobs
curl https://your-backend.render.com/api/jobs

# Test login
curl -X POST https://your-backend.render.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"admin123"}'
```

## 🔄 Step 5: Update Domain (Optional)

### Vercel Custom Domain

1. Go to Vercel dashboard → Your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS setup instructions
5. Wait 24-48 hours for propagation

### Render Custom Domain

1. Go to Render dashboard → Backend service
2. Click **"Settings"** → **"Custom Domain"**
3. Add your custom domain
4. Follow DNS setup instructions

## 🔐 Production Security Checklist

- [ ] Change admin password in Supabase
- [ ] Update JWT_SECRET to a strong random value
- [ ] Enable HTTPS (automatic on Vercel & Render)
- [ ] Review CORS settings in backend
- [ ] Set up database backups
- [ ] Monitor error logs
- [ ] Set up error tracking (Sentry)

## 📊 Monitoring & Logs

### Vercel Logs

1. Go to Vercel dashboard → Project
2. Click **"Deployments"** tab
3. Click on deployment → **"Logs"**

### Render Logs

1. Go to Render dashboard → Backend service
2. Click **"Logs"** tab in top menu
3. See real-time logs

## 🆘 Deployment Troubleshooting

### Backend Deploy Fails

**Error**: Build command failed
- Solution: Check `npm install` works locally
- Ensure `package.json` exists in backend folder

**Error**: Runtime error after deploy
- Solution: Check environment variables in Render
- Check Render logs for errors

### Frontend Deploy Fails

**Error**: Build failed
- Solution: Check `npm run build` works locally
- Ensure all dependencies are in `package.json`

**Error**: Frontend can't connect to backend
- Solution: Verify `VITE_API_URL` is correct
- Check backend is running
- Check CORS is enabled in backend

### Database Issues

**Error**: Database connection error
- Solution: Verify Supabase credentials
- Check network connectivity
- Ensure database tables exist

## 🚀 Continuous Deployment

Both Vercel and Render automatically deploy when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Add new feature"
git push origin main

# Automatically deployed to production within 1-2 minutes!
```

## 📈 Performance Tips

1. **Database**
   - Use indexes (already added in schema)
   - Monitor query performance

2. **Frontend**
   - Enable Vercel's image optimization
   - Use code splitting
   - Monitor bundle size

3. **Backend**
   - Enable caching headers
   - Use pagination for large datasets
   - Monitor API response times

## 🔄 Rollback Strategy

If deployment has issues:

### Vercel
1. Go to **"Deployments"** tab
2. Click previous deployment
3. Click **"Redeploy"**

### Render
1. Go to **"Deploy"** tab
2. Click previous deployment
3. Choose **"Redeploy"**

## 📞 Support Links

- **Render Support**: https://render.com/docs
- **Vercel Support**: https://vercel.com/docs
- **Supabase Support**: https://supabase.com/docs
- **GitHub Issues**: Check your repository issues

## 🎉 You're Live!

Your JobAlert Portal is now live in production!

### Share your URL

- Frontend: **https://your-project.vercel.app**
- Backend API: **https://your-backend.render.com/api**

### Next Steps

1. Add more sample jobs to your database
2. Customize branding and styling
3. Set up custom domain
4. Monitor performance and errors
5. Add more features (notifications, recommendations, etc.)

---

**Congratulations on deploying your JobAlert Portal! 🚀**
