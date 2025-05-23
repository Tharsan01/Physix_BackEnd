const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticate, checkTeacher } = require('../middleware/authMiddleware');

// Apply authentication and teacher role check middleware to all teacher routes
router.use(authenticate, checkTeacher);

router.post('/upload', teacherController.uploadOrEditTeacherProfile);
router.delete('/delete', teacherController.deleteTeacherProfile);
router.get('/profile', teacherController.getTeacherProfile);

module.exports = router;
