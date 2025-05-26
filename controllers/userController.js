const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const userService = require('../services/userService');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// GET profile for logged-in user (student or teacher)
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await userService.getUserProfile(userId);
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE profile (student or teacher)
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedData = req.body;

    if (!updatedData.userName || !updatedData.email || !updatedData.phone) {
      return res.status(400).json({ error: 'userName, email, and phone are required.' });
    }

    const updatedUser = await userService.updateUserProfile(userId, updatedData);

    res.json({
      message: updatedData.email
        ? 'Profile updated. Please verify your new email.'
        : 'Profile updated.',
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPLOAD or EDIT teacher-specific profile fields (only for teachers)
const uploadOrEditTeacherProfile = async (req, res) => {
  try {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Access denied: only teachers allowed' });
    }

    const profileData = req.body;
    const allowedFields = ['qualifications', 'subjectSelection', 'address', 'subject', 'phone'];
    const updateData = {};

    allowedFields.forEach(field => {
      if (profileData[field] !== undefined) updateData[field] = profileData[field];
    });

    const updatedTeacher = await userService.updateUserProfile(req.user.id, updateData);
    res.json({ message: 'Teacher profile uploaded/updated successfully.', teacher: updatedTeacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE profile (student or teacher)
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
  uploadOrEditTeacherProfile,
  deleteProfile,
};
