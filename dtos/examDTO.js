// DTO for returning exam basic info (list)
function examListDTO(exam) {
  return {
    id: exam._id,
    title: exam.title,
    date: exam.date,
    duration: exam.duration
  };
}

// DTO for returning full exam details
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
        // Do NOT expose isCorrect for students to prevent cheating!
        // Teacher can have separate API or flag for this
      }))
    }))
  };
}

// DTO for returning full exam details to teacher (include isCorrect)
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
        isCorrect: o.isCorrect
      }))
    }))
  };
}

// DTO for submission result (student)
function submissionResultDTO(submission) {
  return {
    examId: submission.examId,
    studentId: submission.studentId,
    score: submission.score,
    submittedAt: submission.submittedAt
    // optionally add detailed feedback if needed
  };
}

// DTO for teacher to get all submissions summary
function submissionSummaryDTO(submission) {
  return {
    submissionId: submission._id,
    studentId: submission.studentId,
    score: submission.score,
    submittedAt: submission.submittedAt
  };
}

// DTO for detailed submission (teacher view)
function submissionDetailsDTO(submission) {
  return {
    submissionId: submission._id,
    studentId: submission.studentId,
    examId: submission.examId,
    score: submission.score,
    submittedAt: submission.submittedAt,
    answers: submission.answers
  };
}

module.exports = {
  examListDTO,
  examDetailsDTO,
  examDetailsForTeacherDTO,
  submissionResultDTO,
  submissionSummaryDTO,
  submissionDetailsDTO
};
