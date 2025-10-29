# 📦 Installation Steps for Placement Workflow

## Required Package Installation

### Backend Package

The placement workflow requires the **ExcelJS** package for generating Excel exports.

```bash
cd backend
npm install exceljs
```

## Verify Installation

After installation, restart your backend server:

```bash
npm start
```

You should see:
```
server is running in http://localhost:4518
MongoDB Connected: ac-9f5ik2r-shard-00-02.cjumrud.mongodb.net
```

## API Endpoints Available

Once the server is running, these new endpoints will be available:

### Placement Workflow Endpoints:
- `GET /placement-workflow/export/:jobId` - Export applicants to Excel
- `POST /placement-workflow/shortlist/:jobId` - Mark shortlisted students
- `POST /placement-workflow/interview-round/:jobId/:studentId` - Update interview round
- `POST /placement-workflow/mark-placed/:jobId` - Mark students as placed
- `GET /placement-workflow/status/:jobId` - Get workflow status

## Testing the API

You can test the Excel export endpoint:

1. Get a job ID from your database
2. Use Postman or browser:
   ```
   GET http://localhost:4518/placement-workflow/export/{your-job-id}
   ```
3. Authorization header: `Bearer {your-token}`
4. You should receive an Excel file download

## Database Changes

The models have been updated automatically:

### Job Model (`job.model.js`):
- ✅ Added `placementStage` field
- ✅ Added `applicantsExported` tracking
- ✅ Added `shortlistReceived` tracking
- ✅ Enhanced `applicants` array with workflow fields
- ✅ Added `interviewRounds` array
- ✅ Added placement tracking fields

### User Model (`user.model.js`):
- ✅ Updated `appliedJobs` schema
- ✅ Added `applicationStatus` field
- ✅ Added `currentRound` tracking
- ✅ Added `isPlaced` flag

**No database migration required** - existing data will work, new fields will populate as you use the system.

## Next Steps

1. ✅ Install ExcelJS: `npm install exceljs`
2. ✅ Restart backend server
3. ⏳ Test Excel export with an existing job
4. ⏳ Implement frontend UI components
5. ⏳ Test complete workflow

## Troubleshooting

### If Excel export fails:
- Check if `exceljs` is installed: `npm list exceljs`
- Verify job ID exists in database
- Check server logs for errors

### If emails don't send:
- Verify SMTP_USER and SMTP_PASS in `.env`
- Check Nodemailer configuration
- Review backend logs

---

**Ready to use!** Start by exporting an applicants list to Excel. 📊
