const lessonRepository = require('../repository/lessonRepository');
let Topic;
try {
  Topic = require('../models/Topic');
  console.log('Topic model loaded successfully');
} catch (error) {
  console.error('Error loading Topic model:', error.message);
  throw new Error('Topic model could not be loaded');
}

const uploadLesson = async (teacherId, { title, videoUrl, thumbnailUrl, lessonType, batchNumber, isPremium, lessonTopic }) => {
  if (!Topic) {
    console.error('Topic model is undefined in uploadLesson');
    throw new Error('Topic is not defined');
  }

  console.log('Validating lessonTopic ID:', lessonTopic);
  const topic = await Topic.findById(lessonTopic);
  if (!topic) {
    console.log('Topic not found for ID:', lessonTopic);
    throw new Error('Invalid lesson topic');
  }

  console.log('Topic validated:', topic.name);

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

  return lesson; // Return raw lesson object
};

const updateLesson = async (lessonId, teacherId, updatedData) => {
  const existingLesson = await lessonRepository.findById(lessonId);
  if (!existingLesson) throw new Error('Lesson not found');

  const creatorId = existingLesson.createdBy._id || existingLesson.createdBy;
  if (creatorId.toString() !== teacherId.toString()) {
    throw new Error('You are not authorized to edit this lesson');
  }

  const updatedLesson = await lessonRepository.updateLesson(lessonId, updatedData);
  return updatedLesson; // Return raw lesson object
};

const deleteLesson = async (lessonId, teacherId) => {
  const lesson = await lessonRepository.findById(lessonId);
  if (!lesson) throw new Error('Lesson not found');

  const creatorId = lesson.createdBy._id || lesson.createdBy;
  if (creatorId.toString() !== teacherId.toString()) {
    throw new Error('You are not authorized to delete this lesson');
  }

  await lessonRepository.deleteLesson(lessonId);
  return { message: 'Lesson deleted successfully' };
};

const getAllLessons = async (category, batchNumber) => {
  let filter = { batchNumber };

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
    lessonTopic: lesson.lessonTopic, // Include lessonTopic
    createdBy: lesson.createdBy?.name || lesson.createdBy,
    createdAt: lesson.createdAt,
    updatedAt: lesson.updatedAt,
  }));
};

const getLessonById = async (lessonId) => {
  const lesson = await lessonRepository.findById(lessonId);
  if (!lesson) throw new Error('Lesson not found');
  return lesson; // Return raw lesson object
};

const getAllLessonsForTeacher = async () => {
  const lessons = await lessonRepository.findAll();
  return lessons.map(lesson => ({
    id: lesson._id,
    title: lesson.title,
    videoUrl: lesson.videoUrl,
    thumbnailUrl: lesson.thumbnailUrl,
    batchNumber: lesson.batchNumber,
    isPremium: lesson.isPremium,
    lessonType: lesson.lessonType,
    lessonTopic: lesson.lessonTopic, // Include lessonTopic
    createdBy: lesson.createdBy?.name || lesson.createdBy,
    createdAt: lesson.createdAt,
    updatedAt: lesson.updatedAt,
  }));
};
const findLessonsByTypeAndBatch = async (lessonType, title, batchNumber) => {
  const filter = {
    lessonType,
    batchNumber,
  };

  // If title is given, add a case-insensitive regex for partial match:
  if (title) {
    filter.title = { $regex: title, $options: 'i' };
  }

  return await lessonRepository.findAll(filter);
};

module.exports = {
  uploadLesson,
  updateLesson,
  deleteLesson,
  getAllLessons,
  getLessonById,
  getAllLessonsForTeacher,
  findLessonsByTypeAndBatch
};