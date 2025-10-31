# ✅ Academic Filters Feature - Manage Applicants

## 🎯 **Feature Added:**

TPO can now filter applicants by **CGPA, SSLC percentage, and PUC percentage** on the Manage Applicants page.

---

## 📋 **What's New:**

### **Filter Options:**

1. **CGPA Filter** (0-10 scale)
   - Minimum CGPA
   - Maximum CGPA

2. **SSLC Filter** (0-100%)
   - Minimum SSLC percentage
   - Maximum SSLC percentage

3. **PUC Filter** (0-100%)
   - Minimum PUC percentage
   - Maximum PUC percentage

---

## 🎨 **User Interface:**

### **Filter Section:**

```
╔══════════════════════════════════════════════════════════╗
║  🔍 Academic Filters                    [Clear Filters]  ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  🎓 CGPA (0-10)     🏫 SSLC/10th (%)    📚 PUC/12th (%) ║
║  [Min] - [Max]      [Min] - [Max]       [Min] - [Max]   ║
║  [7.0] - [9.0]      [60 ] - [100]       [65 ] - [100]   ║
║                                                          ║
║  Active Filters:                                         ║
║  • CGPA: 7.0 - 9.0                                      ║
║  • SSLC: 60% - 100%                                     ║
║  • PUC: 65% - 100%                                      ║
║  → Showing 15 of 50 applicants                          ║
╚══════════════════════════════════════════════════════════╝
```

---

## 🔧 **How It Works:**

### **CGPA Calculation:**

```javascript
// Automatically calculates from SGPA values
CGPA = (sem1 + sem2 + sem3 + ... + sem8) / number_of_semesters
```

**Example:**
```
Student SGPA:
  Sem 1: 7.5
  Sem 2: 7.8
  Sem 3: 7.2
  Sem 4: 7.6
  
CGPA = (7.5 + 7.8 + 7.2 + 7.6) / 4 = 7.525
```

### **Filter Logic:**

```javascript
// Each filter is a range
if (minCGPA or maxCGPA is set) {
  Filter: student.CGPA >= minCGPA AND student.CGPA <= maxCGPA
}

if (minSSLC or maxSSLC is set) {
  Filter: student.SSLC >= minSSLC AND student.SSLC <= maxSSLC
}

if (minPUC or maxPUC is set) {
  Filter: student.PUC >= minPUC AND student.PUC <= maxPUC
}

// All filters are AND conditions (must pass all active filters)
```

---

## 📖 **Usage Examples:**

### **Example 1: Find High Performers**

**Goal:** Find students with CGPA > 8.5 and both SSLC & PUC > 85%

**Steps:**
```
1. Go to Manage Applicants
2. Set filters:
   - CGPA: Min = 8.5, Max = 10
   - SSLC: Min = 85, Max = 100
   - PUC: Min = 85, Max = 100
3. Click outside or press Enter
4. Results automatically update
```

**Result:** Shows only students meeting ALL criteria

---

### **Example 2: Find Eligible for Company X**

**Goal:** Company requires CGPA ≥ 7.0, SSLC ≥ 60%, PUC ≥ 65%

**Steps:**
```
1. Set filters:
   - CGPA: Min = 7.0
   - SSLC: Min = 60
   - PUC: Min = 65
2. Leave Max fields empty (uses max values)
3. View filtered results
```

**Result:** Shows students eligible for Company X

---

### **Example 3: Find Students in Range**

**Goal:** Find average performers (CGPA between 6.5 and 7.5)

**Steps:**
```
1. Set filters:
   - CGPA: Min = 6.5, Max = 7.5
2. Leave other filters empty
3. View results
```

**Result:** Shows students with CGPA 6.5-7.5

---

## 🎯 **Features:**

### **1. Real-Time Filtering**
- ✅ Results update as you type
- ✅ No need to click "Apply" button
- ✅ Instant feedback

### **2. Clear Visual Feedback**
- ✅ Active filters shown as colored badges
- ✅ Shows count: "Showing X of Y applicants"
- ✅ Clear indication of applied filters

### **3. Easy Reset**
- ✅ "Clear Filters" button appears when filters active
- ✅ One click to reset all filters
- ✅ Returns to full applicant list

### **4. Combined Filters**
- ✅ Works with search bar
- ✅ Works with tab filters (Applied, Shortlisted, etc.)
- ✅ All filters work together

---

## 🔄 **Filter Combinations:**

### **Scenario A: Search + Academic Filters**

```
Search: "John"
CGPA: 7.0 - 9.0
SSLC: 60 - 100

Result: Students named "John" with CGPA 7.0-9.0 and SSLC 60-100
```

### **Scenario B: Tab + Academic Filters**

```
Tab: Shortlisted
CGPA: 8.0 - 10.0

Result: Only SHORTLISTED students with CGPA 8.0-10.0
```

### **Scenario C: All Filters Combined**

```
Tab: Applied
Search: "@gmail.com"
CGPA: 7.0 - 8.5
SSLC: 70 - 100
PUC: 75 - 100

Result: APPLIED students with Gmail, CGPA 7.0-8.5, SSLC 70-100, PUC 75-100
```

---

## 📊 **Data Sources:**

### **Where Data Comes From:**

```javascript
CGPA: Calculated from studentProfile.SGPA
      (Average of all filled semesters)

SSLC: studentProfile.pastQualification.sslc.percentage

PUC:  studentProfile.pastQualification.puc.percentage
```

### **Handling Missing Data:**

```javascript
// If student has no SSLC data:
SSLC = 0 (will be filtered out if min > 0)

// If student has no PUC data:
PUC = 0 (will be filtered out if min > 0)

// If student has no SGPA data:
CGPA = 0 (will be filtered out if min > 0)
```

