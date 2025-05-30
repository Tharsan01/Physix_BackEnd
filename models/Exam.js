const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['single', 'multiple'], required: true },
  isRequired: { type: Boolean, default: true },
  options: [optionSchema],
  order: { type: Number, required: true }
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  questions: [questionSchema]
}, { timestamps: true });

const submissionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    selectedOptionIds: [mongoose.Schema.Types.ObjectId]
  }],
  score: Number,
  submittedAt: { type: Date, default: Date.now }
});

const Exam = mongoose.model('Exam', examSchema);
const Submission = mongoose.model('Submission', submissionSchema);

module.exports = { Exam, Submission };