const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const userRepository = require('../repository/userRepository');
const { toUserDTO } = require('../dtos/userDTO');

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email function
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification OTP',
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent:', info.response);
  } catch (error) {
    console.error('❌ Failed to send OTP email:', error);
    throw new Error('Failed to send OTP email. Please try again later.');
  }
};

// Generate JWT token with role included dynamically
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // Use actual user role from DB
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Register user
// Accept role and default to 'student' if not provided or invalid
const registerUser = async ({ userName, email, password, classId, phone, role }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error('User already exists');

  // Validate role
  const allowedRoles = ['student', 'teacher'];
  const userRole = allowedRoles.includes(role) ? role : 'student';

  const newUser = await userRepository.createUser({ userName, email, password, classId, phone, role: userRole });

  // Generate and store OTP
  const otp = generateOTP();
  newUser.emailOTP = otp;
  newUser.emailOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 min
  newUser.emailVerified = false; // Make sure your user model has this field
  await newUser.save();

  // Send OTP via email
  await sendOTPEmail(email, otp);

  return {
    user: toUserDTO(newUser),
    message: 'User registered. Please verify your email using the OTP sent to your inbox.',
  };
};

// Verify email OTP
const verifyEmailOTP = async (email, otp) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('User not found');

  if (user.emailVerified) {
    return { message: 'Email already verified.' };
  }

  if (!user.emailOTP || !user.emailOTPExpires) {
    throw new Error('No OTP found for this user.');
  }

  if (user.emailOTP !== otp) {
    throw new Error('Invalid OTP.');
  }

  if (user.emailOTPExpires < new Date()) {
    throw new Error('OTP has expired.');
  }

  // Mark email as verified
  user.emailVerified = true;
  user.emailOTP = null;           // Clear OTP fields
  user.emailOTPExpires = null;
  await user.save();

  return { message: 'Email successfully verified.' };
};

// Login user
const loginUser = async ({ userName, password }) => {
  const user = await userRepository.findByUserName(userName);
  if (!user) throw new Error('User not found');

  if (!user.emailVerified) {
    throw new Error('Please verify your email before logging in.');
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = generateToken(user); // token now contains the correct role
  return { user: toUserDTO(user), token };
};

// Send Reset Password Email
const sendResetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click here to reset your password: ${resetUrl}.\nIf you didn't request this, please ignore this email.`,
  };

  await transporter.sendMail(mailOptions);
};

// Forgot password
const forgotPassword = async (email) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('User with this email does not exist.');

  // Generate token
  const resetToken = crypto.randomBytes(32).toString('hex');

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour expiry

  await user.save();

  await sendResetPasswordEmail(email, resetToken);

  return { message: 'Password reset email sent. Please check your inbox.' };
};

// Reset password
const bcrypt = require('bcrypt');
const resetPassword = async (token, newPassword) => {
  const user = await userRepository.findByResetToken(token);
  if (!user) throw new Error('Invalid or expired reset token.');

  if (user.resetPasswordExpires < Date.now()) {
    throw new Error('Reset token has expired.');
  }

  // ✅ Just assign, schema will hash it
  user.password = newPassword;

  // Clear the reset token and expiry
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  // Save updated user
  await user.save();

  return { message: 'Password has been reset successfully.' };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

const getUserProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');
  return toUserDTO(user);  // call as a normal function, no "new"
};

const updateUserProfile = async (userId, updatedData) => {
  // Fetch existing user first
  const existingUser = await userRepository.findById(userId);
  if (!existingUser) throw new Error('User not found');

  // Check if email is being updated and is different
  if (updatedData.email && updatedData.email !== existingUser.email) {
    // Mark email as not verified
    updatedData.emailVerified = false;

    // Generate OTP using your existing function
    const otp = generateOTP();

    // Save OTP and expiry to updatedData
    updatedData.emailOTP = otp;
    updatedData.emailOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Send OTP email using your existing function
    await sendOTPEmail(updatedData.email, otp);
  }

  // Update user data in database
  const updatedUser = await userRepository.updateById(userId, updatedData);

  // Return updated user DTO
  return toUserDTO(updatedUser);
};

const softDeleteUserProfile = async (userId) => {
  await userRepository.updateById(userId, { isDeleted: true });
};

module.exports = { 
  registerUser, 
  loginUser, 
  verifyEmailOTP,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  softDeleteUserProfile 
};
