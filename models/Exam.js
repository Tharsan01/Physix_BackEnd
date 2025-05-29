import mongoose from 'mongoose';

// Exam schema
const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      text: String,
      options: [String],
      correctAnswers: [Number], // Indexes of correct options
      multipleAnswers: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

// Submission schema
const submissionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [
    {
      questionIndex: Number,
      selectedOptions: [Number],
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

const Exam = mongoose.model('Exam', examSchema);
const Submission = mongoose.model('Submission', submissionSchema);

export { Exam, Submission };
