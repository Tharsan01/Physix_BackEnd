const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const certificateController = require('../controllers/certificateController');

router.post('/upload', authenticate, certificateController.uploadCertificate);
router.get('/view', authenticate, certificateController.viewCertificates);
router.put('/edit/:id', authenticate, certificateController.editCertificate);
router.delete('/delete/:id', authenticate, certificateController.deleteCertificate);

module.exports = router;
