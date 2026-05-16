# Troubleshooting Guide - JobAlert Portal

Common issues and their solutions.

## 🚨 Installation Issues

### Issue: npm install fails

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution:**
```bash
# Option 1: Force installation
npm install --legacy-peer-deps

# Option 2: Use npm ci (clean install)
npm ci

# Option 3: Clear cache and retry
npm cache clean --force
npm install
```

### Issue: Node version incompatible

**Error:**
```
The engine "node" is incompatible with this package
```

**Solution:**
```bash
# Check Node version
node --version

# Should be v16 or higher
# Update Node from https://nodejs.org/
```

---

## 🔧 Backend Issues

### Issue: Backend won't start

**Error:**
```
listen EADDRINUSE: address already in use :::5000
```

**Solution (Windows):**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Then start backend again
npm run dev
```

**Solution (Mac/Linux):**
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Issue: Database connection error

**Error:**
```
Error: Missing Supabase URL or Key
```

**Solution:**
```bash
# 1. Check .env file exists in backend folder
# 2. Verify values are not empty:
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key

# 3. No spaces around = sign
# 4. No quotes around values
# 5. Restart backend
npm run dev
```

### Issue: JWT token verification fails

**Error:**
```
Invalid or expired token
```

**Solution:**
```bash
# 1. Ensure JWT_SECRET is set in .env
JWT_SECRET=your_secret_key_here

# 2. Secret must be at least 32 characters
# 3. Generate new secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 4. Restart backend
npm run dev
```

### Issue: Admin not found in database

**Error:**
```
Invalid credentials (when logging in)
```

**Solution:**
```
# 1. Go to Supabase console
# 2. Open Table Editor
# 3. Check "admins" table exists
# 4. Check admin@gmail.com entry exists
# 5. If not, it will be created automatically on first backend start
# 6. Wait 2-3 seconds for database to seed
# 7. Then try login again
```

---

## 🌐 Frontend Issues

### Issue: Frontend won't start

**Error:**
```
VITE v5.0.0  ready in XXX ms
Error: EADDRINUSE: address already in use :::5173
```

**Solution:**
```bash
# Kill process on port 5173
# Windows: netstat -ano | findstr :5173, taskkill /PID <PID> /F
# Mac/Linux: lsof -i :5173, kill -9 <PID>

# Or use different port:
npm run dev -- --port 5174
```

### Issue: API connection error

**Error:**
```
[CORS Error] or "Failed to fetch"
```

**Solution:**
1. **Check VITE_API_URL in .env:**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

2. **No trailing slash**

3. **Backend must be running:**
   ```bash
   # In different terminal
   cd backend
   npm run dev
   ```

4. **Test backend:**
   ```bash
   curl http://localhost:5000/api/health
   ```

5. **Clear browser cache:**
   - Press F12 → Application → Clear storage

### Issue: Blank page on load

**Error:**
```
No errors in console but blank page
```

**Solution:**
```bash
# 1. Check if frontend is running
# 2. Open browser console (F12)
# 3. Check for errors
# 4. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
# 5. Clear LocalStorage:
#    F12 → Application → LocalStorage → Clear All
# 6. Restart frontend:
npm run dev
```

### Issue: Components not rendering

**Error:**
```
undefined is not a function
Component not found
```

**Solution:**
```bash
# 1. Check all imports are correct
# 2. Verify component file exists
# 3. Check file naming (case-sensitive on Linux/Mac)
# 4. Restart dev server: Ctrl+C, npm run dev
```

---

## 🔐 Authentication Issues

### Issue: Can't login

**Error:**
```
Invalid credentials
```

**Troubleshooting:**
1. Use correct credentials:
   - Email: `admin@gmail.com`
   - Password: `admin123`

2. Check database:
   - Go to Supabase
   - Table Editor → admins
   - Verify email exists

3. Check backend is running:
   ```bash
   curl http://localhost:5000/api/health
   ```

4. Test login endpoint:
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@gmail.com","password":"admin123"}'
   ```

### Issue: Token not saving

**Error:**
```
Logged in but page still shows login screen
```

**Solution:**
```javascript
// Check localStorage
// Open browser console (F12)
localStorage.getItem('token')

// If empty, check:
// 1. Login response returns token
// 2. Frontend stores it: localStorage.setItem('token', response.token)
// 3. Check useAuthStore is working
```

### Issue: Protected routes not working

**Error:**
```
Redirected to login even with valid token
```

**Solution:**
```javascript
// 1. Verify ProtectedRoute component in App.jsx
// 2. Check localStorage has token:
const token = localStorage.getItem('token')

// 3. Clear cache and try again:
// F12 → Application → Clear Storage

// 4. Check token not expired (7 days)
```

---

## 💾 Database Issues

