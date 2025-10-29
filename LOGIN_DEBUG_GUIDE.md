# 🔍 Login Issue Debugging Guide

## Quick Fixes to Try:

### 1. **Check if Backend Server is Running**

Open a terminal and run:
```bash
cd backend
npm start
```

You should see:
```
server is running in http://localhost:4518
MongoDB Connected: ac-9f5ik2r-shard-00-02.cjumrud.mongodb.net
```

If not running, start it first!

---

### 2. **Check Frontend is Running**

Open another terminal:
```bash
cd frontend
npm run dev
```

You should see:
```
Local: http://localhost:5173/
```

---

### 3. **Clear Browser Cache & Local Storage**

In your browser (usually F12):
1. Open **Developer Tools** (F12)
2. Go to **Application** tab
3. Click **Local Storage** → **http://localhost:5173**
4. Click **Clear All**
5. **Refresh the page** (Ctrl + Shift + R)

---

### 4. **Check Browser Console for Errors**

1. Open **Developer Tools** (F12)
2. Go to **Console** tab
3. Try logging in again
4. Look for errors (red text)

**Common Errors & Solutions:**

#### Error: "Network Error" or "ERR_CONNECTION_REFUSED"
**Solution:** Backend server is not running
```bash
cd backend
npm start
```

#### Error: "CORS policy" or "Access-Control-Allow-Origin"
**Solution:** Already handled in your backend, but verify backend is running on port 4518

#### Error: "401 Unauthorized" or "Credentials Not Matched"
**Solution:** Check email and password are correct

#### Error: Loading screen never ends
**Solution:** Clear local storage and refresh

---

### 5. **Test Login API Directly**

Use this in your browser console (F12):

```javascript
// Test if backend is reachable
fetch('http://localhost:4518/student/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'your-email@example.com',
    password: 'your-password'
  })
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));
```

Replace `your-email@example.com` and `your-password` with actual credentials.

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 6. **Verify Database Connection**

Check backend terminal for:
```
MongoDB Connected: ac-9f5ik2r-shard-00-02.cjumrud.mongodb.net
```

If you see connection errors, check:
- Internet connection
- MongoDB Atlas credentials
- `.env` file has correct `MONGODB_URI`

---

### 7. **Check .env File**

Verify your `backend/.env` has:
```env
PORT=4518
MONGODB_URI=mongodb+srv://...
JWT_SECRET=aknsjwhbcgvbvhjv
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

### 8. **Hard Refresh Everything**

1. **Stop both servers** (Ctrl + C in both terminals)
2. **Clear browser cache** (Ctrl + Shift + Delete)
3. **Clear local storage** (F12 → Application → Clear)
4. **Restart backend**: `cd backend && npm start`
5. **Restart frontend**: `cd frontend && npm run dev`
6. **Open in new incognito window**: Ctrl + Shift + N
7. Try logging in again

---

## Most Common Issue: Loading Screen Stuck

If you see the loading screen forever after clicking login:

### Solution 1: Clear Local Storage
```javascript
// Run this in browser console (F12):
localStorage.clear();
location.reload();
```

### Solution 2: Check ProtectedRoute
The issue might be in the ProtectedRoute component. It's already fixed in the latest code.

---

## Test with Default Credentials

If you have a test student account:
```
Email: student@test.com
Password: password123
```

Make sure this user exists in your database with:
- role: "student"
- Password hashed with bcrypt
- isProfileCompleted: true

---

## Create Test User (If needed)

Run this in MongoDB or use Signup:
1. Go to `/student/signup`
2. Create new account
3. Wait for TPO approval (if required)
4. Try logging in

---

## Quick Checklist:

- [ ] Backend running on http://localhost:4518
- [ ] Frontend running on http://localhost:5173
- [ ] MongoDB connected successfully
- [ ] Browser console shows no errors
- [ ] Local storage cleared
- [ ] Using correct email and password
- [ ] User exists in database
- [ ] User role is "student"

---

## If Still Not Working:

### Check Backend Logs

When you click login, you should see in backend terminal:
```
student.login.controller.js => (any error here)
```

### Check Network Tab

1. Open **Developer Tools** (F12)
2. Go to **Network** tab
3. Click **Login**
4. Look for the request to `/student/login`
5. Click on it to see:
   - Request payload (email, password)
   - Response (token or error message)
   - Status code (200 = success, 400/500 = error)

---

## Contact Points:

If nothing works, provide:
1. Screenshot of browser console (F12)
2. Screenshot of backend terminal
3. Screenshot of network tab
4. What happens when you click login

---

**Most likely fix: Clear local storage and restart both servers!** 🚀
