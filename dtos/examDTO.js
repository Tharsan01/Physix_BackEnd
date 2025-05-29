// Format a single exam (for students and public views)
const toExamDTO = (exam) => ({
  id: exam._id,
  title: exam.title,
  createdBy: exam.createdBy,
  createdAt: exam.createdAt,
  questions: exam.questions.map((q, index) => ({
    questionIndex: index,
    text: q.text,
    options: q.options,
    multipleAnswers: q.multipleAnswers,
    required: q.required,
  })),
});

// Format a single submission (for teacher)
const toSubmissionDTO = (submission) => ({
  id: submission._id,
  studentId: submission.studentId,
  examId: submission.examId,
  submittedAt: submission.submittedAt,
  answers: submission.answers.map((a) => ({
    questionIndex: a.questionIndex,
    selectedOptions: a.selectedOptions,
  })),
});

// Format multiple submissions grouped by exam
const toExamWithSubmissionsDTO = (exam, submissions) => ({
  id: exam._id,
  title: exam.title,
  createdBy: exam.createdBy,
  submissions: submissions.map(toSubmissionDTO),
});

export { toExamDTO, toSubmissionDTO, toExamWithSubmissionsDTO };
