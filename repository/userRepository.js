const User = require('../models/User');

// Find user by ID (only active users if needed)
const findById = async (id) => {
  return await User.findById(id);
};

// Update user by ID
const updateById = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

// Permanently delete user by ID
const deleteById = async (id) => {
  return await User.findByIdAndDelete(id);
};
const findTeacher = async () => {
  return await User.findOne({ role: 'teacher' });
};

const getAllStudents = async () => {
  return await User.find({ role: 'student' }).sort({ createdAt: -1 });
};


module.exports = {
  findById,
  updateById,
  deleteById,
  findTeacher,
  getAllStudents
};
