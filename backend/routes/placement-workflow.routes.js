import express from 'express';
import {
  exportApplicantsToExcel,
  markShortlistedStudents,
  updateInterviewRound,
  markStudentsAsPlaced,
  getJobWorkflowStatus
} from '../controllers/TPO/placement-workflow.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware());

// Step 1: Export applicants to Excel
router.get('/export/:jobId', exportApplicantsToExcel);

// Step 2: Mark shortlisted students
router.post('/shortlist/:jobId', markShortlistedStudents);

// Step 3: Update interview round for a student
router.post('/interview-round/:jobId/:studentId', updateInterviewRound);

// Step 4: Mark students as placed
router.post('/mark-placed/:jobId', markStudentsAsPlaced);

// Get workflow status
router.get('/status/:jobId', getJobWorkflowStatus);

export default router;
