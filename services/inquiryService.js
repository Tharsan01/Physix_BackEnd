
const inquiryRepository = require('../repository/inquiryRepository');
const InquiryDTO = require('../dtos/inquiryDTO');

async function createInquiry(userId, subject, message) {
  const createdInquiry = await inquiryRepository.create({ userId, subject, message });
  return new InquiryDTO(createdInquiry);
}

async function replyToInquiry(inquiryNumber, reply) {
  const inquiry = await inquiryRepository.findByInquiryNumber(inquiryNumber);
  if (!inquiry) throw new Error('Inquiry not found');
  inquiry.reply = reply;
  const updatedInquiry = await inquiryRepository.save(inquiry);
  return new InquiryDTO(updatedInquiry);
}

async function getAllInquiries() {
  const inquiries = await inquiryRepository.findAll();
  return inquiries.map(i => new InquiryDTO(i));
}

async function getInquiryByNumber(inquiryNumber) {
  const inquiry = await inquiryRepository.findByInquiryNumber(inquiryNumber);
  if (!inquiry) throw new Error('Inquiry not found');
  return new InquiryDTO(inquiry);
}

module.exports = {
  createInquiry,
  replyToInquiry,
  getAllInquiries,
  getInquiryByNumber,
}