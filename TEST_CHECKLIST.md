# Testing Checklist for CPMS

## ✅ System Status (Automated Checks Passed)

- ✅ Backend ES Modules migration complete
- ✅ Frontend React 18 migration complete
- ✅ No `require()` statements remaining
- ✅ No `module.exports` remaining
- ✅ No double `.js.js` extensions
- ✅ All imports have `.js` extensions
- ✅ Backend running on http://localhost:4518
- ✅ Frontend running on http://localhost:5173
- ✅ MongoDB Connected successfully

---

## 🧪 Manual Testing Guide

### 1️⃣ **Student Features** (Priority: HIGH)

#### Authentication
- [ ] **Student Signup**
  - Navigate to: http://localhost:5173/student/signup
  - Test: Create new student account
  - Expected: Success message + redirect to login
  - Check: Email received with credentials

- [ ] **Student Login**
  - Navigate to: http://localhost:5173/student/login
  - Test: Login with credentials
  - Expected: Redirect to dashboard
  - Check: Token stored in localStorage

- [ ] **Protected Routes**
  - Test: Try accessing /student/dashboard without login
  - Expected: Redirect to login page

#### Profile Management
- [ ] **Complete Profile**
  - After login, complete profile if prompted
  - Test: Fill all required fields
  - Expected: Profile saved successfully

- [ ] **Upload Profile Photo**
  - Navigate to: Account section
  - Test: Upload image (JPG/PNG)
  - Expected: Photo uploaded to Cloudinary, URL updated
  - Check: Image displays correctly (300x300)

- [ ] **Upload Resume**
  - Test: Upload PDF resume
  - Expected: File uploaded to Cloudinary
  - Check: Direct view/download link works

- [ ] **Update Profile**
  - Test: Change name, phone, address
  - Expected: Changes saved to database

- [ ] **Change Password**
  - Test: Update password
  - Expected: New password works on next login

#### Academic Information
- [ ] **Add SGPA**
  - Test: Enter SGPA for all semesters
  - Expected: Data saved correctly

- [ ] **Add Past Qualifications**
  - Test: SSC, HSC, Diploma details
  - Expected: All fields saved

#### Job Applications
- [ ] **View Job Listings**
  - Navigate to: Job Listings page
  - Expected: All posted jobs displayed

- [ ] **View Job Details**
  - Test: Click on a job
  - Expected: Full job description, eligibility, salary shown

- [ ] **Apply to Job**
  - Test: Click "Apply" button
  - Expected: Application submitted
  - Check: Job appears in "My Applied Jobs"

- [ ] **Check Already Applied**
  - Test: Try applying to same job again
  - Expected: Button disabled or message shown

- [ ] **View Applied Jobs**
  - Navigate to: My Applied Jobs
  - Expected: List of all applied jobs with status

- [ ] **Update Job Status**
  - Test: Update application status (interview/hired)
  - Expected: Status updated successfully

- [ ] **Upload Offer Letter**
  - Test: Upload offer letter for hired job
  - Expected: PDF uploaded to Cloudinary

- [ ] **Delete Offer Letter**
  - Test: Remove uploaded offer letter
  - Expected: File deleted from Cloudinary and DB

#### Internships
- [ ] **Add Internship**
  - Test: Fill internship details
  - Expected: Internship added successfully

- [ ] **Update Internship**
  - Test: Edit existing internship
  - Expected: Changes saved

- [ ] **Delete Internship**
  - Test: Remove internship
  - Expected: Deleted from database

- [ ] **View All Internships**
  - Expected: All internships listed

#### Notices
- [ ] **View All Notices**
  - Expected: List of notices for students

- [ ] **View Individual Notice**
  - Test: Click on notice
  - Expected: Full notice content displayed

---

### 2️⃣ **TPO Features** (Priority: HIGH)

#### Authentication
- [ ] **TPO Login**
  - Navigate to: http://localhost:5173/tpo/login
  - Test: Login with TPO credentials
  - Expected: Redirect to TPO dashboard

