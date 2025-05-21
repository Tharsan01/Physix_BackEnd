const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String }, // optional
  videoType: { type: String, enum: ['free', 'premium'], default: 'free' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // required teacher ID
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
