const userRepository = require('../repository/userRepository');
const { toUserDTO } = require('../dtos/userDTO');
const { generateOTP, sendOTPEmail } = require('./authService'); // ensure these are exported properly

// Common: Get any user profile (used for both students and teachers)
const getUserProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');
  return toUserDTO(user); // includes createdDate and common fields
};

// Common: Update user profile (for student or teacher, validated by controller)
const updateUserProfile = async (userId, updatedData) => {
  const existingUser = await userRepository.findById(userId);
  if (!existingUser) throw new Error('User not found');

  // If email is changed, reverify it
  if (updatedData.email && updatedData.email !== existingUser.email) {
    updatedData.emailVerified = false;
    const otp = generateOTP();
    updatedData.emailOTP = otp;
    updatedData.emailOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
    await sendOTPEmail(updatedData.email, otp);
  }

  const updatedUser = await userRepository.updateById(userId, updatedData);
  return toUserDTO(updatedUser);
};

// Common: Delete user (used by students or teachers)
const deleteUser = async (userId) => {
  const deletedUser = await userRepository.deleteById(userId);
  if (!deletedUser) {
    throw new Error('User not found');
  }
  return deletedUser;
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
