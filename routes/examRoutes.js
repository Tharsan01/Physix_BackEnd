const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

// Only teachers can create, update, delete exams
router.post('/create', authenticate, restrictTo('teacher'), examController.createExam);
router.put('/:examId', authenticate, restrictTo('teacher'), examController.updateExamHandler);
router.delete('/:examId', authenticate, restrictTo('teacher'), examController.deleteExamHandler);

// Students can list exams in their batch and get exam details
router.get('/', authenticate, restrictTo('student'), examController.getExamsForStudent);
router.get('/:examId', authenticate, examController.getExamByIdHandler);

// Students submit exam answers
router.post('/:examId/submit', authenticate, restrictTo('student'), examController.submitExamHandler);

// Students get their exam result
router.get('/:examId/result', authenticate, restrictTo('student'), examController.getStudentResultHandler);

// Teacher can get all submissions for an exam
router.get('/:examId/submissions', authenticate, restrictTo('teacher'), examController.getSubmissionsForExamHandler);

// Teacher can get details of a specific submission
router.get('/submission/:submissionId', authenticate, restrictTo('teacher'), examController.getSubmissionDetailsHandler);

module.exports = router;