#### Student Management
- [ ] **View All Students**
  - Navigate to: Students section
  - Test: Filter by year and branch
  - Expected: Filtered student list

- [ ] **View Student Details**
  - Test: Click on a student
  - Expected: Full profile, academics, jobs, internships

- [ ] **Approve Student**
  - Navigate to: Approve Students
  - Test: Approve/reject pending registrations
  - Expected: Student status updated

#### Job Management
- [ ] **Post New Job**
  - Navigate to: Post Job
  - Test: Fill job details, select company
  - Expected: Job posted successfully
  - Check: Job visible to students

- [ ] **Edit Job**
  - Test: Update existing job details
  - Expected: Changes saved

- [ ] **Delete Job**
  - Test: Remove job posting
  - Expected: Job deleted + removed from student applications

- [ ] **View Job Applicants**
  - Test: View list of students who applied
  - Expected: Applicant details displayed

#### Company Management
- [ ] **Add Company**
  - Test: Create new company profile
  - Expected: Company added successfully

- [ ] **Edit Company**
  - Test: Update company details
  - Expected: Changes saved

- [ ] **Delete Company**
  - Test: Remove company
  - Expected: Company + associated jobs deleted

- [ ] **View All Companies**
  - Expected: Complete company list

#### Notices
- [ ] **Send Notice**
  - Test: Create notice for students
  - Expected: Notice sent successfully

- [ ] **View Notices**
  - Expected: All sent notices listed

- [ ] **Delete Notice**
  - Test: Remove notice
  - Expected: Deleted from database

---

### 3️⃣ **Management Features** (Priority: MEDIUM)

#### User Management
- [ ] **Management Login**
  - Navigate to: http://localhost:5173/management/login
  - Test: Login with management credentials

- [ ] **Add TPO Admin**
  - Test: Create new TPO user
  - Expected: User created + email sent with credentials

- [ ] **View All TPO Admins**
  - Expected: List of all TPO users

- [ ] **Delete TPO Admin**
  - Test: Remove TPO user
  - Expected: User deleted

- [ ] **Add Student**
  - Test: Create student account
  - Expected: Student created + auto-approved

- [ ] **View Students**
  - Test: Browse all students
  - Expected: Complete student list

#### Job & Company Management
- [ ] Test all job management features (same as TPO)
- [ ] Test all company management features (same as TPO)

#### Notices
- [ ] Test notice sending (same as TPO)

---

### 4️⃣ **Super Admin Features** (Priority: MEDIUM)

#### Authentication
- [ ] **Super Admin Login**
  - Navigate to: http://localhost:5173/admin
  - Test: Login with super admin credentials

#### User Management
- [ ] **Add Management Admin**
  - Test: Create management user
  - Expected: User created + email sent

- [ ] **Add TPO Admin**
  - Test: Create TPO user
  - Expected: User created + email sent

- [ ] **Add Student**
  - Test: Create student
  - Expected: Student created

- [ ] **View All Users**
  - Test: View management/TPO/students
  - Expected: Complete user lists

- [ ] **Delete Users**
  - Test: Remove users of any type
  - Expected: User deleted + cleanup

- [ ] **Approve Students**
  - Test: Approve pending students
  - Expected: Status updated

---

### 5️⃣ **File Upload Features** (Priority: HIGH)

#### Profile Photos
- [ ] **Upload Image**
  - Format: JPG, PNG
  - Size: Test various sizes
  - Expected: Optimized to 300x300

- [ ] **Replace Image**
  - Expected: Old image deleted from Cloudinary

#### Resumes
- [ ] **Upload PDF**
  - Format: PDF only
  - Expected: Direct view/download link

- [ ] **Replace Resume**
  - Expected: Old resume deleted from Cloudinary

#### Offer Letters
- [ ] **Upload Offer Letter**
  - Format: PDF
  - Expected: Uploaded successfully

