const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

router.post('/', authenticate, restrictTo('Teacher'), topicController.addTopic);
router.get('/', authenticate, restrictTo('Teacher','Student'), topicController.getAllTopics);

module.exports = router;