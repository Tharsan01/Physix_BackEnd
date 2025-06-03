const {
  createNewExam,
  listExams,
  getExamDetails,
  submitExamAnswers,
  getStudentResult,
  getAllSubmissions,
  getSubmissionDetails,
  updateExamById,
  deleteExamById
} = require('../services/examService');

async function createExam(req, res) {
  try {
    const teacherId = req.user.id;
    const examData = req.body;

    if (!examData.batchNumber) {
      return res.status(400).json({
        success: false,
        message: "Batch number is required to create an exam.",
      });
    }

    const exam = await createNewExam(examData, teacherId);

    res.status(201).json({
      success: true,
      message: "Exam created successfully.",
      data: exam,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getExamsForStudent(req, res) {
  try {
    const user = req.user;
    const exams = await listExams(user);

    res.status(200).json({
      success: true,
      data: exams,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getExamByIdHandler(req, res) {
  try {
    const { examId } = req.params;
    const role = req.user.role;

    const exam = await getExamDetails(examId, role);
    res.status(200).json({
      success: true,
      data: exam,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
}

async function submitExamHandler(req, res) {
  try {
    const studentId = req.user.id;
    const { examId } = req.params;
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, message: "Answers are required." });
    }

    const result = await submitExamAnswers(studentId, examId, answers);

    res.status(201).json({
      success: true,
      message: "Exam submitted successfully.",
      data: result,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

async function getStudentResultHandler(req, res) {
  try {
    const studentId = req.user.id;
    const { examId } = req.params;

    const result = await getStudentResult(studentId, examId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
}

async function getSubmissionsForExamHandler(req, res) {
  try {
    const { examId } = req.params;

    const submissions = await getAllSubmissions(examId);
    res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getSubmissionDetailsHandler(req, res) {
  try {
    const { submissionId } = req.params;

    const submission = await getSubmissionDetails(submissionId);
    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
}

async function updateExamHandler(req, res) {
  try {
    const { examId } = req.params;
    const teacherId = req.user.id;
    const updatedData = req.body;

    const updatedExam = await updateExamById(examId, teacherId, updatedData);

    res.status(200).json({
      success: true,
      message: 'Exam updated successfully',
      data: updatedExam,
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
}

async function deleteExamHandler(req, res) {
  try {
    const { examId } = req.params;
    const teacherId = req.user.id;

    await deleteExamById(examId, teacherId);

    res.status(200).json({
      success: true,
      message: 'Exam deleted successfully',
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
}

module.exports = {
  createExam,
  getExamsForStudent,
  getExamByIdHandler,
  submitExamHandler,
  getStudentResultHandler,
  getSubmissionsForExamHandler,
  getSubmissionDetailsHandler,
  updateExamHandler,
  deleteExamHandler,
};
