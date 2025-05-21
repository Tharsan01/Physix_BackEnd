const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);  // changed GET to POST for login
router.post('/verify-email', userController.verifyEmailOTP);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

/////////////////////////////////////////////////

router.get('/profile', authenticate, userController.getProfile);
router.put('/update', authenticate, userController.updateProfile);
router.delete('/delete', authenticate, userController.deleteProfile);

module.exports = router;
