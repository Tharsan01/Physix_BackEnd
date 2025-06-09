const {tuteRepository} = require('../repository/tuteRepository');
const  {toTuteDTO}  = require('../dtos/tuteDTO');

const createTute = async (tuteData) => {
  const tute = await tuteRepository.create(tuteData);
  return toTuteDTO(tute);
};

const getTuteById = async (id) => {
  const tute = await tuteRepository.findById(id);
  if (!tute) throw new Error('Tute not found');
  return toTuteDTO(tute);
};

const getTutesByTeacher = async (teacherId) => {
  const tutes = await tuteRepository.findByTeacher(teacherId);
  return tutes.map(toTuteDTO);
};

const getTutesByBatchNumber = async (batchNumber) => {
  const tutes = await tuteRepository.findByBatchNumber(batchNumber);
  return tutes.map(toTuteDTO);
};

const updateTute = async (id, updateData) => {
  const updated = await tuteRepository.updateById(id, updateData);
  if (!updated) throw new Error('Update failed, tute not found');
  return toTuteDTO(updated);
};

const deleteTute = async (id) => {
  const deleted = await tuteRepository.deleteById(id);
  if (!deleted) throw new Error('Delete failed, tute not found');
  return true;
};

module.exports = {
  createTute,
  getTuteById,
  getTutesByTeacher,
  getTutesByBatchNumber,
  updateTute,
  deleteTute,
};
