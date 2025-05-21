const lessonRepository = require('../repository/lessonRepository');
const { toLessonDTO } = require('../dtos/lessonDTO');

const uploadLesson = async (teacherId, { title, videoUrl, thumbnailUrl, videoType }) => {
  const lesson = await lessonRepository.createLesson({
    title,
    videoUrl,
    thumbnailUrl,
    videoType,
    createdBy: teacherId
  });

  return toLessonDTO(lesson);
};

const updateLesson = async (lessonId, teacherId, updatedData) => {
  const existingLesson = await lessonRepository.findById(lessonId);
  if (!existingLesson) throw new Error('Lesson not found');
  if (existingLesson.createdBy.toString() !== teacherId.toString()) {
    throw new Error('You are not authorized to edit this lesson');
  }

  const updatedLesson = await lessonRepository.updateLesson(lessonId, updatedData);
  return toLessonDTO(updatedLesson);
};

const deleteLesson = async (lessonId, teacherId) => {
  const lesson = await lessonRepository.findById(lessonId);
  if (!lesson) throw new Error('Lesson not found');
  if (lesson.createdBy.toString() !== teacherId.toString()) {
    throw new Error('You are not authorized to delete this lesson');
  }

  await lessonRepository.deleteLesson(lessonId);
  return { message: 'Lesson deleted successfully' };
};

const getAllLessons = async (category) => {
  let filter = {};

  if (category === 'free') {
    filter.videoType = 'free';
  } else if (category === 'premium') {
    filter.videoType = 'premium';
  }

  const lessons = await lessonRepository.findAll(filter);
  return lessons.map(toLessonDTO);
};

const getLessonById = async (lessonId) => {
  const lesson = await lessonRepository.findById(lessonId);
  if (!lesson) throw new Error('Lesson not found');
  return toLessonDTO(lesson);
};

module.exports = {
  uploadLesson,
  updateLesson,
  deleteLesson,
  getAllLessons,
  getLessonById
};
