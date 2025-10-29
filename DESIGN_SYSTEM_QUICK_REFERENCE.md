# Design System Quick Reference Card 🎨

## 🎯 **Quick Color Reference**

```css
/* Primary (Navy Blue) */
--primary-600: #3b4ef5    /* Main buttons, links */
--primary-700: #2d3bd8    /* Hover states */

/* Neutral (Gray) */
--neutral-50: #f8fafc     /* Background */
--neutral-600: #475569    /* Body text */
--neutral-900: #0f172a    /* Headings */

/* Semantic */
--success-600: #16a34a    /* ✓ Hired, Success */
--warning-600: #d97706    /* ⏳ Pending, Warning */
--error-600: #dc2626      /* ✗ Rejected, Error */
--info-600: #2563eb       /* ℹ Interview, Info */
```

---

## 🧩 **Ready-to-Use Components**

### **1. Card**
```jsx
<div className="card p-6">
  <h3>Your Title</h3>
  <p>Your content here...</p>
</div>
```

### **2. Primary Button**
```jsx
<button className="btn-primary">
  Click Me
</button>
```

### **3. Secondary Button**
```jsx
<button className="btn-secondary">
  Cancel
</button>
```

### **4. Input Field**
```jsx
<input className="input-field" type="text" placeholder="Enter text" />
```

### **5. Badges**
```jsx
<span className="badge badge-success">Hired</span>
<span className="badge badge-primary">Interview</span>
<span className="badge badge-warning">Pending</span>
<span className="badge badge-error">Rejected</span>
```

### **6. Professional Table**
```jsx
<table className="table-professional">
  <thead>
    <tr><th>Name</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>John</td><td>Active</td></tr>
  </tbody>
</table>
```

### **7. Page Header**
```jsx
<div className="page-header">
  <h1>Dashboard</h1>
  <p>Welcome back!</p>
</div>
```

### **8. Loading Spinner**
```jsx
<div className="spinner"></div>
```

---

## 🎨 **Common Patterns**

### **Dashboard Stat Card**
```jsx
<div className="card p-6">
  <div className="flex items-center gap-3 mb-3">
    <div className="bg-primary-100 p-3 rounded-lg">
      <i className="fa-solid fa-users text-primary-600"></i>
    </div>
    <h3 className="text-lg font-semibold">Total Students</h3>
  </div>
  <p className="text-3xl font-bold text-primary-600">1,234</p>
</div>
```

### **Form Section**
```jsx
<div className="card p-6">
  <h3 className="text-lg font-bold text-neutral-900 mb-4">Section Title</h3>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="text-sm font-semibold text-neutral-700 mb-2 block">
        Label
      </label>
      <input className="input-field" type="text" />
    </div>
  </div>
</div>
```

### **Action Bar**
```jsx
<div className="flex justify-between items-center mb-6">
  <h2 className="text-2xl font-bold text-neutral-900">Page Title</h2>
  <div className="flex gap-3">
    <button className="btn-secondary">Cancel</button>
    <button className="btn-primary">Save</button>
  </div>
</div>
```

---

## 📏 **Spacing Scale**

```
xs:  0.25rem (4px)
sm:  0.5rem  (8px)
md:  1rem    (16px)
lg:  1.5rem  (24px)
xl:  2rem    (32px)
2xl: 3rem    (48px)
```

**Usage:**
```jsx
p-4    /* padding: 1rem (16px) */
p-6    /* padding: 1.5rem (24px) */
gap-4  /* gap: 1rem (16px) */
m-4    /* margin: 1rem (16px) */
```

---

## 🔤 **Typography Scale**

```jsx
/* Headings */
text-3xl font-bold    /* 1.875rem (30px) - Main page title */
text-2xl font-bold    /* 1.5rem (24px) - Section headers */
text-xl font-semibold /* 1.25rem (20px) - Card titles */
text-lg font-semibold /* 1.125rem (18px) - Subheadings */

/* Body */
text-base             /* 1rem (16px) - Large body text */
text-sm               /* 0.875rem (14px) - Normal text */
text-xs               /* 0.75rem (12px) - Small text */
```

---

## 🎭 **Status Colors**

```jsx
/* Job Application Status */
{status === 'hired' && 'badge-success'}
{status === 'interview' && 'badge-primary'}
{status === 'applied' && 'badge-warning'}
{status === 'rejected' && 'badge-error'}
```

---

## ✨ **Common Hover Effects**

