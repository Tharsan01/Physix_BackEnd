
// repository/certificateRepository.js
const Certificate = require('../models/Certificate');

class CertificateRepository {
  async create(data) {
    const cert = new Certificate(data);
    return await cert.save();
  }

  async findByBatchNumber(batchNumber) {
    return await Certificate.find({ batchNumber });
  }

  async findById(id) {
    return await Certificate.findById(id);
  }

  async update(cert) {
    return await cert.save();
  }

  async delete(cert) {
    return await cert.remove();
  }

  async findAllWithStudent(filter = {}) {
    return await Certificate.find(filter).populate('studentId', 'userName email');
  }

  async findByStudentId(studentId) {
    return await Certificate.find({ studentId });
  }
}

module.exports = new CertificateRepository();