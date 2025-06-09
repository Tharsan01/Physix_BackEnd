const express = require('express');
const router = express.Router();
const { authenticate, restrictTo } = require('../middleware/authMiddleware');
const certController = require('../controllers/certificateController');

router.post('/upload', authenticate, restrictTo('teacher'), certController.uploadCertificate);
router.put('/edit/:id', authenticate, restrictTo('teacher'), certController.editCertificate);
router.delete('/delete/:id', authenticate, restrictTo('teacher'), certController.deleteCertificate);
router.get('/student/view', authenticate, restrictTo('student'), certController.viewCertificatesByStudent);
router.get('/teacher/all', authenticate, restrictTo('teacher'), certController.viewAllCertificatesForTeacher);

module.exports = router;