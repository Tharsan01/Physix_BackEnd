class CertificateDTO {
  constructor({ _id, studentId, batchNumber, certificateId, qualification, document, date, status }) {
    this.id = _id;
    this.studentId = studentId;
    this.batchNumber = batchNumber;
    this.certificateId = certificateId;
    this.qualification = qualification;
    this.document = document;
    this.date = date;
    this.status = status;
  }
}

module.exports = CertificateDTO;
