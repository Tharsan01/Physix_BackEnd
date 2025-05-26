const User = require('../models/User');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByUserName = async (userName) => {
  return await User.findOne({ userName });
};

const findByFullName = async (fullName) => {
  return await User.findOne({ fullName });
};

const createUser = async (data) => {
  return await new User(data).save();
};

const findByResetToken = async (token) => {
  return await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
};

const updatePassword = async (userId, newPassword) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  return await user.save();
};

const findByVerificationToken = async (token) => {
  return await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() },
  });
};

module.exports = {
  findByEmail,
  findByUserName,
  findByFullName,
  createUser,
  findByResetToken,
  updatePassword,
  findByVerificationToken,
};