```jsx
/* Card Hover */
hover:shadow-xl hover:-translate-y-1 transition-all

/* Button Hover */
hover:bg-primary-700 hover:shadow-lg transition-all

/* Link Hover */
hover:text-primary-700 transition-colors
```

---

## 📦 **Layout Patterns**

### **Two Column Grid**
```jsx
<div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

### **Three Column Grid**
```jsx
<div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### **Flex Row with Gap**
```jsx
<div className="flex items-center gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## 🎨 **Color Utility Classes**

```jsx
/* Text Colors */
text-primary     /* Navy blue text */
text-success     /* Green text */
text-warning     /* Amber text */
text-error       /* Red text */
text-muted       /* Gray text */

/* Background Colors */
bg-primary       /* Navy blue background */
bg-success       /* Green background */
bg-light         /* Light gray background */
```

---

## 🚀 **Copy-Paste Examples**

### **Example 1: Job Card**
```jsx
<div className="card p-6 hover:shadow-xl transition-all">
  <div className="flex justify-between items-start mb-4">
    <div>
      <h3 className="text-lg font-bold text-neutral-900">Software Engineer</h3>
      <p className="text-sm text-neutral-600">Google Inc.</p>
    </div>
    <span className="badge badge-success">Open</span>
  </div>
  <p className="text-sm text-neutral-600 mb-4">
    Looking for skilled developers with 2+ years experience...
  </p>
  <div className="flex gap-3">
    <button className="btn-primary">Apply Now</button>
    <button className="btn-secondary">View Details</button>
  </div>
</div>
```

### **Example 2: Student Info Card**
```jsx
<div className="card p-6">
  <div className="flex items-center gap-4 mb-4">
    <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
      JD
    </div>
    <div>
      <h3 className="text-lg font-bold text-neutral-900">John Doe</h3>
      <p className="text-sm text-neutral-600">CSE • Fourth Year</p>
    </div>
  </div>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="text-xs text-neutral-600">USN</label>
      <p className="font-semibold">1CR21CS001</p>
    </div>
    <div>
      <label className="text-xs text-neutral-600">CGPA</label>
      <p className="font-semibold text-primary-600">8.5</p>
    </div>
  </div>
</div>
```

### **Example 3: Data Table**
```jsx
<table className="table-professional">
  <thead>
    <tr>
      <th>Student Name</th>
      <th>USN</th>
      <th>Department</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>1CR21CS001</td>
      <td>CSE</td>
      <td><span className="badge badge-success">Active</span></td>
    </tr>
    <tr>
      <td>Jane Smith</td>
      <td>1CR21CS002</td>
      <td>ISE</td>
      <td><span className="badge badge-warning">Pending</span></td>
    </tr>
  </tbody>
</table>
```

---

## 💡 **Pro Tips**

1. **Always use theme classes** instead of custom colors
2. **Maintain consistent spacing** - use the spacing scale
3. **Add hover effects** to all interactive elements
4. **Use semantic badges** for status indicators
5. **Follow the typography scale** for text sizes
6. **Test responsiveness** with max-md: prefixes
7. **Combine classes** for complex styling

---

## 🎯 **Common Combinations**

```jsx
/* Professional Card with Hover */
className="card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"

/* Primary Action Button */
className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"

/* Form Input with Focus Ring */
className="input-field focus:ring-2 focus:ring-primary-500"

/* Responsive Grid */
className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1"

/* Flex Container with Spacing */
className="flex items-center justify-between gap-4 mb-6"
```

---

## 📚 **Quick Links**

- **Full Documentation:** `PROFESSIONAL_UI_ENHANCEMENT_GUIDE.md`
- **Theme File:** `frontend/src/styles/theme.css`
- **Main CSS:** `frontend/src/style/index.css`

---

## ⚡ **Common Tasks**

### **Change Button Color:**
```jsx
/* From */
<button className="bg-blue-500">Click</button>

/* To */
<button className="btn-primary">Click</button>
```

### **Style a Card:**
```jsx
/* From */
<div style={{background: 'white', padding: '20px'}}>Content</div>

/* To */
<div className="card p-6">Content</div>
```

### **Add Status Badge:**
```jsx
/* From */
<span style={{color: 'green'}}>Hired</span>

/* To */
<span className="badge badge-success">Hired</span>
```

---

**Remember:** Consistency is key! Use these patterns throughout the application for a unified look and feel. 🎨✨

**Last Updated:** October 29, 2025
