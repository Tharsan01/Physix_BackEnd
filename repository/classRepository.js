const ClassModel = require('../models/Class');  // Note: 'Class' with capital C if your file is named Class.js

const createSchedule = async (data) => await ClassModel.create(data);

const getAllSchedules = async () => await ClassModel.find();

const updateSchedule = async (id, data) =>
  await ClassModel.findByIdAndUpdate(id, data, { new: true });

const deleteSchedule = async (id) => await ClassModel.findByIdAndDelete(id);

module.exports = {
  createSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule,
};
