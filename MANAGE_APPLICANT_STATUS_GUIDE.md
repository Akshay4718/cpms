# 📊 Manage Applicant Status - Complete Guide

## 🎯 **How to Change Student Application Status**

TPO can now change student status at **ANY stage** of the placement process.

---

## 📍 **Where to Manage Status:**

### **Step 1: Navigate to Job Post**
```
TPO Dashboard → Jobs → View Job → [Manage Applicants & Status]
```

### **Step 2: Open Manage Applicants Page**
- Click the **"Manage Applicants & Status"** button
- This opens the dedicated applicant management interface

---

## 🎨 **Interface Overview:**

### **1. Statistics Dashboard**
See counts for each status at a glance:
- 📊 Total applicants
- 🔵 Applied
- 🟡 Shortlisted  
- 🟠 In Process
- ✅ Placed
- 🔴 Rejected

### **2. Quick Filter Tabs**
Click tabs to filter by status:
- All
- Applied
- Shortlisted
- In Process
- Placed
- Rejected

### **3. Export Button**
Download all applicants to Excel with one click

---

## 🔄 **How to Change Status:**

### **Method 1: Individual Status Change (EASIEST)**

For **any student** at **any stage**:

1. Go to the applicant's row in the table
2. Find the **"Change Status"** dropdown (last column)
3. Click the dropdown and select new status:
   - Applied
   - Shortlisted
   - In Process
   - Placed
   - Rejected
4. Status updates immediately!

#### **Example Scenarios:**

**Scenario 1: Shortlist Student**
```
Current Status: Applied
Action: Select "Shortlisted" from dropdown
Result: Student shortlisted ✉️ Email sent
```

**Scenario 2: Mark In Process**
```
Current Status: Shortlisted
Action: Select "In Process" from dropdown
Result: Student marked as interviewing
```

**Scenario 3: Mark Placed**
```
Current Status: In Process
Action: Select "Placed" from dropdown
Result: Final placement confirmed ✉️ Email sent
```

**Scenario 4: Reject Student**
```
Current Status: Any status
Action: Select "Rejected" from dropdown
Result: Student marked as rejected
```

---

### **Method 2: Bulk Selection (Applied Tab Only)**

For students with **"Applied"** status only:

1. Click the **"Applied"** tab
2. Use checkboxes to select multiple students:
   - ✓ **Green checkbox** = Shortlist
   - ✗ **Red checkbox** = Reject
3. Click **"Update Status"** button
4. All selected students updated at once!

---

## 📊 **Status Flow:**

```
Applied
  ↓
Shortlisted ← (Use dropdown to change)
  ↓
In Process ← (Use dropdown to change)
  ↓
Placed ← (Use dropdown to change)

(At any stage → Rejected via dropdown)
```

---

## 🎯 **Status Definitions:**

### **1. Applied** 🔵
- Student submitted application
- Waiting for review

### **2. Shortlisted** 🟡
- Student selected for interviews
- Company confirmed interest
- ✉️ Email notification sent

### **3. In Process** 🟠
- Student currently interviewing
- Multiple rounds ongoing
- Active candidate

### **4. Placed** ✅
- Final placement confirmed
- Offer accepted
- Package details recorded
- ✉️ Congratulations email sent

### **5. Rejected** 🔴
- Student not selected
- At any stage of process

---

## ⚡ **Quick Actions:**

### **Shortlist Multiple Students:**
1. Click "Applied" tab
2. Check ✓ green boxes
3. Click "Update Status"

### **Reject Multiple Students:**
1. Click "Applied" tab
2. Check ✗ red boxes
3. Click "Update Status"

### **Move Student to Next Stage:**
1. Find student in table
2. Use "Change Status" dropdown
3. Select next status

### **Check Progress:**
1. View statistics at top
2. Use filter tabs
3. See who's at each stage

---

## 📧 **Email Notifications:**

Emails are automatically sent when:

1. **Shortlisted** → Student notified of interview
2. **Placed** → Congratulations email with package

---

## 💡 **Tips & Best Practices:**

### **✅ DO:**
- Use dropdowns for individual status changes
- Check statistics regularly
- Export to Excel for records
- Update status as process progresses
- Use "In Process" for active interviews

### **❌ DON'T:**
- Skip stages (e.g., Applied → Placed directly)
- Mark as Placed without selecting first
- Forget to update when company responds

---

## 🔧 **Technical Details:**

### **Backend Endpoint:**
```
POST /student/update-status/:jobId/:studentId
Body: {
  applicant: {
    applicationStatus: "new-status"
  }
}
```

### **Status Values:**
- `applied`
- `shortlisted`
- `in-process`
- `selected`
- `placed`
- `rejected`

### **Database Fields Updated:**
1. `job.applicants[].applicationStatus`
2. `job.applicants[].status` (backward compatibility)
3. `user.studentProfile.appliedJobs[].applicationStatus`
4. `user.studentProfile.appliedJobs[].status` (backward compatibility)

---

## 🎯 **Common Workflows:**

### **Workflow 1: Standard Placement**
```
1. Students apply → Applied
2. Export to Excel → Send to company
3. Company sends shortlist → Mark as Shortlisted
4. Interviews start → Mark as In Process
5. Offer accepted → Mark as Placed
```

### **Workflow 2: Quick Rejection**
```
1. Student applies → Applied
2. Profile doesn't match → Mark as Rejected
```

### **Workflow 3: On-Campus Drive**
```
1. Students apply → Applied
2. All called for test → Mark all as Shortlisted (bulk)
3. Test results → Mark passed as In Process
4. Final offers → Mark as Placed
```

---

## 📱 **Student View:**

Students see their status in:
1. **Applied Jobs** page
2. Status badge with color coding
3. **Read-only** (cannot self-update)
4. Real-time updates

---

## 🚀 **Summary:**

| Feature | Location | Action |
|---------|----------|--------|
| **Change Individual Status** | Dropdown (last column) | Select new status |
| **Bulk Shortlist** | Applied tab + checkboxes | Check ✓ → Update |
| **Bulk Reject** | Applied tab + checkboxes | Check ✗ → Update |
| **Filter by Status** | Tab buttons | Click tab |
| **Export Excel** | Top button | Click export |
| **View Statistics** | Top cards | Auto-updated |

---

## ✅ **Key Features:**

1. ✅ **Easy Dropdown** - Change status with one click
2. ✅ **Bulk Actions** - Update multiple students at once
3. ✅ **Real-time Updates** - Changes reflect immediately
4. ✅ **Email Notifications** - Automatic at key stages
5. ✅ **Statistics** - See progress at a glance
6. ✅ **Excel Export** - Download for records
7. ✅ **Filter Tabs** - Quick access to each status group

---

**Now TPO can easily manage student applications throughout the entire placement process!** 🎓
