const certificateService = require('../services/certificateService');

const uploadCertificate = async (req, res) => {
  try {
    const { certificateId, qualification, document, date, status, batchNumber } = req.body;
    const studentId = req.body.studentId || null; // Only teacher can assign this
    if (!certificateId || !qualification || !document || !date || !batchNumber) {
      return res.status(400).json({ error: 'Required fields missing' });
    }
    const newCert = await certificateService.uploadCertificate({
      studentId,
      certificateId,
      qualification,
      document,
      date,
      status,
      batchNumber,
    });
    res.status(201).json({ success: true, certificate: newCert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const editCertificate = async (req, res) => {
  try {
    const certId = req.params.id;
    const studentId = req.body.studentId;
    const updateData = req.body;
    const updated = await certificateService.updateCertificate(certId, studentId, updateData);
    if (!updated) return res.status(404).json({ error: 'Not found or unauthorized' });
    res.json({ success: true, certificate: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const certId = req.params.id;
    const studentId = req.body.studentId;
    const deleted = await certificateService.deleteCertificate(certId, studentId);
    if (!deleted) return res.status(404).json({ error: 'Not found or unauthorized' });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const viewCertificatesByStudent = async (req, res) => {
  try {
    const batchNumber = req.user.batchNumber;
    const certificates = await certificateService.getCertificatesByBatchNumber(batchNumber);
    res.json({ success: true, data: certificates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const viewAllCertificatesForTeacher = async (req, res) => {
  try {
    const certificates = await certificateService.getAllCertificatesWithStudent();
    res.json({ success: true, data: certificates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  uploadCertificate,
  editCertificate,
  deleteCertificate,
  viewCertificatesByStudent,
  viewAllCertificatesForTeacher,
};