const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Public routes related to auth
router.post('/register', authController.register);
router.post('/login', authController.loginUser);
router.post('/verify-email', authController.verifyEmailOTP);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
