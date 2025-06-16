const classService = require('../services/classService');

const addSchedule = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { lessonType, lessonTopic, ...rest } = req.body;
    
    if (!lessonType || !lessonTopic) {
      return res.status(400).json({ error: 'Lesson type and topic are required' });
    }

    const schedule = await classService.addSchedule({ 
      ...rest,
      lessonType,
      lessonTopic,
      teacherId 
    });
    
    res.status(201).json({ 
      message: 'Class scheduled successfully', 
      schedule 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllSchedules = async (req, res) => { 
  try {
    const { batchNumber } = req.user;

    if (!batchNumber) {
      return res.status(403).json({ success: false, message: 'Batch number missing in token' });
    }

    const schedules = await classService.getAllSchedulesForStudents(batchNumber);
    res.status(200).json({ success: true, schedules });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { lessonType, lessonTopic, ...rest } = req.body;
    const updated = await classService.editSchedule(req.params.id, {
      ...rest,
      ...(lessonType && { lessonType }),
      ...(lessonTopic && { lessonTopic })
    });
    res.status(200).json({ message: 'Schedule updated', updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    await classService.removeSchedule(req.params.id);
    res.status(200).json({ message: 'Schedule deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getAllSchedulesForTeacher = async (req, res) => {
  try {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const schedules = await classService.getAllSchedulesForTeacher();
    res.status(200).json({ success: true, schedules });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule,
  getAllSchedulesForTeacher
};
