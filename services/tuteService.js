import { tuteRepository } from '../repository/tuteRepository.js';
import { toTuteDTO } from '../dtos/tuteDTO.js';

export const tuteService = {
  createTute: async (tuteData) => {
    const tute = await tuteRepository.create(tuteData);
    return toTuteDTO(tute);
  },

  getTuteById: async (id) => {
    const tute = await tuteRepository.findById(id);
    if (!tute) throw new Error('Tute not found');
    return toTuteDTO(tute);
  },

  getTutesByTeacher: async (teacherId) => {
    const tutes = await tuteRepository.findByTeacher(teacherId);
    return tutes.map(toTuteDTO);
  },

  getTutesByBatchNumber: async (batchNumber) => {
    const tutes = await tuteRepository.findByBatchNumber(batchNumber);
    return tutes.map(toTuteDTO);
  },

  updateTute: async (id, updateData) => {
    const updated = await tuteRepository.updateById(id, updateData);
    if (!updated) throw new Error('Update failed, tute not found');
    return toTuteDTO(updated);
  },

  deleteTute: async (id) => {
    const deleted = await tuteRepository.deleteById(id);
    if (!deleted) throw new Error('Delete failed, tute not found');
    return true;
  },
};
