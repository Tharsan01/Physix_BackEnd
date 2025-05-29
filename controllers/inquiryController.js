const examService = require('../services/examService');

// Teacher: Create Exam
const createExam = async (req, res) => {
  try {
    const exam = await examService.createExam(req.body);
    res.status(201).json({ message: 'Exam created', exam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Student & Teacher: Get All Exams
const getAllExams = async (req, res) => {
  try {
    const exams = await examService.getAllExams();
    res.status(200).json({ exams });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Student: Get Exam by ID
const getExamById = async (req, res) => {
  try {
    const exam = await examService.getExamById(req.params.id);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    res.status(200).json({ exam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Student: Submit Exam
const submitExam = async (req, res) => {
  try {
    const exam = await examService.submitExam(req.params.id, req.user.id, req.body.answers);
    res.status(200).json({ message: 'Submission successful', exam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  submitExam,
};
