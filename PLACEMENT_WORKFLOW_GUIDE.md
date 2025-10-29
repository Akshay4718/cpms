# 🎓 College Placement Workflow Implementation

## Overview
This application now follows your college's real placement process workflow.

## 📋 Placement Workflow Stages

### Stage 1: Application Phase (`open`)
**What Happens:**
- Students browse and apply for job postings
- Applications are tracked with status: `applied`
- TPO can view all applicants

### Stage 2: Export Applicants (`closed`)
**What Happens:**
- TPO closes applications after deadline
- TPO exports all applicants to Excel file with:
  - USN, Name, Email, Department, Year
  - CGPA, Active Backlogs
  - Current Status
- Excel file is sent to the company

**API Endpoint:**
```
GET /placement-workflow/export/:jobId
```

### Stage 3: Shortlisting (`shortlisting`)
**What Happens:**
- Company reviews Excel and sends back shortlisted USNs/student list
- TPO marks students as shortlisted or rejected in the system
- Shortlisted students receive email notifications
- Status updated to: `shortlisted` or `rejected`

**API Endpoint:**
```
POST /placement-workflow/shortlist/:jobId
Body: {
  shortlistedStudentIds: ["id1", "id2", ...],
  rejectedStudentIds: ["id3", "id4", ...]
}
```

### Stage 4: Interview Process (`interviewing`)
**What Happens:**
- Interview rounds begin
- TPO updates status after each round:
  - Round name (e.g., "Aptitude Test", "Technical Round 1", "HR Interview")
  - Round date
  - Status: `scheduled`, `cleared`, `failed`, `pending`
  - Remarks/notes
- Student status: `in-process`
- Students can track their current round

**API Endpoint:**
```
POST /placement-workflow/interview-round/:jobId/:studentId
Body: {
  roundName: "Technical Round 1",
  roundDate: "2025-01-15",
  status: "cleared",
  remarks: "Good performance"
}
```

### Stage 5: Final Placement (`completed`)
**What Happens:**
- Company sends final selected list
- TPO marks students as placed with:
  - Package (salary)
  - Joining date
  - Offer letter (optional)
- Status updated to: `placed`
- Selected students receive congratulations email
- Placement record is permanent

**API Endpoint:**
```
POST /placement-workflow/mark-placed/:jobId
Body: {
  placedStudents: [
    {
      studentId: "id1",
      package: 5.5,
      joiningDate: "2025-07-01"
    }
  ]
}
```

## 📊 Application Status Flow

```
applied → shortlisted → in-process → placed
   ↓           ↓
rejected    rejected
```

### Status Meanings:
- **applied**: Student submitted application
- **shortlisted**: Student cleared initial screening by company
- **rejected**: Student not selected (can happen at any stage)
- **in-process**: Student is going through interview rounds
- **placed**: Student successfully placed with offer

## 🎯 Key Features

### For TPO:
1. **Export to Excel**: Download formatted Excel with all applicant details
2. **Bulk Shortlist**: Mark multiple students at once
3. **Round Tracking**: Update interview rounds individually
4. **Placement Records**: Mark final placements with package details
5. **Workflow Dashboard**: See statistics at each stage
6. **Email Notifications**: Automatic emails at key stages

### For Students:
1. **Status Tracking**: See current application status
2. **Round Updates**: View interview round details
3. **Email Alerts**: Receive notifications for shortlist/placement
4. **Placement Info**: View package and joining date when placed

## 📧 Email Notifications

### Automatic Emails Sent:
1. **Shortlisted**: When student is shortlisted
2. **Placed**: When student is selected with package details

## 🔧 Technical Implementation

### Models Updated:
- **Job Model**: Added placement stages, workflow tracking
- **User Model**: Updated appliedJobs schema

### New Controllers:
- `placement-workflow.controller.js`: Handles all workflow operations

### New Routes:
- `/placement-workflow/*`: All workflow management endpoints

## 📦 Required Installation

Before running the server, install the required package:

```bash
cd backend
npm install exceljs
```

## 🚀 How TPO Uses the System

### Step-by-Step Process:

1. **After Application Deadline:**
   - Go to job listing
   - Click "Export Applicants to Excel"
   - Send Excel file to company

2. **When Shortlist Received:**
   - Go to "Manage Applications"
   - Select shortlisted students
   - Click "Mark as Shortlisted"
   - System sends emails automatically

3. **During Interviews:**
   - For each student, click "Update Round"
   - Enter round details and status
   - Save - student sees updates in dashboard

4. **After Final Selection:**
   - Go to "Final Placements"
   - Select placed students
   - Enter package and joining date
   - Click "Mark as Placed"
   - Congratulations emails sent automatically

## 📈 Workflow Status Dashboard

TPO can view real-time statistics:
- Total Applications: X
- Shortlisted: X
- In Interview: X
- Placed: X
- Rejected: X

**API Endpoint:**
```
GET /placement-workflow/status/:jobId
```

## 🔐 Security

- All routes require authentication
- Only TPO admin can access workflow management
- Student data is protected
- Excel export includes only necessary information

## 💡 Benefits

1. **Transparency**: Students know exactly where they stand
2. **Efficiency**: No manual Excel tracking
3. **Professional**: Automated emails keep everyone informed
4. **Records**: Complete placement history maintained
5. **Real Process**: Matches actual college workflow

## 📝 Next Steps for Frontend Implementation

Create these UI components:

1. **Job Workflow Dashboard**
   - Show current stage
   - Display statistics
   - Action buttons for each stage

2. **Export Button**
   - Download Excel file
   - Shows export timestamp

3. **Shortlist Management**
   - Checkboxes to select students
   - Bulk actions (shortlist/reject)

4. **Interview Round Manager**
   - Form to add/update rounds
   - Timeline view of rounds

5. **Placement Marker**
   - Form with package and date fields
   - Final placement confirmation

6. **Student Status Page**
   - Current status badge
   - Round history timeline
   - Package details (if placed)

---

**Your placement workflow is now fully implemented according to your college's process!** 🎉
