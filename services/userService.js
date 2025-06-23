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

  // For students: trigger OTP if email is changed
  if (
    userRole !== 'teacher' &&
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
    }
  }

  // // Only hash password if it exists and is not empty
  // if (updatedData.password && updatedData.password.trim() !== '') {
  //   updatedData.password = await bcrypt.hash(updatedData.password, 10);
  // } else {
  //   delete updatedData.password; // Prevent blank password overwriting
  // }

  // Merge updates and save
  Object.assign(existingUser, updatedData);
  const savedUser = await existingUser.save();

  return toUserDTO(savedUser);
};
;

const deleteUser = async (userId) => {
  const deletedUser = await userRepository.deleteById(userId);
  if (!deletedUser) throw new Error('User not found');
  return deletedUser;
};
const getTeacherData = async () => {
  const teacher = await userRepository.findTeacher();
  if (!teacher) throw new Error('Teacher not found');
  return teacher; // includes password hash and other fields
};

const getAllStudents = async () => {
  const students = await userRepository.getAllStudents();
  return students.map(toUserDTO);
};

const deleteStudentById = async (studentId) => {
  // Check if student exists and is a student
  const student = await userRepository.getById(studentId);
  if (!student) {
    throw new Error('Student not found.');
  }
  if (student.role !== 'student') {
    throw new Error('The specified user is not a student.');
  }

  // Perform HARD DELETE
  await userRepository.deleteById(studentId);
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getTeacherData,
  getAllStudents,
  deleteStudentById
};
