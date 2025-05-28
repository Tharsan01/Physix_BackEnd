const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

// Teacher routes — require authentication and role 'teacher'
router.post('/create', authenticate, restrictTo('teacher'), noticeController.createNotice);
router.put('/update/:id', authenticate, restrictTo('teacher'), noticeController.updateNotice);
router.delete('/delete/:id', authenticate, restrictTo('teacher'), noticeController.deleteNotice);
router.get('/all', authenticate, restrictTo('teacher'), noticeController.getAllNotices);

// Student route — no auth or add auth if you want students to be authenticated too
router.get('/published', noticeController.getPublishedNotices);

module.exports = router;
