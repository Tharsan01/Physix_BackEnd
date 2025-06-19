const inquiryRepository = require('../repository/inquiryRepository');
const InquiryDTO = require('../dtos/inquiryDTO');

const createInquiry = async (userId, subject, message) => {
  const createdInquiry = await inquiryRepository.create({ userId, subject, message });
  return new InquiryDTO(createdInquiry);
};

// Version using ID for reply
const replyToInquiry = async (inquiryNumber, reply) => {
  if (!inquiryNumber || !reply) {
    throw new Error('Inquiry number and reply are required');
  }

  const inquiry = await inquiryRepository.findByInquiryNumber(inquiryNumber);
  if (!inquiry) throw new Error('Inquiry not found');

  inquiry.reply = reply;
  const updatedInquiry = await inquiryRepository.save(inquiry);

  return new InquiryDTO(updatedInquiry);
};


const getAllInquiries = async () => {
  const inquiries = await inquiryRepository.findAll();
  return inquiries.map(i => new InquiryDTO(i));
};

const getInquiryByNumber = async (inquiryNumber) => {
  const inquiry = await inquiryRepository.findByInquiryNumber(inquiryNumber);
  if (!inquiry) throw new Error('Inquiry not found');
  return new InquiryDTO(inquiry);
};

module.exports = {
  createInquiry,
  replyToInquiry,
  getAllInquiries,
  getInquiryByNumber,
};
