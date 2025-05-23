const userService = require('../services/userService');

    const { user, message } = await userService.registerUser(req.body);
// GET: Fetch user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // set by auth middleware
    const profile = await userService.getUserProfile(userId);
    res.json(profile); // already returns DTO including createdDate
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT: Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedData = req.body;

    // Ensure required fields aren't removed
    if (!updatedData.userName || !updatedData.email || !updatedData.phone) {
      return res.status(400).json({ error: 'userName, email, and phone are required.' });
    }

    const updatedUser = await userService.updateUserProfile(userId, updatedData);

    res.json({
      message: updatedData.email
        ? 'Profile updated. Please verify your new email.'
        : 'Profile updated.',
      user: updatedUser, // returned as DTO with createdDate
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE: Permanently delete user profile
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    await userService.deleteUser(userId);
    res.status(200).json({ message: 'User profile deleted permanently.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
