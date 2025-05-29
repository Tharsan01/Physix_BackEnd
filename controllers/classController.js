const classService = require('../services/classService');

const addSchedule = async (req, res) => {
  try {
    const teacherId = req.user.id; // authenticated teacher id
    const schedule = await classService.addSchedule({ ...req.body, teacherId });
    res.status(201).json({ message: 'Class scheduled successfully', schedule });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await classService.getAllSchedulesForStudents();
    res.status(200).json(schedules);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const updated = await classService.editSchedule(req.params.id, req.body);
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

module.exports = {
  addSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule
};
