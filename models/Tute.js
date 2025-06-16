const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: String,
});

const tuteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  batchNumber: { type: String, required: true }, // changed from class to batchNumber
  subject: { type: String, required: true },
  documentUrl: { type: String, required: true },
  status: { type: String, enum: ['Public', 'Private'], default: 'Private' },

    lessonType: {
      type: String,
      required: true,
      enum: ['Theory', 'Revision', 'Practical', 'Paper Class', 'Seminar'],
      default: 'Theory',
    },
    lessonTopic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true }, // Add this



  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // teacher ID
  createdAt: { type: Date, default: Date.now },
});

const Tute = mongoose.model('Tute', tuteSchema);
module.exports = Tute;
