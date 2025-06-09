
// services/certificateService.js
const certificateRepository = require('../repository/certificateRepository');
const CertificateDTO = require('../dtos/certificateDTO');

class CertificateService {
  async uploadCertificate(data) {
    const saved = await certificateRepository.create(data);
    return new CertificateDTO(saved);
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

  async getCertificateById(certId, studentId) {
    const cert = await certificateRepository.findById(certId);
    if (!cert || cert.studentId.toString() !== studentId) return null;
    return new CertificateDTO(cert);
  }

  async getCertificatesByStudentId(studentId) {
    const certificates = await certificateRepository.findByStudentId(studentId);
    return certificates.map(cert => new CertificateDTO(cert));
  }

  async getCertificatesByBatchNumber(batchNumber) {
    const certificates = await certificateRepository.findByBatchNumber(batchNumber);
    return certificates.map(cert => new CertificateDTO(cert));
  }

  async getAllCertificatesWithStudent(filter = {}) {
    const all = await certificateRepository.findAllWithStudent(filter);
    return all.map(cert => new CertificateDTO(cert));
  }
}

module.exports = new CertificateService();