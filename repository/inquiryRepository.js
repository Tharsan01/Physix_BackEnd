const Inquiry = require('../models/Inquiry');

async function create(data) {
  const inquiry = new Inquiry(data);
  return inquiry.save();
}

async function findByInquiryNumber(inquiryNumber) {
  return Inquiry.findOne({ inquiryNumber });
}

async function findAll() {
  return Inquiry.find().populate('userId', 'fullName email');
}

async function findById(id) {
  return Inquiry.findById(id);
}

async function save(inquiry) {
  return inquiry.save();
}

module.exports = {
  create,
  findByInquiryNumber,
  findAll,
  findById,
  save,
};
