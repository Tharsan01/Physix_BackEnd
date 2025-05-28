const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, enum: ['Published', 'Not published'], required: true },
    imageUrl: { type: String }, // stored as URL
  },
  { timestamps: true }
);

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;  // export model directly
