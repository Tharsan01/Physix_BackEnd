const {certificateService} = require('../services/certificateService');

// Upload new certificate
const uploadCertificate = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { certificateId, qualification, document, date, status ,batchNumber} = req.body;

    if (!certificateId || !qualification || !document || !date) {
      return res.status(400).json({ error: 'certificateId, qualification, document (URL),batchNumber and date are required' });
    }

    const certificateData = { studentId, certificateId, qualification, document, date, status,batchNumber };

    const newCertificate = await certificateService.uploadCertificate(certificateData);
    res.status(201).json({ message: 'Certificate uploaded', certificate: newCertificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
const viewCertificatesByStudent = async (req, res) => {
  try {
    const batchNumber = req.user.batchNumber;  // from logged-in user token/session

    const certificates = await certificateService.getCertificatesByBatchNumber(batchNumber);

    res.json({ success: true, data: certificates });
  } catch (error) {
    console.error('Error in viewCertificatesByStudent:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// View all certificates of logged-in student
const viewCertificates = async (req, res) => {
  try {
    const studentId = req.user.id;
    const certificates = await certificateService.getCertificatesByStudent(studentId);
    res.json({ success: true, certificates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get certificate by ID (only if belongs to logged-in student)
const getCertificateById = async (req, res) => {
  try {
    const studentId = req.user.id;
    const certId = req.params.id;

    const certificate = await certificateService.getCertificateById(certId, studentId);
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found or unauthorized' });
    }
    res.json({ success: true, certificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Edit certificate by ID (only if belongs to logged-in student)
const editCertificate = async (req, res) => {
  try {
    const studentId = req.user.id;
    const certId = req.params.id;
    const { certificateId, qualification, document, date, status,batchNumber } = req.body;

    const updatedCertificate = await certificateService.updateCertificate(certId, studentId, { certificateId, qualification, document, date, status,batchNumber });

    if (!updatedCertificate) {
      return res.status(404).json({ error: 'Certificate not found or unauthorized' });
    }

    res.json({ message: 'Certificate updated', certificate: updatedCertificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete certificate by ID (only if belongs to logged-in student)
const deleteCertificate = async (req, res) => {
  try {
    const studentId = req.user.id;
    const certId = req.params.id;

    const deleted = await certificateService.deleteCertificate(certId, studentId);

    if (!deleted) {
      return res.status(404).json({ error: 'Certificate not found or unauthorized' });
    }

    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  uploadCertificate,
  viewCertificates,
  getCertificateById,
  editCertificate,
  deleteCertificate,
  viewCertificatesByStudent
};
