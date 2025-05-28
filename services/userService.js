const bcrypt = require('bcrypt');
const userRepository = require('../repository/userRepository');
const { toUserDTO } = require('../dtos/userDTO');
const { generateOTP, sendOTPEmail } = require('./authService');

const getUserProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');
  return toUserDTO(user);
};

/**
 * Update user profile
 * @param {String} userId - ID of the user to update
 * @param {Object} updatedData - Data to update
 * @param {String} userRole - Role of the user ('teacher' or 'user')
 */
const updateUserProfile = async (userId, updatedData, userRole = 'user') => {
  const existingUser = await userRepository.findById(userId);
  if (!existingUser) throw new Error('User not found');

  // If user is NOT a teacher and email changed, trigger OTP email verification
  if (
    userRole !== 'teacher' && // only for non-teachers
    updatedData.email &&
    updatedData.email !== existingUser.email
  ) {
    updatedData.emailVerified = false;
    const otp = generateOTP();
    updatedData.emailOTP = otp;
    updatedData.emailOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
    try {
      await sendOTPEmail(updatedData.email, otp);
    } catch (err) {
      console.error('Failed to send OTP email:', err);
      // Decide whether to throw or continue
      // throw new Error('Failed to send OTP email');
    }
  }

  // If password updated, hash it manually
  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }

  // Apply updates to the existing user document and save to trigger pre-save hooks
  Object.assign(existingUser, updatedData);
  const savedUser = await existingUser.save();

  return toUserDTO(savedUser);
};

const deleteUser = async (userId) => {
  const deletedUser = await userRepository.deleteById(userId);
  if (!deletedUser) throw new Error('User not found');
  return deletedUser;
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
