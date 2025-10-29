# Field Name Changes Summary

## 📝 Changes Made

The following field name changes have been implemented across the entire CPMS codebase:

### 1. **UIN → USN** (University Serial Number)
- Changed all references from `UIN` to `USN`
- Updated in both backend and frontend

### 2. **SSC → SSLC** (Secondary School Leaving Certificate)
- Changed from SSC (Secondary School Certificate) to SSLC
- Updated labels and field names

### 3. **HSC → PUC** (Pre-University Course)
- Changed from HSC (Higher Secondary Certificate) to PUC
- Updated labels and field names

### 4. **Roll Number Auto-Generation**
- Removed manual roll number input field
- Implemented auto-increment functionality starting from 1001
- Roll number now auto-assigned when student is created
- Made roll number read-only in frontend (display only)

---

## 🔧 Backend Changes

### File: `backend/models/user.model.js`

#### Schema Changes:
```javascript
// Before
UIN: { type: String, unique: true, sparse: true, trim: true }
rollNumber: { type: Number }

// After
USN: { type: String, unique: true, sparse: true, trim: true }
rollNumber: { type: Number, unique: true, sparse: true }
```

#### Past Qualification Changes:
```javascript
// Before
pastQualification: {
  ssc: { board, percentage, year },
  hsc: { board, percentage, year },
  diploma: { ... }
}

// After
pastQualification: {
  sslc: { board, percentage, year },
  puc: { board, percentage, year },
  diploma: { ... }
}
```

#### New Auto-Increment Middleware:
```javascript
// Added pre-save middleware for roll number auto-generation
UserSchema.pre('save', async function (next) {
  if (this.role === 'student' && this.isNew && !this.studentProfile.rollNumber) {
    const lastStudent = await User.findOne(...)
      .sort({ 'studentProfile.rollNumber': -1 });
    
    this.studentProfile.rollNumber = lastStudent?.studentProfile?.rollNumber 
      ? lastStudent.studentProfile.rollNumber + 1 
      : 1001;
  }
  next();
});
```

**How it works:**
- When a new student is created, the system finds the highest existing roll number
- Increments it by 1 and assigns to the new student
- If no students exist, starts from 1001
- Roll numbers are unique and cannot be duplicated

---

## 🎨 Frontend Changes

### 1. File: `frontend/src/components/UserDetails.jsx`

#### USN Field:
```jsx
// Before
<FloatingLabel controlId="floatingUIN" label="UIN">
  <Form.Control name='uin' value={userData?.studentProfile?.UIN} />
</FloatingLabel>

// After
<FloatingLabel controlId="floatingUSN" label="USN">
  <Form.Control name='usn' value={userData?.studentProfile?.USN} />
</FloatingLabel>
```

#### Roll Number Field:
```jsx
// Before - Editable input
<FloatingLabel controlId="floatingRollNumber" label="Roll Number">
  <Form.Control 
    type="number" 
    name='rollNumber' 
    value={userData?.studentProfile?.rollNumber}
    onChange={(e) => { ... }}
    required
  />
</FloatingLabel>

// After - Read-only display (only shown if exists)
{userData?.studentProfile?.rollNumber && (
  <FloatingLabel controlId="floatingRollNumber" label="Roll Number (Auto-generated)">
    <Form.Control 
      type="number" 
      value={userData?.studentProfile?.rollNumber}
      disabled
      readOnly
    />
  </FloatingLabel>
)}
```

#### SSLC Fields:
```jsx
// Before
<FloatingLabel controlId="floatingSelectSSC" label="SSC Board Name">
  <Form.Control name='sscBoard' value={...ssc?.board} />
</FloatingLabel>
<FloatingLabel controlId="floatingSSCMarks" label="SSC Percentage">
  <Form.Control name='sscPercentage' value={...ssc?.percentage} />
</FloatingLabel>
<FloatingLabel controlId="floatingSelectSSCPassingYear" label="SSC Passing Year">
  <Form.Control name='sscPassingYear' value={...ssc?.year} />
</FloatingLabel>

// After
<FloatingLabel controlId="floatingSelectSSLC" label="SSLC Board Name">
  <Form.Control name='sslcBoard' value={...sslc?.board} />
</FloatingLabel>
<FloatingLabel controlId="floatingSSLCMarks" label="SSLC Percentage">
  <Form.Control name='sslcPercentage' value={...sslc?.percentage} />
</FloatingLabel>
<FloatingLabel controlId="floatingSelectSSLCPassingYear" label="SSLC Passing Year">
  <Form.Control name='sslcPassingYear' value={...sslc?.year} />
</FloatingLabel>
```

