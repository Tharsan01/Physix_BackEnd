const express = require('express');
const {
  addSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule,
  getAllSchedulesForTeacher
} = require('../controllers/classController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, restrictTo('teacher'), addSchedule);
router.put('/update/:id', authenticate, restrictTo('teacher'),updateSchedule);
router.delete('/delete/:id', authenticate, restrictTo('teacher'), deleteSchedule);
router.get('/all', authenticate,getAllSchedules);


router.get('/teacher/schedules', authenticate, restrictTo('teacher'), getAllSchedulesForTeacher);

module.exports = router;
