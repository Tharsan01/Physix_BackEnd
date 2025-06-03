const certificateRepository = require('../repository/certificateRepository');
const CertificateDTO = require('../dtos/certificateDTO');

class CertificateService {
  async uploadCertificate(certificateData) {
    const saved = await certificateRepository.create(certificateData);
    return new CertificateDTO(saved);
  }

   async getCertificatesByBatchNumber(batchNumber) {
    const certificates = await certificateRepository.findByBatchNumber(batchNumber);
    return certificates.map(cert => new CertificateDTO(cert));
  }

  async getCertificateById(certId, studentId) {
    const cert = await certificateRepository.findById(certId);
    if (!cert) return null;
    if (cert.studentId.toString() !== studentId) return null; // restrict access
    return new CertificateDTO(cert);
  }

  async updateCertificate(certId, studentId, updateData) {
    const cert = await certificateRepository.findById(certId);
    if (!cert || cert.studentId.toString() !== studentId) return null;

    Object.assign(cert, updateData);
    const updated = await certificateRepository.update(cert);
    return new CertificateDTO(updated);
  }

  async deleteCertificate(certId, studentId) {
    const cert = await certificateRepository.findById(certId);
    if (!cert || cert.studentId.toString() !== studentId) return false;

    await certificateRepository.delete(cert);
    return true;
  }
  async getCertificatesByStudentId(studentId) {
    const certificates = await certificateRepository.findByStudentId(studentId);
    return certificates.map(cert => new CertificateDTO(cert));
  }
}


module.exports = new CertificateService();
