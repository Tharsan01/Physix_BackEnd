const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['single', 'multiple'], required: true },
  isRequired: { type: Boolean, default: false },
  order: { type: Number, required: true },
  options: [optionSchema],
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  batchNumber: { type: String, required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // teacher ID
}, {
  timestamps: true,
});

const submissionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      selectedOptionIds: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
    }
  ],
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const Exam = mongoose.model('Exam', examSchema);
const Submission = mongoose.model('Submission', submissionSchema);

module.exports = { Exam, Submission };
