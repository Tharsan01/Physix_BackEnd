const certificateService = require('../services/certificateService');

const uploadCertificate = async (req, res) => {
  try {
    const { certificateId, qualification, document, date, status, batchNumber, studentId } = req.body;

    if (!certificateId || !qualification || !document || !date || !batchNumber) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const newCert = await certificateService.uploadCertificate({
      studentId: studentId || null,
      certificateId,
      qualification,
      document,
      date,
      status,
      batchNumber,
    });

    res.status(201).json({ success: true, certificate: newCert });
  } catch (err) {
    console.error('Upload certificate error:', err);
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
    console.error('Edit certificate error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const certId = req.params.id;
    const studentId = req.body.studentId;

    if (!certId || !studentId) {
      return res.status(400).json({ error: 'Certificate ID and Student ID are required' });
    }

    const deleted = await certificateService.deleteCertificate(certId, studentId);

    if (!deleted) return res.status(404).json({ error: 'Not found or unauthorized' });

    res.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (err) {
    console.error('Delete certificate error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const viewCertificatesByStudent = async (req, res) => {
  try {
    const batchNumber = req.user.batchNumber;
    const certificates = await certificateService.getCertificatesByBatchNumber(batchNumber);
    res.json({ success: true, data: certificates });
  } catch (err) {
    console.error('View certificates by student error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const viewAllCertificatesForTeacher = async (req, res) => {
  try {
    const certificates = await certificateService.getAllCertificatesWithStudent();
    res.json({ success: true, data: certificates });
  } catch (err) {
    console.error('View all certificates for teacher error:', err);
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
