const User = require('../models/User');

// ✅ Find user by ID (only active, if needed for soft delete)
const getById = async (id) => {
  return await User.findById(id);
};

// ✅ Update user by ID
const updateById = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

// ✅ Hard delete by ID (not used for soft delete, but keep for admin use)
const deleteById = async (id) => {
  return await User.findByIdAndDelete(id);
};

// ✅ Find the teacher (only one teacher in your system)
const findTeacher = async () => {
  return await User.findOne({ role: 'teacher' });
};

// ✅ Get all students (excluding soft-deleted students)
const getAllStudents = async () => {
  return await User.find({ role: 'student', isDeleted: { $ne: true } }).sort({ createdAt: -1 });
};

// ✅ --- OPTIONAL: Hard delete student by ID ---
// Usually not needed if you use soft delete.
const deleteStudentById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getById,
  updateById,
  deleteById,
  findTeacher,
  getAllStudents,
  deleteStudentById, // optional
};
