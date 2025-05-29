const express = require('express');
const controller = require('../controllers/classController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, restrictTo('teacher'), controller.addSchedule);
router.put('/update/:id', authenticate, restrictTo('teacher'), controller.updateSchedule);
router.delete('/delete/:id', authenticate, restrictTo('teacher'), controller.deleteSchedule);
router.get('/all', authenticate, controller.getAllSchedules);

module.exports = router;
