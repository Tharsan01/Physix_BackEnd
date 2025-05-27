const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    reply: { type: String },  // teacher's reply
    inquiryNumber: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

// Generate unique inquiryNumber before validation if not set
InquirySchema.pre('validate', function (next) {
  if (!this.inquiryNumber) {
    this.inquiryNumber = `INQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

module.exports = mongoose.model('Inquiry', InquirySchema);
