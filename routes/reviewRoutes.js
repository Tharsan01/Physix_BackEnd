const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware'); // Correct import

// All routes require authentication
router.use(authenticate); // Correct middleware name

// Students can review teachers, teachers can review students
router.post('/', reviewController.createReview);

// Only the user who wrote the review can update/delete it
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

// Get reviews written by the logged-in user
router.get('/given', reviewController.getReviewsGiven);

// Get reviews received by the logged-in user
router.get('/received', reviewController.getReviewsReceived);

module.exports = router;