#### PUC Fields:
```jsx
// Before
<FloatingLabel controlId="floatingSelectHSC" label="PUC Board Name">
  <Form.Control name='hscBoard' value={...hsc?.board} />
</FloatingLabel>
<FloatingLabel controlId="floatingHSCMarks" label="PUC Percentage">
  <Form.Control name='hscPercentage' value={...hsc?.percentage} />
</FloatingLabel>
<FloatingLabel controlId="floatingSelectHSCPassingYear" label="PUC Passing Year">
  <Form.Control name='hscPassingYear' value={...hsc?.year} />
</FloatingLabel>

// After (kept 'hsc' in name attributes for compatibility, updated labels)
<FloatingLabel controlId="floatingSelectHSC" label="PUC Board Name">
  <Form.Control name='pucBoard' value={...puc?.board} />
</FloatingLabel>
<FloatingLabel controlId="floatingHSCMarks" label="PUC Percentage">
  <Form.Control name='pucPercentage' value={...puc?.percentage} />
</FloatingLabel>
<FloatingLabel controlId="floatingSelectHSCPassingYear" label="PUC Passing Year">
  <Form.Control name='pucPassingYear' value={...puc?.year} />
</FloatingLabel>
```

### 2. File: `frontend/src/components/ViewUserData.jsx`

#### Display Changes:
```jsx
// Before
{userData?.studentProfile?.UIN && (
  <div>
    <span>USN: </span>
    <span>{userData?.studentProfile?.UIN}</span>
  </div>
)}

// After
{userData?.studentProfile?.USN && (
  <div>
    <span>USN: </span>
    <span>{userData?.studentProfile?.USN}</span>
  </div>
)}
```

```jsx
// Before
{userData?.studentProfile?.pastQualification?.ssc && (
  <div className="font-bold">SSC</div>
  <div>{...ssc?.board}</div>
  <div>{...ssc?.percentage}%</div>
  <div>{...ssc?.year}</div>
)}

// After
{userData?.studentProfile?.pastQualification?.sslc && (
  <div className="font-bold">SSLC</div>
  <div>{...sslc?.board}</div>
  <div>{...sslc?.percentage}%</div>
  <div>{...sslc?.year}</div>
)}
```

```jsx
// Before
{userData?.studentProfile?.pastQualification?.hsc && (
  <div className="font-bold">HSC</div>
  <div>{...hsc?.board}</div>
  <div>{...hsc?.percentage}%</div>
  <div>{...hsc?.year}</div>
)}

// After
{userData?.studentProfile?.pastQualification?.puc && (
  <div className="font-bold">PUC</div>
  <div>{...puc?.board}</div>
  <div>{...puc?.percentage}%</div>
  <div>{...puc?.year}</div>
)}
```

### 3. File: `frontend/src/components/TPO/StudentTableTemplate.jsx`

```jsx
// Before
<td>{student?.studentProfile?.UIN}</td>

// After
<td>{student?.studentProfile?.USN}</td>
```

---

## 📊 Impact Summary

### Database Schema Impact:
- **Field Renames**: 3 fields (UIN, ssc, hsc)
- **Field Modifications**: 1 field (rollNumber - now auto-generated)
- **New Middleware**: 1 pre-save hook for roll number generation

### Frontend Component Impact:
- **Files Modified**: 3 components
- **Form Fields Updated**: 7 input fields
- **Display Elements Updated**: 10+ display sections

