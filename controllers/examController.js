import examService from '../services/examService.js';

export const createExam = async (req, res) => {
  try {
    const exam = await examService.createExam(req.body);
    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const exams = await examService.getAllExams();
    res.status(200).json({ exams });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExamById = async (req, res) => {
  try {
    const exam = await examService.getExamById(req.params.id);
    res.status(200).json({ exam });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const submitExam = async (req, res) => {
  try {
    const submission = await examService.submitExam(req.user.id, req.params.examId, req.body);
    res.status(200).json({ message: 'Exam submitted successfully', submission });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSubmissionsForExam = async (req, res) => {
  try {
    const submissions = await examService.getSubmissions(req.params.examId);
    res.status(200).json({ submissions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
