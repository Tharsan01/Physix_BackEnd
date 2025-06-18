// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

router.get('/stats', authenticate,restrictTo('teacher'), dashboardController.getDashboardStats);

module.exports = router;
