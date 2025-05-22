const Certificate = require('../models/Certificate');

class CertificateRepository {
  async create(data) {
    const cert = new Certificate(data);
    return await cert.save();
  }

  async findByStudentId(studentId) {
    return await Certificate.find({ studentId });
  }

  async findById(id) {
    return await Certificate.findById(id);
  }
}

module.exports = new CertificateRepository();
