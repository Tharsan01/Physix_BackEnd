const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional if batch-wise only
  batchNumber: { type: String, required: true }, // batch for which certificate is issued
  certificateId: { type: String, required: true },
  qualification: { type: String, required: true },
  document: { type: String, required: true }, // URL of certificate document
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Delivered', 'Not Delivered'],
    default: 'Not Delivered',
  },
});

module.exports = mongoose.model('Certificate', certificateSchema);
