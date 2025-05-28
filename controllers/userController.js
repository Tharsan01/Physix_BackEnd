const userService = require('../services/userService');

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

    // Pass user's role to service so it can decide OTP logic
    const userRole = req.user.role || 'user';

    const updatedUser = await userService.updateUserProfile(userId, updatedData, userRole);

    res.json({
      message: 'Profile updated.',
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

// POST: Upload or edit teacher profile (teacher-specific fields)
const uploadOrEditTeacherProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedData = { ...req.body };

    // Optionally, you can ensure the role is teacher to avoid accidental changes
    updatedData.role = 'teacher';

    // Now update the profile with imageUrl included in updatedData (if provided)
    const updatedTeacher = await userService.updateUserProfile(userId, updatedData, 'teacher');

    res.status(200).json({
      message: 'Teacher profile updated successfully.',
      user: updatedTeacher,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
  uploadOrEditTeacherProfile,
};
