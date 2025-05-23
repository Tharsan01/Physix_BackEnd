const userService = require('../services/userService');

// Upload or Edit teacher profile
const uploadOrEditTeacherProfile = async (req, res) => {
  try {
    const teacherId = req.user.id; // Extracted from JWT
    const profileData = req.body;

    const allowedFields = ['qualifications', 'subjectSelection', 'address', 'subject', 'phone'];
    const updateData = {};
    allowedFields.forEach(field => {
      if (profileData[field] !== undefined) updateData[field] = profileData[field];
    });

    const updatedTeacher = await userService.updateUserProfile(teacherId, updateData);
    res.json({ message: 'Teacher profile uploaded/updated successfully.', teacher: updatedTeacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get teacher profile
const getTeacherProfile = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const teacher = await userService.getUserProfile(teacherId);
    res.json({ teacher });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Delete teacher profile
const deleteTeacherProfile = async (req, res) => {
  try {
    const teacherId = req.user.id;
    await userService.deleteUserProfile(teacherId);
    res.json({ message: 'Teacher profile deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  uploadOrEditTeacherProfile,
  getTeacherProfile,
  deleteTeacherProfile,
};
