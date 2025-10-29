# Quick Upgrade Reference Guide

## For Developers Working on This Codebase

### Backend (Node.js/Express)

#### Import Syntax
```javascript
// ✅ Correct (ES Modules)
import express from 'express';
import User from './models/user.model.js';
import { someFunction, anotherFunction } from './utils/helpers.js';

// ❌ Wrong (Old CommonJS - Don't use)
const express = require('express');
const User = require('./models/user.model');
```

#### Export Syntax
```javascript
// ✅ Default export
export default functionName;

// ✅ Named exports
export { func1, func2, func3 };

// ❌ Wrong (Old CommonJS - Don't use)
module.exports = functionName;
module.exports = { func1, func2 };
```

#### Important Rules
1. **Always include `.js` extension** in local imports:
   ```javascript
   import User from './models/user.model.js'; // ✅
   import User from './models/user.model';    // ❌
   ```

2. **Use `__dirname` polyfill** if needed:
   ```javascript
   import { fileURLToPath } from 'url';
   import { dirname } from 'path';
   
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);
   ```

3. **No `require()` calls** - Use `import` only

### Frontend (React 18)

#### Component Structure
```javascript
// ✅ Correct (React 18+)
import { useState, useEffect } from 'react';

function MyComponent() {
  const [state, setState] = useState(null);
  // ... component logic
  return <div>...</div>;
}

export default MyComponent;
```

```javascript
// ❌ Wrong (Old pattern - Don't use)
import React, { useState, useEffect } from 'react';
```

#### Why No React Import?
React 18 uses the **automatic JSX transform**. You no longer need to import React in every component unless:
- You're using `React.createElement()` directly
- You're using `React.Fragment` explicitly
- You're accessing React methods like `React.memo()`, `React.forwardRef()`, etc.

In those cases, import only what you need:
```javascript
import { memo, forwardRef } from 'react';
```

### Package Management

#### Installing New Packages

**Backend:**
```bash
cd backend
npm install package-name
```

**Frontend:**
```bash
cd frontend
npm install package-name
```

#### Updating Dependencies
```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all packages (be careful!)
npm update
```

### Common Patterns

#### API Calls (Frontend)
```javascript
import axios from 'axios';
import { BASE_URL } from '../config/backend_url';

// ✅ With authorization
const response = await axios.get(`${BASE_URL}/endpoint`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// ✅ POST with data
const response = await axios.post(`${BASE_URL}/endpoint`, data, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### Controller Pattern (Backend)
```javascript
import Model from '../../models/model.name.js';

const controllerFunction = async (req, res) => {
  try {
    // Business logic here
    const result = await Model.findOne({ _id: req.params.id });
    return res.json(result);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export default controllerFunction;
// or
export { func1, func2, func3 };
```

#### Route Pattern (Backend)
```javascript
import express from 'express';
import authenticateToken from '../middleware/auth.middleware.js';
import Controller from '../controllers/controller.file.js';

const router = express.Router();

router.get('/endpoint', authenticateToken, Controller);

export default router;
```

### Debugging Tips

#### Backend Errors

**"Cannot use import statement outside a module"**
- Check: `package.json` has `"type": "module"`
- Check: All imports use `.js` extension for local files

**"Cannot find module"**
- Add `.js` extension to import path
- Verify file exists at specified path
- Check case sensitivity (file names are case-sensitive)

**"__dirname is not defined"**
- Add the `__dirname` polyfill at top of file:
  ```javascript
  import { fileURLToPath } from 'url';
  import { dirname } from 'path';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  ```

#### Frontend Errors

**React errors after upgrade**
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

**Vite build errors**
- Check `vite.config.js` syntax
- Ensure all dependencies are latest versions

### Environment Setup

#### Required Node Version
- **Node.js 18.x or higher** recommended for ES modules support
- Check version: `node --version`

#### Environment Variables
No changes needed! All existing `.env` files work as-is.

### Key Differences From Old Code

| Old Pattern | New Pattern | Why? |
|------------|-------------|------|
| `require()` | `import` | ES modules standard |
| `module.exports` | `export default` | ES modules syntax |
| No `.js` extension | Always `.js` | Required for ES modules |
| `import React` | No import needed | Auto JSX transform |
| Mongoose deprecated options | Removed | Now defaults |

### When to Use What

#### Named vs Default Exports

**Use Default Export** when:
- Exporting a single function/component
- It's the main export of the file
```javascript
export default MyComponent;
```

**Use Named Exports** when:
- Exporting multiple functions
- Exporting utility functions
```javascript
export { func1, func2, func3 };
```

**Importing Named Exports:**
```javascript
import { func1, func2 } from './file.js';
```

### Testing After Changes

Always test:
1. ✅ Backend starts: `npm start`
2. ✅ Frontend builds: `npm run dev`
3. ✅ No console errors
4. ✅ All routes work
5. ✅ Authentication works
6. ✅ Database operations work

---

## Quick Commands Reference

### Development
```bash
# Backend
cd backend && npm start

# Frontend  
cd frontend && npm run dev

# Both (in separate terminals)
```

### Build for Production
```bash
# Frontend only
cd frontend && npm run build

# Preview production build
cd frontend && npm run preview
```

### Linting
```bash
cd frontend && npm run lint
```

---

## Need Help?

1. Check `MIGRATION_SUMMARY.md` for detailed changes
2. Review error messages carefully
3. Ensure all `.js` extensions are present
4. Verify `package.json` has `"type": "module"` (backend only)
5. Clear and reinstall node_modules if issues persist

---

**Last Updated:** October 29, 2025
