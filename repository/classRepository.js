const ClassModel = require('../models/Class');

const createSchedule = async (data) => {
  return await ClassModel.create(data);
};

const getAllSchedules = async (batchNumber) => {
  return await ClassModel.find({ status: 'active', batchNumber })
    .populate('lessonTopic', 'name') // Populate topic name
    .sort({ date: 1 });
};

const updateSchedule = async (id, data) => {
  return await ClassModel.findByIdAndUpdate(id, data, { new: true })
    .populate('lessonTopic', 'name');
};

const deleteSchedule = async (id) => {
  return await ClassModel.findByIdAndDelete(id);
};

const getAllSchedulesForTeacher = async () => {
  return await ClassModel.find()
    .populate('lessonTopic', 'name') // Populate for teacher view
    .populate('teacherId', 'name email') // Also populate teacher info
    .sort({ date: 1 });
};

module.exports = {
  createSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule,
  getAllSchedulesForTeacher
};