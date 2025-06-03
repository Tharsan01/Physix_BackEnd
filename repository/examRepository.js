const { Exam, Submission } = require('../models/Exam');

async function createExam(examData) {
  const exam = new Exam(examData);
  return await exam.save();
}

async function getExamsByBatch(batchNumber, status = 'published') {
  return await Exam.find({ batchNumber, status });
}

async function getExamById(id) {
  return await Exam.findById(id);
}

async function getSubmissionByStudentExam(studentId, examId) {
  return await Submission.findOne({ studentId, examId });
}

async function saveSubmission(submissionData) {
  const submission = new Submission(submissionData);
  return await submission.save();
}

async function getAllSubmissionsForExam(examId) {
  return await Submission.find({ examId });
}

async function getSubmissionById(submissionId) {
  return await Submission.findById(submissionId);
}

module.exports = {
  createExam,
  getExamsByBatch,
  getExamById,
  getSubmissionByStudentExam,
  saveSubmission,
  getAllSubmissionsForExam,
  getSubmissionById,
};
