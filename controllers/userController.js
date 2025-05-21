const userService = require('../services/userService');

const register = async (req, res) => {
  try {
    const { user, message } = await userService.registerUser(req.body);
    res.status(201).json({ user, message });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await userService.loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await userService.verifyEmailOTP(email, otp);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await userService.forgotPassword(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const result = await userService.resetPassword(token, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // assuming req.user is set by auth middleware
    const profile = await userService.getUserProfile(userId);
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedData = req.body;

    // updateUserProfile handles marking email as unverified and sending verification email if changed
    const updatedUser = await userService.updateUserProfile(userId, updatedData);

    res.json({
      message: updatedData.email ? 'Profile updated. Please verify your new email.' : 'Profile updated.',
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    await userService.softDeleteUserProfile(userId);
    res.json({ message: 'User profile deleted (soft delete).' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyEmailOTP,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  deleteProfile
};
