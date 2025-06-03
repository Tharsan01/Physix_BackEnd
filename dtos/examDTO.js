function examListDTO(exam) {
  return {
    id: exam._id,
    title: exam.title,
    date: exam.date,
    duration: exam.duration,
    batchNumber: exam.batchNumber,
  };
}

function examDetailsDTO(exam) {
  return {
    id: exam._id,
    title: exam.title,
    date: exam.date,
    duration: exam.duration,
    status: exam.status,
    questions: exam.questions.map(q => ({
      id: q._id,
      text: q.text,
      type: q.type,
      isRequired: q.isRequired,
      order: q.order,
      options: q.options.map(o => ({
        id: o._id,
        text: o.text,
      })),
    })),
  };
}

function examDetailsForTeacherDTO(exam) {
  return {
    id: exam._id,
    title: exam.title,
    date: exam.date,
    duration: exam.duration,
    status: exam.status,
    questions: exam.questions.map(q => ({
      id: q._id,
      text: q.text,
      type: q.type,
      isRequired: q.isRequired,
      order: q.order,
      options: q.options.map(o => ({
        id: o._id,
        text: o.text,
        isCorrect: o.isCorrect,
      })),
    })),
  };
}

function submissionResultDTO(submission) {
  return {
    examId: submission.examId,
    studentId: submission.studentId,
    score: submission.score,
    submittedAt: submission.submittedAt,
  };
}

function submissionSummaryDTO(submission) {
  return {
    submissionId: submission._id,
    studentId: submission.studentId,
    score: submission.score,
    submittedAt: submission.submittedAt,
  };
}

function submissionDetailsDTO(submission) {
  return {
    submissionId: submission._id,
    studentId: submission.studentId,
    examId: submission.examId,
    score: submission.score,
    submittedAt: submission.submittedAt,
    answers: submission.answers,
  };
}

module.exports = {
  examListDTO,
  examDetailsDTO,
  examDetailsForTeacherDTO,
  submissionResultDTO,
  submissionSummaryDTO,
  submissionDetailsDTO,
};
