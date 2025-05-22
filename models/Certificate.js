const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  certificateId: { type: String, required: true },
  qualification: { type: String, required: true },
  document: { type: String, required: true }, // URL as string
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Delivered', 'Not Delivered'],
    default: 'Not Delivered'
  }
});

module.exports = mongoose.model('Certificate', certificateSchema);
