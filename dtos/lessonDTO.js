function toLessonDTO(lesson) {
  return {
    id: lesson._id,
    title: lesson.title,
    videoUrl: lesson.videoUrl,
    thumbnailUrl: lesson.thumbnailUrl,
    batchNumber: lesson.batchNumber,
    isPremium: lesson.isPremium,
    lessonType: lesson.lessonType,
    createdBy: lesson.createdBy?.name || lesson.createdBy, // handle populated or non-populated
    createdAt: lesson.createdAt,
    updatedAt: lesson.updatedAt,
  };
}

module.exports = { toLessonDTO };