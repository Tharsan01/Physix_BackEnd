const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String }, // optional
  batchNumber: { type: String, required: true },
  isPremium: { type: Boolean, default: false },
  lessonType: {
    type: String,
    required: true,
    enum: ['Theory', 'Revision', 'Practical', 'Paper Class', 'Seminar'],
    default: 'Theory',
  },
  lessonTopic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true }, // Add this
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);