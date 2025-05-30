const express = require('express');
const router = express.Router();

const {
  createExam,
  getExams,
  getExam,
  submitAnswers,
  getResult,
  getAllSubmissionsForExam,
  getSubmissionDetail
} = require('../controllers/examController');

const { authenticate, restrictTo } = require('../middleware/authMiddleware');

// Teacher creates new exam
router.post('/create', authenticate, restrictTo('teacher'), createExam);

// Get all exams (for all authenticated users)
router.get('/', authenticate, getExams);

// Get exam by ID (for all authenticated users)
router.get('/:id', authenticate, getExam);

// Student submits exam answers
router.post('/:id/submit', authenticate, restrictTo('student'), submitAnswers);

// Student gets exam result
router.get('/:id/result', authenticate, restrictTo('student'), getResult);

// Teacher gets all submissions for an exam
router.get('/:id/submissions', authenticate, restrictTo('teacher'), getAllSubmissionsForExam);

// Teacher gets submission details by submission ID
router.get('/:id/submissions/:submissionId', authenticate, restrictTo('teacher'), getSubmissionDetail);

module.exports = router;
