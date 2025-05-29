const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

// Teacher-only: Create new exam
router.post('/create', authenticate, restrictTo('teacher'), examController.createExam);

// All users: Get all published exams
router.get('/', authenticate, examController.getAllExams);

// All users: Get specific exam by ID
router.get('/:id', authenticate, examController.getExamById);

// Students: Submit exam answers
router.post('/:id/submit', authenticate, restrictTo('student'), examController.submitExam);

module.exports = router;
