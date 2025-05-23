const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const userRepository = require('../repository/authRepository');
const { toUserDTO } = require('../dtos/userDTO');

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP email function
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification OTP',
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };
  await transporter.sendMail(mailOptions);
};

// Generate JWT token with role included dynamically
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register user (force role = 'student')
const registerUser = async ({ userName, email, password, classId, phone }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error('User already exists');

  const userRole = 'student'; // force student role

  const newUser = await userRepository.createUser({ userName, email, password, classId, phone, role: userRole });

  const otp = generateOTP();
  newUser.emailOTP = otp;
  newUser.emailOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
  newUser.emailVerified = false;
  await newUser.save();

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
  if (user.emailVerified) return { message: 'Email already verified.' };
  if (!user.emailOTP || !user.emailOTPExpires) throw new Error('No OTP found for this user.');
  if (user.emailOTP !== otp) throw new Error('Invalid OTP.');
  if (user.emailOTPExpires < new Date()) throw new Error('OTP has expired.');

  user.emailVerified = true;
  user.emailOTP = null;
  user.emailOTPExpires = null;
  await user.save();

  return { message: 'Email successfully verified.' };
};

// Login user
const loginUser = async ({ userName, password }) => {
  const user = await userRepository.findByUserName(userName);
  if (!user) throw new Error('User not found');
  if (!user.emailVerified) throw new Error('Please verify your email before logging in.');

  const isValid = await user.comparePassword(password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = generateToken(user);
  return { user: toUserDTO(user), token };
};

// Send Reset Password Email
const sendResetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
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

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();

  await sendResetPasswordEmail(email, resetToken);

  return { message: 'Password reset email sent. Please check your inbox.' };
};

// Reset password
const resetPassword = async (token, newPassword) => {
  const user = await userRepository.findByResetToken(token);
  if (!user) throw new Error('Invalid or expired reset token.');
  if (user.resetPasswordExpires < Date.now()) throw new Error('Reset token has expired.');

  user.password = newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return { message: 'Password has been reset successfully.' };
};

module.exports = {
  registerUser,
  verifyEmailOTP,
  loginUser,
  forgotPassword,
  resetPassword,
};
