const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');



// Routes for teachers only
router.post('/upload', authenticate, restrictTo('Teacher'), lessonController.uploadLesson);
router.put('/update/:id', authenticate, restrictTo('Teacher'), lessonController.updateLesson);
router.delete('/delete/:id', authenticate, restrictTo('Teacher'), lessonController.deleteLesson);


// Routes accessible by both teachers and students
router.get('/all', authenticate, lessonController.getAllLessons);
router.get('/id/:id', authenticate, lessonController.getLessonById);


router.get('/teacher/all', authenticate, restrictTo('teacher'), lessonController.getAllLessonsForTeacher);


module.exports = router;
