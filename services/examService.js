const {
  createExam,
  getAllExams,
  getExamById,
  getAllSubmissionsForExam,
  saveSubmission,
  getSubmissionByStudentExam,
  getSubmissionById
} = require('../repository/examRepository');

const {
  examListDTO,
  examDetailsDTO,
  examDetailsForTeacherDTO,
  submissionResultDTO,
  submissionSummaryDTO,
  submissionDetailsDTO
} = require('../dtos/examDTO');

async function createNewExam(examData, teacherId) {
  examData.createdBy = teacherId;
  const exam = await createExam(examData);
  return exam;
}

async function listExams() {
  const exams = await getAllExams();
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
  // Check if already submitted
  let existingSubmission = await getSubmissionByStudentExam(studentId, examId);
  if (existingSubmission) throw new Error('You have already submitted this exam');

  // Get exam details to grade
  const exam = await getExamById(examId);
  if (!exam) throw new Error('Exam not found');

  // Calculate score
  let totalQuestions = exam.questions.length;
  let correctCount = 0;

  for (const question of exam.questions) {
    const submittedAnswer = answers.find(a => a.questionId.toString() === question._id.toString());
    if (!submittedAnswer) continue; // no answer given

    // Check correct options
    const correctOptionIds = question.options.filter(o => o.isCorrect).map(o => o._id.toString());
    const submittedOptionIds = submittedAnswer.selectedOptionIds.map(id => id.toString());

    // For single and multiple type questions:
    // Check if submitted answers exactly match correct options (order independent)
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
    score
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

module.exports = {
  createNewExam,
  listExams,
  getExamDetails,
  submitExamAnswers,
  getStudentResult,
  getAllSubmissions,
  getSubmissionDetails
};