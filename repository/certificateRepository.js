const Certificate = require('../models/Certificate');

const create = async (data) => {
  const cert = new Certificate(data);
  return await cert.save();
};

const findById = async (id) => {
  return await Certificate.findById(id);
};

const update = async (cert) => {
  return await cert.save();
};

const deleteById = async (id) => {
  return await Certificate.findByIdAndDelete(id);
};

const findByBatchNumber = async (batchNumber) => {
  return await Certificate.find({ batchNumber });
};

const findAllWithStudent = async (filter = {}) => {
  return await Certificate.find(filter).populate('studentId', 'userName email');
};

const findByStudentId = async (studentId) => {
  return await Certificate.find({ studentId });
};

module.exports = {
  create,
  findById,
  update,
  deleteById, // renamed for clarity
  findByBatchNumber,
  findAllWithStudent,
  findByStudentId,
};
