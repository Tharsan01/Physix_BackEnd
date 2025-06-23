const inquiryService = require('../services/inquiryService');

const createInquiry = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: 'Subject and message are required' });
    }

    const inquiryDTO = await inquiryService.createInquiry(userId, subject, message);
    return res.status(201).json(inquiryDTO);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || 'Server error while creating inquiry' });
  }
};

const replyToInquiry = async (req, res) => {
  try {
    const { inquiryNumber, reply } = req.body;

    if (!inquiryNumber || !reply) {
      return res.status(400).json({ message: 'Inquiry number and reply are required' });
    }

    const inquiryDTO = await inquiryService.replyToInquiry(inquiryNumber, reply);
    return res.status(200).json(inquiryDTO);
  } catch (err) {
    console.error(err);
    if (err.message === 'Inquiry not found') {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message || 'Server error while replying to inquiry' });
  }
};

const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await inquiryService.getAllInquiries();
    return res.status(200).json(inquiries);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error while fetching inquiries' });
  }
};

const getInquiryByNumber = async (req, res) => {
  try {
    const { inquiryNumber } = req.params;
    const inquiry = await inquiryService.getInquiryByNumber(inquiryNumber);

    // Authorization: only teacher or the student who created it
    if (
      req.user.role.toLowerCase() !== 'teacher' &&
      inquiry.userId.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Forbidden: You cannot access this inquiry' });
    }

    return res.status(200).json(inquiry);
  } catch (err) {
    console.error(err);
    if (err.message === 'Inquiry not found') {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Server error while fetching inquiry' });
  }
};

module.exports = {
  createInquiry,
  replyToInquiry,
  getAllInquiries,
  getInquiryByNumber,
};
