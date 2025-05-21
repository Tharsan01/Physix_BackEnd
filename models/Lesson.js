const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String }, // optional
  isPremium: {type: Boolean,default: false // false = free, true = premium
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // required teacher ID
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
