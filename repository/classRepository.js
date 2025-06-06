const ClassModel = require('../models/Class');  // Ensure Class.js is correctly named with capital 'C'

const createSchedule = async (data) => {
  return await ClassModel.create(data);
};

const getAllSchedules = async (batchNumber) => {
  console.log('Fetching schedules for batchNumber:', batchNumber);
  return await ClassModel.find({ status: 'active', batchNumber }).sort({ date: 1 });
};

const updateSchedule = async (id, data) => {
  return await ClassModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteSchedule = async (id) => {
  return await ClassModel.findByIdAndDelete(id);
};
const getAllSchedulesForTeacher = async () => {
  return await ClassModel.find().sort({ date: 1 });
};


module.exports = {
  createSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule,
  getAllSchedulesForTeacher
};
