const Lesson = require('../models/Lesson');

// Create a new lesson
const createLesson = async (lessonData) => {
  return await Lesson.create(lessonData);
};

// Find a lesson by ID and populate the teacher's name
const findById = async (id) => {
  return await Lesson.findById(id).populate('createdBy', 'name'); // createdBy is populated
};

// Update a lesson by ID
const updateLesson = async (id, updatedData) => {
  return await Lesson.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete a lesson by ID
const deleteLesson = async (id) => {
  return await Lesson.findByIdAndDelete(id);
};

// Find all lessons with optional filtering
const findAll = async (filter = {}) => {
  return await Lesson.find(filter).populate('createdBy', 'name');
};

module.exports = {
  createLesson,
  findById,
  updateLesson,
  deleteLesson,
  findAll
};