---

## 🎨 **UI Components:**

### **Filter Input Fields:**

```html
<input 
  type="number"
  placeholder="Min"
  min="0"
  max="10"     // 10 for CGPA, 100 for percentages
  step="0.1"   // 0.1 for CGPA, 0.01 for percentages
  value={filters.minCGPA}
  onChange={(e) => setFilters({...filters, minCGPA: e.target.value})}
  className="..."
/>
```

### **Active Filter Badges:**

```html
<!-- CGPA Badge -->
<span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
  CGPA: 7.0 - 9.0
</span>

<!-- SSLC Badge -->
<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
  SSLC: 60% - 100%
</span>

<!-- PUC Badge -->
<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
  PUC: 65% - 100%
</span>
```

---

## 🧪 **Testing the Feature:**

### **Test Case 1: CGPA Filter**

```
1. Go to Manage Applicants
2. Set CGPA: Min = 7.0, Max = 8.0
3. ✅ Only students with CGPA 7.0-8.0 shown
4. ✅ Count updates
5. ✅ Badge shows "CGPA: 7.0 - 8.0"
```

### **Test Case 2: SSLC Filter**

```
1. Set SSLC: Min = 60
2. ✅ Only students with SSLC ≥ 60% shown
3. ✅ Students with missing SSLC filtered out
```

### **Test Case 3: Multiple Filters**

```
1. Set CGPA: Min = 7.0
2. Set SSLC: Min = 60
3. Set PUC: Min = 65
4. ✅ Only students meeting ALL criteria shown
5. ✅ Three badges shown
6. ✅ Count shows filtered/total
```

### **Test Case 4: Clear Filters**

```
1. Set multiple filters
2. Click "Clear Filters"
3. ✅ All filters reset to empty
4. ✅ Full applicant list shown
5. ✅ Badges disappear
```

### **Test Case 5: Combined with Search**

```
1. Search: "John"
2. Set CGPA: Min = 7.0
3. ✅ Only Johns with CGPA ≥ 7.0 shown
4. ✅ Both search and filter work together
```

---

## 💡 **Use Cases:**

### **Use Case 1: Pre-Screening for Companies**

**Scenario:** Company wants CGPA ≥ 7.5, SSLC ≥ 70%, PUC ≥ 75%

**Action:**
```
1. Set filters to match company requirements
2. View eligible students
3. Bulk shortlist them
4. Export to Excel
```

### **Use Case 2: Finding Top Performers**

**Scenario:** Need students for premium roles

**Action:**
```
1. Set CGPA: Min = 8.5
2. Set SSLC: Min = 85
3. Set PUC: Min = 85
4. View top performers
5. Contact them individually
```

### **Use Case 3: Identifying Struggling Students**

**Scenario:** Find students who might need support

**Action:**
```
1. Set CGPA: Max = 6.0
2. View students with lower CGPA
3. Plan intervention programs
```

### **Use Case 4: Quick Eligibility Check**

**Scenario:** During company visit, need to quickly filter

**Action:**
```
1. Company states requirements
2. Set filters in real-time
3. Immediately see eligible count
4. Share list with company
```

---

## 🎨 **Visual Design:**

### **Color Coding:**

- **CGPA Badge:** 🟣 Indigo (bg-indigo-100/text-indigo-700)
- **SSLC Badge:** 🟢 Green (bg-green-100/text-green-700)
- **PUC Badge:** 🔵 Blue (bg-blue-100/text-blue-700)

### **Icons:**

- **CGPA:** 🎓 `fa-graduation-cap`
- **SSLC:** 🏫 `fa-school`
- **PUC:** 📚 `fa-book`
- **Filter:** 🔍 `fa-filter`
- **Clear:** 🔄 `fa-rotate-left`

---

## 📝 **Implementation Details:**

### **File Modified:**
`frontend/src/components/TPO/ManageApplicants.jsx`

### **Key Functions:**

```javascript
// Calculate CGPA from SGPA
calculateCGPA(sgpa) {
  // Returns average of all non-null semesters
}

// Filter applicants
getFilteredApplicants() {
  // Applies tab, search, and academic filters
}

// Clear all filters
clearFilters() {
  // Resets all filter values
}
```

### **State Management:**

```javascript
const [filters, setFilters] = useState({
  minCGPA: '',
  maxCGPA: '',
  minSSLC: '',
  maxSSLC: '',
  minPUC: '',
  maxPUC: ''
});
```

---

## ✅ **Benefits:**

### **For TPO:**
- ✅ Quick filtering by academic performance
- ✅ Easy eligibility checking
- ✅ Better candidate selection
- ✅ Time-saving bulk operations

### **For Recruiters:**
- ✅ See only eligible candidates
- ✅ Better quality matches
- ✅ Faster recruitment process

### **For Students:**
- ✅ Fairer selection based on merit
- ✅ Transparent criteria
- ✅ Clear expectations

---

## 🎯 **Summary:**

**What Was Added:**
- ✅ CGPA range filter (0-10)
- ✅ SSLC percentage filter (0-100%)
- ✅ PUC percentage filter (0-100%)
- ✅ Real-time filtering
- ✅ Visual badges for active filters
- ✅ Clear filters button
- ✅ Count of filtered results
- ✅ Works with existing search and tabs

**Result:**
TPO can now efficiently filter and manage applicants based on academic performance!

---

## 🚀 **Ready to Use!**

The feature is now live and ready to use. Just:
1. Go to any job's Manage Applicants page
2. Look for the "Academic Filters" section
3. Set your desired ranges
4. Watch the results filter in real-time!

**Happy Filtering!** 🎉
