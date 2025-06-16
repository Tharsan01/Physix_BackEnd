function toTuteDTO(tute) {
  return {
    id: tute._id,
    title: tute.title,
    batchNumber: tute.batchNumber,
    subject: tute.subject,
    documentUrl: tute.documentUrl,
    status: tute.status,
    lessonType: tute.lessonType,
    lessonTopic: tute.lessonTopic,
    createdBy: tute.createdBy,
    createdAt: tute.createdAt,
  };
}

module.exports = { toTuteDTO };