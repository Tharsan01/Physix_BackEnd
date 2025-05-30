
const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

// Student creates inquiry
router.post('/create', authenticate, restrictTo('Student'), inquiryController.createInquiry);

// Teacher replies to inquiry
router.post('/reply', authenticate, restrictTo('Teacher'), inquiryController.replyToInquiry);

// Teacher views all inquiries
router.get('/', authenticate, restrictTo('Teacher'), inquiryController.getAllInquiries);

// Get specific inquiry by inquiryNumber (teacher or student owner)
router.get('/:inquiryNumber', authenticate, inquiryController.getInquiryByNumber);

module.exports = router;