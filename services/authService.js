// 

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const userRepository = require('../repository/authRepository');
const { toUserDTO } = require('../dtos/userDTO');

// ✅ Generate 6-digit OTP (keeping for potential future use)
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Send OTP email function (keeping for potential future use)
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransporter({
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

  await transporter.sendMail(mailOptions);
};

// ✅ Generate JWT token with role
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      batchNumber: user.batchNumber,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// ✅ Register user (role = student) - NO EMAIL VERIFICATION REQUIRED
const registerUser = async ({ userName, email, password, classId, phone, batchNumber }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error('User already exists');

  const role = 'student';

  // Create new user object with email already verified
  const newUser = await userRepository.createUser({
    userName,
    email,
    password,
    classId,
    phone,
    role,
    batchNumber,
    emailVerified: true, // Set to true by default - no verification needed
  });

  // Save the user without OTP fields
  await newUser.save();

  return {
    user: toUserDTO(newUser),
    message: 'User registered successfully. You can now log in.',
  };
};

// ✅ Verify email OTP (keeping for backward compatibility, but not required)
const verifyEmailOTP = async (email, otp) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('User not found');
  if (user.emailVerified) return { message: 'Email already verified.' };
  if (!user.emailOTP || !user.emailOTPExpires) throw new Error('No OTP found.');
  if (user.emailOTP !== otp) throw new Error('Invalid OTP.');
  if (user.emailOTPExpires < new Date()) throw new Error('OTP expired.');

  user.emailVerified = true;
  user.emailOTP = null;
  user.emailOTPExpires = null;
  await user.save();

  return { message: 'Email successfully verified.' };
};

// ✅ Login user (by userName and password) - NO EMAIL VERIFICATION CHECK
const loginUser = async ({ userName, password }) => {
  const user = await userRepository.findByUserName(userName);
  if (!user) throw new Error('User not found');

  // Removed email verification check - users can login immediately after registration

  const isValid = await user.comparePassword(password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = generateToken(user);
  return { user: toUserDTO(user), token };
};

// ✅ Send password reset email
const sendResetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click here to reset your password: ${resetUrl}.`,
  };

  await transporter.sendMail(mailOptions);
};

// ✅ Forgot password
const forgotPassword = async (email) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('User not found.');

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hr expiry
  await user.save();

  await sendResetPasswordEmail(email, resetToken);

  return { message: 'Password reset email sent.' };
};

// ✅ Reset password
const resetPassword = async (token, newPassword) => {
  const user = await userRepository.findByResetToken(token);
  if (!user) throw new Error('Invalid or expired reset token.');
  if (user.resetPasswordExpires < Date.now()) throw new Error('Reset token expired.');

  user.password = newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return { message: 'Password reset successfully.' };
};

module.exports = {
  registerUser,
  verifyEmailOTP,
  loginUser,
  forgotPassword,
  resetPassword,
};