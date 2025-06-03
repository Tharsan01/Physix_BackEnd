import { tuteService } from '../services/tuteService.js';

export const tuteController = {
  createTute: async (req, res) => {
    try {
      const teacherId = req.user.id; // from auth middleware
      const tuteData = { ...req.body, createdBy: teacherId };
      const tute = await tuteService.createTute(tuteData);
      res.status(201).json({ success: true, data: tute });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  updateTute: async (req, res) => {
    try {
      const tuteId = req.params.id;
      const teacherId = req.user.id;

      // Verify ownership
      const existingTute = await tuteService.getTuteById(tuteId);
      if (existingTute.createdBy.toString() !== teacherId) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }

      const updated = await tuteService.updateTute(tuteId, req.body);
      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  deleteTute: async (req, res) => {
    try {
      const tuteId = req.params.id;
      const teacherId = req.user.id;

      // Verify ownership
      const existingTute = await tuteService.getTuteById(tuteId);
      if (existingTute.createdBy.toString() !== teacherId) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }

      await tuteService.deleteTute(tuteId);
      res.json({ success: true, message: 'Tute deleted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  listTeacherTutes: async (req, res) => {
    try {
      const teacherId = req.user.id;
      const tutes = await tuteService.getTutesByTeacher(teacherId);
      res.json({ success: true, data: tutes });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  listStudentTutes: async (req, res) => {
    try {
      const batchNumber = req.user.batchNumber; // student batch number from token/session
      const tutes = await tuteService.getTutesByBatchNumber(batchNumber);
      res.json({ success: true, data: tutes });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  getStudentTuteById: async (req, res) => {
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
  },
};
