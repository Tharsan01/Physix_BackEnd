const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  classNumber: {
    type: String,
    required: true,
    unique: true,
  },
  lesson: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  batchNumber: { type: String, required: true },
      lessonType: {
        type: String,
        required: true,
        enum: ['Theory', 'Revision', 'Practical', 'Paper Class', 'Seminar'],
        default: 'Theory',
      },
      lessonTopic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true }, // Add this
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'scheduled',
  },
  password: { type: String },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

// Auto-generate class number like 01, 02, 03...
classSchema.pre('validate', async function (next) {
  if (!this.classNumber) {
    const count = await mongoose.model('Class').countDocuments();
    this.classNumber = (count + 1).toString().padStart(2, '0');
  }
  next();
});

module.exports = mongoose.model('Class', classSchema);
