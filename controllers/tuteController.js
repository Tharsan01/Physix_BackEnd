const tuteService = require('../services/tuteService.js');


const createTute = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const tuteData = { 
      ...req.body, 
      createdBy: teacherId,
      lessonType: req.body.lessonType,
      lessonTopic: req.body.lessonTopic
    };
    
    const tute = await tuteService.createTute(tuteData);
    res.status(201).json({ success: true, data: tute });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateTute = async (req, res) => {
  try {
    const tuteId = req.params.id;
    const teacherId = req.user.id;

    const existingTute = await tuteService.getTuteById(tuteId);
    if (existingTute.createdBy.toString() !== teacherId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const updated = await tuteService.updateTute(tuteId, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteTute = async (req, res) => {
  try {
    const tuteId = req.params.id;
    const teacherId = req.user.id;

    const existingTute = await tuteService.getTuteById(tuteId);
    if (existingTute.createdBy.toString() !== teacherId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await tuteService.deleteTute(tuteId);
    res.json({ success: true, message: 'Tute deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const listTeacherTutes = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const tutes = await tuteService.getTutesByTeacher(teacherId);
    res.json({ success: true, data: tutes });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const listStudentTutes = async (req, res) => {
  try {
    const batchNumber = req.user.batchNumber;
    const tutes = await tuteService.getTutesByBatchNumber(batchNumber);
    res.json({ success: true, data: tutes });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getStudentTuteById = async (req, res) => {
  try {
    const batchNumber = req.user.batchNumber;
    const tuteId = req.params.id;

    const tute = await tuteService.getTuteById(tuteId);
    if (!tute) return res.status(404).json({ success: false, message: 'Tute not found' });
    if (tute.batchNumber !== batchNumber || tute.status !== 'Public') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    res.json({ success: true, data: tute });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTute,
  updateTute,
  deleteTute,
  listTeacherTutes,
  listStudentTutes,
  getStudentTuteById,
};