### Issue: Tables don't exist

**Error:**
```
relation "jobs" does not exist
```

**Solution:**
1. Go to Supabase console
2. Click "SQL Editor"
3. Click "New Query"
4. Paste entire `database_schema.sql`
5. Click "Run"
6. Verify tables in Table Editor

### Issue: No sample data

**Error:**
```
Job list is empty
```

**Solution:**
1. The schema includes sample data
2. Check Table Editor → jobs table
3. If empty, run SQL again to re-seed
4. Or manually insert data via Table Editor

### Issue: Can't connect to database

**Error:**
```
Connection refused or timeout
```

**Solution:**
1. **Check Supabase status:**
   - Visit supabase.com
   - Check if service is down

2. **Verify credentials:**
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your_anon_key_not_service_role_key
   ```

3. **Check network:**
   - Internet connection working?
   - Firewall blocking?
   - VPN connected?

---

## 🌐 Network Issues

### Issue: CORS error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Backend has CORS enabled (automatic)
2. Check `VITE_API_URL` is correct
3. Ensure backend is running
4. Clear browser cache: Ctrl+Shift+Delete

### Issue: SSL/TLS Certificate error (Production)

**Error:**
```
SSL_ERROR_BAD_CERT_DOMAIN
```

**Solution:**
1. Vercel/Render handle certificates automatically
2. Wait 24 hours for propagation
3. Clear browser cache
4. Try incognito mode

---

## 🛠️ Development Issues

### Issue: Hot reload not working

**Error:**
```
Changes not reflected on save
```

**Solution:**
```bash
# 1. Make sure frontend is running in dev mode:
npm run dev

# 2. Check file saved properly
# 3. Restart dev server:
# Ctrl+C, npm run dev

# 4. Clear browser cache: Ctrl+Shift+R
```

### Issue: Cannot find module

**Error:**
```
Cannot find module 'react' or other package
```

**Solution:**
```bash
# 1. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 2. Or just install missing package
npm install react

# 3. Restart dev server
```

### Issue: Port already in use

**Error:**
```
Port 5000 or 5173 already in use
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :<PORT>
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :<PORT>
kill -9 <PID>

# Or use different port
npm run dev -- --port 5174
```

---

## 📊 Deployment Issues

### Issue: Frontend deployment fails

**Error:**
```
Build failed or deployment error
```

**Solution:**
1. **Check build works locally:**
   ```bash
   npm run build
   ```

2. **Verify VITE_API_URL is set in Vercel:**
   - Settings → Environment Variables
   - Add `VITE_API_URL=https://your-backend.render.com/api`

3. **Check package.json:**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Root directory: `./frontend`

### Issue: Backend deployment fails

**Error:**
```
Build or runtime error on Render
```

**Solution:**
1. **Check logs in Render dashboard:**
   - Logs tab shows error details

2. **Verify environment variables:**
   - SUPABASE_URL
   - SUPABASE_KEY
   - JWT_SECRET

3. **Ensure package.json exists:**
   - With scripts: `start` and `dev`

4. **Test locally first:**
   ```bash
   npm run dev
   # Should work before deploying
   ```

### Issue: Database not accessible after deployment

**Error:**
```
Cannot connect to database in production
```

**Solution:**
1. **Verify Supabase credentials in Render:**
   - Environment Variables
   - Check for typos

2. **Check network access:**
   - Supabase should allow all IPs by default
   - For custom restrictions, whitelist Render IPs

3. **Test with curl:**
   ```bash
   curl https://your-backend.render.com/api/health
   ```

---

## 📞 Still Having Issues?

### Debugging Steps

1. **Check browser console (F12):**
   - See what errors appear
   - Copy full error message

2. **Check backend console:**
   - Terminal where you ran `npm run dev`
   - Look for error logs

3. **Check Supabase logs:**
   - Supabase dashboard → Logs

4. **Verify .env files:**
   - All values present
   - No extra spaces or quotes
   - Correct URLs and keys

5. **Restart everything:**
   - Stop all processes (Ctrl+C)
   - Close all browsers
   - Restart from scratch

### Getting Help

1. **Read the main README.md**
2. **Check QUICK_START.md**
3. **Review DEPLOYMENT.md**
4. **Check API.md for endpoint issues**
5. **Search online for the error message**

---

## ✅ Verification Checklist

- [ ] Node.js v16+ installed
- [ ] npm installed
- [ ] Supabase project created
- [ ] Database tables created
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] Backend running (port 5000)
- [ ] Frontend running (port 5173)
- [ ] Can login with admin credentials
- [ ] Can create a job
- [ ] Can view jobs
- [ ] Can logout

**If all checked: You're ready to deploy!** 🚀

---

**For quick fixes, search this page for your error message.**
