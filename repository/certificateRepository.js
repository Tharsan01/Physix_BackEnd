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
}

module.exports = new CertificateRepository();
