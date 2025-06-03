import Tute from '../models/Tute.js';

export const tuteRepository = {
  create: (tuteData) => new Tute(tuteData).save(),

  findById: (id) => Tute.findById(id),

  findByTeacher: (teacherId) => Tute.find({ createdBy: teacherId }),

  findByBatchNumber: (batchNumber) => Tute.find({ batchNumber, status: 'Public' }),

  updateById: (id, updateData) => Tute.findByIdAndUpdate(id, updateData, { new: true }),

  deleteById: (id) => Tute.findByIdAndDelete(id),
};
