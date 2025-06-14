const lessonRepository = require('../repository/lessonRepository');
const { toLessonDTO } = require('../dtos/lessonDTO');

const uploadLesson = async (teacherId, { title, videoUrl, thumbnailUrl, lessonType, batchNumber, isPremium, lessonTopic }) => {
  // Validate lessonTopic exists
  const topic = await Topic.findById(lessonTopic);
  if (!topic) {
    throw new Error('Invalid lesson topic');
  }

  const lesson = await lessonRepository.createLesson({
    title,
    videoUrl,
    thumbnailUrl,
    lessonType,
    batchNumber,
    isPremium,
    lessonTopic,
    createdBy: teacherId,
  });

  return lesson; // Return the lesson directly, no DTO
};

const updateLesson = async (lessonId, teacherId, updatedData) => {
  const existingLesson = await lessonRepository.findById(lessonId);
  if (!existingLesson) throw new Error('Lesson not found');

  // ✅ Fix: use createdBy._id for populated lesson
  const creatorId = existingLesson.createdBy._id || existingLesson.createdBy;
  if (creatorId.toString() !== teacherId.toString()) {
    throw new Error('You are not authorized to edit this lesson');
  }

  const updatedLesson = await lessonRepository.updateLesson(lessonId, updatedData);
  return toLessonDTO(updatedLesson);
};

const deleteLesson = async (lessonId, teacherId) => {
  const lesson = await lessonRepository.findById(lessonId);
  if (!lesson) throw new Error('Lesson not found');

  // ✅ Fix: use createdBy._id for populated lesson
  const creatorId = lesson.createdBy._id || lesson.createdBy;
  if (creatorId.toString() !== teacherId.toString()) {
    throw new Error('You are not authorized to delete this lesson');
  }

  await lessonRepository.deleteLesson(lessonId);
  return { message: 'Lesson deleted successfully' };
};

const getAllLessons = async (category, batchNumber) => {
  let filter = { batchNumber }; // Always filter by batchNumber

  if (category === 'free') {
    filter.isPremium = false;
  } else if (category === 'premium') {
    filter.isPremium = true;
  }

  const lessons = await lessonRepository.findAll(filter);
  return lessons.map(lesson => ({
    id: lesson._id,
    title: lesson.title,
    videoUrl: lesson.videoUrl,
    thumbnailUrl: lesson.thumbnailUrl,
    batchNumber: lesson.batchNumber,
    isPremium: lesson.isPremium,
    lessonType: lesson.lessonType,
    createdBy: lesson.createdBy?.name || lesson.createdBy,
    createdAt: lesson.createdAt,
    updatedAt: lesson.updatedAt,
  }));
};


const getLessonById = async (lessonId) => {
  const lesson = await lessonRepository.findById(lessonId);
  if (!lesson) throw new Error('Lesson not found');
  return toLessonDTO(lesson);
};

const getAllLessonsForTeacher = async () => {
  const lessons = await lessonRepository.findAll(); // no filter
  return lessons.map(lesson => ({
    id: lesson._id,
    title: lesson.title,
    videoUrl: lesson.videoUrl,
    thumbnailUrl: lesson.thumbnailUrl,
    batchNumber: lesson.batchNumber,
    isPremium: lesson.isPremium,
    createdBy: lesson.createdBy.name,
    createdAt: lesson.createdAt,
    updatedAt: lesson.updatedAt,
  }));
};

module.exports = {
  uploadLesson,
  updateLesson,
  deleteLesson,
  getAllLessons,
  getLessonById,
  getAllLessonsForTeacher
};
