const express = require('express');
const { tuteController } = require('../controllers/tuteController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

// Teacher routes
router.post('/upload', authenticate, restrictTo('teacher'), tuteController.createTute);
router.put('/update/:id', authenticate, restrictTo('teacher'), tuteController.updateTute);
router.delete('/delete/:id', authenticate, restrictTo('teacher'), tuteController.deleteTute);
router.get('/teacher', authenticate, restrictTo('teacher'), tuteController.listTeacherTutes);

// Student routes
router.get('/student', authenticate, restrictTo('student'), tuteController.listStudentTutes);
router.get('/student/:id', authenticate, restrictTo('student'), tuteController.getStudentTuteById);

module.exports = router;
