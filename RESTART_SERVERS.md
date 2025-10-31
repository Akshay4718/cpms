# 🔄 Quick Server Restart Guide

## ⚠️ **CRITICAL: You MUST restart both servers!**

The changes won't work until you restart both backend and frontend.

---

## 🚀 **Option 1: Quick Restart (Recommended)**

### **Backend:**
```bash
# In your backend terminal:
# 1. Stop server: Press Ctrl+C
# 2. Wait for it to stop
# 3. Restart:
npm start
```

### **Frontend:**
```bash
# In your frontend terminal:
# 1. Stop server: Press Ctrl+C
# 2. Wait for it to stop
# 3. Restart:
npm start
```

---

## 🚀 **Option 2: Using nodemon (If Available)**

If you're using nodemon, it should auto-restart when you save files. But to be safe:

```bash
# Backend terminal: Ctrl+C then
npx nodemon server.js

# Frontend terminal: Ctrl+C then
npm start
```

---

## 🧹 **Option 3: Clean Restart (If Having Issues)**

### **Backend:**
```bash
# Stop server (Ctrl+C)
cd backend

# Clear any cached modules (optional but recommended)
rm -rf node_modules/.cache

# Restart
npm start
```

### **Frontend:**
```bash
# Stop server (Ctrl+C)
cd frontend

# Clear build cache
rm -rf .vite

# Restart
npm start
```

---

## ✅ **Verify Servers Started Correctly**

### **Backend Should Show:**
```
Server is running on port 4518
MongoDB connected successfully
```

### **Frontend Should Show:**
```
VITE v4.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🌐 **Then Clear Browser Cache**

**After restarting servers:**

```
1. Open your browser
2. Press: Ctrl + Shift + Delete
3. Select: Cached images and files
4. Time range: Last hour
5. Click: Clear data
```

**OR**

```
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select: "Empty Cache and Hard Reload"
```

---

## 🔍 **Quick Test After Restart**

### **Test 1: Backend API**
```
Open: http://localhost:4518/
Should show: API running message or 404
(This confirms backend is running)
```

### **Test 2: Frontend**
```
Open: http://localhost:5173/
Should show: Landing page
(This confirms frontend is running)
```

### **Test 3: Login**
```
1. Go to student login
2. Login with existing account
3. Should work normally
```

---

## 🐛 **Troubleshooting**

### **Problem: Port already in use**

**Backend (Port 4518):**
```bash
# Windows
netstat -ano | findstr :4518
taskkill /PID <PID_NUMBER> /F

# Then restart backend
npm start
```

**Frontend (Port 5173):**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Then restart frontend
npm start
```

### **Problem: "Cannot find module"**

```bash
# Reinstall dependencies
cd backend
npm install

cd frontend
npm install
```

### **Problem: Changes not reflecting**

```bash
# 1. Stop both servers
# 2. Clear browser cache completely
# 3. Close all browser tabs
# 4. Restart both servers
# 5. Open fresh browser window
```

---

## 📋 **Complete Restart Checklist**

- [ ] Stop backend server (Ctrl+C)
- [ ] Stop frontend server (Ctrl+C)
- [ ] Wait 5 seconds
- [ ] Start backend (npm start)
- [ ] Wait for "Server is running" message
- [ ] Start frontend (npm start)
- [ ] Wait for "ready in XXX ms" message
- [ ] Clear browser cache
- [ ] Close all browser tabs
- [ ] Open fresh tab: http://localhost:5173
- [ ] Login and test

---

## 🎯 **After Restart, Test These:**

### **1. Profile Redirect (Fix #1)**
```
1. Login as new student
2. Go to complete-profile
3. Fill form
4. Click Update
5. ✅ Should redirect to dashboard after 1 second
```

### **2. Auto-Shortlist (Fix #2)**
```
1. Create job with eligibility criteria
2. Student applies (meets criteria)
3. ✅ Should get "automatically shortlisted" message
4. ✅ Should appear in Shortlisted tab
```

---

## ⏱️ **Estimated Restart Time**

- Backend: ~5-10 seconds
- Frontend: ~10-20 seconds
- Browser cache clear: ~5 seconds
- **Total: ~30-45 seconds**

---

## 🎉 **Success!**

Once both servers are running and browser cache is cleared:

✅ All new code changes are active
✅ Auto-shortlist logic is working
✅ Profile redirect is fixed
✅ Ready to test!

---

## 💡 **Pro Tip**

Keep both terminal windows visible so you can see:
- Any errors that occur
- API requests being made
- Server status

**Good luck with testing!** 🚀
