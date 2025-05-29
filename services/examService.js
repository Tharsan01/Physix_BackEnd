const examRepository = require('../repository/examRepository');

const createExam = async (examData) => {
  return await examRepository.createExam(examData);
};

const getAllExams = async () => {
  return await examRepository.getAllExams();
};

const getExamById = async (examId) => {
  return await examRepository.getExamById(examId);
};

const submitExam = async (examId, studentId, answers) => {
  const submission = {
    studentId,
    answers,
    submittedAt: new Date(),
  };
  return await examRepository.submitExam(examId, submission);
};

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  submitExam,
};
