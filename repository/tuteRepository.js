const Tute = require('../models/Tute');

const tuteRepository = {
  create: (tuteData) => new Tute(tuteData).save(),

  findById: (id) => Tute.findById(id).populate('lessonTopic'),

  findByTeacher: (teacherId) => 
    Tute.find({ createdBy: teacherId })
      .populate('lessonTopic')
      .sort({ createdAt: -1 }),

  findByBatchNumber: (batchNumber) => 
    Tute.find({ batchNumber, status: 'Public' })
      .populate('lessonTopic')
      .sort({ createdAt: -1 }),

  updateById: (id, updateData) => 
    Tute.findByIdAndUpdate(id, updateData, { new: true })
      .populate('lessonTopic'),

  deleteById: (id) => Tute.findByIdAndDelete(id),
};

module.exports = { tuteRepository };