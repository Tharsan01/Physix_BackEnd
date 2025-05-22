const certificateRepository = require('../repository/certificateRepository');
const CertificateDTO = require('../dtos/certificateDTO');

class CertificateService {
  async uploadCertificate(certificateData) {
    const saved = await certificateRepository.create(certificateData);
    return new CertificateDTO(saved);
  }

  async getCertificatesByStudent(studentId) {
    const certificates = await certificateRepository.findByStudentId(studentId);
    return certificates.map(cert => new CertificateDTO(cert));
  }

  async updateCertificate(certificateId, studentId, updateData) {
    // Only update if certificate belongs to student
    const cert = await certificateRepository.findById(certificateId);
    if (!cert || cert.studentId.toString() !== studentId) return null;

    Object.assign(cert, updateData);
    const updated = await cert.save();
    return new CertificateDTO(updated);
  }

  async deleteCertificate(certificateId, studentId) {
    const cert = await certificateRepository.findById(certificateId);
    if (!cert || cert.studentId.toString() !== studentId) return false;

    await cert.remove();
    return true;
  }
}

module.exports = new CertificateService();
