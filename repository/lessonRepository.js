const Lesson = require('../models/Lesson');

const createLesson = async (lessonData) => {
  return await Lesson.create(lessonData);
};

const findById = async (id) => {
  return await Lesson.findById(id).populate('createdBy', 'name');
};

const updateLesson = async (id, updatedData) => {
  return await Lesson.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteLesson = async (id) => {
  return await Lesson.findByIdAndDelete(id);
};

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
