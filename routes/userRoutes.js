const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');



// Protected user routes
router.get('/profile', authenticate, userController.getProfile);
router.put('/update', authenticate, userController.updateProfile);
router.delete('/delete', authenticate, userController.deleteProfile);

// Teacher-specific route for uploading/editing teacher profile fields
router.post('/teacher/upload', authenticate, userController.uploadOrEditTeacherProfile);


module.exports = router;
