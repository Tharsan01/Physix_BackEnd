const certificateRepository = require('../repository/certificateRepository');
const CertificateDTO = require('../dtos/certificateDTO');

const uploadCertificate = async (data) => {
  const saved = await certificateRepository.create(data);
  return new CertificateDTO(saved);
};

const updateCertificate = async (certId, studentId, updateData) => {
  const cert = await certificateRepository.findById(certId);
  if (!cert || cert.studentId.toString() !== studentId) return null;

  Object.assign(cert, updateData);
  const updated = await certificateRepository.update(cert);
  return new CertificateDTO(updated);
};

const deleteCertificate = async (certId, studentId) => {
  console.log('Service: deleteCertificate called with:', { certId, studentId });

  const cert = await certificateRepository.findById(certId);
  console.log('Fetched cert:', cert);

  if (!cert) {
    console.log('No certificate found');
    return false;
  }

  if (cert.studentId && cert.studentId.toString() !== studentId) {
    console.log('Student ID mismatch');
    return false;
  }

  // ✅ Correct, modern deletion
  await certificateRepository.deleteById(certId);
  console.log('Certificate deleted successfully');

  return true;
};

const getCertificateById = async (certId, studentId) => {
  const cert = await certificateRepository.findById(certId);
  if (!cert || cert.studentId.toString() !== studentId) return null;
  return new CertificateDTO(cert);
};

const getCertificatesByStudentId = async (studentId) => {
  const certificates = await certificateRepository.findByStudentId(studentId);
  return certificates.map(cert => new CertificateDTO(cert));
};

const getCertificatesByBatchNumber = async (batchNumber) => {
  const certificates = await certificateRepository.findByBatchNumber(batchNumber);
  return certificates.map(cert => new CertificateDTO(cert));
};

const getAllCertificatesWithStudent = async (filter = {}) => {
  const all = await certificateRepository.findAllWithStudent(filter);
  return all.map(cert => new CertificateDTO(cert));
};

module.exports = {
  uploadCertificate,
  updateCertificate,
  deleteCertificate,
  getCertificateById,
  getCertificatesByStudentId,
  getCertificatesByBatchNumber,
  getAllCertificatesWithStudent,
};
