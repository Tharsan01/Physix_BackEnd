function toLessonDTO(lesson) {
  return {
    id: lesson._id,
    title: lesson.title,
    videoUrl: lesson.videoUrl,
    thumbnailUrl: lesson.thumbnailUrl,
    videoType: lesson.videoType,
    batchNumber: lesson.batchNumber,
    uploadedBy: lesson.uploadedBy,
    createdAt: lesson.createdAt,
    updatedAt: lesson.updatedAt,
  };
}

module.exports = { toLessonDTO };
