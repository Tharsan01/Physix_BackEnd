const { Exam, Submission } = require('../models/Exam');

async function createExam(examData) {
  const exam = new Exam(examData);
  return await exam.save();
}

async function getAllExams() {
  return await Exam.find({ status: 'published' }).sort({ date: 1 });
}

async function getExamById(id) {
  return await Exam.findById(id);
}

async function getExamByIdForTeacher(id) {
  return await Exam.findById(id);
}

async function saveSubmission(submissionData) {
  const submission = new Submission(submissionData);
  return await submission.save();
}

async function getSubmissionByStudentExam(studentId, examId) {
  return await Submission.findOne({ studentId, examId });
}

async function getAllSubmissionsForExam(examId) {
  return await Submission.find({ examId });
}

async function getSubmissionById(submissionId) {
  return await Submission.findById(submissionId);
}

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  getExamByIdForTeacher,
  saveSubmission,
  getSubmissionByStudentExam,
  getAllSubmissionsForExam,
  getSubmissionById
};