### User Experience Changes:
1. **USN Input**: Users now enter "USN" instead of "UIN"
2. **Roll Number**: Automatically assigned, no manual input needed
3. **SSLC Label**: Shows "SSLC" instead of "SSC" 
4. **PUC Label**: Shows "PUC" instead of "HSC"

---

## ✅ Testing Checklist

### Backend Testing:
- [ ] Create new student → Verify roll number starts from 1001
- [ ] Create second student → Verify roll number increments to 1002
- [ ] Create student with USN → Verify USN is saved correctly
- [ ] Add SSLC/PUC details → Verify saved under correct field names

### Frontend Testing:
- [ ] Student Registration → USN field is displayed
- [ ] Complete Profile → SSLC/PUC fields are shown
- [ ] View Profile → Roll number is read-only
- [ ] TPO View Students → USN column shows correctly
- [ ] Admin View Students → All fields display correctly

### Data Migration:
- [ ] **IMPORTANT**: Existing data with old field names needs migration
  - Old `UIN` values → migrate to `USN`
  - Old `ssc` data → migrate to `sslc`
  - Old `hsc` data → migrate to `puc`
  - Old `rollNumber` values → keep as-is (already assigned)

---

## 🔄 Data Migration Script

If you have existing students in the database, run this migration:

```javascript
// MongoDB Migration Script
db.users.updateMany(
  { role: "student" },
  [
    {
      $set: {
        "studentProfile.USN": "$studentProfile.UIN",
        "studentProfile.pastQualification.sslc": "$studentProfile.pastQualification.ssc",
        "studentProfile.pastQualification.puc": "$studentProfile.pastQualification.hsc"
      }
    },
    {
      $unset: ["studentProfile.UIN", "studentProfile.pastQualification.ssc", "studentProfile.pastQualification.hsc"]
    }
  ]
);
```

---

## 🚀 Benefits of These Changes

### 1. **Auto-Increment Roll Numbers**
- ✅ Eliminates manual data entry errors
- ✅ Ensures unique roll numbers
- ✅ Sequential numbering for better organization
- ✅ No duplicate roll numbers possible

### 2. **Regional Terminology (Karnataka-specific)**
- ✅ USN is the standard term used in Karnataka universities
- ✅ SSLC is recognized term in Karnataka (10th standard)
- ✅ PUC is recognized term in Karnataka (12th standard)
- ✅ More intuitive for Karnataka-based students

### 3. **User Experience**
- ✅ Less confusion with correct terminology
- ✅ Automatic roll number assignment saves time
- ✅ Consistent with Karnataka education system
- ✅ Professional appearance

---

## 📝 Notes

1. **Roll Number Range**: Starts from 1001 and increments
   - Can be changed in the model if needed (e.g., start from 1)

2. **USN Format**: No format validation currently
   - Can add regex validation if USN follows specific pattern
   - Example: `1CR21CS001` format can be enforced

3. **Backward Compatibility**: 
   - Existing records with old field names will need migration
   - New records will use new field names automatically

4. **Future Enhancements**:
   - Add USN format validation (e.g., `1CR21CS001`)
   - Add year-wise roll number reset option
   - Add department-wise roll number prefixes

---

## 🔍 Verification Commands

### Check Roll Number Sequence:
```javascript
db.users.find(
  { role: "student" },
  { "studentProfile.rollNumber": 1, first_name: 1 }
).sort({ "studentProfile.rollNumber": 1 })
```

### Check USN Migration:
```javascript
db.users.find(
  { role: "student", "studentProfile.USN": { $exists: true } },
  { "studentProfile.USN": 1, first_name: 1 }
)
```

### Check SSLC/PUC Migration:
```javascript
db.users.find(
  { 
    role: "student",
    "studentProfile.pastQualification.sslc": { $exists: true }
  },
  { 
    "studentProfile.pastQualification.sslc": 1,
    "studentProfile.pastQualification.puc": 1
  }
)
```

---

**Changes Completed On**: October 29, 2025  
**Status**: ✅ Implementation Complete  
**Testing Status**: ⏳ Pending Manual Testing
