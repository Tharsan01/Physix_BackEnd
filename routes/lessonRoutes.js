const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { authenticate, checkTeacher } = require('../middleware/authMiddleware');

// Routes for teachers only
router.post('/upload', authenticate, checkTeacher, lessonController.uploadLesson);
router.put('/update/:id', authenticate, checkTeacher, lessonController.updateLesson);
router.delete('/delete/:id', authenticate, checkTeacher, lessonController.deleteLesson);

// Routes accessible by teachers and students
router.get('/all', authenticate, lessonController.getAllLessons); // fixed typo: "Lessions" -> "Lessons"
router.get('/id/:id', authenticate, lessonController.getLessonById); // added missing leading slash

module.exports = router;
