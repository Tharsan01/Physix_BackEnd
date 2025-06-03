const {
  createExam,
  getExamsByBatch,
  getExamById,
  getSubmissionByStudentExam,
  saveSubmission,
  getAllSubmissionsForExam,
  getSubmissionById,
} = require('../repository/examRepository');

const {
  examListDTO,
  examDetailsDTO,
  examDetailsForTeacherDTO,
  submissionResultDTO,
  submissionSummaryDTO,
  submissionDetailsDTO,
} = require('../dtos/examDTO');

async function createNewExam(examData, teacherId) {
  const newExam = await createExam({
    ...examData,
    createdBy: teacherId,
  });
  return newExam;
}

async function listExams(user) {
  if (!user.batchNumber) throw new Error('Batch number not found in user token');

  const exams = await getExamsByBatch(user.batchNumber, 'published');
  return exams.map(examListDTO);
}

async function getExamDetails(examId, role) {
  const exam = await getExamById(examId);
  if (!exam) throw new Error('Exam not found');

  if (role === 'teacher') {
    return examDetailsForTeacherDTO(exam);
  }
  return examDetailsDTO(exam);
}

async function submitExamAnswers(studentId, examId, answers) {
  // Prevent duplicate submission
  const existing = await getSubmissionByStudentExam(studentId, examId);
  if (existing) throw new Error('You have already submitted this exam');

  const exam = await getExamById(examId);
  if (!exam) throw new Error('Exam not found');

  const totalQuestions = exam.questions.length;
  let correctCount = 0;

  for (const question of exam.questions) {
    const submittedAnswer = answers.find(a => a.questionId.toString() === question._id.toString());
    if (!submittedAnswer) continue;

    const correctOptionIds = question.options.filter(o => o.isCorrect).map(o => o._id.toString());
    const submittedOptionIds = submittedAnswer.selectedOptionIds.map(id => id.toString());

    if (
      submittedOptionIds.length === correctOptionIds.length &&
      submittedOptionIds.every(id => correctOptionIds.includes(id))
    ) {
      correctCount++;
    }
  }

  const score = (correctCount / totalQuestions) * 100;

  const submission = await saveSubmission({
    examId,
    studentId,
    answers,
    score,
  });

  return submissionResultDTO(submission);
}

async function getStudentResult(studentId, examId) {
  const submission = await getSubmissionByStudentExam(studentId, examId);
  if (!submission) throw new Error('No submission found for this exam');
  return submissionResultDTO(submission);
}

async function getAllSubmissions(examId) {
  const submissions = await getAllSubmissionsForExam(examId);
  return submissions.map(submissionSummaryDTO);
}

async function getSubmissionDetails(submissionId) {
  const submission = await getSubmissionById(submissionId);
  if (!submission) throw new Error('Submission not found');
  return submissionDetailsDTO(submission);
}

async function updateExamById(examId, teacherId, updatedData) {
  const exam = await getExamById(examId);
  if (!exam) throw new Error('Exam not found');
  if (exam.createdBy.toString() !== teacherId) throw new Error('Unauthorized to update this exam');

  Object.assign(exam, updatedData);
  const updatedExam = await exam.save();
  return examDetailsForTeacherDTO(updatedExam);
}

async function deleteExamById(examId, teacherId) {
  const exam = await getExamById(examId);
  if (!exam) throw new Error('Exam not found');
  if (exam.createdBy.toString() !== teacherId) throw new Error('Unauthorized to delete this exam');

  await exam.deleteOne();
}

module.exports = {
  createNewExam,
  listExams,
  getExamDetails,
  submitExamAnswers,
  getStudentResult,
  getAllSubmissions,
  getSubmissionDetails,
  updateExamById,
  deleteExamById,
};