- [ ] **Delete Offer Letter**
  - Expected: File removed from Cloudinary

---

### 6️⃣ **Email Features** (Priority: MEDIUM)

#### Automated Emails
- [ ] **User Creation Emails**
  - Test: Create TPO/Management/Student
  - Expected: Welcome email with credentials
  - Check: Email formatting, branding

- [ ] **Email Content**
  - Check: Role mentioned correctly
  - Check: Credentials visible
  - Check: Login link works

---

### 7️⃣ **Security Features** (Priority: HIGH)

#### Authentication
- [ ] **JWT Expiration**
  - Test: Wait 1+ hour, try API call
  - Expected: 401 Unauthorized

- [ ] **Invalid Token**
  - Test: Modify token in localStorage
  - Expected: Redirect to login

- [ ] **Role-Based Access**
  - Test: Try accessing TPO routes as student
  - Expected: Access denied

#### Password Security
- [ ] **Password Hashing**
  - Check database: Passwords are hashed
  - Expected: No plain text passwords

---

### 8️⃣ **Database Operations** (Priority: HIGH)

#### CRUD Operations
- [ ] **Create**: Users, Jobs, Companies, Notices
- [ ] **Read**: All data retrieval working
- [ ] **Update**: Profile, Jobs, Companies
- [ ] **Delete**: Cascade deletions working

#### Data Integrity
- [ ] **Delete Company**
  - Expected: Associated jobs also deleted

- [ ] **Delete Job**
  - Expected: Removed from student applications

- [ ] **Delete User**
  - Expected: Removed from job applicants

---

### 9️⃣ **UI/UX Features** (Priority: MEDIUM)

#### Responsive Design
- [ ] **Mobile View** (< 768px)
  - Test: Sidebar collapses
  - Test: Tables scroll horizontally

- [ ] **Tablet View** (768px - 1024px)
  - Test: Layout adjusts properly

- [ ] **Desktop View** (> 1024px)
  - Test: Full sidebar visible

#### Navigation
- [ ] **Sidebar**
  - Test: Toggle sidebar
  - Test: State persists in localStorage

- [ ] **Breadcrumbs**
  - Test: Correct page names displayed

- [ ] **Protected Routes**
  - Test: Redirect on unauthorized access

#### Loading States
- [ ] **Skeleton Loaders**
  - Test: Show while data loading

- [ ] **Toast Notifications**
  - Test: Success/error messages

---

### 🔟 **Performance Testing** (Priority: LOW)

- [ ] **Page Load Times**
  - Test: Initial load under 3 seconds

- [ ] **API Response Times**
  - Test: Most APIs under 500ms

- [ ] **File Upload Speed**
  - Test: Large files (5MB+) upload successfully

- [ ] **Large Dataset**
  - Test: 100+ students/jobs render correctly

---

## 🐛 **Known Issues to Check**

### Backend
- [ ] Check MongoDB connection string in .env
- [ ] Verify Cloudinary credentials
- [ ] Check SMTP email settings
- [ ] Verify JWT_SECRET exists

### Frontend
- [ ] Check BASE_URL points to correct backend
- [ ] Verify all lazy-loaded components work
- [ ] Check browser console for errors
- [ ] Verify all routes work

---

## 📊 **Test Results Summary**

### Critical Issues Found: ___
### Medium Issues Found: ___
### Minor Issues Found: ___

### Overall Status: 
- [ ] All features working ✅
- [ ] Some features broken ⚠️
- [ ] Major issues found ❌

---

## 🔧 **Testing Environment**

- **Node Version**: ___
- **npm Version**: ___
- **Browser**: ___
- **OS**: Windows
- **Backend Port**: 4518
- **Frontend Port**: 5173
- **Database**: MongoDB Atlas

---

## 📝 **Notes**

Add any additional observations or issues discovered during testing:

1. 
2. 
3. 

---

**Testing Date**: ___________  
**Tested By**: ___________  
**Sign-off**: ___________
