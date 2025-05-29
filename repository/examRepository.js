const Exam = require('../models/Exam');

// Create a new exam
const createExam = async (data) => {
  return await Exam.create(data);
};

// Get all exams
const getAllExams = async () => {
  return await Exam.find({ isPublished: true });
};

// Get exam by ID
const getExamById = async (examId) => {
  return await Exam.findById(examId);
};

// Submit exam (add to submissions array)
const submitExam = async (examId, submission) => {
  const exam = await Exam.findById(examId);
  if (!exam) throw new Error('Exam not found');
  exam.submissions.push(submission);
  return await exam.save();
};

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  submitExam,
};
