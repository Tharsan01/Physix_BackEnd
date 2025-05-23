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

module.exports = {
  findById,
  updateById,
  deleteById,
};
