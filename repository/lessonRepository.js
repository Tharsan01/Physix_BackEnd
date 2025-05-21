const Lesson = require('../models/Lesson');

const createLesson = async (data) => await new Lesson(data).save();

const updateLesson = async (id, data) => {
  data.updatedAt = Date.now();
  return await Lesson.findByIdAndUpdate(id, data, { new: true });
};

const deleteLesson = async (id) => await Lesson.findByIdAndDelete(id);

const findById = async (id) => await Lesson.findById(id);

const findAll = async () => await Lesson.find().sort({ createdAt: -1 });

module.exports = {
  createLesson,
  updateLesson,
  deleteLesson,
  findById,
  findAll
};
