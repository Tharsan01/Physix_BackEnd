class CertificateDTO {
  constructor({ _id, studentId, certificateId, qualification, document, date, status }) {
    this.id = _id;
    this.studentId = studentId;
    this.certificateId = certificateId;
    this.qualification = qualification;
    this.document = document;
    this.date = date;
    this.status = status;
  }
}

module.exports = CertificateDTO;
