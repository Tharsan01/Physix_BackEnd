class InquiryDTO {
  constructor({ _id, userId, subject, message, reply, inquiryNumber, createdAt, updatedAt }) {
    this.id = _id;
    this.userId = userId;
    this.subject = subject;
    this.message = message;
    this.reply = reply;
    this.inquiryNumber = inquiryNumber;
    this.status = reply ? 'Replied' : 'Not Replied'; // Add this line
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = InquiryDTO;