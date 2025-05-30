const {
  createNewExam,
  listExams,
  getExamDetails,
  submitExamAnswers,
  getStudentResult,
  getAllSubmissions,
  getSubmissionDetails
} = require('../services/examService');

async function createExam(req, res) {
  try {
    const teacherId = req.user.id;
    const examData = req.body;
    const exam = await createNewExam(examData, teacherId);
    res.status(201).json({ success: true, exam });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

async function getExams(req, res) {
  try {
    const exams = await listExams();
    res.json({ success: true, exams });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getExam(req, res) {
  try {
    const examId = req.params.id;
    const role = req.user.role; // 'teacher' or 'student'
    const exam = await getExamDetails(examId, role);
    res.json({ success: true, exam });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
}

async function submitAnswers(req, res) {
  try {
    const studentId = req.user.id;
    const examId = req.params.id;
    const answers = req.body.answers; // [{questionId, selectedOptionIds}]
    const result = await submitExamAnswers(studentId, examId, answers);
    res.status(201).json({ success: true, result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

async function getResult(req, res) {
  try {
    const studentId = req.user.id;
    const examId = req.params.id;
    const result = await getStudentResult(studentId, examId);
    res.json({ success: true, result });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
}

async function getAllSubmissionsForExam(req, res) {
  try {
    const examId = req.params.id;
    const submissions = await getAllSubmissions(examId);
    res.json({ success: true, submissions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getSubmissionDetail(req, res) {
  try {
    const submissionId = req.params.submissionId;
    const submission = await getSubmissionDetails(submissionId);
    res.json({ success: true, submission });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
}

module.exports = {
  createExam,
  getExams,
  getExam,
  submitAnswers,
  getResult,
  getAllSubmissionsForExam,
  getSubmissionDetail
};
